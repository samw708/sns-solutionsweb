// POST /api/booking → books a free consultation: re-checks the slot against the calendar, creates the
// Google Calendar event with a Meet link, and Google sends the visitor the invitation.
import { NextResponse } from 'next/server'
import { config, localToUtc, slots, TZ } from '@/lib/booking/slots'
import { available, busyBetween, mock } from '@/lib/booking/source'
import * as google from '@/lib/booking/google'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// best-effort limit per server instance: a few bookings per address per hour
const recent = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) || []).filter((t) => now - t < 3600_000)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > 5
}

export async function POST(req: Request) {
  if (!available) return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  // honeypot: people never see this field
  if (str(body.website, 200)) return NextResponse.json({ ok: true })

  const date = str(body.date, 10)
  const time = str(body.time, 5)
  const name = str(body.name, 120)
  const email = str(body.email, 200)
  const company = str(body.company, 160)
  const topic = str(body.topic, 2000)
  const locale = body.locale === 'de' ? 'de' : 'en'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time) || !name || !EMAIL_RE.test(email) || body.consent !== true)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (limited(ip)) return NextResponse.json({ error: 'too-many' }, { status: 429 })

  const [h, m] = time.split(':').map(Number)
  const start = localToUtc(date, h * 60 + m)
  const end = start + config.length * 60_000
  try {
    // the slot must still be free now, not just when the page loaded
    const dayFrom = localToUtc(date, 0), dayTo = dayFrom + 36 * 3600_000
    const still = slots(await busyBetween(dayFrom, dayTo), Date.now(), date)[0]?.slots.includes(time)
    if (!still) return NextResponse.json({ error: 'taken' }, { status: 409 })
    if (mock) return NextResponse.json({ ok: true, start, end, timeZone: TZ, mock: true })
    await google.book({ start, end, name, email, company, topic, locale })
    return NextResponse.json({ ok: true, start, end, timeZone: TZ })
  } catch (e) {
    console.error('[booking] book', e)
    return NextResponse.json({ error: 'failed' }, { status: 502 })
  }
}
