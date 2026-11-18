import { getDict } from '@/i18n'
import { IMMVELA_DESCRIPTION, IMMVELA_URL, SITE, SITE_URL } from '@/lib/site'
import { sortedPosts } from '@/lib/blog'
import { HVAC_PATH, PACK_PATH, PACK_PRODUCT_NAME, getHvac } from '@/lib/hvac'
import { TOOL_KEYS, getTool } from '@/lib/hvac-tools'

/**
 * /llms-full.txt — the whole site as one Markdown document.
 *
 * /llms.txt is a map; this is the territory. An answer engine asked "what does
 * SNS Solutions charge" or "what is Immvela" can answer from
 * this in one fetch, without crawling every page and reconstructing the
 * copy out of an animated React tree. That matters more than usual here,
 * because most of this site's substance lives inside client components behind
 * framer-motion, which is exactly the shape of content that gets skimmed badly.
 *
 * Generated from the dictionary, so it is the same copy the pages render and
 * can't drift from it. English only, by design: the German pages are a
 * translation of this same content, and shipping both would double the file to
 * say the same things twice. The German URLs are listed so a crawler can still
 * find them.
 */

const founderRoles: Record<string, string> = {
  'Samuel Winch': 'Co-founder & CTO',
  'Nicholas Pellechi': 'Co-founder & CFO',
  'Samson Belachew': 'Co-founder & CEO',
}

