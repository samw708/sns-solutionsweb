'use client'

import { useEffect } from 'react'

/**
 * HVAC tool list on phones: picking a tool opens its panel right under the row, but the panel that closes above it
 * shifts the page. This keeps the tapped row at the top of the screen so its panel is in view. Wide screens: nothing.
 */
export default function ToolScroll() {
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 900px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: Event) => {
      const input = e.target as HTMLInputElement
      if (input.name !== 'tool' || !narrow.matches) return
      const row = document.querySelector<HTMLElement>(`label[for="${input.id}"]`)
      if (row) requestAnimationFrame(() => row.scrollIntoView({ block: 'start', behavior: still.matches ? 'auto' : 'smooth' }))
    }
    document.addEventListener('change', onChange)
    return () => document.removeEventListener('change', onChange)
  }, [])
  return null
}
