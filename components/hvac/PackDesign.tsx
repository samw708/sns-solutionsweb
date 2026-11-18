import Link from 'next/link'
import { type Locale, localePath } from '@/i18n/config'
import { HVAC_PATH, getHvac } from '@/lib/hvac'
import { Btn, CheckList, ClosingCard, Em, FaqList } from '@/components/inner/ui'

/**
 * /hvac/refrigeration-pack-design — the CAD tool. The headline is the product's promise in the
 * buyer's words; the intro under it is the one-paragraph definition an answer engine can quote
 * whole. The status pill sits next to the first button so nobody reads this as a shipping product.
 * Then the picture of the idea: a selection printout on the left, the pack your rules make of it on
 * the right.
 */

// Labels for the printout → pack figure. Generic on purpose: no invented model names or values.
const FIG: Record<
  Locale,
  {
    sheet: string
    rows: [string, string][]
    rules: string
    caption: string
    svg: { discharge: string; suction: string; receiver: string; oil: string; label: string }
  }
> = {
  en: {
    sheet: 'Selection printout · PDF',
    rows: [
      ['Compressors', 'model × count'],
      ['Refrigerant', 'R744 (CO₂)'],
      ['Operating points', 'MT · LT'],
      ['Capacity & power', 'per point'],
    ],
    rules: 'your rules applied',
    caption: 'Schematic · 3D model · parts list',
    svg: {
      discharge: 'discharge header',
      suction: 'suction header',
      receiver: 'receiver',
      oil: 'oil',
      label:
        'Simplified pack: compressors on a frame between suction and discharge headers, with a receiver and an oil separator',
    },
  },
  de: {
    sheet: 'Auslegungsausdruck · PDF',
    rows: [
      ['Verdichter', 'Modell × Anzahl'],
      ['Kältemittel', 'R744 (CO₂)'],
      ['Betriebspunkte', 'NK · TK'],
      ['Leistung', 'je Punkt'],
    ],
    rules: 'Ihre Regeln angewendet',
    caption: 'Schema · 3D-Modell · Stückliste',
    svg: {
      discharge: 'Drucksammelrohr',
      suction: 'Saugsammelrohr',
      receiver: 'Sammler',
      oil: 'Öl',
      label:
        'Vereinfachte Verbundanlage: Verdichter auf einem Rahmen zwischen Saug- und Drucksammelrohr, mit Sammler und Ölabscheider',
    },
  },
}

