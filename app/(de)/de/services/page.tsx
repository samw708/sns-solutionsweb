import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import Services from '@/components/Services'
import JsonLd from '@/components/JsonLd'
import { servicesGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: 'Leistungen',
  description:
    'Was SNS Solutions macht, klar erklärt: individuelle Software, KI-Automatisierung und KI- & IT-Beratung. Die Probleme, die wir lösen, und was Sie bekommen.',
  path: '/de/services',
  languages: { en: '/services', de: '/de/services', 'x-default': '/services' },
})

export default function ServicesPageDe() {
  return (
    <>
      <JsonLd data={servicesGraph('de')} />
      <InnerShell locale="de" id="services">
        <Services locale="de" />
      </InnerShell>
    </>
  )
}
