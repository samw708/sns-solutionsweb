import { getDict } from '@/i18n'
import { localePath, type Locale } from '@/i18n/config'
import { IMMVELA_URL, SITE, SITE_URL } from '@/lib/site'
import { sortedPosts, type BlogPost } from '@/lib/blog'
import { HVAC_PATH, PACK_PATH, PACK_PRODUCT_NAME, getHvac, type Faq } from '@/lib/hvac'
import { DOCS_PATH, HVAC_LABEL, SELECTION_PATH } from '@/lib/hvac-links'
import { type ToolKey, getTool } from '@/lib/hvac-tools'

/**
 * Structured data for the SNS pages.
 *
 * The root layout emits the site-wide Organization node and the homepage emits
 * the WebSite node; everything here is the *per-page* layer that was missing —
 * a WebPage/CollectionPage node, a BreadcrumbList, and whatever entity the page
 * is actually about (Service, Person, FAQ). Every node points back at the two
 * site-wide nodes by @id, so a crawler assembling the graph gets one connected
 * entity rather than a pile of unrelated pages.
 *
 * The `@id` values are the contract between files — change one here and the
 * reference in app/layout.tsx, components/SnsWebSiteSchema.tsx or
 * lib/immvela-schema.ts has to change with it.
 */

export const SNS_ORG_ID = `${SITE_URL}/#organization`
export const SNS_WEBSITE_ID = `${SITE_URL}/#website`

/** Immvela's SoftwareApplication node, which lives on the immvela.com pages. */
export const IMMVELA_SOFTWARE_ID = `${IMMVELA_URL}/#software`

/**
 * Profiles that belong to the SNS entity.
 *
 * `sameAs` is what lets a search or answer engine tie sns-austria.com, the
 * LinkedIn page and the Instagram account together as one organization instead
 * of three unrelated mentions of a similar name. It is the cheapest
 * disambiguation signal there is, and it matters most for a company nobody has
 * heard of yet — which is exactly the case here.
 *
 * Kept in sync with the SOCIALS maps in components/Footer.tsx and
 * components/ImmvelaFooter.tsx.
 */
export const SNS_SOCIALS = [
  'https://www.linkedin.com/company/sns-solutionswien/',
  'https://www.instagram.com/sns_solutions_/',
]

/**
 * The site-wide Organization node, rendered by both root layouts.
 *
 * It runs on immvela.com too — that's deliberate and harmless, because
 * Immvela's own schema names this organization as its `brand`/`creator` by @id
 * and the reference has to resolve. The matching WebSite node deliberately does
 * *not* live here; see snsWebSiteNode() below.
 */
export function snsOrganizationNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': SNS_ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: SITE.foundingDate,
    logo: `${SITE_URL}/sns-icon.png`,
    image: `${SITE_URL}/og/sns-en.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Austria' },
    // Ties sns-austria.com to the LinkedIn and Instagram profiles as one
    // entity. Without it the three are just similarly-named strangers to a
    // crawler, which is the difference between a knowledge-graph entity and an
    // unrecognised brand for a company this new.
    sameAs: SNS_SOCIALS,
    contactPoint: contactPoint('en'),
    // @id'd rather than inlined by name, so the fuller Person nodes on /team
    // (job title, bio, employer) merge with these references instead of
    // standing beside them as unrelated people of the same name.
    founder: FOUNDER_REFS,
    knowsAbout: [
      'Custom software development',
      'AI automation',
      'AI agents',
      'Data pipelines',
      'IT consulting',
      'HVAC and refrigeration manufacturing software',
      'HVAC selection software',
      'Technical document management',
      'Refrigeration pack design',
      'CO2 transcritical booster refrigeration',
      'Rules-based design automation',
      'CAD, PDM and ERP integration',
      'Manufacturing KPIs',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: SITE.services.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }
}

/** BCP-47 tag for a locale. The German site is Austrian German, not de-DE. */
export function langTag(locale: Locale): string {
  return locale === 'de' ? 'de-AT' : 'en'
}

/** Absolute URL for a path in a locale — `/services` + 'de' → …/de/services. */
export function pageUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`
}

/**
 * Breadcrumb labels, by path. A breadcrumb trail is what turns the bare URL
 * under a search result into a readable hierarchy, and it tells an answer
 * engine where a page sits in the site rather than leaving it to guess from the
 * slug. The nav dictionary can't be reused for this: its labels are lowercased
 * for the nav's own typography ("custom builds").
 */
