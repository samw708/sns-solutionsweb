import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { QFUTOOL_URL, contactHref, href, immvelaHref } from '@/lib/silver/links'
import SilverPage from '../Shell'
import DialMark from '../DialMark'
import Video from '../Video'
import { Closing, Lights } from '../ui'
import '@/app/silver-products.css'

/**
 * /products: the three products SNS builds itself, as equals.
 * Opening: a triptych of the three, which doubles as the index (each panel jumps to its chapter).
 * Then one chapter per product: who it is for, what it does in three steps (a real sequence), its film, the facts, and
 * where to go next. Every fact here is already stated elsewhere on the site or on the product's own site; nothing new.
 */

type Chapter = {
  id: string
  name: string
  ink: string
  pill: string
  for: string
  statement: string
  steps: string[][]
  facts: string[][]
}

const T = {
  en: {
    h1: 'Three products, built in-house.',
    line: 'One for refrigeration pack manufacturers, one for estate agents, one for any team that sends quotes.',
    index: 'Jump to a product',
    panels: {
      pack: 'For refrigeration pack manufacturers',
      immvela: 'For estate agents',
      qfu: 'For teams that send quotes',
    },
    films: {
      packLoop: 'A refrigeration pack drawn as a wireframe, filling in as solid metal.',
      pack: 'A CO₂ booster pack from the Pack CAD model coming apart into its frame, compressors, vessels and pipework, then fitting back together.',
      helix: 'From Evening, our film for Immvela: the helix turning at dusk.',
    },
    howHeading: 'How it works',
    pack: {
      pill: 'Current speciality: CO₂ booster packs',
      for: 'For refrigeration pack manufacturers.',
      statement:
        'Pack CAD takes the selection from your manufacturer’s tool and produces the pack in 3D and 2D, inside your engineering rules. It flags what isn’t possible, and says why.',
      steps: [
        ['Upload the printout', 'The PDF your selection software already produces. Pack CAD reads the compressors, refrigerant, temperatures and duties from it.'],
        ['Your rules applied', 'Headers, valves, vessels and the oil system, chosen and placed from your catalogue and your house rules.'],
        ['Design and detail', 'The pack in 3D on your frame family, with its 2D drawings and parts list. STEP and DXF for exchanging files.'],
      ],
      facts: [
        ['Reads', 'The selection printout your software already produces'],
        ['Built', 'For each manufacturer, on its own rules. It stays yours.'],
        ['Out', '3D model, 2D drawings, parts list, STEP and DXF'],
        ['Signed off by', 'Your engineers, on every design'],
      ],
      cta: 'See Pack CAD',
      past: 'Send us a past job',
    },
    immvela: {
      pill: 'Closed beta',
      for: 'For estate agents in Austria, Germany and Switzerland.',
      statement:
        'Leave the digital work to Immvela and keep the human side for yourself: the owners, the viewings, the negotiation. Ask in the chat and it prepares the property, from the documents to the posts. You check the result and press publish.',
      steps: [
        ['Ask in the chat', 'Say “get it ready”, or ask for just the Exposé. Immvela makes the plan, does each step and shows you every result in the thread. In Auto it remembers how you like your listings and gets on with it; anything that goes out still waits for you.'],
        ['Paperwork and location, handled', 'Upload the Energieausweis, floor plan and photos, or bring listings over from your CRM. Immvela reads the values out and you confirm each one once. Where two records disagree it shows both side by side; a missing required value is flagged, never invented. For Vienna properties it adds the nearby schools and U-Bahn and tram stops from the city’s open data, with walking times.'],
        ['Every listing looks like your best one', 'The Exposé and a designed brochure in your office’s branding, in the German of the listing’s country. Empty rooms staged, each photo labelled as virtually staged. Posts written for each of your channels go out when you approve.'],
      ],
      facts: [
        ['How you work with it', 'Ask in the chat. It plans, does the work and waits for your approval'],
        ['Takes on', 'The digital work on every listing, from the documents to the posts'],
        ['In development', 'Walkthrough videos filmed on a phone, and a real estate knowledge assistant that cites its sources'],
        ['Status', 'Closed beta, German first, English available'],
      ],
      cta: 'Visit immvela.com ↗',
    },
    qfu: {
      pill: '14 days free',
      for: 'For sales teams in any industry.',
      statement:
        'You sent the quote. Now somebody has to chase it. QFUtool follows up with each customer in your name, during business hours, and hands you the ones who reply.',
      steps: [
        ['Upload your quotes', 'The spreadsheet of quotes that went out. That’s the whole setup.'],
        ['Follow-ups in your name', 'Written for each customer and sent during business hours. You don’t write a single chase email.'],
        ['Replies come to you', 'The moment a customer replies, the follow-ups stop and the conversation is yours.'],
      ],
      facts: [
        ['Replaces', 'Chasing quotes by hand'],
        ['Price', '14 days free, then from €19 a month'],
        ['Setup', 'A spreadsheet of your quotes, no CRM'],
        ['Lives at', 'qfutool.com'],
      ],
      cta: 'Visit qfutool.com ↗',
    },
    close: 'Need something none of them does?',
    sub: 'We also build custom software and automation around how your team works. Tell us what takes too long.',
    book: 'Book a free 30-minute call',
    contact: 'Write to us',
  },
  de: {
    h1: 'Drei Produkte, selbst entwickelt.',
    line: 'Eines für Hersteller von Kälteverbundanlagen, eines für Immobilienmakler, eines für jedes Team, das Angebote verschickt.',
    index: 'Zu einem Produkt springen',
    panels: {
      pack: 'Für Hersteller von Kälteverbundanlagen',
      immvela: 'Für Immobilienmakler',
      qfu: 'Für Teams, die Angebote verschicken',
    },
    films: {
      packLoop: 'Eine Kälteverbundanlage als Drahtmodell, die sich zu massivem Metall füllt.',
      pack: 'Eine CO₂-Booster-Verbundanlage aus dem Pack-CAD-Modell zerfällt in Rahmen, Verdichter, Behälter und Rohrleitungen und fügt sich wieder zusammen.',
      helix: 'Aus „Evening“, unserem Film für Immvela: die Helix in der Dämmerung.',
    },
    howHeading: 'So funktioniert es',
    pack: {
      pill: 'Aktueller Schwerpunkt: CO₂-Booster-Anlagen',
      for: 'Für Hersteller von Kälteverbundanlagen.',
      statement:
        'Pack CAD nimmt die Auslegung aus dem Tool Ihres Herstellers und erstellt daraus die Anlage in 3D und 2D, innerhalb Ihrer Konstruktionsregeln. Was nicht möglich ist, wird markiert, mit Begründung.',
      steps: [
        ['Ausdruck hochladen', 'Das PDF, das Ihre Auslegungssoftware ohnehin erzeugt. Pack CAD liest daraus Verdichter, Kältemittel, Temperaturen und Leistungen.'],
        ['Ihre Regeln angewendet', 'Sammelrohre, Ventile, Behälter und Ölsystem, gewählt und platziert nach Ihrem Katalog und Ihren Hausregeln.'],
        ['Konstruieren und detaillieren', 'Die Anlage in 3D auf Ihrer Rahmenfamilie, mit 2D-Zeichnungen und Stückliste. STEP und DXF für den Datenaustausch.'],
      ],
      facts: [
        ['Liest', 'Den Auslegungsausdruck, den Ihre Software ohnehin erzeugt'],
        ['Gebaut', 'Für jeden Hersteller, nach seinen Regeln. Es bleibt Ihres.'],
        ['Ergebnis', '3D-Modell, 2D-Zeichnungen, Stückliste, STEP und DXF'],
        ['Freigegeben von', 'Ihren Ingenieuren, bei jeder Konstruktion'],
      ],
      cta: 'Pack CAD ansehen',
      past: 'Früheres Projekt schicken',
    },
    immvela: {
      pill: 'Geschlossene Beta',
      for: 'Für Immobilienmakler in Österreich, Deutschland und der Schweiz.',
      statement:
        'Überlassen Sie die digitale Arbeit Immvela und kümmern Sie sich um die menschliche Seite: Eigentümer, Besichtigungen, Verhandlungen. Im Chat beauftragt, bereitet Immvela die Immobilie vor, von den Unterlagen bis zu den Beiträgen. Sie prüfen das Ergebnis und veröffentlichen.',
      steps: [
        ['Im Chat beauftragen', 'Sagen Sie „Fertig machen“ oder bitten Sie nur um das Exposé. Immvela erstellt den Plan, erledigt jeden Schritt und zeigt Ihnen jedes Ergebnis im Verlauf. Im Auto-Modus merkt es sich, wie Sie Ihre Inserate mögen, und legt los; was hinausgeht, wartet trotzdem auf Sie.'],
        ['Unterlagen und Lage, erledigt', 'Laden Sie Energieausweis, Grundriss und Fotos hoch oder übernehmen Sie Objekte aus Ihrem CRM. Immvela liest die Werte aus, Sie bestätigen jeden einmal. Widersprechen sich zwei Unterlagen, zeigt es beide nebeneinander; fehlt ein Pflichtwert, wird er markiert, nie erfunden. Für Wiener Objekte ergänzt es Schulen sowie U-Bahn- und Straßenbahnhaltestellen in der Nähe aus den offenen Daten der Stadt, mit Gehzeiten.'],
        ['Jedes Inserat wie Ihr bestes', 'Exposé und gestaltete Broschüre im Auftritt Ihres Büros, im Deutsch des Landes, in dem die Immobilie liegt. Leere Räume virtuell möbliert, jedes solche Foto gekennzeichnet. Beiträge für jeden Ihrer Kanäle gehen hinaus, wenn Sie freigeben.'],
      ],
      facts: [
        ['So arbeiten Sie damit', 'Im Chat beauftragen. Es plant, erledigt die Arbeit und wartet auf Ihre Freigabe'],
        ['Übernimmt', 'Die digitale Arbeit an jedem Inserat, von den Unterlagen bis zu den Beiträgen'],
        ['In Entwicklung', 'Rundgang-Videos, mit dem Handy gefilmt, und ein Immobilien-Wissensassistent, der seine Quellen nennt'],
        ['Status', 'Geschlossene Beta, Deutsch zuerst, Englisch verfügbar'],
      ],
      cta: 'immvela.com besuchen ↗',
    },
    qfu: {
      pill: '14 Tage kostenlos',
      for: 'Für Vertriebsteams jeder Branche.',
      statement:
        'Das Angebot ist verschickt. Jetzt muss jemand nachfassen. QFUtool schreibt jedem Kunden in Ihrem Namen, während der Geschäftszeiten, und übergibt Ihnen die, die antworten.',
      steps: [
        ['Angebote hochladen', 'Die Tabelle der verschickten Angebote. Das ist die ganze Einrichtung.'],
        ['Nachfassen in Ihrem Namen', 'Für jeden Kunden geschrieben und während der Geschäftszeiten verschickt. Sie schreiben keine einzige Erinnerungsmail.'],
        ['Antworten gehen an Sie', 'Sobald ein Kunde antwortet, stoppt das Nachfassen und das Gespräch gehört Ihnen.'],
      ],
      facts: [
        ['Ersetzt', 'Das Nachfassen von Hand'],
        ['Preis', '14 Tage kostenlos, danach ab 19 € im Monat'],
        ['Einrichtung', 'Eine Tabelle Ihrer Angebote, kein CRM'],
        ['Zu finden auf', 'qfutool.com'],
      ],
      cta: 'qfutool.com besuchen ↗',
    },
    close: 'Sie brauchen etwas, das keines davon kann?',
    sub: 'Wir bauen auch individuelle Software und Automatisierung, abgestimmt darauf, wie Ihr Team arbeitet. Sagen Sie uns, was zu lange dauert.',
    book: 'Kostenloses Erstgespräch buchen',
    contact: 'Schreiben Sie uns',
  },
}

