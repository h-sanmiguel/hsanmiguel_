import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { LoaderCircle, Send } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { CONTACT_LIMITS, formspreeEndpoint, readAttempts, recentAttempts, retryAt, saveAttempts, validateContact } from '../../lib/contact'
import { ContactDeliveryError, sendContact } from '../../lib/sendContact'

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID ?? portfolio.contact.formId ?? ''
const endpoint = formspreeEndpoint(formId)

export function ContactForm() {
  const busy = useRef(false)
  const [initialAttempts] = useState(() => readAttempts())
  const attempts = useRef<number[]>(initialAttempts)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [blockedUntil, setBlockedUntil] = useState(() => retryAt(initialAttempts, Date.now()))
  const [now, setNow] = useState(Date.now)
  const remaining = Math.max(0, Math.ceil((blockedUntil - now) / 1000))

  useEffect(() => {
    if (blockedUntil <= Date.now()) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [blockedUntil])

  useEffect(() => {
    const sync = () => {
      attempts.current = recentAttempts([...new Set([...attempts.current, ...readAttempts()])], Date.now())
      setBlockedUntil((current) => Math.max(current, retryAt(attempts.current, Date.now())))
      setNow(Date.now())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current || !endpoint) return
    setSuccess(false)
    const form = event.currentTarget
    const fields = new FormData(form)
    const input = {
      name: String(fields.get('name') ?? '').trim(),
      email: String(fields.get('email') ?? '').trim(),
      message: String(fields.get('message') ?? '').trim(),
    }
    if (fields.get('_gotcha')) { setStatus('Your message could not be sent. Please email me directly.'); return }
    const error = validateContact(input)
    if (error) { setStatus(error); return }
    const time = Date.now()
    attempts.current = recentAttempts([...new Set([...attempts.current, ...readAttempts(time)])], time)
    const next = Math.max(blockedUntil, retryAt(attempts.current, time))
    if (next > time) {
      setNow(time)
      setBlockedUntil(next)
      setStatus('Please wait before sending another message.')
      return
    }
    // Count requests before delivery, including failed sends.
    attempts.current.push(time)
    saveAttempts(attempts.current)
    setNow(time)
    setBlockedUntil(retryAt(attempts.current, time))
    busy.current = true
    setSending(true)
    setStatus('Sending your message…')
    try {
      await sendContact(input, formId)
      form.reset()
      setSuccess(true)
      setStatus('Message sent. Thanks for reaching out!')
    } catch (error) {
      if (error instanceof ContactDeliveryError) {
        setStatus(error.message)
        if (error.retryAfter) setBlockedUntil((current) => Math.max(current, Date.now() + error.retryAfter * 1000))
      } else {
        setStatus('Delivery could not be confirmed. Please wait before retrying or email me directly.')
      }
    } finally {
      busy.current = false
      setSending(false)
    }
  }

  return <form className="contact-form" onSubmit={submit} aria-label="Send a message" aria-busy={sending}>
    <h3>Send me a message</h3>
    <p className="contact-form-intro">Have an idea or an opportunity? I’d love to hear from you.</p>
    {!endpoint && <p className="contact-form-status" role="status">Sending messages is temporarily unavailable. You can email me directly using the link beside it.</p>}
    <fieldset disabled={sending}>
      <div className="contact-field-row">
        <div className="contact-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={CONTACT_LIMITS.name} placeholder="Your name"/></div>
        <div className="contact-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={CONTACT_LIMITS.email} placeholder="you@example.com"/></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={5} required minLength={CONTACT_LIMITS.minMessage} maxLength={CONTACT_LIMITS.message} placeholder="Tell me a little about what you have in mind." aria-describedby="contact-message-hint"/><p id="contact-message-hint" className="contact-field-hint">10–3,000 characters</p></div>
      <input type="hidden" name="subject" value="New message from Hans’s portfolio"/>
      <div hidden aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="_gotcha" tabIndex={-1} autoComplete="off"/></div>
      <button type="submit" className="contact-submit" disabled={!endpoint || remaining > 0 || sending}>
        {sending ? <LoaderCircle size={16} className="contact-spinner"/> : <Send size={16}/>}
        {sending ? 'Sending…' : remaining ? `Try again in ${remaining}s` : 'Send message'}
      </button>
    </fieldset>
    <p className={'contact-form-status' + (success ? ' is-success' : '')} role="status" aria-live="polite" aria-atomic="true">{status}</p>
    <p className="contact-privacy">Your name, email, and message are sent through Formspree to my inbox. Please leave out sensitive information.</p>
  </form>
}
