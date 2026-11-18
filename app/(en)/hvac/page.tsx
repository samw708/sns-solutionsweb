import type { Metadata } from 'next'
import InnerShell from '@/components/inner/InnerShell'
import JsonLd from '@/components/JsonLd'
import HvacHub from '@/components/hvac/HvacHub'
import { hvacGraph } from '@/lib/schema'
import { snsPage } from '@/lib/share'
import { HVAC_PATH, getHvac } from '@/lib/hvac'

const t = getHvac('en').hub

export const metadata: Metadata = {
  ...snsPage({
    locale: 'en',
    title: t.title,
    description: t.description,
    path: '' + HVAC_PATH,
    languages: { en: HVAC_PATH, de: '/de' + HVAC_PATH, 'x-default': HVAC_PATH },
  }),
  keywords: ['HVAC software', 'software for HVAC manufacturers', 'refrigeration manufacturer software', 'HVAC ERP integration', 'AI for HVAC manufacturers', 'HVAC KPIs', 'design automation HVAC', 'CPQ HVAC'],
}

export default function HvacHubPage() {
  return (
    <>
      <JsonLd data={hvacGraph('en')} />
      <InnerShell locale="en">
        <HvacHub locale="en" />
      </InnerShell>
    </>
  )
}