function ChapterSection({
  c,
  how,
  media,
  ctas,
  flip,
  band,
}: {
  c: Chapter
  how: string
  media: React.ReactNode
  ctas: React.ReactNode
  flip?: boolean
  band?: boolean
}) {
  return (
    <section id={c.id} className={`chap${flip ? ' flip' : ''}`} style={{ background: band ? 'var(--band)' : 'var(--plain)', '--acc': c.ink }} aria-labelledby={`${c.id}-h`}>
      <div className="w" style={{ paddingTop: 'min(13vh,120px)', paddingBottom: 'min(13vh,120px)' }}>
        <div className="chap-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="pill">{c.pill}</span>
            <h2 id={`${c.id}-h`} className="chap-name">
              {c.name}
            </h2>
          </div>
          <p className="chap-for">{c.for}</p>
        </div>
        <div className="chap-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p className="lead" style={{ color: 'var(--tx)' }}>
              {c.statement}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 className="chap-how">{how}</h3>
              <ol className="chap-steps">
                {c.steps.map(([a, b], i) => (
                  <li key={a}>
                    <span aria-hidden="true">{i + 1}</span>
                    <div>
                      <strong>{a}</strong>
                      <p className="mut">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{ctas}</div>
          </div>
          <div className="chap-media">{media}</div>
        </div>
        <dl className="facts">
          {c.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default function Products({ locale }: { locale: Locale }) {
  const t = T[locale]
  const pack: Chapter = { id: 'pack-cad', name: 'Pack CAD', ink: '#121619', ...t.pack }
  const immvela: Chapter = { id: 'immvela', name: 'Immvela', ink: '#1F7A5A', ...t.immvela }
  const qfu: Chapter = { id: 'qfutool', name: 'QFUtool', ink: '#B5452C', ...t.qfu }

  return (
    <SilverPage locale={locale} alt="/products">
      {/* Opening: the three as a triptych and an index */}
      <section className="pearl" style={{ background: 'var(--base)' }}>
        <Lights />
        <div className="w" style={{ paddingTop: 'clamp(56px,9vh,100px)', paddingBottom: 'min(12vh,108px)', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h1 className="k1" style={{ fontSize: 'clamp(44px,5.6vw,88px)', maxWidth: '12em' }}>
              {t.h1}
            </h1>
            <p className="mut lead" style={{ textAlign: 'center' }}>
              {t.line}
            </p>
          </div>
          <nav className="pano prod-pano" aria-label={t.index}>
            <a href="#pack-cad" style={{ background: '#000' }}>
              <Video src="/sns/site/pack-loop.mp4" poster="/sns/site/pack-loop-poster.jpg" label={t.films.packLoop} />
              <span className="pn-name">
                Pack CAD
              </span>
              <span className="pn-line">{t.panels.pack}</span>
            </a>
            <a href="#immvela" style={{ background: '#2E3E5E' }}>
              <Video src="/sns/site/helix-dusk.mp4" poster="/sns/site/helix-dusk-poster.jpg" label={t.films.helix} />
              <span className="pn-name">
                Immvela
              </span>
              <span className="pn-line">{t.panels.immvela}</span>
            </a>
            <a href="#qfutool" className="qpanel">
              <span className="qscene" aria-hidden="true">
                <DialMark play="loop" size="58%" />
              </span>
              <span className="pn-name">
                QFUtool
              </span>
              <span className="pn-line">{t.panels.qfu}</span>
            </a>
          </nav>
        </div>
      </section>

      <ChapterSection
        c={pack}
        how={t.howHeading}
        media={
          <div className="chap-frame">
            <Video src="/sns/site/pack-apart.mp4" poster="/sns/site/pack-apart-poster.jpg" label={t.films.pack} className="" />
          </div>
        }
        ctas={
          <>
            <Link className="btn dark" href={href(locale, 'pack')}>
              {t.pack.cta}
            </Link>
            <Link className="btn glass" href={contactHref(locale, 'pastjob')}>
              {t.pack.past}
            </Link>
          </>
        }
      />

      <ChapterSection
        c={immvela}
        how={t.howHeading}
        flip
        band
        media={
          <div className="chap-frame" style={{ background: '#2E3E5E' }}>
            <Video src="/sns/site/helix-dusk.mp4" poster="/sns/site/helix-dusk-poster.jpg" label={t.films.helix} className="" />
          </div>
        }
        ctas={
          <a className="btn" href={immvelaHref(locale)} target="_blank" rel="noopener" style={{ background: '#1F7A5A', color: '#FFFFFF' }}>
            {t.immvela.cta}
          </a>
        }
      />

      <ChapterSection
        c={qfu}
        how={t.howHeading}
        media={
          <div className="chap-frame qframe">
            <DialMark play="inview" size="46%" />
          </div>
        }
        ctas={
          <a className="btn" href={QFUTOOL_URL} target="_blank" rel="noopener" style={{ background: '#E65D3F', color: '#140806' }}>
            {t.qfu.cta}
          </a>
        }
      />

      <Closing
        heading={t.close}
        sub={t.sub}
        ctas={[
          { label: t.book, href: href(locale, 'consulting', '#book') },
          { label: t.contact, href: href(locale, 'contact'), kind: 'glass' },
        ]}
      />
    </SilverPage>
  )
}
