import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CONTACT_COOLDOWN_MS, CONTACT_WINDOW_MS, formspreeEndpoint, recentAttempts, retryAt, validateContact } from '../src/lib/contact.ts'
import { ContactDeliveryError, sendContact } from '../src/lib/sendContact.ts'

const input = { name: 'Visitor', email: 'visitor@example.com', message: 'Let’s discuss an internship opportunity.' }
const now = 1_800_000_000_000

test('validates normal messages and rejects control characters, malformed email and oversized input', () => {
  assert.equal(validateContact(input), null)
  assert.equal(validateContact({ ...input, name: 'José San Miguel' }), null)
  assert.ok(validateContact({ ...input, name: 'Visitor\r\nBcc: victim@example.com' }))
  assert.ok(validateContact({ ...input, email: 'visitor@example.com\r\nBcc: victim@example.com' }))
  assert.ok(validateContact({ ...input, email: 'not-an-email' }))
  assert.ok(validateContact({ ...input, message: ' ' }))
  assert.ok(validateContact({ ...input, message: 'x'.repeat(3001) }))
  assert.ok(validateContact({ ...input, message: 'hello\u0000world' }))
  assert.equal(validateContact({ ...input, message: 'A valid\nmultiline message.' }), null)
})

test('limits attempts to one per minute and five per rolling hour, then releases the limit', () => {
  assert.equal(retryAt([], now), 0)
  assert.equal(retryAt([now], now), now + CONTACT_COOLDOWN_MS)
  assert.ok(retryAt([now - CONTACT_COOLDOWN_MS], now) <= now)
  const attempts = [0, 1, 2, 3, 4].map((minute) => now - 10 * CONTACT_COOLDOWN_MS + minute * CONTACT_COOLDOWN_MS)
  assert.equal(retryAt(attempts, now), attempts[0] + CONTACT_WINDOW_MS)
  assert.ok(retryAt(attempts, attempts[0] + CONTACT_WINDOW_MS) <= attempts[0] + CONTACT_WINDOW_MS)
})

test('recovers from corrupted stored attempts without inventing future timestamps', () => {
  assert.deepEqual(recentAttempts({}, now), [])
  assert.deepEqual(recentAttempts([null, 'bad', NaN, Infinity, now + 1, now - CONTACT_WINDOW_MS, now], now), [now])
})

test('only builds endpoints on Formspree and rejects missing IDs and URL injection', () => {
  assert.equal(formspreeEndpoint('xaeqealw'), 'https://formspree.io/f/xaeqealw')
  assert.equal(formspreeEndpoint('  xaeqealw  '), 'https://formspree.io/f/xaeqealw')
  for (const invalid of [undefined, '', 'https://evil.example', '//evil.example', '../other', 'id?redirect=evil', 'id#fragment', '<script>', 'a'.repeat(65)]) {
    assert.equal(formspreeEndpoint(invalid), null)
  }
})

test('submits JSON without redirects and ignores the provider confirmation URL', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async (url: string, options: RequestInit) => {
    calls++
    assert.equal(url, 'https://formspree.io/f/xaeqealw')
    assert.equal(options.method, 'POST')
    assert.equal(options.redirect, 'error')
    assert.equal(options.credentials, 'omit')
    assert.equal(new Headers(options.headers).get('Accept'), 'application/json')
    assert.ok(options.signal)
    const payload = JSON.parse(String(options.body))
    assert.deepEqual(Object.keys(payload).sort(), ['_gotcha', 'email', 'message', 'name', 'subject'])
    assert.equal(payload.name, input.name)
    assert.equal(payload.email, input.email)
    assert.equal(payload.message, input.message)
    return Response.json({ next: 'https://formspree.io/thanks' })
  })
  await sendContact({ ...input, name: ' Visitor ', redirect: 'https://evil.example' } as typeof input, 'xaeqealw')
  assert.equal(calls, 1)
})

test('does not submit an invalid message or unconfigured destination', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => { calls++; return Response.json({ ok: true }) })
  await assert.rejects(sendContact(input, ''), ContactDeliveryError)
  await assert.rejects(sendContact({ ...input, email: 'bad email' }, 'xaeqealw'), ContactDeliveryError)
  assert.equal(calls, 0)
})

test('only accepts confirmed successful JSON and does not expose provider error text', async (t) => {
  for (const body of [{ ok: true }, { next: '/thanks' }]) {
    t.mock.method(globalThis, 'fetch', async () => Response.json(body))
    await sendContact(input, 'xaeqealw')
  }
  for (const body of [{}, { ok: false }, { ok: true, errors: [{ message: '<script>provider secret</script>' }] }, { error: 'provider secret' }, { next: '/recaptcha' }, { next: 'https://formspree.io/verify' }]) {
    t.mock.method(globalThis, 'fetch', async () => Response.json(body))
    await assert.rejects(sendContact(input, 'xaeqealw'), (error: unknown) => error instanceof ContactDeliveryError && !error.message.includes('provider secret'))
  }
  t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: true }, { status: 400 }))
  await assert.rejects(sendContact(input, 'xaeqealw'), ContactDeliveryError)
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>Verification required</html>'))
  await assert.rejects(sendContact(input, 'xaeqealw'))
})

test('applies provider throttling using a bounded retry delay', async (t) => {
  for (const [header, expected] of [['120', 120], ['999999', 3600], ['bad', 60]]) {
    t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 429, headers: { 'Retry-After': String(header) } }))
    await assert.rejects(sendContact(input, 'xaeqealw'), (error: unknown) => error instanceof ContactDeliveryError && error.retryAfter === expected)
  }
})

test('rejects network failures and timeouts without confirming delivery', async (t) => {
  for (const failure of [new TypeError('Failed to fetch'), new DOMException('Timed out', 'TimeoutError')]) {
    t.mock.method(globalThis, 'fetch', async () => { throw failure })
    await assert.rejects(sendContact(input, 'xaeqealw'), (error: unknown) => error === failure)
  }
})
