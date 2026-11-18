import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import Services from '@/components/Services'
import JsonLd from '@/components/JsonLd'
import { servicesGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: 'Services',
  description:
    'What SNS Solutions does, in plain terms: custom software, AI automation, and AI & IT consulting. The problems we solve, and what you get.',
  path: '/services',
  languages: { en: '/services', de: '/de/services', 'x-default': '/services' },
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesGraph('en')} />
      <InnerShell locale="en" id="services">
        <Services />
      </InnerShell>
    </>
  )
}
