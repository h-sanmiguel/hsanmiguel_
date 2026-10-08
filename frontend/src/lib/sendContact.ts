import { formspreeEndpoint, validateContact } from './contact.ts'
import type { ContactMessage } from './contact.ts'

export class ContactDeliveryError extends Error {
  retryAfter: number
  constructor(message: string, retryAfter = 0) {
    super(message)
    this.retryAfter = retryAfter
  }
}

export async function sendContact(input: ContactMessage, formId: string): Promise<void> {
  const endpoint = formspreeEndpoint(formId)
  if (!endpoint) throw new ContactDeliveryError('Sending is temporarily unavailable. Please email me directly.')
  const validationError = validateContact(input)
  if (validationError) throw new ContactDeliveryError(validationError)

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'omit',
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      message: input.message.trim(),
      subject: 'New message from Hans’s portfolio',
      _gotcha: '',
    }),
  })
  if (response.status === 429) {
    const retryHeader = response.headers.get('Retry-After')
    const seconds = retryHeader && /^\d+$/.test(retryHeader) ? Number(retryHeader) : 60
    throw new ContactDeliveryError('Too many messages. Please wait before trying again.', Math.min(Math.max(seconds, 60), 3600))
  }

  const result: unknown = await response.json()
  const failure = 'Your message could not be sent. Please try again later or email me directly.'
  if (!response.ok || response.redirected || !result || typeof result !== 'object' || 'error' in result || 'errors' in result || ('ok' in result && result.ok === false)) {
    throw new ContactDeliveryError(failure)
  }
  // Formspree's JSON API can confirm success using `next`; never navigate to it.
  if ('next' in result && typeof result.next === 'string') {
    const nextPath = new URL(result.next, 'https://formspree.io').pathname
    if (/\/(?:recaptcha|captcha|verify|verification)(?:\/|$)/i.test(nextPath)) throw new ContactDeliveryError(failure)
    return
  }
  if (!('ok' in result) || result.ok !== true) throw new ContactDeliveryError(failure)
}
