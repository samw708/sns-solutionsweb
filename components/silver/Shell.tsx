import Link from 'next/link'
import { type Locale, localePath } from '@/i18n/config'
import { QFUTOOL_URL, href, immvelaHref } from '@/lib/silver/links'
import IndustriesMenu from './IndustriesMenu'
import '@/app/silver.css'

/**
 * The silver site's frame: sticky nav, the page, the footer. `alt` is the same page's path without a locale prefix
 * (e.g. '/hvac'), so the language switch lands on the matching page, not on the home page.
 */

const T = {
  en: {
    main: 'Main',
    menu: 'Menu',
    home: 'Home',
    language: 'Language',
    industries: {
      label: 'Industries',
      hvac: ['HVAC & Refrigeration', 'Pack CAD and software for manufacturers'],
      realEstate: ['Real estate', 'Immvela, the AI assistant for estate agents'],
    },
    links: [
      ['Products', 'products'],
      ['Consulting', 'consulting'],
      ['Insights', 'insights'],
      ['Company', 'company'],
    ] as const,
    cta: 'Talk to us',
    foot: {
      industries: 'Industries',
      realEstate: 'Real estate',
      hvac: 'HVAC & Refrigeration',
      consulting: 'Consulting',
      products: 'Products',
      company: 'Company',
      about: 'About',
      team: 'Team',
      insights: 'Insights',
      contact: 'Contact',
      language: 'Language',
      rights: '© SNS Software Solutions GmbH, Vienna',
      imprint: 'Imprint',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  de: {
    main: 'Hauptmenü',
    menu: 'Menü',
    home: 'Startseite',
    language: 'Sprache',
    industries: {
      label: 'Branchen',
      hvac: ['HLK & Kältetechnik', 'Pack CAD und Software für Hersteller'],
      realEstate: ['Immobilien', 'Immvela, die KI-Assistenz für Makler'],
    },
    links: [
      ['Produkte', 'products'],
      ['Beratung', 'consulting'],
      ['Insights', 'insights'],
      ['Unternehmen', 'company'],
    ] as const,
    cta: 'Kontakt',
    foot: {
      industries: 'Branchen',
      realEstate: 'Immobilien',
      hvac: 'HLK & Kältetechnik',
      consulting: 'Beratung',
      products: 'Produkte',
      company: 'Unternehmen',
      about: 'Über uns',
      team: 'Team',
      insights: 'Insights',
      contact: 'Kontakt',
      language: 'Sprache',
      rights: '© SNS Software Solutions GmbH, Wien',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
    },
  },
}

/** English | Deutsch, always visible (desktop nav and next to the burger on phones); the current one is marked. */
function LangSwitch({ locale, alt, label }: { locale: Locale; alt: string; label: string }) {
  return (
    <div className="langsw" role="group" aria-label={label}>
      {(['en', 'de'] as const).map((l) => (
        <Link key={l} href={localePath(l, alt)} lang={l} hrefLang={l} aria-current={l === locale ? 'true' : undefined} aria-label={l === 'en' ? 'English' : 'Deutsch'}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

export function SilverNav({ locale, alt }: { locale: Locale; alt: string }) {
  const t = T[locale]
  const ind = [
    { label: t.industries.hvac[0], line: t.industries.hvac[1], href: href(locale, 'hvac') },
    { label: t.industries.realEstate[0], line: t.industries.realEstate[1], href: immvelaHref(locale), external: true },
  ]
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--nav)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)' }}>
      <nav
        aria-label={t.main}
        style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,3.5vw,56px)', minHeight: 72, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}
      >
        <Link
          href={href(locale, 'home')}
          style={{ textDecoration: 'none', fontWeight: 700, fontSize: 19, letterSpacing: '-0.03em', display: 'inline-flex', gap: 10, alignItems: 'center' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sns-logo.svg" alt="" width={32} height={32} style={{ height: 32, width: 32, display: 'block' }} />
          SNS
        </Link>
        <span style={{ flexGrow: 1 }} />
        <span className="navlinks" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link className="navl" href={href(locale, 'home')}>
            {t.home}
          </Link>
          <IndustriesMenu label={t.industries.label} items={ind} />
          {t.links.map(([label, key]) => (
            <Link key={key} className="navl" href={href(locale, key)}>
              {label}
            </Link>
          ))}
        </span>
        <LangSwitch locale={locale} alt={alt} label={t.language} />
        <Link className="btn dark navcta" href={href(locale, 'contact')} style={{ minHeight: 40, padding: '0 18px' }}>
          {t.cta}
        </Link>
        <details className="mnav">
          <summary aria-label={t.menu}>
            <span />
            <span />
          </summary>
          <div className="mpanel">
            <Link href={href(locale, 'home')}>{t.home}</Link>
            <span className="mgroup">{t.industries.label}</span>
            {ind.map((it) =>
              it.external ? (
                <a key={it.label} className="msub" href={it.href} target="_blank" rel="noopener">
                  {it.label} ↗
                </a>
              ) : (
                <Link key={it.label} className="msub" href={it.href}>
                  {it.label}
                </Link>
              ),
            )}
            {t.links.map(([label, key]) => (
              <Link key={key} href={href(locale, key)}>
                {label}
              </Link>
            ))}
            <Link href={href(locale, 'contact')}>{t.cta}</Link>
          </div>
        </details>
      </nav>
    </div>
  )
}

export function SilverFooter({ locale, alt }: { locale: Locale; alt: string }) {
  const f = T[locale].foot
  const cols: [string, [string, string, boolean?][]][] = [
    [f.industries, [[f.realEstate, immvelaHref(locale), true], [f.hvac, href(locale, 'hvac')], [f.consulting, href(locale, 'consulting')]]],
    [f.products, [['Pack CAD', href(locale, 'pack')], ['QFUtool ↗', QFUTOOL_URL, true], ['Immvela ↗', immvelaHref(locale), true]]],
    [f.company, [[f.about, href(locale, 'company')], [f.team, href(locale, 'company', '#team')], [f.insights, href(locale, 'insights')], [f.contact, href(locale, 'contact')]]],
    [f.language, [['English', localePath('en', alt)], ['Deutsch', localePath('de', alt)]]],
  ]
  return (
    <footer style={{ background: 'var(--plain)', borderTop: '1px solid var(--line)' }}>
      <div className="w" style={{ paddingTop: 48, paddingBottom: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 28, fontSize: 15 }} className="g4">
          {cols.map(([h, items]) => (
            <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <strong>{h}</strong>
              {items.map(([label, to, ext]) =>
                ext ? (
                  <a key={label} className="navl" href={to} target="_blank" rel="noopener">
                    {label}
                  </a>
                ) : (
                  <Link key={label} className="navl" href={to} lang={label === 'Deutsch' ? 'de' : label === 'English' ? 'en' : undefined}>
                    {label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="mut" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13 }}>
          <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sns-logo.svg" alt="" width={20} height={20} style={{ height: 20, width: 20 }} />
            {f.rights}
          </span>
          <span style={{ flexGrow: 1 }} />
          <Link className="navl" href={href(locale, 'imprint')} style={{ fontSize: 13 }}>
            {f.imprint}
          </Link>
          <Link className="navl" href={href(locale, 'privacy')} style={{ fontSize: 13 }}>
            {f.privacy}
          </Link>
          <Link className="navl" href={href(locale, 'terms')} style={{ fontSize: 13 }}>
            {f.terms}
          </Link>
        </div>
      </div>
    </footer>
  )
}

/** A whole silver page. */
export default function SilverPage({ locale, alt, children }: { locale: Locale; alt: string; children: React.ReactNode }) {
  return (
    <div className="sv">
      <SilverNav locale={locale} alt={alt} />
      <main>{children}</main>
      <SilverFooter locale={locale} alt={alt} />
    </div>
  )
}
