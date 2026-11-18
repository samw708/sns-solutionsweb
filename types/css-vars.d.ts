import 'react'

// The silver pages pass CSS custom properties through style props (e.g. style={{ '--d': '0.4s' }}).
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
