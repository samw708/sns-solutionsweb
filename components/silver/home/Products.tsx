import type { Locale } from '@/i18n/config'
import { contactHref, href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Closing } from '../ui'
import Showcase from './Showcase'

/** /products: the three products as the tabbed showcase, then one way to talk to us. No canvas board; built from the
 *  home showcase (gen_silver.showcase) so the nav's Products link has a real page. */

const T = {
  en: {
    close: 'Need something none of them does?',
    sub: 'We also build custom software and automation around how your team works. Tell us what takes too long.',
    book: 'Book a free 30-minute call',
    past: 'Send us a past job (HVAC)',
  },
  de: {
    close: 'Sie brauchen etwas, das keines davon kann?',
    sub: 'Wir bauen auch individuelle Software und Automatisierung, abgestimmt darauf, wie Ihr Team arbeitet. Sagen Sie uns, was zu lange dauert.',
    book: 'Kostenloses Erstgespräch buchen',
    past: 'Früheres Projekt schicken (HLK)',
  },
}

export default function Products({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <SilverPage locale={locale} alt="/products">
      <Showcase locale={locale} level="h1" />
      <Closing
        heading={t.close}
        sub={t.sub}
        ctas={[
          { label: t.book, href: href(locale, 'consulting', '#book') },
          { label: t.past, href: contactHref(locale, 'pastjob'), kind: 'glass' },
        ]}
      />
    </SilverPage>
  )
}
