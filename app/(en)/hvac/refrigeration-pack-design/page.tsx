import type { Metadata } from 'next'
import SilverPage from '@/components/silver/Shell'
import JsonLd from '@/components/JsonLd'
import PackCad from '@/components/silver/hvac/PackCad'
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
      <SilverPage locale="en" alt={PACK_PATH}>
        <PackCad locale="en" />
      </SilverPage>
    </>
  )
}
