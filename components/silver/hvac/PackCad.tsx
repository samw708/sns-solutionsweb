import type { Locale } from '@/i18n/config'
import { getHvac } from '@/lib/hvac'
import { contactHref, href } from '@/lib/silver/links'
import Video from '../Video'
import { Btns, Closing, Crumb, FaqSection, LightFilm, Pic, Sec } from '../ui'

/** /hvac/refrigeration-pack-design — Pack CAD (canvas board Site-PackCAD). */
export default function PackCad({ locale }: { locale: Locale }) {
  const c = getHvac(locale)
  const t = c.pack
  const ctas = [
    { label: c.pastJob, href: contactHref(locale, 'pastjob') },
    { label: c.bookCall, href: href(locale, 'consulting', '#book'), kind: 'glass' as const },
  ]
  const p = t.gap.printout
  const pad = Math.max(...p.groups.flat().map(([k]) => k.length)) + 3

  return (
    <>
      {/* Dark stage */}
      <section className="stage-d">
        <div
          className="w g2"
          style={{
            paddingTop: 'clamp(56px,9vh,96px)',
            paddingBottom: 'clamp(40px,6vh,64px)',
            paddingLeft: 'clamp(20px,3.5vw,56px)',
            paddingRight: 'clamp(20px,3.5vw,56px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.1fr)',
            gap: 'clamp(24px,4vw,64px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 2 }}>
            <Crumb items={[{ label: c.crumb.industries, href: href(locale, 'hvac') }, { label: c.crumb.hvac, href: href(locale, 'hvac') }, { label: 'Pack CAD' }]} />
            <h1 style={{ fontSize: 'clamp(44px,5.4vw,88px)', lineHeight: 0.96, letterSpacing: '-0.055em', margin: 0 }}>{t.h1}</h1>
            <p className="mut lead">{t.intro}</p>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, opacity: 0.8 }}>
              {t.speciality[0]}
              <br />
              {t.speciality[1]}
            </p>
            <Btns items={ctas} />
          </div>
          <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 28, overflow: 'hidden', boxShadow: '0 0 0 1px #FFFFFF14' }}>
            <Video src="/sns/site/pack-loop.mp4" poster="/sns/site/pack-loop-poster.jpg" label={t.loopLabel} />
          </div>
        </div>
      </section>

      {/* The gap */}
      <Sec>
        <div className="row2" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="k2">{t.gap.heading}</h2>
            <p className="mut body">{t.gap.sub}</p>
            <div className="paper" role="img" aria-label={t.gap.printoutLabel}>
              <b>{p.title}</b>
              {'  '}
              <span style={{ opacity: 0.55 }}>{c.example}</span>
              {p.groups.map((g, i) => (
                <span key={i}>
                  <hr />
                  {g.map(([k, v], j) => (
                    <span key={k}>
                      {j > 0 && <br />}
                      {k.padEnd(pad)}
                      {v}
                    </span>
                  ))}
                </span>
              ))}
              <hr />
              <span style={{ opacity: 0.55 }}>{p.missing}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{t.gap.addsHeading}</p>
            <ul className="list need">
              {t.gap.adds.map(([a, b]) => (
                <li key={a}>
                  <span style={{ fontSize: 19, letterSpacing: '-0.02em' }}>{a}</span>
                  <em>{b}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sec>

      {/* How it works */}
      <Sec bg="var(--band)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="k2">{t.stepsHeading}</h2>
            <p className="mut body" style={{ maxWidth: '30em' }}>
              {t.stepsSub}
            </p>
          </div>
          <div className="steps">
            {t.steps.map((s, i) => (
              <div key={s.name}>
                <span className="mono mut">{i + 1}</span>
                <strong className="k3" style={{ fontSize: 20 }}>
                  {s.name}
                </strong>
                <span className="mut" style={{ lineHeight: 1.5, fontSize: 15.5 }}>
                  {s.text}
                </span>
              </div>
            ))}
          </div>
          <LightFilm de={locale === 'de'} name="pack-printout" label={t.stepsFilm} />
        </div>
      </Sec>

      {/* Rules */}
      <Sec>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,5vh,56px)' }}>
          <div className="row2" style={{ alignItems: 'start' }}>
            <h2 className="k2">{t.rules.heading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p className="mut body">{t.rules.body}</p>
              <ul className="list" style={{ marginTop: 8 }}>
                {t.rules.points.map((x) => (
                  <li key={x} className="mut">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <LightFilm de={locale === 'de'} name="pack-limit" label={t.rules.film} />
        </div>
      </Sec>

      {/* Scale */}
      <Sec>
        <div className="row2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 className="k2">{t.scale.heading}</h2>
            <p className="mut body">{t.scale.body}</p>
          </div>
          <ul className="list">
            {t.scale.items.map((x) => (
              <li key={x} style={{ fontSize: 'clamp(18px,1.6vw,22px)', letterSpacing: '-0.02em' }}>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Sec>

      {/* Outputs */}
      <Sec bg="var(--band)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <h2 className="k2">{t.outputs.heading}</h2>
          <LightFilm de={locale === 'de'} name="pack-model-drawing" label={t.outputs.film} />
          <div className="cols3">
            {t.outputs.items.map((o) => (
              <div key={o.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <strong className="k3">{o.name}</strong>
                <span className="mut body" style={{ fontSize: 16 }}>
                  {o.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* Built for you */}
      <Sec>
        <div className="row2" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 className="k2">{t.own.heading}</h2>
            <p className="mut body">{t.own.body}</p>
            <Btns items={ctas} />
          </div>
          <Pic src="desk-drawing.jpg" alt={t.own.photo} />
        </div>
      </Sec>

      <FaqSection heading={t.faqHeading} items={t.faq} />
      <Closing heading={t.closing.heading} sub={t.closing.sub} ctas={ctas} />
    </>
  )
}
