import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Building blocks for the inner pages (app/inner.css). Server components: every word has to be in
 * the HTML a crawler receives.
 */

/**
 * A headline with its closing phrase in italics, the homepage's signature ("What took hours
 * yesterday *now handles itself.*"). Pass `em` to name the phrase; otherwise the part after the last
 * comma is used, and a headline with no comma stays upright. Purely presentational: the copy itself
 * stays plain, so schema and llms.txt never see markup.
 */
export function Em({ text, em }: { text: string; em?: string }) {
  let i = em ? text.lastIndexOf(em) : -1
  let len = em?.length ?? 0
  if (i < 0 && !em) {
    const c = text.lastIndexOf(', ')
    if (c > 0) {
      i = c + 2
      len = text.length - i
    }
  }
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <em>{text.slice(i, i + len)}</em>
      {text.slice(i + len)}
    </>
  )
}

export function Arrow() {
  return (
    <span className="in-arrow" aria-hidden="true">
      →
    </span>
  )
}

export function Btn({
  href,
  children,
  secondary = false,
  className = '',
}: {
  href: string
  children: ReactNode
  secondary?: boolean
  className?: string
}) {
  return (
    <Link href={href} className={`${secondary ? 'in-btn2' : 'in-btn'} ${className}`}>
      {children}
      <Arrow />
    </Link>
  )
}

export function CheckList({ items, plus = false }: { items: string[]; plus?: boolean }) {
  return (
    <ul className={plus ? 'in-checks is-plus' : 'in-checks'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/**
 * The FAQ, visible on the page. The same array feeds the FAQPage JSON-LD, and search engines only
 * honour FAQ markup whose answers are visible, so the answers are never hidden behind a click.
 */
export function FaqList({
  heading,
  items,
  id,
}: {
  heading: string
  items: { q: string; a: string }[]
  id: string
}) {
  return (
    <section aria-labelledby={id} className="in-section">
      <h2 id={id} className="in-h2 in-head">
        <Em text={heading} />
      </h2>
      <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.q} className="hm-glass in-panel-sm">
            <dt className="text-[17px] font-semibold leading-snug text-[color:var(--hm-ink)]">{f.q}</dt>
            <dd className="in-body mt-3">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** The closing ask: a glass band with one dark pill. */
export function ClosingCard({
  heading,
  sub,
  cta,
  href,
  em,
}: {
  heading: string
  sub: string
  cta: string
  href: string
  em?: string
}) {
  return (
    <section className="hm-glass in-panel in-section flex flex-wrap items-center justify-between gap-7">
      <div className="max-w-2xl">
        <h2 className="in-h2">
          <Em text={heading} em={em} />
        </h2>
        <p className="in-lead mt-4">{sub}</p>
      </div>
      <Btn href={href}>{cta}</Btn>
    </section>
  )
}
