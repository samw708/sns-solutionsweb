'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import { QFUTOOL_URL, contactHref, href, immvelaHref } from '@/lib/silver/links'
import Video from '../Video'

/**
 * "Three products, built in-house": Pack CAD, Immvela and QFUtool as tabs (canvas gen_silver.showcase). The tabs
 * rotate every 7 seconds until the visitor touches one; with reduced motion they don't rotate.
 */

const T = {
  en: {
    heading: 'Three products, built in-house.',
    line: 'One for refrigeration pack manufacturers, one for estate agents, one for any team that sends quotes.',
    tabs: 'Our products',
    pack: {
      pill: 'Current speciality: CO₂ packs',
      line: 'For refrigeration pack manufacturers. Pack CAD turns the selection from your manufacturer’s tool into the pack in 3D and 2D, inside your engineering rules.',
      ticks: ['The 3D model and the 2D drawings from one selection', 'Changes in plain words, checked against your rules', 'Flags what isn’t possible, and says why'],
      cta: 'See Pack CAD',
      past: 'Send us a past job',
      film: 'A CO₂ booster pack rendered from the Pack CAD model, turning slowly.',
    },
    immvela: {
      pill: 'Closed beta',
      line: 'Your personal real estate AI assistant, built for estate agents in Austria, Germany and Switzerland.',
      ticks: ['Lives at immvela.com, in its own colours', 'In German, for the DACH market', 'Join the waitlist for the beta'],
      cta: 'Visit immvela.com ↗',
      film: 'Immvela’s helix in green metal, turning slowly.',
    },
    qfu: {
      pill: '14 days free',
      line: 'For sales teams in any industry. QFUtool follows up on every quote in your name, during business hours, and hands you the customers who reply.',
      ticks: ['Follow-ups sent in your name', 'Stops the moment a customer replies', 'Works for any team that sends quotes'],
      cta: 'Visit qfutool.com ↗',
      example: 'Example',
      sent: 'Sent: Thursday 10:00',
      step: 'Follow-up 2',
      hello: 'Hello Mr Huber,',
      mail: 'just checking in on the €1,250 quote we sent on Monday. Happy to call if anything is unclear.',
      reply: 'Sounds good. Can we talk on Friday?',
      stopped: 'Reply received, follow-ups stopped',
    },
  },
  de: {
    heading: 'Drei Produkte, selbst entwickelt.',
    line: 'Eines für Hersteller von Kälteverbundanlagen, eines für Immobilienmakler, eines für jedes Team, das Angebote verschickt.',
    tabs: 'Unsere Produkte',
    pack: {
      pill: 'Aktueller Schwerpunkt: CO₂-Verbundanlagen',
      line: 'Für Hersteller von Kälteverbundanlagen. Pack CAD macht aus der Auslegung im Tool Ihres Herstellers die Anlage in 3D und 2D, innerhalb Ihrer Konstruktionsregeln.',
      ticks: ['3D-Modell und 2D-Zeichnungen aus einer Auslegung', 'Änderungen in einfachen Worten, geprüft gegen Ihre Regeln', 'Zeigt, was nicht geht, und sagt warum'],
      cta: 'Pack CAD ansehen',
      past: 'Früheres Projekt schicken',
      film: 'Eine CO₂-Booster-Verbundanlage aus dem Pack-CAD-Modell, langsam drehend.',
    },
    immvela: {
      pill: 'Geschlossene Beta',
      line: 'Ihre persönliche KI-Assistenz für Immobilien, gebaut für Makler in Österreich, Deutschland und der Schweiz.',
      ticks: ['Zu Hause auf immvela.com, in eigenen Farben', 'Auf Deutsch, für den DACH-Markt', 'Auf die Warteliste für die Beta'],
      cta: 'immvela.com besuchen ↗',
      film: 'Die Helix von Immvela in grünem Metall, langsam drehend.',
    },
    qfu: {
      pill: '14 Tage kostenlos',
      line: 'Für Vertriebsteams jeder Branche. QFUtool fasst bei jedem Angebot in Ihrem Namen nach, während der Geschäftszeiten, und übergibt Ihnen die Kunden, die antworten.',
      ticks: ['Nachfassen in Ihrem Namen', 'Stoppt, sobald ein Kunde antwortet', 'Für jedes Team, das Angebote verschickt'],
      cta: 'qfutool.com besuchen ↗',
      example: 'Beispiel',
      sent: 'Gesendet: Donnerstag 10:00',
      step: 'Erinnerung 2',
      hello: 'Guten Tag Herr Huber,',
      mail: 'ich wollte kurz wegen des Angebots über 1.250 € von Montag nachfragen. Gerne rufe ich an, falls etwas unklar ist.',
      reply: 'Klingt gut. Können wir am Freitag sprechen?',
      stopped: 'Antwort erhalten, Nachfassen gestoppt',
    },
  },
}