export function GET() {
  const t = getDict('en')
  const url = (p = '') => `${SITE_URL}${p}`

  const sections: string[] = []

  sections.push(`# ${SITE.name}: full site text

> ${SITE.description}

This file contains the complete text of ${url('/')} in one document. Source of
truth for anything below is the page it is drawn from; each section names its
URL. German translations of every page live under ${url('/de')}.

## Company

- Trading name: ${SITE.name}
- Legal name: ${SITE.legalName}
- Founded: ${SITE.foundingDate}
- Address: ${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.city}, Austria
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Languages: English and German (Austrian German, formal Sie-form)
- Area served: Austria and the DACH market
- Founders: ${SITE.founders.join(', ')}
- Real-estate platform: Immvela, on its own domain at ${IMMVELA_URL}/
- For HVAC and refrigeration manufacturers: selection software, CAD and design automation (Pack CAD, refrigeration pack design software built for each pack manufacturer), document management, quoting, ERP and service links, at ${url('/hvac')}`)

  // ── /services ────────────────────────────────────────────────────────────
  sections.push(`## Services: ${url('/services')}

### ${t.servicesPage.heading}

${t.servicesPage.intro}

${t.servicesPage.items
  .map(
    (s) => `#### ${s.name}

${s.tagline}

- **The problem:** ${s.problem}
- **What we do:** ${s.whatWeDo}
- **What you get:** ${s.outcomes.map((o) => o.replace(/\.$/, '')).join('; ')}.
- ${s.example}`
  )
  .join('\n\n')}

#### ${t.servicesPage.consult.heading}

${t.servicesPage.consult.sub}

${t.servicesPage.consult.points.map((p) => `- ${p}`).join('\n')}`)

  // ── /hvac and the pack design page ───────────────────────────────────────
  const hv = getHvac('en')
  const faq = (items: { q: string; a: string }[]) =>
    items.map((f) => `**${f.q}**\n\n${f.a}`).join('\n\n')

  sections.push(`## HVAC & refrigeration manufacturers: ${url(HVAC_PATH)}

### ${hv.hub.h1}

${hv.hub.intro}

#### ${hv.hub.flow.label}

${hv.hub.flow.steps.join(' → ')}. ${hv.hub.flow.text}

#### ${hv.hub.toolsHeading}

${hv.hub.toolsSub}

${hv.hub.tools
  .map(
    (p) => `- **${p.name}.** ${p.headline} ${p.line} ${p.points.join('; ')}.${p.href ? ` ${url(p.href)}` : ''}`
  )
  .join('\n')}

#### ${hv.hub.ai.heading}

${hv.hub.ai.body}

#### ${hv.hub.metrics.heading}

${hv.hub.metrics.rows.map((r) => `- **${r.metric}:** ${r.definition}`).join('\n')}

${hv.hub.metrics.methodHeading}: ${hv.hub.metrics.method.map((m) => `${m.k}. ${m.name}: ${m.text}`).join(' ')}

#### ${hv.hub.faqHeading}

${faq(hv.hub.faq)}`)

  for (const k of TOOL_KEYS) {
    const t = getTool('en', k)
    sections.push(`## ${t.title}: ${url(t.path)}

### ${t.h1}

${t.intro}

${t.note}

#### ${t.problems.heading}

${t.problems.items.map((x) => `- ${x.text}${x.note ? ` (${x.note})` : ''}`).join('\n')}

#### ${t.builds.heading}

${t.builds.items.map((b) => `- **${b.name}.** ${b.text}`).join('\n')}

#### ${t.metrics.heading}

${t.metrics.sub}

${t.metrics.items.map((x) => `- ${x}`).join('\n')}

#### ${t.faqHeading}

${faq(t.faq)}`)
  }

  sections.push(`## Refrigeration pack design software (${PACK_PRODUCT_NAME}): ${url(PACK_PATH)}

### ${hv.pack.h1}

${hv.pack.intro}

${hv.pack.speciality.join(' ')}

#### ${hv.pack.gap.heading}

${hv.pack.gap.sub}

${hv.pack.gap.addsHeading}:
${hv.pack.gap.adds.map(([a, b]) => `- ${a}: ${b}`).join('\n')}

#### ${hv.pack.stepsHeading}

${hv.pack.steps.map((s, i) => `${i + 1}. **${s.name}.** ${s.text}`).join('\n')}

#### ${hv.pack.rules.heading}

${hv.pack.rules.body}

${hv.pack.rules.points.map((x) => `- ${x}`).join('\n')}

#### ${hv.pack.scale.heading}

${hv.pack.scale.body}

${hv.pack.scale.items.map((x) => `- ${x}`).join('\n')}

#### ${hv.pack.outputs.heading}

${hv.pack.outputs.items.map((o) => `- **${o.name}.** ${o.text}`).join('\n')}

#### ${hv.pack.own.heading}

${hv.pack.own.body}

#### ${hv.pack.faqHeading}

${faq(hv.pack.faq)}`)

  // ── Immvela ──────────────────────────────────────────────────────────────
  // Only the public line: what Immvela is and how to get in. Its own site and its own llms files are the
  // source for anything more, so nothing here can claim more than immvela.com does.
  sections.push(`## Immvela: ${IMMVELA_URL}/

Immvela is a product of ${SITE.name} for estate agents, on its own domain with
its own ${IMMVELA_URL}/llms.txt and ${IMMVELA_URL}/llms-full.txt.

${t.productsPage.immvelaTagline} ${IMMVELA_DESCRIPTION}`)

  // ── QFUtool ──────────────────────────────────────────────────────────────
  sections.push(`## QFUtool: https://www.qfutool.com/

QFUtool is ${SITE.name}'s second product, separate from Immvela, on its own
domain. This is the summary as it appears on the SNS site.

${t.products.qfutool.tagline} ${t.products.qfutool.desc} ${t.products.qfutool.status}.`)

  // ── /blog ────────────────────────────────────────────────────────────────
  // A summary and a link per post, not the full text: the posts are the source, and an answer engine
  // quotes them from their own pages.
  sections.push(
    `## Blog: ${url('/blog')}

Notes from SNS Solutions on the problems behind our products: Immvela for estate agents, and QFUtool for salespeople chasing quotes.

${sortedPosts()
  .map(
    (post) =>
      `- [${post.title}](${url(`/blog/${post.slug}`)}), ${post.eyebrow}, ${post.date}: ${post.description}`
  )
  .join('\n')}`
  )

  // ── /products ────────────────────────────────────────────────────────────
  sections.push(`## Our products: ${url('/products')}

${t.productsPage.line}

- Immvela, ${t.products.immvela.audience.toLowerCase()}: ${t.productsPage.immvelaTagline} ${IMMVELA_URL}/
- QFUtool, ${t.products.qfutool.audience.toLowerCase()}: ${t.products.qfutool.tagline} ${t.productsPage.qfutoolPrice} https://www.qfutool.com/`)

  // ── /team ────────────────────────────────────────────────────────────────
  sections.push(`## Team: ${url('/team')}

${t.teamPage.intro}

${Object.keys(founderRoles)
  .map((name, i) => `#### ${name}, ${founderRoles[name]}\n\n${t.teamPage.bios[i]?.trim() ?? ''}`)
  .join('\n\n')}`)

  // ── /contact ─────────────────────────────────────────────────────────────
  sections.push(`## Contact: ${url('/contact')}

${t.contactPage.intro}

- ${t.contactPage.details.email}: ${SITE.email}
- Phone: ${SITE.phone}
- ${t.contactPage.details.basedIn}: ${t.contactPage.details.basedInValue}
- ${t.contactPage.details.response}: ${t.contactPage.details.responseValue}
- Inquiry types handled by the form: ${t.contactForm.services.join(', ')}

## Legal

- Imprint: ${url('/legal/imprint')}
- Privacy: ${url('/legal/privacy')}
- Terms: ${url('/legal/terms')}`)

  return new Response(sections.join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
