import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Sec } from '../ui'
import '@/app/silver-pages-c.css'

/**
 * Imprint, privacy and terms in the silver frame (canvas board Site-Imprint): the three documents in a side list,
 * the text beside it. The legal text itself stays in each page file, unchanged.
 */

type Doc = 'imprint' | 'privacy' | 'terms'

const T: Record<Locale, { nav: string; docs: Record<Doc, string> }> = {
  en: { nav: 'Legal', docs: { imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms' } },
  de: {
    nav: 'Rechtliches',
    docs: { imprint: 'Impressum', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
  },
}

export default function LegalShell({
  locale,
  doc,
  children,
}: {
  locale: Locale
  doc: Doc
  children: React.ReactNode
}) {
  const t = T[locale]
  return (
    <SilverPage locale={locale} alt={`/legal/${doc}`}>
      <Sec bg="var(--base)" pearl pad={['clamp(56px,9vh,96px)', 'min(12vh,104px)']}>
        <div
          className="row2 lg-grid"
          style={{ gridTemplateColumns: 'minmax(0,.35fr) minmax(0,1.65fr)' }}
        >
          <nav
            className="lg-side"
            aria-label={t.nav}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              position: 'sticky',
              top: 110,
              alignSelf: 'start',
            }}
          >
            {(Object.keys(t.docs) as Doc[]).map((d) => (
              <Link
                key={d}
                href={href(locale, d)}
                aria-current={d === doc ? 'page' : undefined}
                style={{
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  fontWeight: 600,
                  color: d === doc ? 'var(--tx)' : 'var(--mut)',
                }}
              >
                {t.docs[d]}
              </Link>
            ))}
          </nav>
          <div className="lg-doc" style={{ maxWidth: 760, minWidth: 0 }}>
            {children}
          </div>
        </div>
      </Sec>
    </SilverPage>
  )
}
