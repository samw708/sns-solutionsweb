import type { Locale } from '@/i18n/config'
import { contactHref, href } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Closing, Crumb, Film, Sec } from '../ui'
import '@/app/silver-pages-c.css'

/**
 * Company (/team). Canvas board Site-Company. The founders have no photos yet: each gets a brushed-silver plate with
 * their initials engraved, never a stock or generated portrait. Replace the plate with a 4:5 photo when one exists.
 */

const PEOPLE = [
  { name: 'Samson Adefris Belachew', initials: 'SB' },
  { name: 'Samuel Winch', initials: 'SW' },
  { name: 'Nicholas Pellechi', initials: 'NP' },
]

const T = {
  en: {
    crumb: 'Company',
    h1: 'If it’s complicated to use, it’s not finished.',
    lead: 'SNS Solutions is a software company in Vienna. We build for estate agents, for HVAC and refrigeration manufacturers, and for any team buried in routine.',
    film: 'A white architectural model of a Viennese district in morning light, the camera gliding slowly over the roofs.',
    teamH: 'The people who build it.',
    teamSub: 'Three founders. The people you talk to are the people who build it.',
    people: [
      [
        'CEO',
        'Runs the company and works with customers on what our products should do. From Austria, with a degree in psychology.',
      ],
      [
        'CTO',
        'Leads the engineering and builds the products end to end. From England, a self-taught engineer with a background in business, now pursuing a master’s in computer science.',
      ],
      [
        'CFO',
        'Runs the finances. From Switzerland, with a degree in economics.',
      ],
    ],
    facts: [
      ['Based in', 'Vienna, Austria'],
      ['Founded', '2026'],
      ['We work in', 'English and German'],
      ['We build', 'Immvela, Pack CAD, QFUtool and custom software'],
    ],
    principles: [
      [
        'We measure before we build.',
        'A number from before is the only way to show what changed after.',
      ],
      [
        'Engineering you don’t see.',
        'Serious work underneath, and an interface the people using it every day find obvious.',
      ],
      ['Straight answers.', 'If software won’t help, we say so on the first call.'],
    ],
    closeH: 'Talk to the people who build it.',
    closeSub: 'We read every message and reply ourselves.',
    touch: 'Get in touch',
    book: 'Book a free 30-minute call',
  },
  de: {
    crumb: 'Unternehmen',
    h1: 'Wenn es kompliziert zu bedienen ist, ist es nicht fertig.',
    lead: 'SNS Solutions ist ein Softwareunternehmen in Wien. Wir bauen für Makler, für Hersteller in HLK und Kältetechnik und für jedes Team in Routinearbeit.',
    film: 'Ein weißes Architekturmodell eines Wiener Viertels im Morgenlicht, die Kamera gleitet langsam über die Dächer.',
    teamH: 'Die Menschen, die es bauen.',
    teamSub: 'Drei Gründer. Mit wem Sie sprechen, der baut es auch.',
    people: [
      [
        'CEO',
        'Führt das Unternehmen und erarbeitet mit Kunden, was unsere Produkte können sollen. Aus Österreich, mit einem Abschluss in Psychologie.',
      ],
      [
        'CTO',
        'Leitet die Entwicklung und baut die Produkte von Anfang bis Ende. Aus England, autodidaktischer Entwickler mit betriebswirtschaftlichem Hintergrund, derzeit im Masterstudium Informatik.',
      ],
      [
        'CFO',
        'Verantwortet die Finanzen. Aus der Schweiz, mit einem Abschluss in Volkswirtschaftslehre.',
      ],
    ],
    facts: [
      ['Sitz', 'Wien, Österreich'],
      ['Gegründet', '2026'],
      ['Wir arbeiten auf', 'Deutsch und Englisch'],
      [
        'Wir bauen',
        'Immvela, Pack CAD, QFUtool und individuelle Software',
      ],
    ],
    principles: [
      [
        'Wir messen, bevor wir bauen.',
        'Nur ein Wert von vorher zeigt, was sich danach verändert hat.',
      ],
      [
        'Technik, die man nicht sieht.',
        'Solide Arbeit darunter und eine Oberfläche, die den Menschen, die sie täglich nutzen, selbstverständlich vorkommt.',
      ],
      ['Klare Antworten.', 'Wenn Software nicht hilft, sagen wir das im ersten Gespräch.'],
    ],
    closeH: 'Sprechen Sie mit den Menschen, die es bauen.',
    closeSub: 'Wir lesen jede Nachricht und antworten selbst.',
    touch: 'Kontakt aufnehmen',
    book: 'Kostenloses Erstgespräch buchen',
  },
}

export default function Company({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <SilverPage locale={locale} alt="/team">
      <Sec bg="var(--base)" pearl pad={['clamp(64px,11vh,120px)', 'min(10vh,88px)']}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Crumb items={[{ label: t.crumb }]} />
          <h1 className="k1" style={{ maxWidth: '12em' }}>
            {t.h1}
          </h1>
          <p className="mut lead">{t.lead}</p>
        </div>
        <div style={{ marginTop: 'clamp(48px,7vh,72px)' }}>
          <div className="vd">
            <Film name="vienna-model" label={t.film} ratio="21/9" dark={false} />
          </div>
          <div className="vm" style={{ display: 'none' }}>
            <Film name="vienna-model-m" label={t.film} ratio="4/5" dark={false} />
          </div>
        </div>
      </Sec>

      <Sec id="team">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div className="row2" style={{ alignItems: 'end' }}>
            <h2 className="k2">{t.teamH}</h2>
            <p className="mut body">{t.teamSub}</p>
          </div>
          <div className="founders">
            {PEOPLE.map((p, i) => (
              <div key={p.name}>
                <div className="plate" role="img" aria-label={p.name}>
                  <span aria-hidden="true">{p.initials}</span>
                </div>
                <h3 className="k3" style={{ marginTop: 8 }}>
                  {p.name}
                </h3>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{t.people[i][0]}</span>
                <span className="mut" style={{ lineHeight: 1.55, fontSize: 15.5 }}>
                  {t.people[i][1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <Sec bg="var(--band)">
        <div className="row2">
          <dl className="legal" style={{ margin: 0, borderTop: '1px solid var(--line)' }}>
            {t.facts.map(([a, b]) => (
              <div key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>
            ))}
          </dl>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {t.principles.map(([a, b]) => (
              <div
                key={a}
                style={{
                  borderTop: '1px solid var(--line)',
                  padding: '26px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <strong
                  style={{
                    fontSize: 'clamp(24px,2.4vw,34px)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.1,
                  }}
                >
                  {a}
                </strong>
                <span className="mut body">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <Closing
        heading={t.closeH}
        sub={t.closeSub}
        ctas={[
          { label: t.touch, href: contactHref(locale) },
          { label: t.book, href: href(locale, 'consulting', '#book'), kind: 'glass' },
        ]}
      />
    </SilverPage>
  )
}
