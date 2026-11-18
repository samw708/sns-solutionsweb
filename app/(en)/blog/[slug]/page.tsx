import type { Metadata } from 'next'
import { snsImages } from '@/lib/share'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import Article from '@/components/silver/pages/Article'
import { SITE_URL } from '@/lib/site'
import { blogPostGraph } from '@/lib/schema'
import { BLOG_POSTS, getPost } from '@/lib/blog'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}

  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: { en: url, de: `/de${url}`, 'x-default': url },
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${url}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      locale: 'en_US',
      siteName: 'SNS Solutions',
      images: snsImages('sns', 'en').og,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: snsImages('sns', 'en').twitter,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <>
      <JsonLd data={blogPostGraph('en', post)} />
      <Article post={post} />
    </>
  )
}
