import type { Locale } from '@/i18n/config'
import BookingWidget from '@/components/booking/BookingWidget'
import SilverPage from '../Shell'
import { Crumb, Joined, Sec } from '../ui'
import SilverContactForm from './SilverContactForm'
import '@/app/silver-pages-c.css'

/** Contact (/contact). Canvas board Site-Contact: the form, a booking widget beside it, the details in one row. */

const T = {
  en: {
    crumb: 'Contact',
    h1: 'What can we take off your plate?',
    lead: 'Tell us what’s taking your team too long and we’ll tell you how we’d approach it. We read every message and reply ourselves.',
    bookH: 'Or book a call',
    bookSub: 'Thirty minutes, online, free. Pick a time that suits you.',
    details: [
      ['Email', 'office@sns-austria.com', 'mailto:office@sns-austria.com'],
      ['Phone', '+43 670 1922538', 'tel:+436701922538'],
      ['Address', 'Schrötlgasse 8a, 1220 Vienna, Austria', ''],
      ['Reply', 'Usually within 1 to 2 business days', ''],
    ],
  },
  de: {
    crumb: 'Kontakt',
    h1: 'Was können wir Ihnen abnehmen?',
    lead: 'Sagen Sie uns, was in Ihrem Team zu lange dauert, und wir sagen Ihnen, wie wir es angehen würden. Wir lesen jede Nachricht und antworten selbst.',
    bookH: 'Oder buchen Sie ein Gespräch',
    bookSub: 'Dreißig Minuten, online, kostenlos. Wählen Sie eine Zeit, die Ihnen passt.',
    details: [
      ['E-Mail', 'office@sns-austria.com', 'mailto:office@sns-austria.com'],
      ['Telefon', '+43 670 1922538', 'tel:+436701922538'],
      ['Adresse', 'Schrötlgasse 8a, 1220 Wien, Österreich', ''],
      ['Antwort', 'Meist innerhalb von 1–2 Werktagen', ''],
    ],
  },
}

export default function Contact({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <SilverPage locale={locale} alt="/contact">
      <Joined>
        <Sec bg="transparent" pad={['clamp(56px,9vh,100px)', 'clamp(40px,6vh,64px)']}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Crumb items={[{ label: t.crumb }]} />
            <h1 className="k1" style={{ maxWidth: '12em' }}>
              {t.h1}
            </h1>
            <p className="mut lead">{t.lead}</p>
          </div>
        </Sec>
        <Sec bg="transparent" pad={['0', 'min(12vh,104px)']}>
          <div
            className="row2"
            style={{ gridTemplateColumns: 'minmax(0,.85fr) minmax(0,1.15fr)', alignItems: 'start' }}
          >
            <div
              id="book"
              className="c-sticky"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                position: 'sticky',
                top: 110,
              }}
            >
              <h2 className="k3">{t.bookH}</h2>
              <p className="mut body">{t.bookSub}</p>
              <BookingWidget locale={locale} />
            </div>
            <SilverContactForm locale={locale} />
          </div>
        </Sec>
      </Joined>
      <Sec bg="var(--band)">
        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 'clamp(20px,3vw,40px)',
            margin: 0,
          }}
        >
          {t.details.map(([a, b, link]) => (
            <div
              key={a}
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <dt style={{ fontWeight: 600, fontSize: 15 }}>{a}</dt>
              <dd className="mut" style={{ fontSize: 16.5, lineHeight: 1.55, margin: 0 }}>
                {link ? (
                  <a href={link} style={{ textUnderlineOffset: 4 }}>
                    {b}
                  </a>
                ) : (
                  b
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Sec>
    </SilverPage>
  )
}
