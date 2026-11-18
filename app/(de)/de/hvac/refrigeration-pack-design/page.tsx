import type { Metadata } from 'next'
import SilverPage from '@/components/silver/Shell'
import JsonLd from '@/components/JsonLd'
import PackCad from '@/components/silver/hvac/PackCad'
import { packDesignGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { PACK_PATH, getHvac } from '@/lib/hvac'

const t = getHvac('de').pack

export const metadata: Metadata = {
  ...snsPage({
    locale: 'de',
    title: t.title,
    description: t.description,
    path: '/de' + PACK_PATH,
    languages: { en: PACK_PATH, de: '/de' + PACK_PATH, 'x-default': PACK_PATH },
  }),
  keywords: ['Kälteverbundanlage Konstruktion Software', 'Verbundanlage CAD', 'CO2 Booster Anlage Konstruktion', 'Konstruktionsautomatisierung Kältetechnik', 'Verdichterauslegung 3D-Modell', 'Kälteanlagen Konfigurator'],
}

export default function PackDesignPageDe() {
  return (
    <>
      <JsonLd data={packDesignGraph('de')} />
      <SilverPage locale="de" alt={PACK_PATH}>
        <PackCad locale="de" />
      </SilverPage>
    </>
  )
}
