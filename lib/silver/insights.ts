import type { Locale } from '@/i18n/config'
import type { BlogPost, BlogProduct } from '@/lib/blog'

/** Insights (the blog) in the silver site: category names, images and dates. Posts themselves stay in lib/blog.ts. */

export const CATEGORY: Record<Locale, Record<BlogProduct, string>> = {
  en: { immvela: 'Real estate', qfutool: 'Sales' },
  de: { immvela: 'Immobilien', qfutool: 'Vertrieb' },
}

/** The card image for each post (public/sns/site). A post without one shows without a picture. */
export const CARD_IMAGE: Record<string, string> = {
  'real-estate-data-fragmentation': '/sns/site/article-fragmentation-card.jpg',
  'immvela-one-record-real-estate-operating-system': '/sns/site/evening-reel-poster.jpg',
  'why-quotes-go-unanswered': '/sns/site/article-quote-card.jpg',
  'ai-outbound-for-service-businesses': '/sns/site/article-outbound-card.jpg',
  'ai-infrastructure-for-real-estate-agencies': '/sns/site/article-infrastructure-card.jpg',
}

/** The wide image at the top of an article, where one was made for it. */
export const HERO_IMAGE: Record<string, { src: string; alt: string }> = {
  'real-estate-data-fragmentation': {
    src: '/sns/site/article-fragmentation.jpg',
    alt: 'The same floor plan drawn five times, each with a different area circled.',
  },
}

export const FEATURED = 'real-estate-data-fragmentation'

export function postDate(locale: Locale, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(locale === 'de' ? 'de-AT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function readTime(locale: Locale, rt: string): string {
  return locale === 'de' ? rt.replace(/(\d+) min read/, '$1 Min. Lesezeit') : rt
}

export type Card = {
  slug: string
  title: string
  description: string
  cat: string
  meta: string
  img?: string
}

export function card(locale: Locale, p: BlogPost): Card {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    cat: CATEGORY[locale][p.product],
    meta: `${CATEGORY[locale][p.product]}, ${postDate(locale, p.date)}, ${readTime(locale, p.readTime)}`,
    img: CARD_IMAGE[p.slug],
  }
}
