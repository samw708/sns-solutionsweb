import { getDict } from '@/i18n'
import { type Locale, defaultLocale, localePath } from '@/i18n/config'
import CustomBuilds from './CustomBuilds'
import { Btn, CheckList, ClosingCard, Em } from './inner/ui'

/**
 * /services (Consulting), in the homepage's light style: the promise and the free call side by side,
 * the three services as glass cards, how a build runs, and one closing ask.
 */

// The italic closing phrase of each headline (see Em in components/inner/ui.tsx).
const EM: Record<Locale, { h1: string; closing: string }> = {
  en: { h1: 'eats your week.', closing: 'you need?' },
  de: { h1: 'Ihre Woche frisst.', closing: 'welche Sie brauchen?' },
}

export default function Services({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getDict(locale).servicesPage
  // The contact form pre-selects a ?service= value only when it exactly matches one of its options;
  // the service names here are the same strings as those options by design.
  const contact = (service?: string) =>
    localePath(locale, service ? `/contact?service=${encodeURIComponent(service)}` : '/contact')
  const consultService = t.items[2].name

  return (
    <>
      <header className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="in-eyebrow">{t.eyebrow}</p>
          <h1 className="in-h1">
            <Em text={t.heading} em={EM[locale].h1} />
          </h1>
          <p className="in-lead">{t.intro}</p>
        </div>

        {/* Lead with the consultation: the page's primary action is a meeting, not a build. */}
        <aside className="hm-glass in-panel" aria-labelledby="consult-h">
          <p className="in-eyebrow mb-2">{t.consult.tag}</p>
          <h2 id="consult-h" className="in-h3">
            {t.consult.heading}
          </h2>
          <ol className="mt-5 flex flex-col gap-3 p-0" style={{ listStyle: 'none' }}>
            {t.consult.points.map((point, i) => (
              <li key={point} className="flex gap-3 text-[15px] leading-snug text-[color:var(--hm-ink)]">
                <span className="in-mono pt-0.5">0{i + 1}</span>
                {point}
              </li>
            ))}
          </ol>
          <Btn href={contact(consultService)} className="mt-7">
            {t.consult.cta}
          </Btn>
          <p className="in-body mt-3 text-[13px]">{t.consult.aside}</p>
        </aside>
      </header>

      <section aria-label={t.eyebrow} className="in-section grid grid-cols-1 gap-5 lg:grid-cols-3">
        {t.items.map((s, i) => (
          <article key={s.name} id={`svc-${i + 1}`} className="hm-glass in-panel flex scroll-mt-24 flex-col gap-5">
            <p className="in-mono m-0">
              0{i + 1} · {s.name}
            </p>
            <h2 className="in-h3">
              <Em text={s.tagline} />
            </h2>
            <div>
              <p className="mb-1 text-sm font-semibold text-[color:var(--hm-ink)]">{t.problemLabel}</p>
              <p className="in-body m-0">{s.problem}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-[color:var(--hm-ink)]">{t.whatWeDoLabel}</p>
              <p className="in-body m-0">{s.whatWeDo}</p>
            </div>
            <div className="in-rule pt-4">
              <p className="mb-3 text-sm font-semibold text-[color:var(--hm-ink)]">{t.outcomesLabel}</p>
              <CheckList items={s.outcomes} />
            </div>
            <p className="in-body m-0 text-[14px]">{s.example}</p>
            <Btn href={contact(s.name)} secondary className="mt-auto self-start">
              {s.cta}
            </Btn>
          </article>
        ))}
      </section>

      <CustomBuilds locale={locale} />

      <ClosingCard
        heading={t.closingHeading}
        em={EM[locale].closing}
        sub={t.closingSub}
        cta={t.closingCta}
        href={contact()}
      />
    </>
  )
}
