// GET /api/booking/slots → the free consultation times for the next weeks, in Vienna time.
import { NextResponse } from 'next/server'
import { bookingWindow, config, slots, TZ } from '@/lib/booking/slots'
import { available, busyBetween } from '@/lib/booking/source'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!available) return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  try {
    const w = bookingWindow()
    const days = slots(await busyBetween(w.from, w.to))
    return NextResponse.json(
      { timeZone: TZ, length: config.length, days },
      { headers: { 'cache-control': 'private, max-age=60' } },
    )
  } catch (e) {
    console.error('[booking] slots', e)
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
