import type { Metadata } from 'next'
import SnsWebSiteSchema from '@/components/SnsWebSiteSchema'
import Home from '@/components/silver/home/Home'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { en: '/', de: '/de', 'x-default': '/' },
  },
}

export default function HomePage() {
  return (
    <>
      <SnsWebSiteSchema />
      <Home locale="en" />
    </>
  )
}
