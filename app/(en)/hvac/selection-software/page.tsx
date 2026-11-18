import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import JsonLd from '@/components/JsonLd'
import ToolPage from '@/components/hvac/ToolPage'
import { toolGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { getTool } from '@/lib/hvac-tools'

const t = getTool('en', 'selection')

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

export default function SelectionSoftwarePage() {
  return (
    <>
      <JsonLd data={toolGraph('en', 'selection')} />
      <InnerShell locale="en">
        <ToolPage locale="en" tool="selection" />
      </InnerShell>
    </>
  )
}