const CRUMB_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    '/': 'Home',
    '/services': 'Services',
    '/team': 'Team',
    '/contact': 'Contact',
    '/blog': 'Blog',
    '/products': 'Our products',
    [HVAC_PATH]: getHvac('en').crumbHub,
    [PACK_PATH]: getHvac('en').crumbPack,
    [SELECTION_PATH]: HVAC_LABEL.en.selection,
    [DOCS_PATH]: HVAC_LABEL.en.documents,
  },
  de: {
    '/': 'Start',
    '/services': 'Leistungen',
    '/team': 'Team',
    '/contact': 'Kontakt',
    '/blog': 'Blog',
    '/products': 'Unsere Produkte',
    [HVAC_PATH]: getHvac('de').crumbHub,
    [PACK_PATH]: getHvac('de').crumbPack,
    [SELECTION_PATH]: HVAC_LABEL.de.selection,
    [DOCS_PATH]: HVAC_LABEL.de.documents,
  },
}

/** `/a/b` → ['/', '/a', '/a/b'] — every ancestor of a path, root first. */
function ancestors(path: string): string[] {
  const parts = path.split('/').filter(Boolean)
  return ['/', ...parts.map((_, i) => `/${parts.slice(0, i + 1).join('/')}`)]
}

/**
 * `currentName` labels the deepest crumb (the page itself) when its path isn't
 * a static one in CRUMB_LABELS — which is every dynamic route, e.g. a blog
 * post's /blog/<slug>. Static ancestors along the way (e.g. /blog itself)
 * still resolve from CRUMB_LABELS as normal.
 */
function breadcrumb(locale: Locale, path: string, currentName?: string) {
  const anc = ancestors(path)
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(locale, path)}#breadcrumb`,
    itemListElement: anc.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: CRUMB_LABELS[locale][p] ?? (i === anc.length - 1 ? currentName : undefined) ?? p,
      item: pageUrl(locale, p),
    })),
  }
}

type PageNode = {
  /** WebPage subtype — CollectionPage for indexes, AboutPage for /team, etc. */
  type?: string
  name: string
  description: string
}

function webPage(locale: Locale, path: string, { type = 'WebPage', name, description }: PageNode) {
  const url = pageUrl(locale, path)
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: langTag(locale),
    isPartOf: { '@id': SNS_WEBSITE_ID },
    about: { '@id': SNS_ORG_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    publisher: { '@id': SNS_ORG_ID },
  }
}

/**
 * The WebSite node for sns-austria.com.
 *
 * Every WebPage below says `isPartOf: { '@id': …#website }`, and a reference to
 * a node the page never defines tells a consumer nothing — so the node ships
 * with each page's own graph rather than being left to the homepage. It can't
 * simply go back in the root layout (where it used to live): that layout also
 * renders on immvela.com, where a node asserting "this site is SNS Solutions"
 * directly contradicts Immvela's own WebSite node, and the site name in search
 * results is read from exactly that node. Nothing in lib/schema.ts renders on
 * immvela.com, so putting it here is safe.
 *
 * components/SnsWebSiteSchema.tsx renders this same node on the two homepages,
 * which have no per-page graph of their own.
 */
export function snsWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SNS_WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    alternateName: SITE.legalName,
    description: SITE.description,
    // Both, always. This node has one @id for the whole site, so making
    // `inLanguage` follow the rendering locale would have the English and
    // German copies publish two contradictory versions of the same node — the
    // site is bilingual regardless of which copy you are looking at.
    inLanguage: ['en', 'de-AT'],
    publisher: { '@id': SNS_ORG_ID },
  }
}

/** Assemble a page's @graph: the page node, its breadcrumb, then its entities. */
function graph(locale: Locale, path: string, page: PageNode, ...entities: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage(locale, path, page),
      breadcrumb(locale, path, page.name),
      snsWebSiteNode(),
      ...entities,
    ],
  }
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Where SNS sells. The Organization node claims Austria (where the company is);
 * the product pages say "built for the DACH market" in their own copy, so the
 * services and products they describe claim the three DACH countries. Don't
 * widen either one past what a page actually says.
 */
const DACH = ['Austria', 'Germany', 'Switzerland'].map((name) => ({
  '@type': 'Country',
  name,
}))

