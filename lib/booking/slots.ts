// Free consultation slots: which times can be offered, in Vienna time.
// Pure functions (no I/O) so they can be checked without Google.

export type Busy = { start: number; end: number } // epoch ms, UTC
export type Day = { date: string; slots: string[] } // date 'YYYY-MM-DD', slots 'HH:MM' local

export const TZ = process.env.BOOKING_TIMEZONE || 'Europe/Vienna'

export const config = {
  // opening hours, local time, comma-separated ranges; a call must end inside its range
  hours: (process.env.BOOKING_HOURS || '09:00-12:00,13:30-16:30')
    .split(',')
    .map((r) => r.trim().split('-').map(toMin) as [number, number]),
  days: parseDays(process.env.BOOKING_DAYS || '1-5'), // 0 = Sunday … 6 = Saturday
  length: num(process.env.BOOKING_LENGTH, 30), // minutes
  step: num(process.env.BOOKING_STEP, 30), // minutes between possible start times
  buffer: num(process.env.BOOKING_BUFFER, 15), // free minutes kept before and after other meetings
  noticeHours: num(process.env.BOOKING_NOTICE_HOURS, 18), // earliest start, from now
  windowDays: num(process.env.BOOKING_WINDOW_DAYS, 42), // how far ahead people can book
}

function num(v: string | undefined, d: number) {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : d
}
function toMin(s: string) {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + (m || 0)
}
function parseDays(s: string) {
  const out = new Set<number>()
  for (const part of s.split(',')) {
    const [a, b] = part.split('-').map(Number)
    for (let d = a; d <= (Number.isFinite(b) ? b : a); d++) out.add(d % 7)
  }
  return out
}
export const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

// ---- time zones without a library: the zone's offset at an instant, and local wall time → UTC
function offsetMs(ts: number, tz: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(ts)
      .map((x) => [x.type, x.value]),
  )
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second)
  return asUtc - Math.floor(ts / 1000) * 1000
}
export function localToUtc(date: string, minutes: number, tz = TZ) {
  const [y, mo, d] = date.split('-').map(Number)
  const guess = Date.UTC(y, mo - 1, d, 0, minutes)
  let t = guess - offsetMs(guess, tz)
  const o2 = offsetMs(t, tz)
  if (guess - o2 !== t) t = guess - o2 // across a DST change
  return t
}
export function localDate(ts: number, tz = TZ) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(ts) // YYYY-MM-DD
}
function addDays(date: string, n: number) {
  const [y, mo, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, mo - 1, d + n)).toISOString().slice(0, 10)
}
function weekday(date: string) {
  const [y, mo, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, mo - 1, d)).getUTCDay()
}

/** The range of instants worth asking Google about. */
export function bookingWindow(now = Date.now()) {
  const first = localDate(now)
  const last = addDays(first, config.windowDays)
  return { first, last, from: localToUtc(first, 0), to: localToUtc(addDays(last, 1), 0) }
}

/** Every bookable slot between `first` and `last` (inclusive, local dates), given the busy times. */
export function slots(busy: Busy[], now = Date.now(), only?: string): Day[] {
  const { first, last } = bookingWindow(now)
  const earliest = now + config.noticeHours * 3600_000
  const pad = config.buffer * 60_000
  const out: Day[] = []
  for (let date = first; date <= last; date = addDays(date, 1)) {
    if (only && date !== only) continue
    if (!config.days.has(weekday(date))) continue
    const free: string[] = []
    for (const [open, close] of config.hours) {
      for (let m = open; m + config.length <= close; m += config.step) {
        const s = localToUtc(date, m)
        const e = s + config.length * 60_000
        if (s < earliest) continue
        if (busy.some((b) => b.start < e + pad && b.end > s - pad)) continue
        free.push(hhmm(m))
      }
    }
    if (free.length) out.push({ date, slots: free })
  }
  return out
}
