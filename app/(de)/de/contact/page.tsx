import type { Metadata } from 'next'
import Contact from '@/components/silver/pages/Contact'
import JsonLd from '@/components/JsonLd'
import { contactGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: 'Kontakt',
  description:
    'Starten Sie ein Projekt mit SNS Solutions: individuelle Software, KI-Automatisierung und KI- & IT-Beratung. Sagen Sie uns, was Sie bauen, und wir sagen Ihnen, wie wir es angehen würden.',
  path: '/de/contact',
  languages: { en: '/contact', de: '/de/contact', 'x-default': '/contact' },
})

export default function ContactPageDe() {
  return (
    <>
      <JsonLd data={contactGraph('de')} />
      <Contact locale="de" />
    </>
  )
}
