import type { Metadata } from 'next'
import Company from '@/components/silver/pages/Company'
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
      <Company locale="en" />
    </>
  )
}
