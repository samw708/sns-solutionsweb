import type { Metadata } from 'next'
import SilverPage from '@/components/silver/Shell'
import JsonLd from '@/components/JsonLd'
import ToolPage from '@/components/silver/hvac/ToolPage'
import { toolGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { getTool } from '@/lib/hvac-tools'

const t = getTool('de', 'documents')

export const metadata: Metadata = {
  ...snsPage({
    locale: 'de',
    title: t.title,
    description: t.description,
    path: '/de' + t.path,
    languages: { en: t.path, de: '/de' + t.path, 'x-default': t.path },
  }),
  keywords: t.keywords,
}

export default function DocumentManagementPageDe() {
  return (
    <>
      <JsonLd data={toolGraph('de', 'documents')} />
      <SilverPage locale="de" alt={t.path}>
        <ToolPage locale="de" tool="documents" />
      </SilverPage>
    </>
  )
}
