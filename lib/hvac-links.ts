import type { Locale } from '@/i18n/config'

/**
 * Paths and link labels for the HVAC section, apart from the copy in lib/hvac.ts and
 * lib/hvac-tools.ts so the client components that link here (Nav, Footer) don't ship the whole
 * section's text in their bundle.
 */
export const HVAC_PATH = '/hvac'
export const PACK_PATH = '/hvac/refrigeration-pack-design'
export const SELECTION_PATH = '/hvac/selection-software'
export const DOCS_PATH = '/hvac/document-management'

/** Short nav label, and the longer names used for the footer link and the breadcrumbs. */
export const HVAC_LABEL: Record<
  Locale,
  { nav: string; hub: string; pack: string; selection: string; documents: string }
> = {
  en: {
    nav: 'HVAC',
    hub: 'HVAC & refrigeration',
    pack: 'Refrigeration pack design',
    selection: 'Selection software',
    documents: 'Document management',
  },
  de: {
    nav: 'HLK & Kälte',
    hub: 'HLK & Kältetechnik',
    pack: 'Konstruktion von Kälteverbundanlagen',
    selection: 'Auslegungssoftware',
    documents: 'Dokumentenmanagement',
  },
}
