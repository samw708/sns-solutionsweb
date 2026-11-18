import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getHvac } from '@/lib/hvac'
import { contactHref, href } from '@/lib/silver/links'
import { localePath } from '@/i18n/config'
import { Btns, Crumb, FilmPair, Lights } from '../ui'
import Mock from './Mock'

/**
 * /hvac — the HVAC & Refrigeration page (canvas board HVAC-B). The tool index switches panels with radio inputs
 * and CSS only (app/silver.css: #t1:checked ~ .tools …), so it works without JavaScript.
 */
const W_PAD = 'min(12vh,112px)'
/** The canvas kept the side padding on these two blocks at every width (the others drop it above 1300 px). */
const SIDE = 'clamp(20px,3.5vw,56px)'

export default function Hub({ locale }: { locale: Locale }) {
  const c = getHvac(locale)
  const t = c.hub
  const book = href(locale, 'consulting', '#book')

  return (
    <>
      {/* Hero and the chain */}
      <section className="pearl">
        <Lights />
        <div className="w hv-hero" style={{ paddingTop: 'clamp(56px,9vh,96px)', paddingBottom: 'clamp(56px,8vh,88px)', paddingLeft: SIDE, paddingRight: SIDE }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, position: 'relative', zIndex: 2 }}>
            <Crumb items={[{ label: c.crumb.sns, href: href(locale, 'home') }, { label: c.crumb.industries }]} />
            <h1>{t.h1}</h1>
            <p className="mut" style={{ fontSize: 'clamp(17px,1.5vw,21px)', lineHeight: 1.5, maxWidth: '32em', margin: 0 }}>
              {t.intro}
            </p>
            <Btns
              items={[
                { label: c.bookCall, href: book },
                { label: t.seeTools, href: '#tools', kind: 'glass' },
              ]}
            />
          </div>
          <div className="chain" aria-label={t.flow.label}>
            <span className="rail" />
            <span className="run" aria-hidden="true" />
            <ol>
              {t.flow.steps.map((s, i) => (
                <li key={s} style={{ '--i': i }}>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mut">{t.flow.text}</p>
          </div>
        </div>
      </section>

      {/* The tools: an index on the left, one panel on the right */}
      <section id="tools" style={{ background: 'var(--plain)' }}>
        <div className="w" style={{ paddingTop: W_PAD, paddingBottom: W_PAD, display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '40em' }}>
            <h2 style={{ fontSize: 'clamp(34px,3.8vw,56px)', lineHeight: 1.04, margin: 0 }}>{t.toolsHeading}</h2>
            <p className="mut" style={{ fontSize: 18, lineHeight: 1.55, margin: 0 }}>
              {t.toolsSub}
            </p>
          </div>
          {t.tools.map((tool, i) => (
            <input key={tool.id} className="vh" type="radio" name="tool" id={`t${i + 1}`} defaultChecked={i === 0} aria-label={tool.name} />
          ))}
          <div className="tools">
            <div className="rows" role="presentation">
              {t.tools.map((tool, i) => (
                <label key={tool.id} htmlFor={`t${i + 1}`}>
                  <strong>{tool.name}</strong>
                  <span>{tool.headline}</span>
                </label>
              ))}
            </div>
            <div className="panel">
              {t.tools.map((tool, i) => (
                <div key={tool.id} className={`tp p${i + 1}`}>
                  {tool.film ? (
                    <div className="vis" style={{ aspectRatio: 'auto', display: 'block', padding: 0, background: tool.id === 'cad' ? '#F9F9FA' : '#F3F4F6' }}>
                      {/* 16:9 on desktop, the 4:5 cut on phones; German pages get the German renders (captions are in the film) */}
                      <FilmPair name={tool.film.name} label={tool.film.label} de={locale === 'de'} />
                    </div>
                  ) : (
                    tool.mock && (
                      <div className="vis">
                        <Mock mock={tool.mock} example={c.example} />
                      </div>
                    )
                  )}
                  <div className="txt">
                    {tool.status && <span className="status">{tool.status}</span>}
                    <h3>{tool.headline}</h3>
                    <p className="mut" style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}>
                      {tool.line}
                    </p>
                    <ul>
                      {tool.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 8 }}>
                      <Link className="btn dark" href={tool.href ? localePath(locale, tool.href) : contactHref(locale, 'hvac')}>
                        {tool.cta}
                      </Link>
                      {tool.pastJob && (
                        <Link className="lnk" href={contactHref(locale, 'pastjob')} style={{ alignSelf: 'center' }}>
                          {tool.pastJob}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI and the metrics */}
      <section style={{ background: 'var(--band)' }}>
        <div
          className="w g2"
          style={{ paddingTop: W_PAD, paddingBottom: W_PAD, display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.2fr)', gap: 'clamp(32px,6vw,96px)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignSelf: 'start', position: 'sticky', top: 110 }}>
            <h2 style={{ fontSize: 'clamp(32px,3.4vw,50px)', lineHeight: 1.05, margin: 0 }}>{t.ai.heading}</h2>
            <p className="mut" style={{ fontSize: 18, lineHeight: 1.6, margin: 0 }}>
              {t.ai.body}
            </p>
            <div className="method" style={{ marginTop: 18 }} aria-label={t.metrics.methodHeading}>
              {t.metrics.method.map((m) => (
                <div key={m.k}>
                  <span className="mono mut">{m.k}</span>
                  <strong>{m.name}</strong>
                  <span className="mut" style={{ lineHeight: 1.5, fontSize: 15 }}>
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 6px' }}>{t.metrics.heading}</p>
            {t.metrics.rows.map((r) => (
              <div key={r.metric} className="mt">
                <strong>{r.metric}</strong>
                <span className="mut" style={{ lineHeight: 1.5 }}>
                  {r.definition}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--plain)' }}>
        <div
          className="w g2"
          style={{ paddingTop: W_PAD, paddingBottom: W_PAD, display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.2fr)', gap: 'clamp(32px,6vw,96px)' }}
        >
          <h2 style={{ fontSize: 'clamp(32px,3.4vw,50px)', lineHeight: 1.05, margin: 0 }}>{t.faqHeading}</h2>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {t.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="pearl">
        <Lights />
        <div
          className="w"
          style={{
            paddingTop: 'min(14vh,126px)',
            paddingBottom: 'min(14vh,126px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.02, margin: 0 }}>{t.closing.heading}</h2>
          <p className="mut" style={{ fontSize: 18, maxWidth: '34em', lineHeight: 1.55, margin: 0 }}>
            {t.closing.sub}
          </p>
          <Btns
            center
            items={[
              { label: c.bookCall, href: book },
              { label: c.pastJob, href: contactHref(locale, 'pastjob'), kind: 'glass' },
            ]}
          />
        </div>
      </section>
    </>
  )
}
