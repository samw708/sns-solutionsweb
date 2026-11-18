// The legal pages draw their own silver frame (components/silver/pages/LegalShell.tsx), so this layout only passes
// them through.
export default function LegalLayoutDe({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