export default function PackDesign({ locale }: { locale: Locale }) {
  const c = getHvac(locale)
  const t = c.pack
  const f = FIG[locale]
  const contact = localePath(locale, `/contact?service=${encodeURIComponent(c.contactService)}`)

  return (
    <>
      <header className="max-w-5xl">
        <p className="in-eyebrow">
          <Link href={localePath(locale, HVAC_PATH)}>{c.crumbHub}</Link>
          <span aria-hidden="true"> / </span>
          {t.eyebrow}
        </p>
        <h1 className="in-h1">
          <Em text={t.h1} />
        </h1>
        <p className="in-lead">{t.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Btn href={contact}>{t.primaryCta}</Btn>
          <p className="hm-glass in-status m-0">{t.status}</p>
        </div>
      </header>

      <section
        aria-label={f.caption}
        className="hm-glass in-panel in-section grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1.2fr]"
      >
        <div className="rotate-[-1.5deg] rounded-2xl bg-white p-6 shadow-[0_12px_40px_-24px_rgba(11,31,68,0.45)]">
          <p className="in-mono m-0 mb-4">{f.sheet}</p>
          <dl className="m-0 flex flex-col gap-2.5 text-sm">
            {f.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-dashed border-[#d9dbe6] pb-2 last:border-0">
                <dt className="text-[color:var(--hm-ink)]">{k}</dt>
                <dd className="in-mono m-0">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="text-center" aria-hidden="true">
          <span className="in-h2 italic text-[color:var(--hm-blue)]">→</span>
          <p className="in-mono m-0 mt-1">{f.rules}</p>
        </div>
        <figure className="m-0 rounded-2xl bg-white/75 p-4">
          <svg viewBox="0 0 360 220" width="100%" role="img" aria-label={f.svg.label}>
            <rect x="20" y="180" width="320" height="10" rx="2" fill="#0b1f44" opacity="0.85" />
            <line x1="40" y1="60" x2="320" y2="60" stroke="#034599" strokeWidth="6" strokeLinecap="round" />
            <line x1="40" y1="120" x2="320" y2="120" stroke="#96a3cd" strokeWidth="8" strokeLinecap="round" />
            <g fill="#ffffff" stroke="#0b1f44" strokeWidth="2">
              <rect x="52" y="128" width="46" height="52" rx="10" />
              <rect x="112" y="128" width="46" height="52" rx="10" />
              <rect x="172" y="128" width="46" height="52" rx="10" />
            </g>
            <g stroke="#0b1f44" strokeWidth="2">
              <line x1="75" y1="128" x2="75" y2="120" />
              <line x1="135" y1="128" x2="135" y2="120" />
              <line x1="195" y1="128" x2="195" y2="120" />
            </g>
            <rect x="246" y="78" width="70" height="98" rx="34" fill="#e6eaf8" stroke="#0b1f44" strokeWidth="2" />
            <circle cx="282" cy="34" r="14" fill="#f6c9b0" stroke="#0b1f44" strokeWidth="2" />
            <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#3a4766">
              <text x="40" y="50">{f.svg.discharge}</text>
              <text x="40" y="112">{f.svg.suction}</text>
              <text x="252" y="204">{f.svg.receiver}</text>
              <text x="302" y="38">{f.svg.oil}</text>
            </g>
          </svg>
          <figcaption className="in-mono mt-1.5">{f.caption}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="pack-gap" className="in-section grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="in-eyebrow">{t.gap.eyebrow}</p>
          <h2 id="pack-gap" className="in-h2">
            {t.gap.heading}
          </h2>
          <p className="in-lead mt-5">{t.gap.sub}</p>
        </div>
        <div className="hm-glass in-panel grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="in-mono m-0 mb-4">{t.gap.hasHeading}</h3>
            <CheckList items={t.gap.has} />
          </div>
          <div>
            <h3 className="in-mono m-0 mb-4">{t.gap.needsHeading}</h3>
            <CheckList items={t.gap.needs} plus />
          </div>
        </div>
      </section>

      <section aria-labelledby="pack-steps" className="in-section">
        <h2 id="pack-steps" className="in-h2 in-head">
          {t.stepsHeading}
        </h2>
        <ol className="m-0 grid grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5" style={{ listStyle: 'none' }}>
          {t.steps.map((s) => (
            <li key={s.k} className="hm-glass in-panel-sm">
              <span className="in-mono">{s.k}</span>
              <h3 className="mt-2.5 text-[17px] font-semibold text-[color:var(--hm-ink)]">{s.name}</h3>
              <p className="in-body m-0 mt-2 text-[14px]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="in-section grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section aria-labelledby="pack-rules" className="hm-glass in-panel">
          <p className="in-eyebrow">{t.rules.eyebrow}</p>
          <h2 id="pack-rules" className="in-h3">
            <Em text={t.rules.heading} />
          </h2>
          <p className="in-body mt-4">{t.rules.body}</p>
          <div className="mt-6">
            <CheckList items={t.rules.points} />
          </div>
        </section>
        <section aria-labelledby="pack-scale" className="hm-glass in-ink in-panel">
          <p className="in-eyebrow">{t.scale.eyebrow}</p>
          <h2 id="pack-scale" className="in-h3">
            <Em text={t.scale.heading} />
          </h2>
          <p className="in-body mt-4">{t.scale.body}</p>
        </section>
      </div>

      <section aria-labelledby="pack-outputs" className="in-section">
        <h2 id="pack-outputs" className="in-h2 in-head">
          {t.outputs.heading}
        </h2>
        <ol className="m-0 grid grid-cols-1 gap-5 p-0 md:grid-cols-3" style={{ listStyle: 'none' }}>
          {t.outputs.items.map((o) => (
            <li key={o.name} className="hm-glass in-panel-sm">
              <p className="in-mono m-0">{o.stage}</p>
              <h3 className="in-h3 mt-2">{o.name}</h3>
              <p className="in-body mt-3">{o.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <FaqList heading={t.faqHeading} items={t.faq} id="pack-faq" />

      <ClosingCard heading={t.partner.heading} sub={t.partner.sub} cta={t.partner.cta} href={contact} />
    </>
  )
}
