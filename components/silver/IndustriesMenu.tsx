'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'

/**
 * "Industries" in the nav: a small panel with the two industries, side by side and equal. Opens on click, on hover
 * with a mouse, and from the keyboard; closes on Escape, an outside click, or leaving it with the mouse.
 */
export type IndustryItem = { label: string; line: string; href: string; external?: boolean }

export default function IndustriesMenu({ label, items }: { label: string; items: IndustryItem[] }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const leave = useRef<ReturnType<typeof setTimeout>>()
  const byHover = useRef(false)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const down = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('pointerdown', down)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('keydown', key)
    }
  }, [open])

  const hover = (o: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(leave.current)
    if (o) {
      if (!open) byHover.current = true
      setOpen(true)
    } else leave.current = setTimeout(() => setOpen(false), 160)
  }

  return (
    <div
      className="ind"
      ref={root}
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button ref={btn} type="button" className="navl indbtn" aria-expanded={open} aria-controls={id} onClick={() => {
          // A mouse that hovered already opened it; that click shouldn't close it again.
          if (byHover.current && open) {
            byHover.current = false
            return
          }
          byHover.current = false
          setOpen((o) => !o)
        }}>
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={id} className={`indpanel${open ? ' open' : ''}`} hidden={!open}>
        {items.map((it) =>
          it.external ? (
            <a key={it.label} href={it.href} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <strong>{it.label} ↗</strong>
              <span>{it.line}</span>
            </a>
          ) : (
            <Link key={it.label} href={it.href} onClick={() => setOpen(false)}>
              <strong>{it.label}</strong>
              <span>{it.line}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
