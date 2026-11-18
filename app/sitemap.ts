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

  // English only, no `de` alternate — the blog doesn't have a German
  // translation yet (see lib/blog.ts), so there's no second language to point
  // at. `lastModified` uses each post's own date rather than `now`, the same
  // way a real blog's sitemap would.
  const blog: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
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
