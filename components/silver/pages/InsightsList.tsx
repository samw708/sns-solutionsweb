'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Card } from '@/lib/silver/insights'
import { Crumb, Lights } from '../ui'

/**
 * Insights from the headline to the grid: the filters change both the featured post and the grid, so they live in one
 * client component. It renders on the server with "All" selected, so every post is in the HTML.
 */

function Img({ src, ratio }: { src?: string; ratio: string }) {
  if (!src) return null
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: ratio,
        borderRadius: 28,
        overflow: 'hidden',
        background: '#E7EAED',
        boxShadow: '0 0 0 1px var(--line)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export function PostCard({ p, long = true }: { p: Card; long?: boolean }) {
  return (
    <Link className="post" href={p.href}>
      <Img src={p.img} ratio="16/9" />
      <span className="meta">{p.meta}</span>
      <h3 className="k3">{p.title}</h3>
      {long && (
        <span className="mut" style={{ lineHeight: 1.55 }}>
          {p.description}
        </span>
      )}
    </Link>
  )
}

export default function InsightsList({
  t,
  featured,
  rest,
}: {
  t: {
    crumb: string
    h1: string
    lead: string
    all: string
    filters: string
    read: string
    none: string
  }
  featured: Card
  rest: Card[]
}) {
  const cats = Array.from(new Set([featured, ...rest].map((c) => c.cat)))
  const [on, setOn] = useState<string | null>(null)
  const show = (c: Card) => !on || c.cat === on
  const grid = rest.filter(show)
  return (
    <>
      <div className="pearl" style={{ background: 'var(--base)' }}>
        <Lights />
        <section style={{ background: 'transparent' }}>
          <div
            className="w"
            style={{
              paddingTop: 'clamp(56px,9vh,100px)',
              paddingBottom: 'clamp(40px,6vh,60px)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <Crumb items={[{ label: t.crumb }]} />
              <h1 className="k1">{t.h1}</h1>
              <p className="mut lead">{t.lead}</p>
              <div className="filters" role="group" aria-label={t.filters} style={{ marginTop: 8 }}>
                {[null, ...cats].map((c) => (
                  <button
                    key={c ?? 'all'}
                    type="button"
                    aria-pressed={on === c}
                    onClick={() => setOn(c)}
                  >
                    {c ?? t.all}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        {show(featured) && (
          <section style={{ background: 'transparent' }}>
            <div
              className="w"
              style={{
                paddingTop: 0,
                paddingBottom: 'min(10vh,88px)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Link
                className="post g2"
                href={featured.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,.8fr)',
                  gap: 'clamp(24px,4vw,56px)',
                  alignItems: 'center',
                }}
              >
                <Img src={featured.img} ratio="16/10" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span className="meta">{featured.meta}</span>
                  <h2 className="k2" style={{ fontSize: 'clamp(30px,3vw,44px)' }}>
                    {featured.title}
                  </h2>
                  <p className="mut body">{featured.description}</p>
                  <span className="lnk" style={{ alignSelf: 'flex-start' }}>
                    {t.read}
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}
      </div>
      <section style={{ background: 'var(--plain)' }}>
        <div
          className="w"
          style={{
            paddingTop: 'min(13vh,120px)',
            paddingBottom: 'min(13vh,120px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {grid.length ? (
            <div
              className="g2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                gap: 'clamp(28px,3vw,44px) clamp(24px,3vw,40px)',
              }}
            >
              {grid.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          ) : (
            <p className="mut body">{t.none}</p>
          )}
        </div>
      </section>
    </>
  )
}
