import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import JsonLd from '@/components/JsonLd'
import PackDesign from '@/components/hvac/PackDesign'
import { packDesignGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { PACK_PATH, getHvac } from '@/lib/hvac'

const t = getHvac('en').pack

export const metadata: Metadata = {
  ...snsPage({
    locale: 'en',
    title: t.title,
    description: t.description,
    path: '' + PACK_PATH,
    languages: { en: PACK_PATH, de: '/de' + PACK_PATH, 'x-default': PACK_PATH },
  }),
  keywords: ['refrigeration pack design software', 'compressor rack design software', 'refrigeration rack CAD', 'CO2 transcritical booster pack design', 'design automation refrigeration', 'compressor selection to 3D model', 'STEP export refrigeration pack'],
}

export default function PackDesignPage() {
  return (
    <>
      <JsonLd data={packDesignGraph('en')} />
      <InnerShell locale="en">
        <PackDesign locale="en" />
      </InnerShell>
    </>
  )
}
