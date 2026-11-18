import type { Metadata } from 'next'
import Consulting from '@/components/silver/pages/Consulting'
import JsonLd from '@/components/JsonLd'
import { servicesGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: 'Consulting',
  description:
    'Where is AI worth it for your company? SNS Solutions looks at how your team works, tells you which parts are worth automating, and builds custom software and AI automation when it pays off. Free 30-minute call.',
  path: '/services',
  languages: { en: '/services', de: '/de/services', 'x-default': '/services' },
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesGraph('en')} />
      <Consulting locale="en" />
    </>
  )
}
