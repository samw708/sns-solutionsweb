import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { localePath } from '@/i18n/config'
import { getHvac } from '@/lib/hvac'
import { type ToolCopy, type ToolKey, getTool } from '@/lib/hvac-tools'
import { href } from '@/lib/silver/links'
import { Btns, Closing, Crumb, FaqSection, FilmPair, Sec } from '../ui'

/**
 * /hvac/selection-software and /hvac/document-management (canvas boards Site-Selection, Site-Documents;
 * gen_site.py tool_page). Two layouts: 'split' (headline left, intro right, film across beneath) and 'centred'.
 */
const HERO_PAD: [string, string] = ['clamp(56px,9vh,96px)', 'clamp(64px,10vh,104px)']
const H1 = { lineHeight: 0.98, letterSpacing: '-0.05em', margin: 0 } as const
const BIG = { fontSize: 'clamp(18px,1.6vw,22px)', letterSpacing: '-0.02em' } as const

function Stage({ t, de = false }: { t: ToolCopy; de?: boolean }) {
  return (
    <div
      className="tvis"
      style={{
        display: 'grid',
        placeItems: 'center',
        borderRadius: 32,
        overflow: 'hidden',
        padding: 0,
        background: 'radial-gradient(70% 90% at 80% 0%,#FFFFFF 0%,transparent 60%),linear-gradient(160deg,#E7EAEE,#D3D8DE)',
        boxShadow: '0 0 0 1px var(--line),0 60px 100px -70px var(--shadow)',
      }}
    >
      <FilmPair name={t.film.name} label={t.film.label} de={de} />
    </div>
  )
}

