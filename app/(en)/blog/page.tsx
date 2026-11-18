import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Insights from '@/components/silver/pages/Insights'
import { blogIndexGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: 'Insights',
  description:
    'Notes from SNS Solutions on what we learn building software for estate agents, HVAC manufacturers and sales teams: the actual problem first, and what a fix looks like.',
  path: '/blog',
  languages: { en: '/blog', de: '/de/blog', 'x-default': '/blog' },
})

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={blogIndexGraph('en')} />
      <Insights locale="en" />
    </>
  )
}
