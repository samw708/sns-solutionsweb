import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LightGround from '@/components/home/LightGround'
import type { Locale } from '@/i18n/config'
import '@/app/home.css'
import '@/app/inner.css'

/**
 * The frame every inner page shares: the nav, then the homepage's light ground (lavender cream and
 * drifting colour light) holding the page and the footer. Same construction as /products, so the
 * whole site reads as one thing below the home page's dark first screen.
 */
export default function InnerShell({
  locale = 'en',
  id,
  children,
}: {
  locale?: Locale
  id?: string
  children: ReactNode
}) {
  return (
    <>
      <Nav locale={locale} />
      <main id={id} className="hm">
        <LightGround>
          <div className="in-wrap">{children}</div>
          <Footer showCta={false} locale={locale} />
        </LightGround>
      </main>
    </>
  )
}
