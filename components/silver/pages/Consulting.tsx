import type { Locale } from '@/i18n/config'
import BookingWidget from '@/components/booking/BookingWidget'
import { contactHref } from '@/lib/silver/links'
import SilverPage from '../Shell'
import { Btns, Closing, Crumb, FaqSection, Sec } from '../ui'
import '@/app/silver-pages-c.css'

/** Consulting (/services). Canvas board Site-Consulting. */

const T = {
  en: {
    crumb: 'Consulting',
    h1: 'Where is AI worth it for you?',
    lead: 'Not every task is worth automating. We look at how your team works, tell you which parts are worth it and which aren’t, and only build when it pays off.',
    book: 'Book a free 30-minute call',
    how: 'How a build works',
    chat: [
      ['them', 'We send quotes all week and never get round to chasing them.'],
      ['us', 'Then that’s where we’d start.'],
      ['them', 'How do we find out if it’s worth it?'],
      ['us', 'Thirty minutes, online, free. We look at how you work and tell you straight.'],
    ],
    chatLabel: 'An example conversation',
    week: {
      h: 'One week of a sales team, sorted',
      ex: 'Example',
      worthH: 'Worth automating',
      worth: [
        'Reading incoming enquiries and sorting them',
        'Drafting the first quote from the enquiry',
        'Following up on quotes that got no reply',
        'Copying order data from one system to the next',
      ],
      keepH: 'Keep with people',
      keep: ['Visiting the site', 'Deciding the price', 'Calling the customer who is unsure'],
      note: 'What you leave the call with: your own week, split like this, with a reason for every line.',
    },
    offersH: 'Three ways we help.',
    offers: [
      {
        name: 'Custom software',
        line: 'Software built around your business, not the other way round.',
        text: 'Web apps, internal tools, dashboards and customer-facing products, designed around your exact workflow.',
        points: [
          'A tool built for your process',
          'Software your team wants to use',
          'A system that grows with you',
        ],
      },
      {
        name: 'AI & automation',
        line: 'Repetitive work, done in the background by your own systems.',
        text: 'Incoming documents read and filed, data kept in sync between your tools, and scheduled jobs nobody has to watch.',
        points: [
          'The repetitive work runs on its own',
          'Fewer errors, because the process is consistent',
          'Your team’s time back for work that needs a person',
        ],
      },
      {
        name: 'AI & IT consulting',
        line: 'Straight answers on where AI pays off.',
        text: 'We look at how your team works, tell you which parts are worth automating and which aren’t, and write down a plan. If you want, we build it too.',
        points: [
          'A written plan you can act on',
          'Advice from people who build this',
          'Help for as long as you need it, and no longer',
        ],
      },
    ],
    methodH: 'From the first call to the handover.',
    methodSub:
      'Four steps, and the second is the one most people skip: we measure the work before we touch it, so at the end you can see what changed.',
    steps: [
      ['Talk it through', 'You describe it. We ask the harder questions.'],
      ['Baseline', 'We measure the work before we touch it.'],
      ['Pilot', 'One workflow, live on real work, in weeks.'],
      ['Prove and hand over', 'The same measurement, run again. You own what we build.'],
    ],
    honest: 'And if the honest answer is “you don’t need this built”, that’s the answer you get.',
    bookH: 'Book a free online meeting.',
    bookSub:
      'Thirty minutes, no cost and no obligation. Tell us how your team works today and we’ll tell you where AI and better systems would pay off, and where they wouldn’t.',
    bookPoints: [
      'On Google Meet, the link comes with the invitation',
      'A concrete recommendation, in plain language',
      'No obligation to build anything with us',
    ],
    faqH: 'Questions about working with us',
    faq: [
      {
        q: 'What does the free call cover?',
        a: 'How your team works today, where the time goes, and whether software or AI would genuinely help. You leave with a recommendation, whether or not you work with us.',
      },
      {
        q: 'Do you only work with HVAC and real estate?',
        a: 'No. Those are where our products are, but custom builds and consulting are for any company with work that eats its week.',
      },
      {
        q: 'Who owns what you build?',
        a: 'You do: the system, the code, the documentation and the decision about what comes next.',
      },
      { q: 'Do you work in German?', a: 'Yes, in German and English.' },
    ],
    closeH: 'Is something taking your team too long?',
    closeSub:
      'Tell us what it is. We’ll tell you whether it can be automated, and what that would take.',
    write: 'Write to us',
  },
  de: {
    crumb: 'Beratung',
    h1: 'Wo lohnt sich KI für Sie?',
    lead: 'Nicht jede Aufgabe lohnt sich zu automatisieren. Wir sehen uns an, wie Ihr Team arbeitet, sagen Ihnen, welche Teile sich lohnen und welche nicht, und bauen nur, wenn es sich rechnet.',
    book: 'Kostenloses Erstgespräch buchen',
    how: 'So läuft ein Projekt ab',
    chat: [
      ['them', 'Wir verschicken die ganze Woche Angebote und kommen nie dazu, nachzufassen.'],
      ['us', 'Dann würden wir genau dort anfangen.'],
      ['them', 'Wie finden wir heraus, ob es sich lohnt?'],
      [
        'us',
        'Dreißig Minuten, online, kostenlos. Wir sehen uns an, wie Sie arbeiten, und sagen es Ihnen offen.',
      ],
    ],
    chatLabel: 'Ein Beispielgespräch',
    week: {
      h: 'Eine Woche eines Vertriebsteams, sortiert',
      ex: 'Beispiel',
      worthH: 'Lohnt sich zu automatisieren',
      worth: [
        'Eingehende Anfragen lesen und sortieren',
        'Das erste Angebot aus der Anfrage entwerfen',
        'Bei unbeantworteten Angeboten nachfassen',
        'Auftragsdaten von einem System ins nächste übertragen',
      ],
      keepH: 'Bleibt bei Menschen',
      keep: [
        'Der Besuch vor Ort',
        'Die Entscheidung über den Preis',
        'Der Anruf beim unsicheren Kunden',
      ],
      note: 'Was Sie aus dem Gespräch mitnehmen: Ihre eigene Woche, so aufgeteilt, mit einer Begründung für jede Zeile.',
    },
    offersH: 'Drei Wege, wie wir helfen.',
    offers: [
      {
        name: 'Individuelle Software',
        line: 'Software, die sich nach Ihrem Unternehmen richtet, nicht umgekehrt.',
        text: 'Web-Apps, interne Tools, Dashboards und Produkte für Ihre Kunden, genau auf Ihre Arbeitsabläufe zugeschnitten.',
        points: [
          'Ein Tool, gebaut für Ihren Prozess',
          'Software, die Ihr Team gern nutzt',
          'Ein System, das mit Ihnen wächst',
        ],
      },
      {
        name: 'KI & Automatisierung',
        line: 'Wiederkehrende Arbeit, im Hintergrund von Ihren eigenen Systemen erledigt.',
        text: 'Eingehende Dokumente gelesen und abgelegt, Daten zwischen Ihren Tools synchron gehalten und geplante Abläufe, die niemand überwachen muss.',
        points: [
          'Die wiederkehrende Arbeit läuft von selbst',
          'Weniger Fehler, weil der Ablauf immer gleich ist',
          'Zeit für Ihr Team, für Arbeit, die einen Menschen braucht',
        ],
      },
      {
        name: 'KI- & IT-Beratung',
        line: 'Klare Antworten, wo sich KI lohnt.',
        text: 'Wir sehen uns an, wie Ihr Team arbeitet, sagen Ihnen, welche Teile sich zu automatisieren lohnen und welche nicht, und halten einen Plan schriftlich fest. Wenn Sie möchten, bauen wir ihn auch.',
        points: [
          'Ein schriftlicher Plan, mit dem Sie arbeiten können',
          'Rat von Menschen, die so etwas bauen',
          'Unterstützung, so lange Sie sie brauchen, und nicht länger',
        ],
      },
    ],
    methodH: 'Vom ersten Gespräch bis zur Übergabe.',
    methodSub:
      'Vier Schritte, und den zweiten lassen die meisten aus: Wir messen die Arbeit, bevor wir sie anfassen, damit Sie am Ende sehen, was sich verändert hat.',
    steps: [
      ['Durchsprechen', 'Sie beschreiben es. Wir stellen die schwierigeren Fragen.'],
      ['Ausgangswert', 'Wir messen die Arbeit, bevor wir sie anfassen.'],
      ['Pilot', 'Ein Arbeitsablauf, live mit echter Arbeit, in wenigen Wochen.'],
      ['Nachweisen und übergeben', 'Dieselbe Messung, noch einmal. Was wir bauen, gehört Ihnen.'],
    ],
    honest:
      'Und wenn die ehrliche Antwort „Das müssen Sie nicht bauen lassen“ lautet, bekommen Sie genau diese Antwort.',
    bookH: 'Buchen Sie ein kostenloses Online-Gespräch.',
    bookSub:
      'Dreißig Minuten, kostenlos und unverbindlich. Erzählen Sie uns, wie Ihr Team heute arbeitet, und wir sagen Ihnen, wo sich KI und bessere Systeme lohnen würden und wo nicht.',
    bookPoints: [
      'Über Google Meet, der Link kommt mit der Einladung',
      'Eine konkrete Empfehlung, in klarer Sprache',
      'Keine Verpflichtung, etwas mit uns zu bauen',
    ],
    faqH: 'Fragen zur Zusammenarbeit',
    faq: [
      {
        q: 'Worum geht es im kostenlosen Gespräch?',
        a: 'Wie Ihr Team heute arbeitet, wohin die Zeit geht und ob Software oder KI wirklich helfen würde. Sie gehen mit einer Empfehlung, ob Sie mit uns arbeiten oder nicht.',
      },
      {
        q: 'Arbeiten Sie nur mit HLK und Immobilien?',
        a: 'Nein. Dort liegen unsere Produkte, aber individuelle Entwicklung und Beratung sind für jedes Unternehmen, dessen Woche von solcher Arbeit aufgefressen wird.',
      },
      {
        q: 'Wem gehört, was Sie bauen?',
        a: 'Ihnen: das System, der Code, die Dokumentation und die Entscheidung, wie es weitergeht.',
      },
      { q: 'Arbeiten Sie auf Deutsch?', a: 'Ja, auf Deutsch und Englisch.' },
    ],
    closeH: 'Dauert in Ihrem Team etwas zu lange?',
    closeSub:
      'Sagen Sie uns, was es ist. Wir sagen Ihnen, ob es sich automatisieren lässt und was das brauchen würde.',
    write: 'Schreiben Sie uns',
  },
}

