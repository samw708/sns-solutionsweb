import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { getRelatedPosts } from '@/lib/blog'
import { CATEGORY, HERO_IMAGE, card, postDate, readTime } from '@/lib/silver/insights'
import { href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Crumb, FaqSection, Joined, Pic, Sec } from '../ui'
import { PostCard } from './InsightsList'
import '@/app/silver-pages-c.css'

/** One article (/blog/<slug>). Canvas board Site-Article. Posts are English only. */

export default function Article({ post }: { post: BlogPost }) {
  const hero =
    HERO_IMAGE[post.slug] ??
    (card('en', post).img ? { src: card('en', post).img as string, alt: '' } : null)
  const related = getRelatedPosts(post).map((p) => card('en', p))
  const List = (s: BlogPost['sections'][number]) => (s.ordered ? 'ol' : 'ul')
  return (
    <SilverPage locale="en" alt="/blog">
      <Joined>
        <Sec bg="transparent" pad={['clamp(56px,9vh,96px)', 'clamp(40px,6vh,56px)']}>
          <div className="read" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Crumb
              items={[
                { label: 'Insights', href: href('en', 'insights') },
                { label: CATEGORY.en[post.product] },
              ]}
            />
            <h1
              style={{
                fontSize: 'clamp(36px,4vw,60px)',
                lineHeight: 1.02,
                letterSpacing: '-0.045em',
                margin: 0,
              }}
            >
              {post.title}
            </h1>
            <p className="mut lead">{post.description}</p>
            <span className="meta mut" style={{ fontSize: 14.5 }}>
              <time dateTime={post.date}>{postDate('en', post.date)}</time>,{' '}
              {readTime('en', post.readTime)}
            </span>
          </div>
        </Sec>
        {hero && (
          <Sec bg="transparent" pad={['0', 'clamp(40px,6vh,64px)']}>
            <Pic src={hero.src} alt={hero.alt} ratio="21/9" bg="#E7EAED" />
          </Sec>
        )}
      </Joined>

      <Sec>
        <article className="read">
          {post.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {post.sections.map((s) => {
            const L = List(s)
            return (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.bullets && (
                  <L>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </L>
                )}
              </section>
            )
          })}
          {post.takeaways.length > 0 && (
            <div className="take" style={{ marginTop: 48 }}>
              <strong className="k3">The short version</strong>
              <ul style={{ marginTop: 12 }}>
                {post.takeaways.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          <div
            style={{
              marginTop: 48,
              borderRadius: 28,
              background: '#0E1012',
              color: '#ECEEF1',
              padding: 'clamp(24px,3vw,40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <strong className="k3" style={{ color: '#ECEEF1' }}>
              {post.cta.heading}
            </strong>
            <span style={{ opacity: 0.75, lineHeight: 1.55 }}>{post.cta.sub}</span>
            {post.cta.external ? (
              <a
                className="btn"
                href={post.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ alignSelf: 'flex-start', background: '#ECEEF1', color: '#0E1012' }}
              >
                {post.cta.label} ↗
              </a>
            ) : (
              <Link
                className="btn"
                href={post.cta.href}
                style={{ alignSelf: 'flex-start', background: '#ECEEF1', color: '#0E1012' }}
              >
                {post.cta.label}
              </Link>
            )}
          </div>
        </article>
      </Sec>

      {post.faq.length > 0 && <FaqSection heading="Questions this answers" items={post.faq} />}

      {related.length > 0 && (
        <Sec bg="var(--band)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2 className="k3" style={{ fontSize: 'clamp(24px,2.2vw,32px)' }}>
              Read next
            </h2>
            <div
              className="g2"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 28 }}
            >
              {related.map((p) => (
                <PostCard
                  key={p.slug}
                  p={{ ...p, meta: p.meta.split(', ').slice(1).join(', ') }}
                  long={false}
                />
              ))}
            </div>
          </div>
        </Sec>
      )}
    </SilverPage>
  )
}