const AUSTRIA = [{ '@type': 'Country', name: 'Austria' }]

/**
 * The founders, as referenceable entities.
 *
 * The Organization node in the root layout used to inline them as bare
 * `{ '@type': 'Person', name }` objects, which is three anonymous strings as
 * far as a graph is concerned. Giving each a stable @id means the richer node
 * on /team (job title, bio, employer) merges with the reference from the
 * Organization instead of sitting beside it as an unrelated person of the same
 * name. Roles are the ones shown in components/Founders.tsx.
 */
const FOUNDERS = [
  { name: 'Samuel Winch', jobTitle: 'Co-founder & CTO' },
  { name: 'Nicholas Pellechi', jobTitle: 'Co-founder & CFO' },
  { name: 'Samson Belachew', jobTitle: 'Co-founder & CEO' },
]

export function founderId(name: string): string {
  return `${SITE_URL}/team#${slug(name)}`
}

/** Bare @id references, for the `founder` property of the Organization node. */
export const FOUNDER_REFS = FOUNDERS.map((f) => ({
  '@type': 'Person',
  '@id': founderId(f.name),
  name: f.name,
}))

/** How to reach SNS. Attached to the Organization from the contact page. */
export function contactPoint(locale: Locale) {
  return {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: DACH.map((c) => c.name),
    availableLanguage: ['German', 'English'],
    url: pageUrl(locale, '/contact'),
  }
}

// ── Per-page graphs ────────────────────────────────────────────────────────
// One export per route, taking the locale. Each page renders exactly one of
// these, so the EN and DE copies of a route can't describe themselves
// differently by accident.

/**
 * /services — the three service lines as first-class Service entities.
 *
 * Without these, "what does SNS Solutions do" was answerable only from prose.
 * A Service node names the offering, ties it to the provider by @id, and states
 * where it's offered, which is precisely the shape an answer engine can quote.
 */
export function servicesGraph(locale: Locale) {
  const t = getDict(locale).servicesPage
  const url = pageUrl(locale, '/services')

  const services = t.items.map((item) => ({
    '@type': 'Service',
    '@id': `${url}#${slug(item.name)}`,
    name: item.name,
    serviceType: item.name,
    // The tagline is the one-line definition; `problem`/`whatWeDo` are the
    // page's own explanation of the offering, and both are visible on the page.
    description: `${item.tagline} ${item.whatWeDo}`,
    provider: { '@id': SNS_ORG_ID },
    areaServed: AUSTRIA,
    audience: { '@type': 'BusinessAudience', name: 'Businesses' },
  }))

  return graph(
    locale,
    '/services',
    {
      type: 'CollectionPage',
      name: t.heading,
      description: t.intro,
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: t.heading,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@id': s['@id'] },
      })),
    },
    ...services,
    // The free consultation is a real, priced offer (zero) that the page states
    // outright — worth declaring rather than leaving buried in body copy.
    {
      '@type': 'Offer',
      '@id': `${url}#consultation`,
      name: t.consult.heading,
      description: t.consult.sub,
      price: 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      offeredBy: { '@id': SNS_ORG_ID },
      url: pageUrl(locale, '/contact'),
    }
  )
}

/** /team — the founders as Person entities, merged into the Organization. */
export function teamGraph(locale: Locale) {
  const t = getDict(locale).teamPage

  const people = FOUNDERS.map((f, i) => ({
    '@type': 'Person',
    '@id': founderId(f.name),
    name: f.name,
    jobTitle: f.jobTitle,
    // Bios are ordered to match the FOUNDERS list — same contract as
    // components/Founders.tsx, which renders them against the same order.
    description: t.bios[i]?.trim(),
    worksFor: { '@id': SNS_ORG_ID },
    url: pageUrl(locale, '/team'),
  }))

  return graph(
    locale,
    '/team',
    { type: 'AboutPage', name: t.heading, description: t.intro },
    ...people
  )
}

/** /contact — a ContactPage plus the contact point it describes. */
export function contactGraph(locale: Locale) {
  const t = getDict(locale).contactPage

  return graph(
    locale,
    '/contact',
    { type: 'ContactPage', name: t.heading, description: t.intro },
    {
      '@type': 'Organization',
      '@id': SNS_ORG_ID,
      contactPoint: contactPoint(locale),
    }
  )
}

/** Absolute URL for a blog post, e.g. /blog/immvela-one-record-… */
export function blogPostUrl(locale: Locale, slug: string): string {
  return pageUrl(locale, `/blog/${slug}`)
}

