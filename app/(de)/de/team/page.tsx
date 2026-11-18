import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import Founders from '@/components/Founders'
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
      <InnerShell locale="de" id="team">
        <Founders locale="de" />
      </InnerShell>
    </>
  )
}
