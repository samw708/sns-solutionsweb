import Link from 'next/link'
import BookingWidget from '@/components/booking/BookingWidget'
import { type Locale, localePath } from '@/i18n/config'
import { getPost } from '@/lib/blog'
import { contactHref, href, immvelaHref } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Lights } from '../ui'
import HeroReel, { type ReelCopy } from './HeroReel'

/** The home page (canvas board Home-B, "Homepage with the silver sweep"). */

const BOOK = '#book'

function copy(locale: Locale) {
  const past = contactHref(locale, 'pastjob')
  if (locale === 'de')
    return {
      reel: {
        sub: 'Software und KI für Immobilien, für HLK und Kältetechnik und für jedes Team, das KI echte Arbeit erledigen lassen will.',
        book: { label: 'Kostenloses Erstgespräch buchen', href: BOOK },
        see: 'Was wir bauen',
        chapters: [
          {
            tag: 'Immobilien',
            title: 'Immvela',
            text: 'Ihre persönliche KI-Assistenz für Immobilien, für Makler in Österreich, Deutschland und der Schweiz. In der geschlossenen Beta.',
            links: [{ label: 'immvela.com besuchen ↗', href: immvelaHref(locale), external: true }],
            chip: ['Immobilien', 'Immvela'],
          },
          {
            tag: 'HLK & Kältetechnik',
            title: 'Pack CAD',
            text: 'Von der Auslegung im Tool Ihres Herstellers zur Anlage in 3D und 2D, innerhalb Ihrer Regeln. Für jeden Hersteller eigens gebaut, mit CO₂-Booster-Verbundanlagen als aktuellem Schwerpunkt.',
            links: [
              { label: 'HLK & Kältetechnik entdecken', href: href(locale, 'hvac') },
              { label: 'Früheres Projekt schicken', href: past, ghost: true },
            ],
            chip: ['HLK & Kältetechnik', 'Pack CAD, für Ihre Anlagen gebaut'],
          },
          {
            tag: 'Beratung',
            title: 'Wo lohnt sich KI für Sie?',
            text: 'Wir sehen uns an, wie Ihr Team arbeitet, und sagen Ihnen offen, wo sich KI rechnet. Wenn ja, bauen wir es.',
            links: [{ label: 'Kostenloses Erstgespräch buchen', href: BOOK }],
            chip: ['Beratung', 'Ein kostenloses 30-Minuten-Gespräch'],
          },
        ],
        labels: {
          evening: 'Aus „Evening“, unserem Film für Immvela: die Helix im späten Sonnenlicht, dann in der Dämmerung.',
          pack: 'Eine Kälteverbundanlage als Drahtmodell, das sich mit massivem Metall füllt; dann fährt die Kamera zurück auf die ganze Anlage.',
          convo: 'Ein Beispielgespräch',
        },
        bubbles: [
          { who: 'them', text: 'Wir verschicken die ganze Woche Angebote und kommen nie dazu nachzufassen.' },
          { who: 'us', text: 'Dann würden wir genau dort anfangen.' },
          { who: 'them', text: 'Wie finden wir heraus, ob es sich lohnt?' },
          { who: 'us', text: 'Dreißig Minuten, online, kostenlos. Wir schauen uns an, wie Sie arbeiten, und sagen es Ihnen offen.' },
        ],
        nav: 'Was wir machen',
        pause: 'Film anhalten',
        play: 'Film abspielen',
      } satisfies ReelCopy,
      consult: {
        label: 'Beratung',
        h: 'Wo lohnt sich KI in Ihrem Unternehmen?',
        p: 'Dreißig Minuten, online, kostenlos und unverbindlich. Wir sehen uns an, wie Ihr Team arbeitet, sagen Ihnen offen, wo sich KI rechnet, und bauen es, wenn es sich lohnt.',
        cta: 'Kostenloses Erstgespräch buchen',
      },
      steps: {
        h: 'Wir messen, bevor wir etwas anfassen.',
        p: 'Jedes individuelle Projekt folgt denselben vier Schritten. Und wenn die ehrliche Antwort „Das müssen Sie nicht bauen lassen“ lautet, dann bekommen Sie genau diese Antwort.',
        items: [
          ['Durchsprechen', 'Sie beschreiben es. Wir stellen die unbequemeren Fragen.'],
          ['Ausgangswert', 'Wir messen, bevor wir etwas anfassen.'],
          ['Pilot', 'Ein Ablauf, live, in wenigen Wochen.'],
          ['Nachweisen und übergeben', 'Dieselbe Messung noch einmal. Was wir bauen, gehört Ihnen.'],
        ],
      },
      notes: { h: 'Notizen aus unserer Arbeit', all: 'Alle Insights', cat: { immvela: 'Immobilien', qfutool: 'Vertrieb' }, read: (m: string) => `${m} Min. Lesezeit` },
      close: {
        h: 'Dauert bei Ihrem Team etwas zu lange?',
        p: 'Sagen Sie uns, was es ist. Wir sagen Ihnen, ob es sich automatisieren lässt und was das braucht.',
        book: 'Kostenloses Erstgespräch buchen',
        past: 'Früheres Projekt schicken (HLK)',
      },
    }
  return {
    reel: {
      sub: 'Software and AI for real estate, for HVAC and refrigeration, and for any team that wants AI to do real work.',
      book: { label: 'Book a free 30-minute call', href: BOOK },
      see: 'See what we build',
      chapters: [
        {
          tag: 'Real estate',
          title: 'Immvela',
          text: 'Your personal real estate AI assistant, for agents in Austria, Germany and Switzerland. In closed beta.',
          links: [{ label: 'Visit immvela.com ↗', href: immvelaHref(locale), external: true }],
          chip: ['Real estate', 'Immvela'],
        },
        {
          tag: 'HVAC & Refrigeration',
          title: 'Pack CAD',
          text: 'From the selection in your manufacturer’s tool to the pack in 3D and 2D, inside your rules. Built for each manufacturer, with CO₂ booster packs as our current speciality.',
          links: [
            { label: 'Explore HVAC & Refrigeration', href: href(locale, 'hvac') },
            { label: 'Send us a past job', href: past, ghost: true },
          ],
          chip: ['HVAC & Refrigeration', 'Pack CAD, built for your packs'],
        },
        {
          tag: 'Consulting',
          title: 'Where is AI worth it for you?',
          text: 'We look at how your team works and tell you straight where AI pays off. If it does, we build it.',
          links: [{ label: 'Book a free 30-minute call', href: BOOK }],
          chip: ['Consulting', 'A free 30-minute call'],
        },
      ],
      labels: {
        evening: 'From Evening, our film for Immvela: the helix turning in late sun, then at dusk.',
        pack: 'A refrigeration pack drawn as a wireframe, filling in as solid metal, then the camera pulls back to the whole pack.',
        convo: 'An example conversation',
      },
      bubbles: [
        { who: 'them', text: 'We send quotes all week and never get round to chasing them.' },
        { who: 'us', text: 'Then that’s where we’d start.' },
        { who: 'them', text: 'How do we find out if it’s worth it?' },
        { who: 'us', text: 'Thirty minutes, online, free. We look at how you work and tell you straight.' },
      ],
      nav: 'What we do',
      pause: 'Pause the film',
      play: 'Play the film',
    } satisfies ReelCopy,
    consult: {
      label: 'Consulting',
      h: 'Where is AI worth it in your company?',
      p: 'Thirty minutes, online, no cost and no obligation. We look at how your team works, tell you straight where AI pays off, and build it if it does.',
      cta: 'Book a free 30-minute call',
    },
    steps: {
      h: 'We measure it before we touch it.',
      p: 'Every custom build follows the same four steps. And if the honest answer is “you don’t need this built”, that’s the answer you get.',
      items: [
        ['Talk it through', 'You describe it. We ask the harder questions.'],
        ['Baseline', 'We measure it before we touch it.'],
        ['Pilot', 'One workflow, live, in weeks.'],
        ['Prove and hand over', 'The same measurement, run again. You own what we build.'],
      ],
    },
    notes: { h: 'Notes from building it', all: 'All insights', cat: { immvela: 'Real estate', qfutool: 'Sales' }, read: (m: string) => `${m} min read` },
    close: {
      h: 'Is something taking your team too long?',
      p: 'Tell us what it is. We’ll tell you whether it can be automated, and what that would take.',
      book: 'Book a free 30-minute call',
      past: 'Send us a past job (HVAC)',
    },
  }
}

