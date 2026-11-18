import Link from 'next/link'
import { type Locale, localePath } from '@/i18n/config'
import { HVAC_PATH } from '@/lib/hvac-links'
import { getHvac } from '@/lib/hvac'
import { type ToolKey, getTool } from '@/lib/hvac-tools'
import { Btn, CheckList, ClosingCard, Em, FaqList } from '@/components/inner/ui'

/**
 * One HVAC tool page (selection software, document management). Same order on every page so a
 * reader, or an answer engine, finds the same things in the same places: definition, what goes
 * wrong today, what we build, what we measure, where it connects, FAQ.
 */
export default function ToolPage({ locale, tool }: { locale: Locale; tool: ToolKey }) {
  const hv = getHvac(locale)
  const t = getTool(locale, tool)
  const contact = localePath(locale, `/contact?service=${encodeURIComponent(hv.contactService)}`)

  return (
    <>
      <header className="max-w-4xl">
        <p className="in-eyebrow">
          <Link href={localePath(locale, HVAC_PATH)}>{hv.crumbHub}</Link>
          <span aria-hidden="true"> / </span>
          {t.eyebrow}
        </p>
        <h1 className="in-h1">
          <Em text={t.h1} />
        </h1>
        <p className="in-lead">{t.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Btn href={contact}>{t.closing.cta}</Btn>
          <p className="hm-glass in-status m-0">{t.note}</p>
        </div>
      </header>

      <div className="in-section grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.5fr]">
        <section aria-labelledby="tool-problems" className="hm-glass in-panel">
          <h2 id="tool-problems" className="in-h3">
            {t.problems.heading}
          </h2>
          <div className="mt-6">
            <CheckList items={t.problems.items} plus />
          </div>
        </section>

        <section aria-labelledby="tool-builds" className="hm-glass in-panel">
          <h2 id="tool-builds" className="in-h3">
            {t.builds.heading}
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {t.builds.items.map((b, i) => (
              <div key={b.name}>
                <dt className="flex gap-3 font-semibold text-[color:var(--hm-ink)]">
                  <span className="in-mono pt-0.5">0{i + 1}</span>
                  {b.name}
                </dt>
                <dd className="in-body m-0 mt-1.5">{b.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section aria-labelledby="tool-metrics" className="hm-glass in-ink in-panel in-section grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div>
          <h2 id="tool-metrics" className="in-h2">
            {t.metrics.heading}
          </h2>
          <p className="in-lead mt-3">{t.metrics.sub}</p>
        </div>
        <ul className="m-0 flex flex-col gap-3 p-0" style={{ listStyle: 'none' }}>
          {t.metrics.items.map((m, i) => (
            <li key={m} className="flex gap-4 border-t border-white/15 pt-3 text-lg text-white">
              <span className="in-mono pt-1 text-[#c9d2f4]">0{i + 1}</span>
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tool-related" className="in-section">
        <h2 id="tool-related" className="in-h2 in-head">
          {t.related.heading}
        </h2>
        <ul className="m-0 grid grid-cols-1 gap-5 p-0 md:grid-cols-3" style={{ listStyle: 'none' }}>
          {t.related.items.map((r) => (
            <li key={r.href}>
              <Link href={localePath(locale, r.href)} className="hm-glass in-panel-sm in-card-link">
                <span className="text-lg font-semibold text-[color:var(--hm-ink)]">{r.label} →</span>
                <span className="in-body mt-2 block">{r.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqList heading={t.faqHeading} items={t.faq} id="tool-faq" />

      <ClosingCard heading={t.closing.heading} sub={t.closing.sub} cta={t.closing.cta} href={contact} />
    </>
  )
}