function Signature({ t }: { t: ToolCopy }) {
  const s = t.signature
  const head = (
    <div className="row2" style={{ alignItems: 'end' }}>
      <h2 className="k2">{s.heading}</h2>
      <p className="mut body">{s.sub}</p>
    </div>
  )
  if (s.kind === 'selection') {
    const cells = [
      <div key="duty" className="mock" style={{ width: '100%' }}>
        <div className="in">
          {s.duty.map((d) => (
            <span key={d.label}>
              <small>{d.label}</small>
              {d.value}
            </span>
          ))}
        </div>
      </div>,
      <div key="units" className="mock" style={{ width: '100%' }}>
        {s.units.map((u, i) => (
          <div key={u.name} className={i === 0 ? 'r hi' : 'r'}>
            <span>
              {u.name}
              <br />
              <em>{u.note}</em>
            </span>
            <span>{u.action}</span>
          </div>
        ))}
      </div>,
      <div key="sheet" className="mock" style={{ width: '100%' }}>
        <div className="hd">
          <b>{s.sheet}</b>
          <span className="ex">{s.example}</span>
        </div>
        <svg viewBox="0 0 300 90" style={{ width: '100%', height: 'auto' }} aria-hidden="true">
          <path d="M10 80 C 80 70, 140 40, 290 14" fill="none" stroke="#121619" strokeWidth="2" />
          <line x1="10" y1="84" x2="290" y2="84" stroke="#DADDE1" />
          <circle cx="168" cy="38" r="4" fill="#121619" />
        </svg>
      </div>,
    ]
    return (
      <Sec bg="var(--band)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {head}
          <div className="steps" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(18px,2.4vw,36px)' }}>
            {s.steps.map((st, i) => (
              <div key={st.name}>
                <span className="mono mut">{i + 1}</span>
                <strong className="k3">{st.name}</strong>
                <span className="mut" style={{ lineHeight: 1.5 }}>
                  {st.text}
                </span>
                <div style={{ marginTop: 10 }}>{cells[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>
    )
  }
  return (
    <Sec>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {head}
        <div className="steps" style={{ gridTemplateColumns: 'repeat(4,minmax(0,1fr))' }}>
          {s.states.map((st, i) => (
            <div key={st.name}>
              <span className="mono mut">{i + 1}</span>
              <strong className="k3">{st.name}</strong>
              <span className="mut" style={{ lineHeight: 1.5 }}>
                {st.text}
              </span>
              <div className="mock" style={{ width: '100%', marginTop: 10 }}>
                <div className="hd">
                  <b>{s.doc}</b>
                  <span className="ex">{s.serial}</span>
                </div>
                <div className={st.released ? 'r hi' : 'r'}>
                  <span>{st.rev}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  )
}

export default function ToolPage({ locale, tool }: { locale: Locale; tool: ToolKey }) {
  const c = getHvac(locale)
  const t = getTool(locale, tool)
  const book = { label: c.bookCall, href: href(locale, 'consulting', '#book') }
  const all = { label: locale === 'de' ? 'Alle HLK-Werkzeuge' : 'See all HVAC tools', href: href(locale, 'hvac'), kind: 'glass' as const }
  const crumb = (
    <Crumb items={[{ label: c.crumb.industries, href: href(locale, 'hvac') }, { label: c.crumb.hvac, href: href(locale, 'hvac') }, { label: t.eyebrow }]} />
  )
  const split = t.variant === 'split'

  const hero = split ? (
    <Sec bg="var(--base)" pearl pad={HERO_PAD}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vh,44px)' }}>
        {crumb}
        <div className="row2" style={{ alignItems: 'end', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,.85fr)' }}>
          <h1 style={{ fontSize: 'clamp(40px,4.6vw,72px)', ...H1 }}>{t.h1}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p className="mut lead">{t.intro}</p>
            <Btns items={[book, all]} />
            <p className="mut" style={{ margin: 0, fontSize: 14.5, maxWidth: '34em' }}>
              {t.note}
            </p>
          </div>
        </div>
        <Stage t={t} de={locale === 'de'} />
      </div>
    </Sec>
  ) : (
    <Sec bg="var(--base)" pearl pad={HERO_PAD}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
        {crumb}
        <h1 style={{ fontSize: 'clamp(40px,4.8vw,76px)', ...H1, maxWidth: '16em' }}>{t.h1}</h1>
        <p className="mut lead" style={{ textAlign: 'center' }}>
          {t.intro}
        </p>
        <Btns items={[book, all]} center />
      </div>
      <div style={{ margin: 'clamp(40px,6vh,64px) auto 0', maxWidth: 980 }}>
        <Stage t={t} de={locale === 'de'} />
      </div>
      <p className="mut" style={{ margin: '18px auto 0', fontSize: 14.5, maxWidth: '40em', textAlign: 'center' }}>
        {t.note}
      </p>
    </Sec>
  )

  const problems = split ? (
    <Sec>
      <div className="row2">
        <h2 className="k2">{t.problems.heading}</h2>
        <ul className="list">
          {t.problems.items.map((x) => (
            <li key={x.text} style={BIG}>
              {x.text}
              {x.note && (
                <span className="mut" style={{ display: 'block', fontSize: 14.5, letterSpacing: 0, lineHeight: 1.55, marginTop: 8, maxWidth: '36em' }}>
                  {x.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Sec>
  ) : (
    <Sec>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <h2 className="k2">{t.problems.heading}</h2>
        <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', columnGap: 'clamp(32px,5vw,80px)' }}>
          {t.problems.items.map((x) => (
            <p
              key={x.text}
              style={{ margin: 0, borderTop: '1px solid var(--line)', padding: '22px 0 26px', fontSize: 'clamp(20px,1.9vw,27px)', lineHeight: 1.2, letterSpacing: '-0.03em' }}
            >
              {x.text}
            </p>
          ))}
        </div>
      </div>
    </Sec>
  )

  const builds = split ? (
    <Sec bg="var(--band)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 className="k2">{t.builds.heading}</h2>
        <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', columnGap: 'clamp(32px,5vw,80px)' }}>
          {t.builds.items.map((b) => (
            <div key={b.name} style={{ borderTop: '1px solid var(--line)', padding: '22px 0 26px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong className="k3" style={{ fontSize: 21 }}>
                {b.name}
              </strong>
              <span className="mut body" style={{ fontSize: 16 }}>
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  ) : (
    <Sec bg="var(--band)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 className="k2">{t.builds.heading}</h2>
        <div className="cols3" style={{ rowGap: 28 }}>
          {t.builds.items.map((b, i) => (
            <div key={b.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...(i % 3 === 0 ? { borderLeft: 0, paddingLeft: 0 } : {}) }}>
              <strong className="k3" style={{ fontSize: 21 }}>
                {b.name}
              </strong>
              <span className="mut body" style={{ fontSize: 16 }}>
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  )

  const metrics = (
    <Sec>
      <div className="row2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 className="k2">{t.metrics.heading}</h2>
          <p className="mut body">{t.metrics.sub}</p>
        </div>
        <ul className="list">
          {t.metrics.items.map((x) => (
            <li key={x} style={{ fontSize: 'clamp(20px,1.8vw,26px)', letterSpacing: '-0.025em', fontWeight: 600 }}>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </Sec>
  )

  const related = (
    <Sec bg="var(--band)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2 className="k3" style={{ fontSize: 'clamp(24px,2.2vw,32px)' }}>
          {t.related.heading}
        </h2>
        <div className="cols3">
          {t.related.items.map((r) => (
            <Link key={r.label} href={localePath(locale, r.href)} style={{ textDecoration: 'none', color: 'var(--tx)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong style={{ fontSize: 19 }}>{r.label}</strong>
              <span className="mut">{r.text}</span>
              <span className="lnk" style={{ alignSelf: 'flex-start', fontSize: 14 }}>
                {t.related.open}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Sec>
  )

  const sig = <Signature t={t} />
  return (
    <>
      {hero}
      {split ? (
        <>
          {problems}
          {sig}
        </>
      ) : (
        <>
          {sig}
          {problems}
        </>
      )}
      {builds}
      {metrics}
      {related}
      <FaqSection heading={t.faqHeading} items={t.faq} />
      <Closing heading={t.closing.heading} sub={t.closing.sub} ctas={[book]} />
    </>
  )
}
