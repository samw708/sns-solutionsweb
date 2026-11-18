// Google Calendar for the consultation booking, through a Workspace service account with domain-wide
// delegation: it acts as BOOKING_ORGANIZER (e.g. office@sns-austria.com), reads free/busy for
// BOOKING_BUSY_CALENDARS and creates the event with a Google Meet link; Google emails the invitation.
// Server only (imported from route handlers): the private key never reaches the browser.
import { createSign, randomUUID } from 'node:crypto'
import type { Busy } from './slots'

const SA_EMAIL = process.env.GOOGLE_SA_EMAIL
const SA_KEY = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, '\n')
export const ORGANIZER = process.env.BOOKING_ORGANIZER || ''
const BUSY_CALENDARS = (process.env.BOOKING_BUSY_CALENDARS || ORGANIZER).split(',').map((s) => s.trim()).filter(Boolean)
const SCOPES = 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.freebusy'

export const configured = Boolean(SA_EMAIL && SA_KEY && ORGANIZER)

let cached: { token: string; until: number } | null = null

const b64url = (s: string | Buffer) => Buffer.from(s).toString('base64url')

async function token() {
  if (cached && cached.until > Date.now() + 60_000) return cached.token
  if (!configured) throw new Error('Google booking is not configured')
  const iat = Math.floor(Date.now() / 1000)
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const body = b64url(JSON.stringify({ iss: SA_EMAIL, sub: ORGANIZER, scope: SCOPES, aud: 'https://oauth2.googleapis.com/token', iat, exp: iat + 3600 }))
  const sig = createSign('RSA-SHA256').update(`${head}.${body}`).sign(SA_KEY!)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${body}.${b64url(sig)}` }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Google token ${res.status}: ${await res.text()}`)
  const j = (await res.json()) as { access_token: string; expires_in: number }
  cached = { token: j.access_token, until: Date.now() + j.expires_in * 1000 }
  return j.access_token
}

async function call<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${await token()}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Google ${new URL(url).pathname} ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

/** Busy times across every calendar that should block a slot. */
export async function busy(from: number, to: number): Promise<Busy[]> {
  type R = { calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: { reason: string }[] }> }
  const r = await call<R>('https://www.googleapis.com/calendar/v3/freeBusy', {
    timeMin: new Date(from).toISOString(),
    timeMax: new Date(to).toISOString(),
    items: BUSY_CALENDARS.map((id) => ({ id })),
  })
  const out: Busy[] = []
  for (const [id, c] of Object.entries(r.calendars)) {
    // a calendar we can't read must not look free
    if (c.errors?.length) throw new Error(`free/busy unavailable for ${id}: ${c.errors.map((e) => e.reason).join(', ')}`)
    for (const b of c.busy || []) out.push({ start: Date.parse(b.start), end: Date.parse(b.end) })
  }
  return out
}

export type Booking = { start: number; end: number; name: string; email: string; company?: string; topic?: string; locale: 'en' | 'de' }

/** Creates the event on the organizer's calendar with a Meet link and invites the visitor. */
export async function book(b: Booking) {
  const de = b.locale === 'de'
  const lines = [
    `${de ? 'Gebucht über die Website von' : 'Booked on the website by'} ${b.name}${b.company ? `, ${b.company}` : ''} <${b.email}>`,
    b.topic ? `\n${de ? 'Thema' : 'Topic'}:\n${b.topic}` : '',
  ]
  const ev = await call<{ id: string; htmlLink: string; hangoutLink?: string }>(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(ORGANIZER)}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      summary: `${de ? 'SNS Erstgespräch' : 'SNS consultation'}: ${b.name}${b.company ? ` (${b.company})` : ''}`,
      description: lines.join('\n'),
      start: { dateTime: new Date(b.start).toISOString() },
      end: { dateTime: new Date(b.end).toISOString() },
      attendees: [{ email: b.email, displayName: b.name }],
      conferenceData: { createRequest: { requestId: randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: true },
      guestsCanInviteOthers: true,
    },
  )
  return ev
}