/** The three posts the home page shows, with their card images (same as the canvas). */
const NOTES: [string, string][] = [
  ['ai-infrastructure-for-real-estate-agencies', 'article-infrastructure-card.jpg'],
  ['ai-outbound-for-service-businesses', 'article-outbound-card.jpg'],
  ['why-quotes-go-unanswered', 'article-quote-card.jpg'],
]

const glassCard: React.CSSProperties = {
  background: 'var(--gcard)',
  border: '1px solid var(--gline)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 30px 60px -44px var(--shadow)',
  borderRadius: 24,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  minHeight: 190,
}

export default function Home({ locale }: { locale: Locale }) {
  const t = copy(locale)
  const pad = { paddingTop: 'min(12vh,108px)', paddingBottom: 'min(12vh,108px)' }
  return (
    <SilverPage locale={locale} alt="/">
      <HeroReel t={t.reel} />

      <section style={{ background: 'var(--plain)' }}>
        <div className="w g2" style={{ ...pad, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,6vw,96px)', alignItems: 'center' }}>
          <div className="swap bookcol">
            <div id="book" style={{ margin: '0 auto', maxWidth: 460, width: '100%', scrollMarginTop: 96 }}>
              <BookingWidget locale={locale} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '30em' }}>
            <span className="mut" style={{ fontSize: 15, fontWeight: 500 }}>
              {t.consult.label}
            </span>
            <h2 style={{ fontSize: 'clamp(32px,3.4vw,50px)', lineHeight: 1.06 }}>{t.consult.h}</h2>
            <p className="mut" style={{ fontSize: 18, lineHeight: 1.6 }}>
              {t.consult.p}
            </p>
            <a className="btn dark" href={BOOK} style={{ alignSelf: 'flex-start' }}>
              {t.consult.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="pearl">
        <Lights />
        <div className="w" style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(34px,3.8vw,56px)', lineHeight: 1.05, maxWidth: '14em' }}>{t.steps.h}</h2>
          <p className="mut" style={{ fontSize: 18, lineHeight: 1.55, maxWidth: '38em' }}>
            {t.steps.p}
          </p>
          <ol className="g4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14, width: '100%', textAlign: 'left', listStyle: 'none', margin: 0, padding: 0 }}>
            {t.steps.items.map(([name, text], k) => (
              <li key={name} className="stepcard" style={glassCard}>
                <span className="mono mut" aria-hidden="true">
                  {k + 1}
                </span>
                <strong style={{ fontSize: 19, fontWeight: 600 }}>{name}</strong>
                <span className="mut" style={{ lineHeight: 1.5 }}>
                  {text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ background: 'var(--plain)' }}>
        <div className="w" style={{ ...pad, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(30px,3vw,44px)' }}>{t.notes.h}</h2>
            <Link className="lnk" href={href(locale, 'insights')}>
              {t.notes.all}
            </Link>
          </div>
          <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20 }}>
            {NOTES.map(([slug, img]) => {
              const p = getPost(slug, locale)
              if (!p) return null
              const mins = p.readTime.match(/\d+/)?.[0] ?? ''
              return (
                <Link
                  key={slug}
                  href={localePath(locale, `/blog/${slug}`)}
                  style={{ textDecoration: 'none', color: 'var(--tx)', display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <div style={{ aspectRatio: '16/10', borderRadius: 22, overflow: 'hidden', background: '#E7EAED', boxShadow: '0 0 0 1px var(--line)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/sns/site/${img}`} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <span className="mut" style={{ fontSize: 13.5 }}>
                    {t.notes.cat[p.product]}, {t.notes.read(mins)}
                  </span>
                  <strong style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</strong>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pearl">
        <Lights />
        <div
          className="w"
          style={{ paddingTop: 'min(14vh,126px)', paddingBottom: 'min(14vh,126px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}
        >
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.02 }}>{t.close.h}</h2>
          <p className="mut" style={{ fontSize: 18, maxWidth: '34em', lineHeight: 1.55 }}>
            {t.close.p}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn dark" href={BOOK}>
              {t.close.book}
            </a>
            <Link className="btn glass" href={contactHref(locale, 'pastjob')}>
              {t.close.past}
            </Link>
          </div>
        </div>
      </section>
    </SilverPage>
  )
}
