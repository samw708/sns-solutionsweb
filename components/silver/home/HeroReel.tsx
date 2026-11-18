'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Lights } from '../ui'
import '@/app/silver-home.css'

/**
 * The home page's first screen (canvas board Home-B): "Simplicity is the solution." drawn by a silver sweep, then the
 * reel of what SNS does in three chapters (Immvela, Pack CAD, consulting), each with its caption, a chip that fills
 * while the chapter plays, and a play/pause button. Ported from the board's DCLogic script; with reduced motion the
 * sweep is skipped and the reel starts paused on its first chapter.
 */

export type ReelLink = { label: string; href: string; ghost?: boolean; external?: boolean }
export type ReelCopy = {
  sub: string
  book: { label: string; href: string }
  see: string
  chapters: {
    tag: string
    title: string
    text: string
    links: ReelLink[]
    chip: [string, string]
  }[]
  labels: { evening: string; pack: string; convo: string }
  bubbles: { who: 'them' | 'us'; text: string }[]
  nav: string
  pause: string
  play: string
}

const DUR = [14.5, 12, 9]

export default function HeroReel({ t }: { t: ReelCopy }) {
  const [go, setGo] = useState(false)
  const [i, setI] = useState(0)
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const vids = useRef<(HTMLVideoElement | null)[]>([])
  const reel = useRef<HTMLDivElement>(null)
  const grow = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const left = useRef(DUR[0] * 1000)
  const startedAt = useRef(0)
  const visible = useRef(true)
  const state = useRef({ i: 0, paused: false })
  state.current = { i, paused }

  const playActive = useCallback((n: number, restart: boolean) => {
    vids.current.forEach((v, k) => {
      if (!v) return
      if (k === n) {
        v.muted = true
        if (restart) {
          try {
            v.currentTime = 0
          } catch {}
        }
        if (!state.current.paused && visible.current) v.play().catch(() => {})
      } else v.pause()
    })
  }, [])

  const schedule = useCallback((ms: number) => {
    clearTimeout(timer.current)
    left.current = ms
    startedAt.current = Date.now()
    if (!state.current.paused)
      timer.current = setTimeout(() => goTo((state.current.i + 1) % DUR.length), ms)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = useCallback(
    (n: number) => {
      state.current.i = n
      setI(n)
      setTick((x) => x + 1)
      playActive(n, true)
      schedule(DUR[n] * 1000)
    },
    [playActive, schedule]
  )

  const togglePause = () => {
    const p = !state.current.paused
    state.current.paused = p
    setPaused(p)
    if (p) {
      clearTimeout(timer.current)
      left.current = Math.max(0, left.current - (Date.now() - startedAt.current))
      vids.current.forEach((v) => v?.pause())
    } else {
      playActive(state.current.i, false)
      schedule(left.current || 4000)
    }
  }

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setGo(true)
    if (still) {
      state.current.paused = true
      setPaused(true)
      left.current = DUR[0] * 1000
    } else {
      goTo(0)
    }
    // Off screen, the film stops; the chapters keep their place.
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting
      const v = vids.current[state.current.i]
      if (!v) return
      if (e.isIntersecting && !state.current.paused) v.play().catch(() => {})
      else v.pause()
    })
    if (reel.current) io.observe(reel.current)
    return () => {
      clearTimeout(timer.current)
      io.disconnect()
    }
  }, [goTo])

  // The box opens as it scrolls up the screen: --open 0 while it sits low on the first screen, 1 near the top.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = grow.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const top = el.parentElement!.getBoundingClientRect().top
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, 1 - (top - 80) / (vh * 0.62)))
      el.style.setProperty('--open', p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Restart the active chip's fill bar each time a chapter starts (also when the same chapter is picked again).
  useEffect(() => {
    const b = reel.current?.querySelector<HTMLElement>('.cn.on .bar b')
    if (!b) return
    b.style.animation = 'none'
    void b.offsetWidth
    b.style.animation = ''
  }, [tick])

  const on = (k: number) => (k === i ? ' on' : '')

  return (
    <section className="pearl">
      <Lights />
      <div className={`intro sweep${go ? ' go' : ''}`} style={{ '--after': '1.6s' }}>
        <span className="band" aria-hidden="true" />
        <h1>
          Simplicity is
          <br />
          the solution.
        </h1>
        <div className="after">
          <p
            className="mut"
            style={{ fontSize: 'clamp(17px,1.5vw,20px)', lineHeight: 1.5, maxWidth: '34em' }}
          >
            {t.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link className="btn dark" href={t.book.href}>
              {t.book.label}
            </Link>
            <a className="btn glass" href="#products">
              {t.see}
            </a>
          </div>
        </div>
      </div>
      {/* Unlike other .w blocks, the canvas kept this one's side padding at every width (only padding-bottom was set). */}
      <div
        className="w mh bx"
        id="products"
        style={{
          paddingBottom: 96,
          paddingLeft: 'clamp(20px,3.5vw,56px)',
          paddingRight: 'clamp(20px,3.5vw,56px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="rise">
          <div className="grow" ref={grow}>
            <div
              className={`scr${paused ? ' paused' : ''}`}
              ref={reel}
              style={{ '--dur': `${DUR[i]}s` }}
            >
              <div className="stack">
                <video
                  ref={(el) => {
                    vids.current[0] = el
                  }}
                  className={`vid ev${on(0)}`}
                  data-ch
                  src="/sns/site/evening-reel.mp4"
                  poster="/sns/site/evening-reel-poster.jpg"
                  muted
                  playsInline
                  loop
                  preload="auto"
                  aria-label={t.labels.evening}
                />
                <div
                  data-ch
                  className={on(1).trim() || undefined}
                  style={{ position: 'absolute', inset: 0, background: '#000' }}
                >
                  <video
                    ref={(el) => {
                      vids.current[1] = el
                    }}
                    className="vid"
                    src="/sns/site/pack-loop.mp4"
                    poster="/sns/site/pack-loop-poster.jpg"
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    aria-label={t.labels.pack}
                  />
                </div>
                <div
                  data-ch
                  className={on(2).trim() || undefined}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <div className="conv" />
                  <div className="thread" aria-label={t.labels.convo}>
                    {t.bubbles.map((b, k) => (
                      <span
                        key={k}
                        className={`bub ${b.who}`}
                        style={{ '--d': `${[0.4, 1.8, 3.4, 4.8][k]}s` }}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="scrim" />
              <div className="sheen" aria-hidden="true" />
              <div className="scrim2" />
              <div className="caps">
                {t.chapters.map((c, k) => (
                  <div
                    key={c.title}
                    data-cap
                    className={on(k).trim() || undefined}
                    aria-hidden={k !== i}
                  >
                    <span className="tag">{c.tag}</span>
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {c.links.map((l) =>
                        l.external ? (
                          <a
                            key={l.label}
                            className={`btn ${l.ghost ? 'gbtn' : 'wbtn'}`}
                            href={l.href}
                            target="_blank"
                            rel="noopener"
                            tabIndex={k === i ? undefined : -1}
                          >
                            {l.label}
                          </a>
                        ) : (
                          <Link
                            key={l.label}
                            className={`btn ${l.ghost ? 'gbtn' : 'wbtn'}`}
                            href={l.href}
                            tabIndex={k === i ? undefined : -1}
                          >
                            {l.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cbar">
                <div
                  className="chip-nav"
                  role="tablist"
                  aria-label={t.nav}
                  style={{ color: '#FFFFFF' }}
                >
                  {t.chapters.map((c, k) => (
                    <button
                      key={k}
                      type="button"
                      className={`cn${on(k)}`}
                      role="tab"
                      aria-selected={k === i}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo(k)
                      }}
                    >
                      <i className="bar">
                        <b />
                      </i>
                      <strong>{c.chip[0]}</strong>
                      <span>{c.chip[1]}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="pp"
                  aria-label={paused ? t.play : t.pause}
                  onClick={togglePause}
                >
                  <svg
                    className="i-pause"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <rect x="3" y="2" width="3" height="10" rx="1" fill="currentColor" />
                    <rect x="8" y="2" width="3" height="10" rx="1" fill="currentColor" />
                  </svg>
                  <svg
                    className="i-play"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path d="M4 2.5v9l7.5-4.5z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
