import { getDict } from '@/i18n'
import { type Locale, defaultLocale, localePath } from '@/i18n/config'
import { ClosingCard, Em } from './inner/ui'

// Founder names/roles are language-independent; the bios are localized in the
// dictionaries (i18n/dictionaries) under `teamPage.bios`, ordered to match this
// list. Keep this order and the bios array in sync (lib/schema.ts relies on it too).
//
// The portrait is a placeholder, NOT a real photo: a soft colour field with the
// initials. When headshots are available, replace it at the [PLACEHOLDER] marked
// below. Do not substitute stock or generated images for the real founders.
const founders = [
  {
    initials: 'SW',
    name: 'Samuel Winch',
    role: 'Co-founder & CTO',
    field: 'radial-gradient(120% 90% at 20% 10%, #f6c9b0, #c9d2f4 60%, #a9b6e8)',
  },
  {
    initials: 'NP',
    name: 'Nicholas Pellechi',
    role: 'Co-founder & CFO',
    field: 'radial-gradient(120% 90% at 80% 10%, #c9d2f4, #e6e2f2 55%, #f3d3c2)',
  },
  {
    initials: 'SB',
    name: 'Samson Belachew',
    role: 'Co-founder & CEO',
    field: 'radial-gradient(120% 90% at 30% 90%, #a9b6e8, #d7dcf3 55%, #f6c9b0)',
  },
]

const EM: Record<Locale, string> = { en: 'behind SNS.', de: 'hinter SNS.' }

export default function Founders({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getDict(locale).teamPage

  return (
    <>
      <header className="max-w-4xl">
        <p className="in-eyebrow">{t.eyebrow}</p>
        <h1 className="in-h1">
          <Em text={t.heading} em={EM[locale]} />
        </h1>
        <p className="in-lead">{t.intro}</p>
      </header>

      <section aria-label={t.eyebrow} className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {founders.map((founder, i) => (
          <article key={founder.name} className="hm-glass flex min-w-0 flex-col p-3.5 pb-7">
            {/* [PLACEHOLDER: photo of founder] — replace this colour field with a real
                headshot (4:5) when available. */}
            <div className="in-portrait" style={{ background: founder.field }} aria-hidden="true">
              <b>{founder.initials}</b>
            </div>
            <div className="px-3.5 pt-6">
              <p className="in-mono m-0">{founder.role}</p>
              <h2 className="in-h3 mt-1.5">{founder.name}</h2>
              <p className="in-body mt-3">{t.bios[i]?.trim()}</p>
            </div>
          </article>
        ))}
      </section>

      <dl className="hm-glass in-panel in-section grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[1fr_0.6fr_1fr_1.8fr]">
        {t.facts.map((f) => (
          <div key={f.k}>
            <dt className="in-mono">{f.k}</dt>
            <dd className="in-h3 m-0 mt-2 !text-[1.35rem]">{f.v}</dd>
          </div>
        ))}
      </dl>

      <ClosingCard
        heading={t.ctaHeading}
        em={t.ctaEm}
        sub={t.ctaSub}
        cta={t.cta}
        href={localePath(locale, '/contact')}
      />
    </>
  )
}
