import type { Metadata } from 'next'
import Insights from '@/components/silver/pages/Insights'
import { snsPage } from '@/lib/share'

// The articles are English only, so this page is the German frame around the English list. It points search engines
// at /blog as the one version to index, and is kept so the German nav's "Insights" link doesn't end in a 404.
const base = snsPage({
  locale: 'de',
  title: 'Insights',
  description:
    'Notizen von SNS Solutions aus der Arbeit an Software für Immobilienmakler, HLK-Hersteller und Vertriebsteams. Die Artikel sind derzeit auf Englisch.',
  path: '/de/blog',
})
export const metadata: Metadata = {
  ...base,
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: true },
}

export default function BlogIndexPageDe() {
  return <Insights locale="de" />
}
