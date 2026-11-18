import type { Metadata } from 'next'
import SilverPage from '@/components/silver/Shell'
import JsonLd from '@/components/JsonLd'
import ToolPage from '@/components/silver/hvac/ToolPage'
import { toolGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { getTool } from '@/lib/hvac-tools'

const t = getTool('en', 'documents')

export const metadata: Metadata = {
  ...snsPage({
    locale: 'en',
    title: t.title,
    description: t.description,
    path: '' + t.path,
    languages: { en: t.path, de: '/de' + t.path, 'x-default': t.path },
  }),
  keywords: t.keywords,
}

export default function DocumentManagementPage() {
  return (
    <>
      <JsonLd data={toolGraph('en', 'documents')} />
      <SilverPage locale="en" alt={t.path}>
        <ToolPage locale="en" tool="documents" />
      </SilverPage>
    </>
  )
}
