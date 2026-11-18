'use client'

import { useEffect, useId, useRef } from 'react'

/**
 * QFUtool's mark, the thermostat dial, revving: the needle winds up from "zero", overshoots once on a damped spring
 * and settles on the logo's angle, lighting the tick ring as it sweeps; the ring then fades and the last frame is the
 * static mark. Ported from QFUtool's own site (Danielsns/src/components/DialMark.js); keep the motion in step with it.
 * The needle colour comes from --accent on a parent (QFUtool's #E65D3F).
 *
 * play: 'inview' revs once when it scrolls into view; 'loop' revs, holds, winds back, again.
 * Reduced motion: the static mark.
 */

const LOGO = (Math.atan2(-4.5, 5) * 180) / Math.PI
const START = -183
const r4 = (v: number) => Math.round(v * 1e4) / 1e4
const TICKS = Array.from({ length: 21 }, (_, i) => {
  const rel = START + i * ((24 - START) / 20)
  const a = ((LOGO + rel) * Math.PI) / 180
  const r2 = i % 5 === 0 ? 9.55 : 9.15
  return { rel, x1: r4(12 + 8.3 * Math.cos(a)), y1: r4(12 + 8.3 * Math.sin(a)), x2: r4(12 + r2 * Math.cos(a)), y2: r4(12 + r2 * Math.sin(a)), major: i % 5 === 0 }
})

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const smooth = (x: number) => {
  const c = clamp(x)
  return c * c * (3 - 2 * c)
}
const Z = 0.5
const W = 4.6
const WD = W * Math.sqrt(1 - Z * Z)
const spring = (tau: number, x0: number, v0: number) => Math.exp(-Z * W * tau) * (x0 * Math.cos(WD * tau) + ((v0 + Z * W * x0) / WD) * Math.sin(WD * tau))
function angle(t: number) {
  if (t < 0.35) return START
  if (t < 0.95) {
    const u = (t - 0.35) / 0.6
    return u < 0.35 ? START + 30 * smooth(u / 0.35) : START + 30 + (-168 - START - 30) * smooth((u - 0.35) / 0.35)
  }
  return spring(t - 0.95, -168, 260) * (1 - smooth((t - 3.0) / 0.4))
}
const speed = (t: number) => Math.abs(angle(t + 0.008) - angle(t - 0.008)) / 0.016

const DONE = 3.8
const HOLD = 0.7
const BACK = 0.7

export default function DialMark({ size = 120, play = 'inview', className, style }: { size?: number | string; play?: 'inview' | 'loop'; className?: string; style?: React.CSSProperties }) {
  const svg = useRef<SVGSVGElement>(null)
  const fid = 'dial-glow-' + useId().replace(/:/g, '')

  useEffect(() => {
    const root = svg.current
    if (!root) return
    const q = (k: string) => root.querySelector(`[data-k="${k}"]`) as SVGElement
    const needle = q('needle')
    const glow = q('glow')
    const arc = q('arc')
    const tickEls = Array.from(root.querySelectorAll<SVGElement>('[data-k="tick"]'))
    const trail = Array.from(root.querySelectorAll<SVGElement>('[data-k="trail"]'))

    const draw = (a: number, glowOp: number, trailAt: (i: number) => [number, number], litTo: number, tickOut: number, arcOp: number) => {
      needle.setAttribute('transform', `rotate(${a} 12 12)`)
      glow.setAttribute('transform', `rotate(${a} 12 12)`)
      glow.setAttribute('opacity', glowOp.toFixed(3))
      trail.forEach((g, i) => {
        const [ta, op] = trailAt(i)
        g.setAttribute('transform', `rotate(${ta} 12 12)`)
        g.setAttribute('opacity', op.toFixed(3))
      })
      TICKS.forEach((tk, i) => {
        const lit = litTo >= tk.rel - 1
        tickEls[i]?.setAttribute('stroke', lit ? 'var(--accent)' : 'currentColor')
        tickEls[i]?.setAttribute('opacity', ((lit ? 1 : 0.22) * (1 - tickOut)).toFixed(3))
      })
      arc.setAttribute('opacity', arcOp.toFixed(3))
    }

    const rev = (s: number) => {
      let reach = -Infinity
      for (let k = 0; k <= 40; k++) reach = Math.max(reach, angle((Math.max(0, s) * k) / 40))
      draw(
        angle(s),
        clamp(speed(s) / 500) * 0.9,
        (i) => {
          const tt = s - (i + 1) * 0.022
          return [angle(tt), clamp(speed(tt) / 600) * 0.32 * (1 - i / 7)]
        },
        reach,
        smooth((s - 2.9) / 0.9),
        0.3 + 0.7 * smooth((s - 2.2) / 0.6),
      )
    }
    const windBack = (u: number) => {
      const a = START * smooth(u)
      draw(a, 0, () => [a, 0], -Infinity, 1 - smooth(u / 0.5), 1 - 0.7 * smooth(u))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rev(DONE)
      return
    }

    rev(0)
    let id = 0
    let t0: number | null = null
    const tick = (now: number) => {
      if (t0 === null) t0 = now
      const s = (now - t0) / 1000
      if (play === 'loop') {
        const c = s % (DONE + HOLD + BACK)
        if (c < DONE + HOLD) rev(Math.min(c, DONE))
        else windBack((c - DONE - HOLD) / BACK)
      } else {
        rev(Math.min(s, DONE))
        if (s >= DONE) return
      }
      id = requestAnimationFrame(tick)
    }

    const seen = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        seen.disconnect()
        id = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    seen.observe(root)
    return () => {
      seen.disconnect()
      cancelAnimationFrame(id)
    }
  }, [play])

  return (
    <svg ref={svg} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} style={{ overflow: 'visible', ...style }}>
      <defs>
        <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation=".35" />
        </filter>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <g>
        {TICKS.map((tk, i) => (
          <line key={i} data-k="tick" x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2} strokeWidth={tk.major ? 0.42 : 0.3} strokeLinecap="round" opacity="0" />
        ))}
      </g>
      <path data-k="arc" d="M7 16.5 A6.5 6.5 0 0 0 17 16.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.2 2" />
      <g>
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} data-k="trail" d="M12 12 L17 7.5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" opacity="0" />
        ))}
      </g>
      <path data-k="glow" d="M12 12 L17 7.5" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" filter={`url(#${fid})`} opacity="0" />
      <path data-k="needle" d="M12 12 L17 7.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}
