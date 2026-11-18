'use client'
// The free consultation booking widget (design: canvas "Site-Contact" / "Site-Consulting", booking.py).
// Reads real free times from /api/booking/slots and books through /api/booking (Google Calendar + Meet).
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { type Locale, defaultLocale, localePath } from '@/i18n/config'
import s from './BookingWidget.module.css'

type Day = { date: string; slots: string[] }
const FALLBACK_EMAIL = 'office@sns-austria.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const T = {
  en: {
    title: 'Free consultation', meta: '30 minutes, online', prev: 'Previous month', next: 'Next month',
    wd: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], tz: 'Vienna time', pick: 'Pick a time', book: (d: string, t: string) => `Book ${d}, ${t}`,
    change: 'Change the time', sumNote: 'Vienna time, online. We send the Google Meet link by email.',
    name: 'Your name', email: 'Work email', company: 'Company', topic: 'What would you like to talk about?', optional: 'Optional',
    consent: ['I agree that SNS uses these details to arrange the call, as described in the ', 'privacy policy', '.'],
    confirm: 'Confirm booking', sending: 'Booking…', err: 'Add your name, a work email and your agreement, so we can send the invitation.',
    taken: 'That time has just been taken. Pick another one.', failed: 'The booking didn’t go through. Try again, or email us at ',
    loading: 'Loading free times…', none: 'No free times in the next weeks. Email us at ', down: 'Online booking is unavailable right now. Email us at ', write: 'Email us',
    booked: 'Booked', bookedText: (w: string, e: string) => `${w}, Vienna time. The invitation and the Google Meet link go to ${e}.`, again: 'Book another time',
    to: 'to', loc: 'en-GB',
  },
  de: {
    title: 'Kostenloses Erstgespräch', meta: '30 Minuten, online', prev: 'Vorheriger Monat', next: 'Nächster Monat',
    wd: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], tz: 'Wiener Zeit', pick: 'Uhrzeit wählen', book: (d: string, t: string) => `${d}, ${t} buchen`,
    change: 'Zeit ändern', sumNote: 'Wiener Zeit, online. Den Google-Meet-Link schicken wir per E-Mail.',
    name: 'Ihr Name', email: 'Geschäftliche E-Mail', company: 'Unternehmen', topic: 'Worüber möchten Sie sprechen?', optional: 'Optional',
    consent: ['Ich bin einverstanden, dass SNS diese Angaben zur Terminvereinbarung nutzt, wie in der ', 'Datenschutzerklärung', ' beschrieben.'],
    confirm: 'Termin bestätigen', sending: 'Wird gebucht…', err: 'Bitte Name, geschäftliche E-Mail und Einverständnis angeben, damit wir die Einladung senden können.',
    taken: 'Diese Zeit wurde gerade vergeben. Bitte wählen Sie eine andere.', failed: 'Die Buchung hat nicht geklappt. Bitte erneut versuchen oder schreiben Sie an ',
    loading: 'Freie Zeiten werden geladen…', none: 'In den nächsten Wochen sind keine Zeiten frei. Schreiben Sie uns an ', down: 'Die Online-Buchung ist gerade nicht verfügbar. Schreiben Sie uns an ', write: 'E-Mail schreiben',
    booked: 'Gebucht', bookedText: (w: string, e: string) => `${w}, Wiener Zeit. Die Einladung mit dem Google-Meet-Link geht an ${e}.`, again: 'Weiteren Termin buchen',
    to: 'bis', loc: 'de-AT',
  },
}

const parse = (d: string) => { const [y, m, dd] = d.split('-').map(Number); return new Date(y, m - 1, dd) }
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const plus = (t: string, min: number) => { const [h, m] = t.split(':').map(Number); const x = h * 60 + m + min; return `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}` }

