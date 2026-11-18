import type { Metadata } from 'next'
import Contact from '@/components/silver/pages/Contact'
import JsonLd from '@/components/JsonLd'
import { contactGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: 'Contact',
  description:
    "Start a build with SNS Solutions: custom software, AI automation, and AI & IT consulting. Tell us what you're building and we'll tell you how we'd approach it.",
  path: '/contact',
  languages: { en: '/contact', de: '/de/contact', 'x-default': '/contact' },
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactGraph('en')} />
      <Contact locale="en" />
    </>
  )
}
