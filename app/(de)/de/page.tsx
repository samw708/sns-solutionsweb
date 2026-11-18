import type { Metadata } from 'next'
import SnsWebSiteSchema from '@/components/SnsWebSiteSchema'
import Home from '@/components/silver/home/Home'

// Title, description and the Open Graph/Twitter cards are the German defaults
// from the (de) root layout (see lib/site.ts → SITE_COPY.de), so this page only
// has to declare where it sits in the language pair.

export const metadata: Metadata = {
  alternates: {
    canonical: '/de',
    languages: { en: '/', de: '/de', 'x-default': '/' },
  },
}

export default function HomeDePage() {
  return (
    <>
      <SnsWebSiteSchema />
      <Home locale="de" />
    </>
  )
}