export default function BookingWidget({ locale = defaultLocale }: { locale?: Locale }) {
  const t = T[locale]
  const [days, setDays] = useState<Day[] | null>(null)
  const [length, setLength] = useState(30)
  const [down, setDown] = useState(false)
  const [view, setView] = useState<Date | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [who, setWho] = useState({ name: '', email: '', company: '', topic: '', consent: false, website: '' })
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const load = () =>
    fetch('/api/booking/slots', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { days: Day[]; length: number }) => {
        setDays(j.days); setLength(j.length || 30)
        const first = j.days[0]?.date
        if (first) { setDay((d) => (d && j.days.some((x) => x.date === d) ? d : first)); setView((v) => v || new Date(parse(first).getFullYear(), parse(first).getMonth(), 1)) }
      })
      .catch(() => setDown(true))
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const open = useMemo(() => new Map((days || []).map((d) => [d.date, d.slots])), [days])
  const fmt = (d: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(t.loc, o).format(parse(d))
  const long = (d: string) => fmt(d, { weekday: 'long', day: 'numeric', month: 'long' })
  const short = (d: string) => fmt(d, { weekday: 'short', day: 'numeric', month: 'short' })
  const mail = <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>

  // focus follows the step, so keyboard and screen-reader users land on what changed
  useEffect(() => { if (step !== 1) root.current?.querySelector<HTMLElement>(step === 2 ? 'input' : 'h3')?.focus() }, [step])

  async function confirm() {
    if (!who.name.trim() || !EMAIL_RE.test(who.email.trim()) || !who.consent) { setMsg(t.err); return }
    setBusy(true); setMsg(null)
    try {
      const r = await fetch('/api/booking', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...who, date: day, time, locale }) })
      if (r.ok) { setStep(3); return }
      if (r.status === 409) { setStep(1); setTime(null); setMsg(t.taken); load(); return }
      setMsg('failed')
    } catch { setMsg('failed') } finally { setBusy(false) }
  }

  const head = (
    <div className={s.top}><strong>{t.title}</strong><span>{t.meta}</span></div>
  )

  // Not configured or Google unreachable: a short card that points to email, not an empty calendar-sized box.
  if (down)
    return (
      <div className={`${s.bk} ${s.short}`} ref={root}>{head}<p className={s.note}>{t.down}{mail}.</p>
        <a className={s.btn} href={`mailto:${FALLBACK_EMAIL}`} style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>{t.write}</a>
      </div>
    )
  if (!days || !view) return <div className={s.bk} ref={root} aria-busy="true">{head}<p className={s.note}>{days && !days.length ? <>{t.none}{mail}.</> : t.loading}</p></div>

  if (step === 3 && day && time)
    return (
      <div className={s.bk} ref={root}>{head}
        <div className={s.ok}>
          <span className={s.tick} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11.5 9.2 15.5 17 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <h3 tabIndex={-1}>{t.booked}</h3>
          <p>{t.bookedText(`${long(day)}, ${time} ${t.to} ${plus(time, length)}`, who.email.trim())}</p>
          <button type="button" className={s.link} onClick={() => { setStep(1); setTime(null); load() }}>{t.again}</button>
        </div>
      </div>
    )

  if (step === 2 && day && time)
    return (
      <div className={s.bk} ref={root}>{head}
        <button type="button" className={s.link} onClick={() => setStep(1)}>{t.change}</button>
        <div className={s.sum}><strong>{long(day)}, {time} {t.to} {plus(time, length)}</strong><span>{t.sumNote}</span></div>
        <form className={s.form} onSubmit={(e) => { e.preventDefault(); confirm() }} noValidate>
          <label>{t.name}<input name="name" autoComplete="name" value={who.name} onChange={(e) => setWho({ ...who, name: e.target.value })} required /></label>
          <label>{t.email}<input name="email" type="email" autoComplete="email" value={who.email} onChange={(e) => setWho({ ...who, email: e.target.value })} required /></label>
          <label>{t.company}<input name="company" autoComplete="organization" value={who.company} onChange={(e) => setWho({ ...who, company: e.target.value })} /></label>
          <label>{t.topic} <span className={s.opt}>{t.optional}</span><textarea name="topic" value={who.topic} onChange={(e) => setWho({ ...who, topic: e.target.value })} /></label>
          <label className={s.hp} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={who.website} onChange={(e) => setWho({ ...who, website: e.target.value })} /></label>
          <label className={s.check}><input type="checkbox" checked={who.consent} onChange={(e) => setWho({ ...who, consent: e.target.checked })} />
            <span>{t.consent[0]}<Link href={localePath(locale, '/legal/privacy')}>{t.consent[1]}</Link>{t.consent[2]}</span></label>
          {msg && <p className={s.err} role="alert">{msg === 'failed' ? <>{t.failed}{mail}.</> : msg}</p>}
          <button type="submit" className={s.btn} disabled={busy}>{busy ? t.sending : t.confirm}</button>
        </form>
      </div>
    )

  // step 1: the month, the day's times
  const y = view.getFullYear(), m = view.getMonth()
  const firstOpen = parse(days[0]?.date || iso(new Date())), lastOpen = parse(days[days.length - 1]?.date || iso(new Date()))
  const canPrev = new Date(y, m, 1) > new Date(firstOpen.getFullYear(), firstOpen.getMonth(), 1)
  const canNext = new Date(y, m, 1) < new Date(lastOpen.getFullYear(), lastOpen.getMonth(), 1)
  const lead = (new Date(y, m, 1).getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate(), today = iso(new Date())
  const chev = (l: boolean) => <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d={l ? 'M9 2.5 4.5 7 9 11.5' : 'M5 2.5 9.5 7 5 11.5'} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  const times = day ? open.get(day) || [] : []
  return (
    <div className={s.bk} ref={root} role="group" aria-label={t.title}>{head}
      <div className={s.mh}>
        <button type="button" className={s.nav} aria-label={t.prev} disabled={!canPrev} onClick={() => setView(new Date(y, m - 1, 1))}>{chev(true)}</button>
        <b aria-live="polite">{new Intl.DateTimeFormat(t.loc, { month: 'long', year: 'numeric' }).format(view)}</b>
        <button type="button" className={s.nav} aria-label={t.next} disabled={!canNext} onClick={() => setView(new Date(y, m + 1, 1))}>{chev(false)}</button>
      </div>
      <div className={s.cal}>
        {t.wd.map((w) => <span key={w} className={s.wd}>{w}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={'l' + i} />)}
        {Array.from({ length: n }, (_, i) => {
          const d = iso(new Date(y, m, i + 1)), ok = open.has(d), on = d === day
          return (
            <button key={d} type="button" className={[s.d, ok && s.op, on && s.on, d === today && s.td].filter(Boolean).join(' ')}
              disabled={!ok} aria-pressed={ok ? on : undefined} aria-label={ok ? long(d) : undefined} tabIndex={ok ? 0 : -1}
              onClick={() => { setDay(d); setTime(null); setMsg(null) }}>{i + 1}</button>
          )
        })}
      </div>
      {day && (
        <>
          <div className={s.sh}><strong>{long(day)}</strong><span>{t.tz}</span></div>
          <div className={s.sl}>
            {times.map((x) => <button key={x} type="button" className={[s.s, x === time && s.on].filter(Boolean).join(' ')} aria-pressed={x === time} onClick={() => setTime(x)}>{x}</button>)}
          </div>
        </>
      )}
      {msg && <p className={s.err} role="alert">{msg}</p>}
      <button type="button" className={s.btn} disabled={!time} onClick={() => { setMsg(null); setStep(2) }}>{time && day ? t.book(short(day), time) : t.pick}</button>
    </div>
  )
}
