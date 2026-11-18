import type { Metadata } from 'next'
import Company from '@/components/silver/pages/Company'
import JsonLd from '@/components/JsonLd'
import { teamGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: 'Team',
  description:
    'Lernen Sie die Gründer von SNS Solutions kennen: Samuel Winch (CTO), Nicholas Pellechi (CFO) und Samson Belachew (CEO), das Team hinter individueller Software und KI-Automatisierung in Wien.',
  path: '/de/team',
  languages: { en: '/team', de: '/de/team', 'x-default': '/team' },
})

export default function TeamPageDe() {
  return (
    <>
      <JsonLd data={teamGraph('de')} />
      <Company locale="de" />
    </>
  )
}
