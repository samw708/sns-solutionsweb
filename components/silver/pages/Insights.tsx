import type { Locale } from '@/i18n/config'
import { sortedPosts } from '@/lib/blog'
import { FEATURED, card } from '@/lib/silver/insights'
import { href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Closing, Sec } from '../ui'
import InsightsList from './InsightsList'
import '@/app/silver-pages-c.css'

/** Insights (/blog and /de/blog). Canvas board Site-Insights. Posts: lib/blog.ts (English), lib/blog-de.ts (German). */

// No picture was made for this one; like the canvas, it is left out of the index (it stays linked from related posts).
const HIDDEN = ['qfutool-automated-quote-follow-up']

const T = {
  en: {
    list: {
      crumb: 'Insights',
      h1: 'Notes from building it.',
      lead: 'What we learn building software for estate agents, HVAC manufacturers and sales teams. Written by the people doing the work.',
      all: 'All',
      filters: 'Filter by topic',
      read: 'Read the article',
      none: 'Nothing here yet.',
    },
    nextH: 'Being written',
    next: [
      ['How we work: measure first, then build', 'Consulting'],
      ['What makes a CO₂ booster pack buildable', 'HVAC & Refrigeration'],
      ['Where AI actually pays off in a small company', 'Consulting'],
    ],
    closeH: 'Is something taking your team too long?',
    closeSub:
      'Tell us what it is. We’ll tell you whether it can be automated, and what that would take.',
    book: 'Book a free 30-minute call',
  },
  de: {
    list: {
      crumb: 'Insights',
      h1: 'Notizen aus der Praxis.',
      lead: 'Was wir lernen, während wir Software für Immobilienmakler, HLK-Hersteller und Vertriebsteams bauen. Geschrieben von den Menschen, die die Arbeit machen.',
      all: 'Alle',
      filters: 'Nach Thema filtern',
      read: 'Artikel lesen',
      none: 'Hier gibt es noch nichts.',
    },
    nextH: 'In Arbeit',
    next: [
      ['So arbeiten wir: erst messen, dann bauen', 'Beratung'],
      ['Was eine CO₂-Booster-Anlage baubar macht', 'HLK & Kältetechnik'],
      ['Wo sich KI in einem kleinen Unternehmen wirklich lohnt', 'Beratung'],
    ],
    closeH: 'Dauert in Ihrem Team etwas zu lange?',
    closeSub:
      'Sagen Sie uns, was es ist. Wir sagen Ihnen, ob es sich automatisieren lässt und was das brauchen würde.',
    book: 'Kostenloses 30-Minuten-Gespräch buchen',
  },
}

export default function Insights({ locale }: { locale: Locale }) {
  const t = T[locale]
  const posts = sortedPosts(locale).filter((p) => !HIDDEN.includes(p.slug))
  const featured = posts.find((p) => p.slug === FEATURED) ?? posts[0]
  const rest = posts.filter((p) => p !== featured).map((p) => card(locale, p))
  return (
    <SilverPage locale={locale} alt="/blog">
      <InsightsList
        t={t.list}
        featured={card(locale, featured)}
        rest={rest}
      />
      <Sec bg="var(--band)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <h2 className="k3" style={{ fontSize: 'clamp(24px,2.2vw,32px)' }}>
            {t.nextH}
          </h2>
          <ul className="list">
            {t.next.map(([a, b]) => (
              <li
                key={a}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 20,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(18px,1.6vw,22px)',
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                  }}
                >
                  {a}
                </span>
                <span className="mut">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sec>
      <Closing
        heading={t.closeH}
        sub={t.closeSub}
        ctas={[{ label: t.book, href: href(locale, 'consulting', '#book') }]}
      />
    </SilverPage>
  )
}
