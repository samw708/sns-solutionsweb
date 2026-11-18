import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Insights from '@/components/silver/pages/Insights'
import { blogIndexGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: 'Insights',
  description:
    'Notizen von SNS Solutions aus der Arbeit an Software für Immobilienmakler, HLK-Hersteller und Vertriebsteams: zuerst das eigentliche Problem, dann wie eine Lösung aussieht.',
  path: '/de/blog',
  languages: { en: '/blog', de: '/de/blog', 'x-default': '/blog' },
})

export default function BlogIndexPageDe() {
  return (
    <>
      <JsonLd data={blogIndexGraph('de')} />
      <Insights locale="de" />
    </>
  )
}