/**
 * A post's BlogPosting node, shared between the index (a summary of every
 * post) and the post's own page (the same node, plus its full body). Kept as
 * one function so the two can't describe a post differently by accident.
 */
function blogPostingNode(locale: Locale, post: BlogPost) {
  const url = blogPostUrl(locale, post.slug)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: langTag(locale),
    articleSection: post.eyebrow,
    // Attributed to the studio rather than a named founder — nothing on the
    // posts themselves claims individual authorship, so the byline shouldn't
    // invent one.
    author: { '@id': SNS_ORG_ID },
    publisher: { '@id': SNS_ORG_ID },
    image: `${SITE_URL}/og/sns-en.png`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': `${pageUrl(locale, '/blog')}#blog` },
  }
}

/**
 * /blog — the index, as a Blog node plus a BlogPosting summary of every post.
 * Each post also gets its own richer graph on its own page (blogPostGraph);
 * this is deliberately the lighter, list-shaped version of the same nodes.
 */
export function blogIndexGraph(locale: Locale) {
  const posts = sortedPosts()
  const url = pageUrl(locale, '/blog')
  const postings = posts.map((p) => blogPostingNode(locale, p))

  return graph(
    locale,
    '/blog',
    {
      type: 'CollectionPage',
      name: 'Blog',
      description:
        'Notes from SNS Solutions on the problems behind our products: Immvela for estate agents, and QFUtool for salespeople chasing quotes.',
    },
    {
      '@type': 'Blog',
      '@id': `${url}#blog`,
      name: 'SNS Solutions Blog',
      url,
      publisher: { '@id': SNS_ORG_ID },
      blogPost: postings.map((p) => ({ '@id': p['@id'] })),
    },
    ...postings
  )
}

/**
 * /blog/<slug> — one post's BlogPosting (with its full text as `articleBody`,
 * which is the one thing the index's lighter summary above leaves out) plus
 * its FAQPage, when the post has one. FAQPage is what lets an answer engine
 * quote a post's Q&A pairs directly rather than summarising the prose.
 */
export function blogPostGraph(locale: Locale, post: BlogPost) {
  const url = blogPostUrl(locale, post.slug)
  const posting = {
    ...blogPostingNode(locale, post),
    articleBody: [...post.intro, ...post.sections.flatMap((s) => s.paragraphs ?? [])].join('\n\n'),
  }

  const entities: object[] = [posting]

  if (post.faq.length) {
    entities.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return graph(
    locale,
    `/blog/${post.slug}`,
    { name: post.title, description: post.description },
    ...entities
  )
}

/** /products: the two products SNS makes, each pointing at its own site. */
export function productsGraph(locale: Locale) {
  const t = getDict(locale).productsPage
  const url = pageUrl(locale, '/products')
  const de = locale === 'de'
  const qfutool = {
    '@type': 'SoftwareApplication',
    '@id': 'https://www.qfutool.com/#software',
    name: 'QFUtool',
    url: de ? 'https://www.qfutool.com/de' : 'https://www.qfutool.com',
    description: de
      ? 'Automatisches Nachfassen von versendeten Angeboten für Vertriebsmitarbeiter, aus der eigenen Domain und zu Geschäftszeiten.'
      : 'Automated follow-up on sent quotes for salespeople, sent from their own domain during working hours.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    areaServed: DACH,
    creator: { '@id': SNS_ORG_ID },
    publisher: { '@id': SNS_ORG_ID },
  }
  const immvela = {
    '@type': 'SoftwareApplication',
    '@id': IMMVELA_SOFTWARE_ID,
    name: 'Immvela',
    url: de ? `${IMMVELA_URL}/de` : IMMVELA_URL,
    description: t.immvelaTagline,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    areaServed: DACH,
    creator: { '@id': SNS_ORG_ID },
    publisher: { '@id': SNS_ORG_ID },
  }
  return graph(
    locale,
    '/products',
    { type: 'CollectionPage', name: t.heading, description: t.description },
    {
      '@type': 'ItemList',
      '@id': `${url}#products`,
      name: t.heading,
      itemListElement: [immvela, qfutool].map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@id': p['@id'] },
      })),
    },
    immvela,
    qfutool
  )
}

// ── HVAC & refrigeration ───────────────────────────────────────────────────

