import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import Founders from '@/components/Founders'
import JsonLd from '@/components/JsonLd'
import { teamGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: 'Team',
  description:
    'Meet the founders of SNS Solutions: Samuel Winch (CTO), Nicholas Pellechi (CFO) and Samson Belachew (CEO), the team building custom software and AI automation in Vienna.',
  path: '/team',
  languages: { en: '/team', de: '/de/team', 'x-default': '/team' },
})

export default function TeamPage() {
  return (
    <>
      <JsonLd data={teamGraph('en')} />
      <InnerShell locale="en" id="team">
        <Founders />
      </InnerShell>
    </>
  )
}
