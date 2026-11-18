import type { Locale } from '@/i18n/config'
import { href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Btns, Lights } from '../ui'

const T = {
  en: {
    h1: ['Nothing here.', 'Simpler that way.'],
    sub: 'The page you’re looking for has moved or never existed. These will get you where you were going.',
    home: 'Go to the homepage',
    hvac: 'HVAC & Refrigeration',
    contact: 'Contact us',
  },
  de: {
    h1: ['Hier ist nichts.', 'Einfacher so.'],
    sub: 'Die Seite, die Sie suchen, ist umgezogen oder hat nie existiert. Hier geht es weiter.',
    home: 'Zur Startseite',
    hvac: 'HLK & Kältetechnik',
    contact: 'Kontakt',
  },
}

export default function NotFound({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <SilverPage locale={locale} alt="/">
      <section className="pearl" style={{ background: 'var(--base)' }}>
        <Lights />
        <div
          className="w"
          style={{ minHeight: 720, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 26, position: 'relative', zIndex: 2 }}
        >
          <div style={{ width: 'min(520px,80%)', height: 1, background: 'var(--tx)', opacity: 0.25, position: 'relative' }} aria-hidden="true">
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: -1,
                height: 3,
                width: '100%',
                background: 'linear-gradient(90deg,transparent,var(--tx) 70%,transparent)',
                transformOrigin: 'left',
                animation: 'run 2.4s cubic-bezier(.65,0,.35,1) .3s both',
              }}
            />
          </div>
          <h1 className="k1" style={{ fontSize: 'clamp(44px,5.6vw,88px)' }}>
            {t.h1[0]}
            <br />
            {t.h1[1]}
          </h1>
          <p className="mut lead" style={{ textAlign: 'center' }}>
            {t.sub}
          </p>
          <Btns
            center
            items={[
              { label: t.home, href: href(locale, 'home') },
              { label: t.hvac, href: href(locale, 'hvac'), kind: 'glass' },
              { label: t.contact, href: href(locale, 'contact'), kind: 'glass' },
            ]}
          />
        </div>
      </section>
    </SilverPage>
  )
}