export default function Showcase({ locale, level = 'h2' }: { locale: Locale; level?: 'h1' | 'h2' }) {
  const t = T[locale]
  const [n, setN] = useState(0)
  const [manual, setManual] = useState(false)
  const manualRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setManual(true)
      return
    }
    const iv = setInterval(() => {
      if (!manualRef.current) setN((x) => (x + 1) % 3)
    }, 7000)
    return () => clearInterval(iv)
  }, [])

  const stop = () => {
    manualRef.current = true
    setManual(true)
  }
  const H = level

  const tabs: [string, string][] = [
    ['Pack CAD', 'var(--tx)'],
    ['Immvela', '#2FA67A'],
    ['QFUtool', '#E65D3F'],
  ]

  const stage = (k: number, pc: string, pill: string, name: string, line: string, ticks: string[], cta: React.ReactNode, vis: React.ReactNode) => (
    <div key={name} className={`stage edge s${k + 1}`} style={{ '--pc': pc }} role="tabpanel" id={`sc-p${k + 1}`} aria-labelledby={`sc${k + 1}-l`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
        <span className="pill">{pill}</span>
        <h3 style={{ fontSize: 'clamp(34px,3.4vw,52px)', lineHeight: 1, display: 'flex', gap: 14, alignItems: 'center' }}>
          <i style={{ width: 14, height: 14, borderRadius: '50%', background: pc }} />
          {name}
        </h3>
        <p className="mut" style={{ fontSize: 18, lineHeight: 1.55 }}>
          {line}
        </p>
        <ul className="ticks">
          {ticks.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 6 }}>{cta}</div>
      </div>
      {vis}
    </div>
  )

  return (
    <section id="products" className={`showcase${manual ? ' manual' : ''}`} style={{ background: 'var(--plain)' }}>
      <div className="w" style={{ paddingTop: 'min(12vh,108px)', paddingBottom: 'min(12vh,108px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <H style={{ fontSize: 'clamp(34px,3.8vw,56px)', lineHeight: 1.05 }}>{t.heading}</H>
          <p className="mut" style={{ fontSize: 18, lineHeight: 1.55, maxWidth: '34em' }}>
            {t.line}
          </p>
        </div>
        {tabs.map((_, k) => (
          <input
            key={k}
            className="vh"
            type="radio"
            name="sc"
            id={`sc${k + 1}`}
            checked={n === k}
            onChange={() => setN(k)}
            onKeyDown={stop}
            onPointerDown={stop}
            aria-controls={`sc-p${k + 1}`}
          />
        ))}
        <div className="tabs" aria-label={t.tabs}>
          {tabs.map(([label, dot], k) => (
            <label key={label} htmlFor={`sc${k + 1}`} id={`sc${k + 1}-l`} onPointerDown={stop}>
              <i style={{ background: dot }} />
              {label}
            </label>
          ))}
        </div>
        <div className="stages">
          {stage(
            0,
            '#9AA3AD',
            t.pack.pill,
            'Pack CAD',
            t.pack.line,
            t.pack.ticks,
            <>
              <Link className="btn dark" href={href(locale, 'pack')}>
                {t.pack.cta}
              </Link>
              <Link className="lnk" href={contactHref(locale, 'pastjob')} style={{ alignSelf: 'center' }}>
                {t.pack.past}
              </Link>
            </>,
            <div className="media">
              <Video src="/sns/site/pack-porcelain.mp4" poster="/sns/site/pack-porcelain-poster.jpg" label={t.pack.film} className="" />
            </div>,
          )}
          {stage(
            1,
            '#2FA67A',
            t.immvela.pill,
            'Immvela',
            t.immvela.line,
            t.immvela.ticks,
            <a className="btn" href={immvelaHref(locale)} target="_blank" rel="noopener" style={{ background: '#1F7A5A', color: '#FFFFFF' }}>
              {t.immvela.cta}
            </a>,
            <div className="media">
              <Video src="/sns/site/helix-porcelain.mp4" poster="/sns/site/helix-porcelain-poster.jpg" label={t.immvela.film} className="" style={{ transform: 'scale(1.18)' }} />
            </div>,
          )}
          {stage(
            2,
            '#E65D3F',
            t.qfu.pill,
            'QFUtool',
            t.qfu.line,
            t.qfu.ticks,
            <a className="btn" href={QFUTOOL_URL} target="_blank" rel="noopener" style={{ background: '#E65D3F', color: '#140806' }}>
              {t.qfu.cta}
            </a>,
            <div className="media" style={{ display: 'grid', placeItems: 'center', padding: 24, background: 'linear-gradient(160deg,var(--card2),var(--plain))' }}>
              <div className="edge" style={{ borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440, margin: 'auto' }}>
                <div className="mut" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
                  <span>{t.qfu.sent}</span>
                  <span style={{ display: 'inline-flex', gap: 10 }}>
                    <span style={{ color: '#C24A2E', fontWeight: 600 }}>{t.qfu.step}</span>
                    <span className="mono" style={{ color: 'var(--mut2)' }}>
                      {t.qfu.example}
                    </span>
                  </span>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.55 }}>
                  <strong>{t.qfu.hello}</strong>
                  <br />
                  {t.qfu.mail}
                </div>
                <span className="bubble" style={{ alignSelf: 'flex-start', background: 'var(--qchip)' }}>
                  {t.qfu.reply}
                </span>
                <span className="mono" style={{ color: 'var(--mut2)' }}>
                  {t.qfu.stopped}
                </span>
              </div>
            </div>,
          )}
        </div>
      </div>
    </section>
  )
}
