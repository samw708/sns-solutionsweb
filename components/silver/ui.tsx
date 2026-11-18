import Link from 'next/link'
import Video from './Video'

/**
 * The building blocks every silver page is made of. Each one mirrors a helper in the canvas generator
 * (gen_site.py: sec, btns, faq, closing, crumb, film, lfilm, pic), so a page reads the same in both places.
 */

export const SEC_PAD = 'min(13vh,120px)'

/** The three soft lights that drift behind a "pearl" section. */
export function Lights() {
  return (
    <div className="lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  )
}

/** One page section: a band of colour with the 1240 px column inside. `pearl` adds the drifting lights. */
export function Sec({
  children,
  bg = 'var(--plain)',
  pearl = false,
  pad = [SEC_PAD, SEC_PAD],
  id,
  innerStyle,
  className,
}: {
  children: React.ReactNode
  bg?: string
  pearl?: boolean
  pad?: [string, string]
  id?: string
  innerStyle?: React.CSSProperties
  className?: string
}) {
  return (
    <section id={id} className={[pearl ? 'pearl' : '', className || ''].join(' ').trim() || undefined} style={{ background: bg }}>
      {pearl && <Lights />}
      <div className="w" style={{ paddingTop: pad[0], paddingBottom: pad[1], position: 'relative', zIndex: 2, ...innerStyle }}>
        {children}
      </div>
    </section>
  )
}

/** Several sections sharing one pearl ground (the canvas `joined`). */
export function Joined({ children }: { children: React.ReactNode }) {
  return (
    <div className="pearl" style={{ background: 'var(--base)' }}>
      <Lights />
      {children}
    </div>
  )
}

export type Cta = { label: string; href: string; kind?: 'dark' | 'glass'; external?: boolean }

export function Btn({ label, href, kind = 'dark', external, style, className }: Cta & { style?: React.CSSProperties; className?: string }) {
  const cls = `btn ${kind}${className ? ' ' + className : ''}`
  if (external || /^https?:/.test(href))
    return (
      <a className={cls} href={href} style={style} target="_blank" rel="noopener">
        {label}
      </a>
    )
  return (
    <Link className={cls} href={href} style={style}>
      {label}
    </Link>
  )
}

export function Btns({ items, center = false, style }: { items: Cta[]; center?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: center ? 'center' : undefined, ...style }}>
      {items.map((b) => (
        <Btn key={b.label} {...b} />
      ))}
    </div>
  )
}

/** Breadcrumb: "Industries / HVAC & Refrigeration / Pack CAD". Items with an href are links. */
export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumb2">
      {items.map((c, i) => (
        <span key={c.label}>
          {i > 0 && ' / '}
          {c.href ? (
            <Link href={c.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              {c.label}
            </Link>
          ) : (
            <span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export type Faq = { q: string; a: string }

/** Heading left, questions right; the first one open. Render the same list as FAQPage JSON-LD. */
export function FaqSection({ heading, items, bg }: { heading: string; items: Faq[]; bg?: string }) {
  return (
    <Sec bg={bg}>
      <div className="row2">
        <h2 className="k2">{heading}</h2>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Sec>
  )
}

/** The centred call to action at the foot of a page. */
export function Closing({ heading, sub, ctas }: { heading: string; sub: string; ctas: Cta[] }) {
  return (
    <Sec bg="var(--base)" pearl pad={['min(15vh,132px)', 'min(15vh,132px)']}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.02, margin: 0, maxWidth: '14em' }}>{heading}</h2>
        <p className="mut lead" style={{ textAlign: 'center' }}>
          {sub}
        </p>
        <Btns items={ctas} center />
      </div>
    </Sec>
  )
}

const MEDIA = '/sns/site/'

/** One film in a rounded frame (canvas `film`). `name` is the file in public/sns/site without extension. */
export function Film({ name, label, ratio = '16/9', dark = true }: { name: string; label: string; ratio?: string; dark?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: ratio,
        borderRadius: 28,
        overflow: 'hidden',
        background: dark ? '#000' : 'var(--card)',
        boxShadow: '0 0 0 1px var(--line),0 60px 100px -70px var(--shadow)',
      }}
    >
      <Video src={`${MEDIA}${name}.mp4`} poster={`${MEDIA}${name}-poster.jpg`} label={label} />
    </div>
  )
}

/**
 * A film with a phone cut: 16:9 (or `ratio`) above 700 px, the `-m` 4:5 cut below. Both are in the page; CSS shows one
 * and the hidden one never plays.
 */
export function FilmPair({ name, label, ratio = '16/9' }: { name: string; label: string; ratio?: string }) {
  return (
    <>
      <Video
        className="vid vd"
        style={{ position: 'relative', display: 'block', width: '100%', height: 'auto', aspectRatio: ratio }}
        src={`${MEDIA}${name}.mp4`}
        poster={`${MEDIA}${name}-poster.jpg`}
        label={label}
      />
      <Video
        className="vid vm"
        style={{ position: 'relative', display: 'none', width: '100%', height: 'auto', aspectRatio: '4/5' }}
        src={`${MEDIA}${name}-m.mp4`}
        poster={`${MEDIA}${name}-m-poster.jpg`}
        label={label}
      />
    </>
  )
}

/** A film in the light frame, with its phone cut (canvas `lfilm`). */
export function LightFilm({ name, label }: { name: string; label: string }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 28,
        overflow: 'hidden',
        background: 'var(--card)',
        boxShadow: '0 0 0 1px var(--line),0 60px 100px -70px var(--shadow)',
      }}
    >
      <FilmPair name={name} label={label} />
    </div>
  )
}

/** A still in a rounded frame (canvas `pic`). */
export function Pic({ src, alt, ratio = '4/3', fit = 'cover', bg = '#000' }: { src: string; alt: string; ratio?: string; fit?: 'cover' | 'contain'; bg?: string }) {
  return (
    <div style={{ position: 'relative', aspectRatio: ratio, borderRadius: 28, overflow: 'hidden', background: bg, boxShadow: '0 0 0 1px var(--line)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src.startsWith('/') ? src : MEDIA + src} alt={alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit }} />
    </div>
  )
}
