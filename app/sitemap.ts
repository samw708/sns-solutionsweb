import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOG_POSTS } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Marketing pages exist in English (default, unprefixed) and German (/de),
  // each declaring the other as an hreflang alternate.
  const bilingual = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/products', changeFrequency: 'monthly' as const, priority: 0.9 },
    // HVAC & refrigeration manufacturers (lib/hvac.ts). The old /solutions/hvac
    // URLs 301 here (middleware.ts); a sitemap lists only URLs that answer 200,
    // so the redirects themselves stay out. Immvela isn't advertised here
    // either: it has its own domain and its own sitemap.
    { path: '/hvac', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/hvac/selection-software', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/hvac/document-management', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/hvac/refrigeration-pack-design', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/team', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.8 },
  ]

  const marketing: MetadataRoute.Sitemap = bilingual.flatMap(
    ({ path, changeFrequency, priority }) => {
      const en = `${SITE_URL}${path}` || SITE_URL
      const de = `${SITE_URL}/de${path}`
      const languages = { en, de }
      return [
        { url: en, lastModified: now, changeFrequency, priority, alternates: { languages } },
        { url: de, lastModified: now, changeFrequency, priority, alternates: { languages } },
      ]
    }
  )

  // The blog in both languages: each post's English and German pages name each other as alternates
  // (lib/blog.ts + lib/blog-de.ts). `lastModified` uses the post's own date rather than `now`, the way a
  // real blog's sitemap would.
  const pair = (path: string) => ({ en: `${SITE_URL}${path}`, de: `${SITE_URL}/de${path}` })
  const index = pair('/blog')
  const blog: MetadataRoute.Sitemap = [
    ...(['en', 'de'] as const).map((l) => ({
      url: index[l],
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: { languages: index },
    })),
    ...BLOG_POSTS.flatMap((post) => {
      const p = pair(`/blog/${post.slug}`)
      return (['en', 'de'] as const).map((l) => ({
        url: p[l],
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: { languages: p },
      }))
    }),
  ]

  const legal: MetadataRoute.Sitemap = ['/legal/imprint', '/legal/privacy', '/legal/terms'].flatMap(
    (path) => {
      const en = `${SITE_URL}${path}`
      const de = `${SITE_URL}/de${path}`
      const languages = { en, de }
      return [
        {
          url: en,
          lastModified: now,
          changeFrequency: 'yearly' as const,
          priority: 0.3,
          alternates: { languages },
        },
        {
          url: de,
          lastModified: now,
          changeFrequency: 'yearly' as const,
          priority: 0.3,
          alternates: { languages },
        },
      ]
    }
  )

  return [...marketing, ...blog, ...legal]
}
