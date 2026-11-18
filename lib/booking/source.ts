// Where busy times come from: Google when configured; a fake calendar with BOOKING_MOCK=1 in development.
import * as google from './google'
import type { Busy } from './slots'

export const mock = process.env.NODE_ENV !== 'production' && process.env.BOOKING_MOCK === '1' && !google.configured
export const available = google.configured || mock

export async function busyBetween(from: number, to: number): Promise<Busy[]> {
  if (google.configured) return google.busy(from, to)
  if (!mock) throw new Error('booking not configured')
  // development only: a few meetings each weekday so the widget shows gaps
  const out: Busy[] = []
  for (let t = from; t < to; t += 86_400_000) {
    const day = Math.floor(t / 86_400_000)
    for (const h of [8, 10, 13, 14]) if ((day * 7 + h) % 3 === 0) out.push({ start: t + h * 3600_000, end: t + (h + 1) * 3600_000 })
  }
  return out
}
