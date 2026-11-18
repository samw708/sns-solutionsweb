import { getDict } from '@/i18n'
import { type Locale, defaultLocale } from '@/i18n/config'
import { Em } from './inner/ui'

/**
 * How a custom build runs, on /services: talk → baseline → pilot → prove. One glass panel; the
 * numbers carry the argument, these are ordered stages, not a menu. The page's closing card below it
 * carries the ask, so this panel has no button of its own.
 */
const EM: Record<Locale, string> = { en: 'to the handover.', de: 'bis zur Übergabe.' }

export default function CustomBuilds({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getDict(locale).customBuilds

  return (
    <section id="custom-builds" aria-labelledby="cb-h" className="hm-glass in-panel in-section scroll-mt-24">
      <p className="in-eyebrow">{t.eyebrow}</p>
      <h2 id="cb-h" className="in-h2 max-w-[15em]">
        <Em text={t.heading} em={EM[locale]} />
      </h2>
      <p className="in-lead mt-4">{t.sub}</p>

      <ol className="in-steps mt-11">
        {t.steps.map((step) => (
          <li key={step.k}>
            <span className="in-mono">
              {step.k} {step.name}
            </span>
            <p className="in-step-main">{step.main}</p>
            <p className="in-body m-0 text-[14px]">{step.sub}</p>
          </li>
        ))}
      </ol>

      <p className="in-body in-rule mt-10 max-w-xl pt-6">{t.note}</p>
    </section>
  )
}
