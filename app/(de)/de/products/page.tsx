import type { Metadata } from 'next'
import { getDict } from '@/i18n'
import { snsPage } from '@/lib/share'
import Products from '@/components/silver/home/Products'
import JsonLd from '@/components/JsonLd'
import { productsGraph } from '@/lib/schema'

const t = getDict('de').productsPage

export const metadata: Metadata = snsPage({
  locale: 'de',
  title: t.title,
  description: t.description,
  path: '/de/products',
  languages: { en: '/products', de: '/de/products', 'x-default': '/products' },
  card: 'products',
})

export default function ProductsPageDe() {
  return (
    <>
      <JsonLd data={productsGraph('de')} />
      <Products locale="de" />
    </>
  )
}
