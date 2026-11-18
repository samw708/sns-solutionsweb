import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import JsonLd from '@/components/JsonLd'
import HvacHub from '@/components/hvac/HvacHub'
import { hvacGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { HVAC_PATH, getHvac } from '@/lib/hvac'

const t = getHvac('de').hub

export const metadata: Metadata = {
  ...snsPage({
    locale: 'de',
    title: t.title,
    description: t.description,
    path: '/de' + HVAC_PATH,
    languages: { en: HVAC_PATH, de: '/de' + HVAC_PATH, 'x-default': HVAC_PATH },
  }),
  keywords: ['Software für HLK-Hersteller', 'Kältetechnik Software', 'HLK Software', 'ERP Anbindung Kältetechnik', 'KI für Hersteller', 'Kennzahlen Kältetechnik', 'Konstruktionsautomatisierung'],
}

export default function HvacHubPageDe() {
  return (
    <>
      <JsonLd data={hvacGraph('de')} />
      <InnerShell locale="de">
        <HvacHub locale="de" />
      </InnerShell>
    </>
  )
}
