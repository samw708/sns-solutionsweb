import { notFound } from 'next/navigation'

// Any URL no page matches lands here and gets the silver 404 (a root not-found.tsx can't be used with two root layouts).
export default function Missing() {
  notFound()
}
