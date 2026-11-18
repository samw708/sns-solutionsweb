import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import Article from '@/components/silver/pages/Article'
import { BLOG_POSTS, getPost } from '@/lib/blog'
import { blogPostGraph } from '@/lib/schema'
import { snsImages } from '@/lib/share'
import { SITE_URL } from '@/lib/site'

// The German version of each post (lib/blog-de.ts), at the same slug as the English one under /blog.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug, 'de')
  if (!post) return {}

  const en = `/blog/${post.slug}`
  const url = `/de${en}`
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: { en, de: url, 'x-default': en },
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${url}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      locale: 'de_AT',
      siteName: 'SNS Solutions',
      images: snsImages('sns', 'de').og,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: snsImages('sns', 'de').twitter,
    },
  }
}

export default function BlogPostPageDe({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug, 'de')
  if (!post) notFound()

  return (
    <>
      <JsonLd data={blogPostGraph('de', post)} />
      <Article post={post} locale="de" />
    </>
  )
}
