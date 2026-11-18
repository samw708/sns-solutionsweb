'use client'

import { useEffect, useRef } from 'react'

/**
 * A silent looping film. Plays only while it is on screen and never when the visitor asks for reduced motion
 * (then the poster stays). Same attributes the canvas used: muted, inline, looped.
 */
export default function Video({
  src,
  poster,
  label,
  className = 'vid',
  style,
  preload = 'metadata',
}: {
  src: string
  poster: string
  label: string
  className?: string
  style?: React.CSSProperties
  preload?: 'none' | 'metadata' | 'auto'
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const sync = () => {
      if (visible && !still.matches && v.offsetParent !== null) v.play().catch(() => {})
      else v.pause()
    }
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        sync()
      },
      { threshold: 0.15 },
    )
    io.observe(v)
    still.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    return () => {
      io.disconnect()
      still.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload={preload}
      aria-label={label}
    />
  )
}