/**
 * Where the HVAC pages say SNS works: "manufacturers across Europe" (lib/hvac.ts, hub FAQ). Wider
 * than DACH on purpose and only here, because only these pages say so.
 */
const EUROPE = [{ '@type': 'Place', name: 'Europe' }]

const HVAC_AUDIENCE = {
  '@type': 'BusinessAudience',
  name: 'HVAC and refrigeration equipment manufacturers',
}

export const PACK_SOFTWARE_ID = `${SITE_URL}${PACK_PATH}#software`

function faqPage(url: string, items: Faq[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** /hvac — the six tools as Service nodes, the metrics as a DefinedTermSet, and the FAQ. */
export function hvacGraph(locale: Locale) {
  const c = getHvac(locale)
  const t = c.hub
  const url = pageUrl(locale, HVAC_PATH)

  // A tool with its own page points at that page's node instead of being described twice.
  const ownPage: Record<string, string> = {
    selection: `${pageUrl(locale, SELECTION_PATH)}#service`,
    documents: `${pageUrl(locale, DOCS_PATH)}#service`,
  }
  const services = t.tools.map((p) => ({
    '@type': 'Service',
    '@id': ownPage[p.id] ?? `${url}#${p.id}`,
    name: p.name,
    serviceType: p.name,
    description: `${p.tagline} ${p.points.join('. ')}.`,
    provider: { '@id': SNS_ORG_ID },
    areaServed: EUROPE,
    audience: HVAC_AUDIENCE,
    ...(p.href ? { url: pageUrl(locale, p.href) } : {}),
    ...(p.id === 'cad' ? { isRelatedTo: { '@id': PACK_SOFTWARE_ID } } : {}),
  }))

  return graph(
    locale,
    HVAC_PATH,
    { name: t.title, description: t.description },
    {
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: t.toolsHeading,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@id': s['@id'] },
      })),
    },
    ...services,
    // The metrics table, as defined terms: each is a definition an answer engine can quote.
    {
      '@type': 'DefinedTermSet',
      '@id': `${url}#metrics`,
      name: t.metrics.heading,
      hasDefinedTerm: t.metrics.rows.map((r) => ({
        '@type': 'DefinedTerm',
        name: r.metric,
        description: r.definition,
      })),
    },
    faqPage(url, t.faq)
  )
}

/**
 * /hvac/refrigeration-pack-design — the software itself. No `offers`: it is not on sale, and
 * `creativeWorkStatus` says so in the graph the same way the status line says so on the page.
 */
export function packDesignGraph(locale: Locale) {
  const c = getHvac(locale)
  const t = c.pack
  const url = pageUrl(locale, PACK_PATH)

  return graph(
    locale,
    PACK_PATH,
    { name: t.title, description: t.description },
    {
      '@type': 'SoftwareApplication',
      '@id': PACK_SOFTWARE_ID,
      name: PACK_PRODUCT_NAME,
      alternateName: t.title,
      url,
      description: `${t.intro} ${t.status}`,
      slogan: t.h1,
      applicationCategory: 'DesignApplication',
      applicationSubCategory: 'Refrigeration pack design automation',
      operatingSystem: 'Web',
      creativeWorkStatus: 'In development',
      featureList: t.steps.map((s) => `${s.name}: ${s.text}`),
      audience: HVAC_AUDIENCE,
      areaServed: EUROPE,
      inLanguage: ['en', 'de'],
      creator: { '@id': SNS_ORG_ID },
      publisher: { '@id': SNS_ORG_ID },
    },
    faqPage(url, t.faq)
  )
}

/** /hvac/selection-software and /hvac/document-management — a Service SNS builds, plus the FAQ. */
export function toolGraph(locale: Locale, key: ToolKey) {
  const t = getTool(locale, key)
  const url = pageUrl(locale, t.path)

  return graph(
    locale,
    t.path,
    { name: t.title, description: t.description },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t.title,
      serviceType: t.eyebrow,
      description: t.intro,
      url,
      provider: { '@id': SNS_ORG_ID },
      areaServed: EUROPE,
      audience: HVAC_AUDIENCE,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.builds.heading,
        itemListElement: t.builds.items.map((b) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: b.name, description: b.text },
        })),
      },
      isPartOf: { '@id': `${pageUrl(locale, HVAC_PATH)}#services` },
    },
    faqPage(url, t.faq)
  )
}
