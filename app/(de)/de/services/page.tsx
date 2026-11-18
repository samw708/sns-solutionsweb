import type { Metadata } from 'next'
import Consulting from '@/components/silver/pages/Consulting'
import JsonLd from '@/components/JsonLd'
import { servicesGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: 'Beratung',
  description:
    'Wo lohnt sich KI in Ihrem Unternehmen? SNS Solutions sieht sich an, wie Ihr Team arbeitet, sagt Ihnen, was sich zu automatisieren lohnt, und baut individuelle Software und KI-Automatisierung, wenn es sich rechnet. Kostenloses 30-Minuten-Gespräch.',
  path: '/de/services',
  languages: { en: '/services', de: '/de/services', 'x-default': '/services' },
})

export default function ServicesPageDe() {
  return (
    <>
      <JsonLd data={servicesGraph('de')} />
      <Consulting locale="de" />
    </>
  )
}
