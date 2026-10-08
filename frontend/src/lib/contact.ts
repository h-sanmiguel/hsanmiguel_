export const CONTACT_LIMITS = { name: 80, email: 254, message: 3000, minMessage: 10 } as const
export const CONTACT_COOLDOWN_MS = 60_000
export const CONTACT_WINDOW_MS = 60 * 60_000
export const CONTACT_WINDOW_LIMIT = 5
const STORAGE_KEY = 'portfolio.contact.attempts.v1'

export interface ContactMessage { name: string; email: string; message: string }

export function formspreeEndpoint(formId: string | undefined): string | null {
  const id = formId?.trim() ?? ''
  return /^[a-zA-Z0-9]{4,64}$/.test(id) ? `https://formspree.io/f/${id}` : null
}

function hasControlCharacters(value: string, multiline = false): boolean {
  return [...value].some((character) => {
    const code = character.charCodeAt(0)
    return (code < 32 || code === 127) && !(multiline && [9, 10, 13].includes(code))
  })
}

export function validateContact(input: ContactMessage): string | null {
  const { name, email, message } = input
  if (!name.trim() || name.trim().length > CONTACT_LIMITS.name || hasControlCharacters(name)) {
    return 'Enter your name using up to 80 characters.'
  }
  if (email.length > CONTACT_LIMITS.email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || hasControlCharacters(email)) {
    return 'Enter a valid email address.'
  }
  if (message.trim().length < CONTACT_LIMITS.minMessage || message.length > CONTACT_LIMITS.message || hasControlCharacters(message, true)) {
    return 'Write a message between 10 and 3,000 characters.'
  }
  return null
}

export function recentAttempts(value: unknown, now: number): number[] {
  if (!Array.isArray(value)) return []
  return value.filter((time): time is number => typeof time === 'number' && Number.isFinite(time) && time > now - CONTACT_WINDOW_MS && time <= now)
    .sort((a, b) => a - b)
}

export function retryAt(attempts: number[], now: number): number {
  const active = recentAttempts(attempts, now)
  const cooldown = active.length ? active[active.length - 1] + CONTACT_COOLDOWN_MS : 0
  const hourly = active.length >= CONTACT_WINDOW_LIMIT ? active[active.length - CONTACT_WINDOW_LIMIT] + CONTACT_WINDOW_MS : 0
  return Math.max(cooldown, hourly)
}

export function readAttempts(now = Date.now()): number[] {
  try { return recentAttempts(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'), now) }
  catch { return [] }
}

export function saveAttempts(attempts: number[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts)) }
  catch { /* Private browsing can disable storage; keep the in-memory cooldown. */ }
}
