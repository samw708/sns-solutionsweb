import { type Locale, localePath } from '@/i18n/config'
import { getHvac } from '@/lib/hvac'
import { Btn, ClosingCard, Em } from '@/components/inner/ui'
import { DossierMock, PackMock, SelectionMock, UnitRecord } from './visuals'

/**
 * /hvac, in the manner of immvela.com: each row is a short headline, one sentence and a picture of
 * what the tool produces. The long copy (tool points, metric definitions, FAQ answers) is still on
 * the page but folded away, and in full in /llms-full.txt and the JSON-LD, so answer engines lose
 * nothing while a reader sees a page they can take in at a glance.
 */
const EM: Record<Locale, string> = {
  en: 'built for HVAC and refrigeration manufacturers.',
  de: 'für Hersteller in HLK und Kältetechnik.',
}

const PICTURES = { selection: SelectionMock, cad: PackMock, documents: DossierMock } as const

export default function HvacHub({ locale }: { locale: Locale }) {
  const c = getHvac(locale)
  const t = c.hub
  const contact = localePath(locale, `/contact?service=${encodeURIComponent(c.contactService)}`)
  const featured = t.tools.filter((x) => x.id in PICTURES)
  const rest = t.tools.filter((x) => !(x.id in PICTURES))

  return (
    <>
      <header className="in-row">
        <div>
          <p className="in-eyebrow">{t.eyebrow}</p>
          <h1 className="in-h1 !text-[clamp(2.4rem,4.4vw,4rem)]">
            <Em text={t.h1} em={EM[locale]} />
          </h1>
          <p className="in-lead">{t.heroLine}</p>
          <Btn href={contact} className="mt-8">
            {t.closing.cta}
          </Btn>
        </div>
        <div className="hm-glass in-stage">
          <UnitRecord locale={locale} />
        </div>
      </header>

      {featured.map((tool, i) => {
        const Picture = PICTURES[tool.id as keyof typeof PICTURES]
        const href = tool.href ? localePath(locale, tool.href) : contact
        return (
          <section key={tool.id} id={tool.id} aria-labelledby={`${tool.id}-h`} className="in-row in-section scroll-mt-24">
            <div className={`in-row-text ${i % 2 ? 'lg:order-2' : ''}`}>
              <p className="in-mono m-0 mb-3">
                0{i + 1} · {tool.name}
              </p>
              <h2 id={`${tool.id}-h`} className="in-h2">
                {tool.headline}
              </h2>
              <p className="in-lead mt-4">{tool.line}</p>
              <Btn href={href} secondary className="mt-7">
                {tool.cta}
              </Btn>
            </div>
            <div className="hm-glass in-stage">
              <Picture locale={locale} />
            </div>
          </section>
        )
      })}

      <section aria-labelledby="rest-h" className="in-section">
        <h2 id="rest-h" className="in-h2 in-head">
          {t.restHeading}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {rest.map((tool) => (
            <div key={tool.id} id={tool.id} className="hm-glass in-panel-sm scroll-mt-24">
              <p className="in-mono m-0">{tool.name}</p>
              <h3 className="in-h3 mt-2 !text-[1.5rem]">{tool.headline}</h3>
              <p className="in-body mt-2">{tool.line}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2" aria-label={t.flow.heading}>
          {t.flow.steps.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="in-pill">{s}</span>
              {i < t.flow.steps.length - 1 && (
                <span aria-hidden="true" className="text-[color:var(--hm-blue)]">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="hvac-ai" className="hm-glass in-ink in-panel in-section">
        <p className="in-eyebrow">{t.ai.eyebrow}</p>
        <h2 id="hvac-ai" className="in-h2 max-w-[18em]">
          <Em text={t.ai.heading} />
        </h2>
        <p className="in-lead mt-4">{t.ai.line}</p>
      </section>

      <section aria-labelledby="hvac-metrics" className="in-section">
        <h2 id="hvac-metrics" className="in-h2 max-w-[16em]">
          {t.metrics.short}
        </h2>
        <p className="in-lead mt-4">{t.metrics.shortSub}</p>
        <ul className="mt-8 flex flex-wrap gap-2 p-0" style={{ listStyle: 'none' }}>
          {t.metrics.rows.map((r) => (
            <li key={r.metric} className="in-pill">
              {r.metric}
            </li>
          ))}
        </ul>
        <details className="in-faq mt-8">
          <summary>{t.metrics.detailsLabel}</summary>
          <div className="hm-glass in-table-box mb-6">
            <table className="in-table">
              <thead>
                <tr>
                  <th scope="col">{t.metrics.cols.metric}</th>
                  <th scope="col">{t.metrics.cols.definition}</th>
                  <th scope="col">{t.metrics.cols.where}</th>
                </tr>
              </thead>
              <tbody>
                {t.metrics.rows.map((r) => (
                  <tr key={r.metric}>
                    <th scope="row">{r.metric}</th>
                    <td>{r.definition}</td>
                    <td>{r.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>

      <section aria-labelledby="hvac-faq" className="in-section grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
        <h2 id="hvac-faq" className="in-h2">
          {t.faqShort}
        </h2>
        <div className="in-faq">
          {t.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className="in-body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCard heading={t.closing.heading} sub={t.closing.sub} cta={t.closing.cta} href={contact} />
    </>
  )
}
