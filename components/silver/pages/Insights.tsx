import type { Locale } from '@/i18n/config'
import { sortedPosts } from '@/lib/blog'
import { FEATURED, card } from '@/lib/silver/insights'
import { href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Closing } from '../ui'
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
    closeH: 'Sound like your week?',
    closeSub:
      'If one of these problems is yours, tell us. We’ll tell you whether it can be automated, and what that would take.',
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
    closeH: 'Klingt nach Ihrer Woche?',
    closeSub:
      'Wenn eines dieser Probleme Ihres ist, sagen Sie es uns. Wir sagen Ihnen, ob es sich automatisieren lässt und was das bräuchte.',
    book: 'Kostenloses Erstgespräch buchen',
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
      <Closing
        heading={t.closeH}
        sub={t.closeSub}
        ctas={[{ label: t.book, href: href(locale, 'consulting', '#book') }]}
      />
    </SilverPage>
  )
}
