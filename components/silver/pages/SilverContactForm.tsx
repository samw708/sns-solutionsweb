'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import { type Locale, localePath } from '@/i18n/config'

/**
 * The contact form in the silver design (canvas Site-Contact), with the sending logic of components/ContactForm.tsx:
 * EmailJS when its three NEXT_PUBLIC_ keys are set, a prefilled email otherwise, a honeypot, and the same validation.
 * Sends the same template fields as before (name, email, phone, service, message, form_type); the optional company
 * goes at the top of the message so the existing EmailJS template needs no change.
 */

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const FALLBACK_EMAIL = 'office@sns-austria.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const T = {
  en: {
    title: 'Write to us',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    optional: '(optional)',
    namePh: 'Jane Doe',
    emailPh: 'jane@company.com',
    companyPh: 'Company name',
    topic: 'What is it about?',
    topics: [
      'Real estate (Immvela)',
      'QFUtool',
      'HVAC & Refrigeration',
      'Custom software',
      'AI & automation',
      'AI & IT consulting',
      'Something else',
    ],
    message: 'Message',
    messagePh: 'What are you trying to build or automate? What’s slowing you down?',
    pastJob:
      'A past job we’d like you to look at: which pack it was, which selection software produced the printout, and what your engineers drew from it.',
    consent: [
      'I agree that my details may be used to reply to my enquiry, as described in the ',
      'privacy policy',
      '.',
    ],
    submit: 'Send enquiry',
    sending: 'Sending…',
    doneH: 'Message sent.',
    doneP:
      'Thanks for writing. We’ll reply to the email you gave us, usually within one or two business days.',
    another: 'Send another message',
    companyLine: 'Company',
    err: {
      name: 'Please enter your name.',
      email: 'Please enter your email.',
      emailInvalid: 'That email doesn’t look right.',
      topic: 'Please choose what it is about.',
      message: 'Tell us a little more, 10 characters or so.',
      consent: 'Please agree before sending.',
      send: 'Something went wrong sending your message. Please try again, or email us directly at',
    },
  },
  de: {
    title: 'Schreiben Sie uns',
    name: 'Name',
    email: 'E-Mail',
    company: 'Unternehmen',
    optional: '(optional)',
    namePh: 'Max Mustermann',
    emailPh: 'max@firma.com',
    companyPh: 'Name des Unternehmens',
    topic: 'Worum geht es?',
    topics: [
      'Immobilien (Immvela)',
      'QFUtool',
      'HLK & Kältetechnik',
      'Individuelle Software',
      'KI & Automatisierung',
      'KI- & IT-Beratung',
      'Etwas anderes',
    ],
    message: 'Nachricht',
    messagePh: 'Was möchten Sie bauen oder automatisieren? Was bremst Sie?',
    pastJob:
      'Ein früherer Auftrag, den Sie sich ansehen sollen: welche Anlage es war, welche Auslegungssoftware den Ausdruck erstellt hat und was Ihre Konstrukteure daraus gezeichnet haben.',
    consent: [
      'Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verwendet werden, wie in der ',
      'Datenschutzerklärung',
      ' beschrieben.',
    ],
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    doneH: 'Nachricht gesendet.',
    doneP:
      'Danke für Ihre Nachricht. Wir antworten an die angegebene E-Mail-Adresse, meist innerhalb von ein bis zwei Werktagen.',
    another: 'Weitere Nachricht senden',
    companyLine: 'Unternehmen',
    err: {
      name: 'Bitte geben Sie Ihren Namen ein.',
      email: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Diese E-Mail-Adresse sieht nicht richtig aus.',
      topic: 'Bitte wählen Sie, worum es geht.',
      message: 'Bitte etwas ausführlicher, mindestens 10 Zeichen.',
      consent: 'Bitte stimmen Sie vor dem Senden zu.',
      send: 'Beim Senden ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an',
    },
  },
}

/** Values older links send as ?service=… (the previous form's options), mapped to the topic index. */
const LEGACY: Record<string, number> = {
  'immvela · real estate': 0,
  'immvela · immobilien': 0,
  qfutool: 1,
  'hvac & refrigeration': 2,
  'hlk & kältetechnik': 2,
  'custom software': 3,
  'individuelle software': 3,
  'ai & automation': 4,
  'ki & automatisierung': 4,
  'ai & it consulting': 5,
  'ki- & it-beratung': 5,
  'something else': 6,
  'etwas anderes': 6,
}

type Field = 'name' | 'email' | 'topic' | 'message' | 'consent'
type Errors = Partial<Record<Field, string>>

