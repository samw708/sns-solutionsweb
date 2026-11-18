import { type Locale, immvelaHref, localePath } from '@/i18n/config'
import { DOCS_PATH, HVAC_PATH, PACK_PATH, SELECTION_PATH } from '@/lib/hvac-links'

/**
 * Every route the silver site links to, per locale. The URLs are the ones the site already had (search engines know
 * them), whatever the page is now called: Consulting lives at /services, Company at /team, Insights at /blog.
 */
export const QFUTOOL_URL = 'https://qfutool.com'

export const PATHS = {
  home: '/',
  products: '/products',
  hvac: HVAC_PATH,
  pack: PACK_PATH,
  selection: SELECTION_PATH,
  documents: DOCS_PATH,
  consulting: '/services',
  company: '/team',
  insights: '/blog',
  contact: '/contact',
  imprint: '/legal/imprint',
  privacy: '/legal/privacy',
  terms: '/legal/terms',
} as const

export type PageKey = keyof typeof PATHS

export function href(locale: Locale, key: PageKey, hash = ''): string {
  return localePath(locale, PATHS[key]) + hash
}

/** The contact page with the subject chosen, e.g. "Send us a past job" → HVAC. */
export function contactHref(locale: Locale, topic?: 'hvac' | 'pastjob'): string {
  return href(locale, 'contact') + (topic ? `?topic=${topic}` : '')
}

export { immvelaHref }
