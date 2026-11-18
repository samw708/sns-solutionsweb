'use client'

import { useEffect, useRef } from 'react'
import { getDict } from '@/i18n'
import { type Locale, defaultLocale, localePath } from '@/i18n/config'

/*
 * PREVIEW — SNS Consulting as its own screen under the billboard, laid out the way apple.com lays out a
 * product tile: the words first (eyebrow, one headline, one line, two actions), centred on black, and the film
 * full-width underneath. The film's left edge is already black; its light grey right half dissolves into the
 * black at the top and bottom, so the footage has no hard edge against the page.
 * It plays only while on screen. Reduced motion: the poster frame, nothing moves.
 */
export default function ConsultingFilm({ locale = defaultLocale }: { locale?: Locale }) {
  const c = getDict(locale).consult
  const film = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = film.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') {
      void v.play().catch(() => {})
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <section className="hm-cf" aria-labelledby="hm-cf-h">
      <div className="hm-cf-copy">
        <p className="hm-cf-eyebrow">SNS Consulting</p>
        <h2 className="hm-cf-h" id="hm-cf-h">
          {c.heading}
        </h2>
        <p className="hm-cf-sub">{c.sub}</p>
        <div className="hm-cf-actions">
          <a className="hm-cf-cta" href={localePath(locale, '/contact')}>
            {c.cta}
          </a>
          <a className="hm-cf-more" href={localePath(locale, '/services')}>
            {c.link} <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>
      <div className="hm-cf-film">
        <video
          ref={film}
          src="/sns/refraction-loop.mp4"
          poster="/sns/refraction-loop-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