export default function SilverContactForm({ locale }: { locale: Locale }) {
  const t = T[locale]
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [topic, setTopic] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const done = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'success') done.current?.focus()
  }, [status])

  // Arriving from "Send us a past job" (?topic=pastjob), an HVAC link (?topic=hvac) or an older ?service= link.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const tp = q.get('topic')
    if (tp === 'hvac' || tp === 'pastjob') setTopic(2)
    if (tp === 'pastjob') setMessage((m) => m || t.pastJob)
    const svc = q.get('service')?.toLowerCase()
    if (svc && svc in LEGACY) setTopic(LEGACY[svc])
  }, [t.pastJob])

  const clear = (f: Field) => setErrors((e) => (e[f] ? { ...e, [f]: undefined } : e))

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const d = new FormData(form)
    if ((d.get('website') as string)?.trim()) {
      setStatus('success') // honeypot: drop bots quietly
      return
    }
    const name = (d.get('name') as string).trim()
    const email = (d.get('email') as string).trim()
    const company = (d.get('company_name') as string).trim()
    const msg = message.trim()
    const e: Errors = {}
    if (!name) e.name = t.err.name
    if (!email) e.email = t.err.email
    else if (!EMAIL_RE.test(email)) e.email = t.err.emailInvalid
    if (topic === null) e.topic = t.err.topic
    if (msg.length < 10) e.message = t.err.message
    if (!d.get('consent')) e.consent = t.err.consent
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() =>
        (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus()
      )
      return
    }
    const service = t.topics[topic as number]
    const body = (company ? `${t.companyLine}: ${company}\n\n` : '') + msg
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const subject = encodeURIComponent(`New inquiry: ${service}`)
      const text = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${body}`
      )
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${text}`
      return
    }
    try {
      setStatus('sending')
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { form_type: 'contact', name, email, phone: '', service, message: body },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('success')
      form.reset()
      setTopic(null)
      setMessage('')
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  const card: React.CSSProperties = {
    borderRadius: 32,
    padding: 'clamp(22px,3vw,40px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  }

  if (status === 'success')
    return (
      <div
        ref={done}
        role="status"
        tabIndex={-1}
        className="edge"
        style={{ ...card, outline: 'none', minHeight: 360, justifyContent: 'center' }}
      >
        <h2 className="k3">{t.doneH}</h2>
        <p className="mut body">{t.doneP}</p>
        <button
          type="button"
          className="lnk"
          onClick={() => setStatus('idle')}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            color: 'var(--tx)',
          }}
        >
          {t.another}
        </button>
      </div>
    )

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-err`} className="ferr">
        {errors[f]}
      </p>
    ) : null
  const aria = (f: Field) => ({
    'aria-invalid': errors[f] ? ('true' as const) : undefined,
    'aria-describedby': errors[f] ? `${f}-err` : undefined,
  })

  return (
    <form className="edge" style={card} onSubmit={submit} noValidate aria-labelledby="cf-title">
      <h2 id="cf-title" className="k3">
        {t.title}
      </h2>
      {status === 'error' && (
        <p role="alert" className="ferr" style={{ fontSize: 15 }}>
          {t.err.send} <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
        </p>
      )}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="g2">
        <label className="field">
          {t.name}
          <input
            className="box"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePh}
            aria-required="true"
            onInput={() => clear('name')}
            {...aria('name')}
          />
          {err('name')}
        </label>
        <label className="field">
          {t.email}
          <input
            className="box"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPh}
            aria-required="true"
            onInput={() => clear('email')}
            {...aria('email')}
          />
          {err('email')}
        </label>
      </div>
      <label className="field">
        <span>
          {t.company}{' '}
          <span className="mut" style={{ fontWeight: 400 }}>
            {t.optional}
          </span>
        </span>
        <input
          className="box"
          name="company_name"
          type="text"
          autoComplete="organization"
          placeholder={t.companyPh}
        />
      </label>
      <fieldset
        className="field"
        style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}
        aria-describedby={errors.topic ? 'topic-err' : undefined}
      >
        <legend style={{ padding: 0, marginBottom: 8 }}>{t.topic}</legend>
        <div className="chips2">
          {t.topics.map((x, i) => (
            <label key={x}>
              <input
                type="radio"
                name="topic"
                value={x}
                checked={topic === i}
                onChange={() => {
                  setTopic(i)
                  clear('topic')
                }}
                aria-invalid={errors.topic && i === 0 ? 'true' : undefined}
              />
              <span>{x}</span>
            </label>
          ))}
        </div>
        {err('topic')}
      </fieldset>
      <label className="field">
        {t.message}
        <textarea
          className="box"
          name="message"
          rows={5}
          placeholder={t.messagePh}
          aria-required="true"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clear('message')
          }}
          {...aria('message')}
        />
        {err('message')}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label
          className="mut ccheck"
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            fontSize: 14.5,
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            name="consent"
            onChange={() => clear('consent')}
            {...aria('consent')}
          />
          <span>
            {t.consent[0]}
            <Link href={localePath(locale, '/legal/privacy')}>{t.consent[1]}</Link>
            {t.consent[2]}
          </span>
        </label>
        {err('consent')}
      </div>
      <button
        type="submit"
        className="btn dark"
        style={{ alignSelf: 'flex-start' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t.sending : t.submit}
      </button>
    </form>
  )
}