const bubble: React.CSSProperties = {
  maxWidth: '82%',
  borderRadius: 18,
  padding: '12px 16px',
  fontSize: 15.5,
  lineHeight: 1.4,
}
const task: React.CSSProperties = {
  borderRadius: 16,
  padding: '14px 18px',
  fontSize: 16,
  lineHeight: 1.4,
}

export default function Consulting({ locale }: { locale: Locale }) {
  const t = T[locale]
  const book = { label: t.book, href: '#book' }
  return (
    <SilverPage locale={locale} alt="/services">
      <Sec bg="var(--base)" pearl pad={['clamp(56px,9vh,100px)', 'clamp(56px,9vh,100px)']}>
        <div
          className="row2"
          style={{ alignItems: 'center', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Crumb items={[{ label: t.crumb }]} />
            <h1 className="k1">{t.h1}</h1>
            <p className="mut lead">{t.lead}</p>
            <Btns items={[book, { label: t.how, href: '#method', kind: 'glass' }]} />
          </div>
          <div
            className="c-chat"
            role="group"
            aria-label={t.chatLabel}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 'min(460px,100%)' }}
          >
            {t.chat.map(([w, x], i) => (
              <span
                key={x}
                style={{
                  ...bubble,
                  alignSelf: w === 'them' ? 'flex-start' : 'flex-end',
                  ...(w === 'them'
                    ? { background: 'var(--card)', boxShadow: '0 0 0 1px var(--line)' }
                    : { background: 'var(--tx)', color: 'var(--plain)' }),
                  animation: `aft .7s cubic-bezier(.22,1,.36,1) ${(0.4 + i * 0.9).toFixed(1)}s both`,
                  opacity: 0,
                }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </Sec>

      <Sec pad={['0', 'min(10vh,88px)']}>
        <div
          className="edge"
          style={{
            borderRadius: 28,
            padding: 'clamp(22px,3vw,40px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <h2 className="k3" style={{ fontSize: 'clamp(22px,2vw,28px)' }}>
              {t.week.h}
            </h2>
            <span className="mono mut">{t.week.ex}</span>
          </div>
          <div className="row2" style={{ gap: 'clamp(20px,3vw,40px)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <strong style={{ fontSize: 17 }}>{t.week.worthH}</strong>
              {t.week.worth.map((x) => (
                <span key={x} className="me" style={task}>
                  {x}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <strong style={{ fontSize: 17 }}>{t.week.keepH}</strong>
              {t.week.keep.map((x) => (
                <span key={x} className="chip" style={task}>
                  {x}
                </span>
              ))}
            </div>
          </div>
          <p className="mut" style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>
            {t.week.note}
          </p>
        </div>
      </Sec>

      <Sec>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          <h2 className="k2" style={{ maxWidth: '14em' }}>
            {t.offersH}
          </h2>
          <div className="cols3">
            {t.offers.map((o) => (
              <div key={o.name} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <strong className="k3">{o.name}</strong>
                <p style={{ margin: 0, fontSize: 18, lineHeight: 1.45, fontWeight: 500 }}>
                  {o.line}
                </p>
                <p className="mut" style={{ margin: 0, lineHeight: 1.55 }}>
                  {o.text}
                </p>
                <ul className="list" style={{ marginTop: 6 }}>
                  {o.points.map((p) => (
                    <li key={p} className="mut" style={{ padding: '12px 0', fontSize: 15 }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <Sec bg="var(--band)" id="method">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div className="row2" style={{ alignItems: 'end' }}>
            <h2 className="k2">{t.methodH}</h2>
            <p className="mut body">{t.methodSub}</p>
          </div>
          <div className="steps" style={{ gridTemplateColumns: 'repeat(4,minmax(0,1fr))' }}>
            {t.steps.map(([a, b], i) => (
              <div key={a}>
                <span className="mono mut">{i + 1}</span>
                <strong className="k3" style={{ fontSize: 22 }}>
                  {a}
                </strong>
                <span className="mut" style={{ lineHeight: 1.5 }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              margin: '12px 0 0',
              fontSize: 'clamp(24px,2.6vw,38px)',
              lineHeight: 1.2,
              letterSpacing: '-0.035em',
              maxWidth: '24em',
            }}
          >
            {t.honest}
          </p>
        </div>
      </Sec>

      <Sec id="book" className="c-book">
        <div className="row2" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 className="k2">{t.bookH}</h2>
            <p className="mut body">{t.bookSub}</p>
            <ul className="list">
              {t.bookPoints.map((p) => (
                <li key={p} className="mut">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <BookingWidget locale={locale} />
          </div>
        </div>
      </Sec>

      <FaqSection heading={t.faqH} items={t.faq} />
      <Closing
        heading={t.closeH}
        sub={t.closeSub}
        ctas={[book, { label: t.write, href: contactHref(locale), kind: 'glass' }]}
      />
    </SilverPage>
  )
}
