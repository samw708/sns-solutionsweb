import type { Metadata } from 'next'
import { getDict } from '@/i18n'
import { snsPage } from '@/lib/share'
import Products from '@/components/silver/home/Products'
import JsonLd from '@/components/JsonLd'
import { productsGraph } from '@/lib/schema'

const t = getDict('en').productsPage

export const metadata: Metadata = snsPage({
  locale: 'en',
  title: t.title,
  description: t.description,
  path: '/products',
  languages: { en: '/products', de: '/de/products', 'x-default': '/products' },
  card: 'products',
})

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={productsGraph('en')} />
      <Products locale="en" />
    </>
  )
}
