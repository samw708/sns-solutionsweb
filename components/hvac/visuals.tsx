import type { Locale } from '@/i18n/config'

/**
 * Small product pictures for the HVAC pages, in the manner of immvela.com: show what the tool
 * produces instead of listing it. Plain markup, so they render in the HTML, scale on a phone and
 * stay legible to a screen reader as ordinary text. Every value is a sample, and each card says
 * "Example": no real customer, model name or result.
 */

const L = {
  en: {
    example: 'Example',
    record: {
      title: 'Unit 0117',
      sub: 'One record',
      rows: [
        ['Selection', 'Fits the duty', 'ok'],
        ['Quote', 'Sent from the selection', 'ok'],
        ['Design', 'Released, Rev C', 'ok'],
        ['Documents', 'Dossier complete', 'ok'],
        ['Service', 'History on file', 'mute'],
      ],
    },
    sel: {
      title: 'Selection',
      duty: [
        ['Cooling capacity', '120 kW'],
        ['Water in / out', '12 / 7 °C'],
        ['Ambient', '35 °C'],
      ],
      results: [
        ['Size 120', 'Fits the duty', 'ok', 'Best match'],
        ['Size 140', 'Fits the duty', 'ok', ''],
        ['Size 100', 'Too small', 'warn', ''],
      ],
      datasheet: 'Datasheet PDF',
      quote: 'Add to quote',
    },
    pack: {
      sheet: 'Selection printout · PDF',
      rows: [
        ['Compressors', 'model × count'],
        ['Refrigerant', 'R744 (CO₂)'],
        ['Operating points', 'MT · LT'],
      ],
      rules: 'your rules applied',
      caption: 'Schematic · 3D model · parts list',
      svg: {
        discharge: 'discharge header',
        suction: 'suction header',
        receiver: 'receiver',
        oil: 'oil',
        label:
          'Simplified pack: compressors on a frame between suction and discharge headers, with a receiver and an oil separator',
      },
    },
    docs: {
      title: 'Serial no. 0117',
      sub: 'Handover dossier',
      rows: [
        ['General arrangement drawing', 'Rev C', 'Released', 'ok'],
        ['Wiring diagram', 'Rev B', 'Released', 'ok'],
        ['Test report', '', 'Filed', 'ok'],
        ['Declaration of conformity', '', 'Filed', 'ok'],
        ['O&M manual', 'Rev A', 'Draft', 'warn'],
      ],
      foot: '4 of 5 ready',
    },
  },
  de: {
    example: 'Beispiel',
    record: {
      title: 'Anlage 0117',
      sub: 'Ein Datensatz',
      rows: [
        ['Auslegung', 'Erfüllt die Anforderung', 'ok'],
        ['Angebot', 'Aus der Auslegung versendet', 'ok'],
        ['Konstruktion', 'Freigegeben, Rev C', 'ok'],
        ['Dokumente', 'Dokumentation vollständig', 'ok'],
        ['Service', 'Historie vorhanden', 'mute'],
      ],
    },
    sel: {
      title: 'Auslegung',
      duty: [
        ['Kälteleistung', '120 kW'],
        ['Wasser ein / aus', '12 / 7 °C'],
        ['Umgebung', '35 °C'],
      ],
      results: [
        ['Baugröße 120', 'Erfüllt die Anforderung', 'ok', 'Beste Wahl'],
        ['Baugröße 140', 'Erfüllt die Anforderung', 'ok', ''],
        ['Baugröße 100', 'Zu klein', 'warn', ''],
      ],
      datasheet: 'Datenblatt PDF',
      quote: 'Ins Angebot',
    },
    pack: {
      sheet: 'Auslegungsausdruck · PDF',
      rows: [
        ['Verdichter', 'Modell × Anzahl'],
        ['Kältemittel', 'R744 (CO₂)'],
        ['Betriebspunkte', 'NK · TK'],
      ],
      rules: 'Ihre Regeln angewendet',
      caption: 'Schema · 3D-Modell · Stückliste',
      svg: {
        discharge: 'Drucksammelrohr',
        suction: 'Saugsammelrohr',
        receiver: 'Sammler',
        oil: 'Öl',
        label:
          'Vereinfachte Verbundanlage: Verdichter auf einem Rahmen zwischen Saug- und Drucksammelrohr, mit Sammler und Ölabscheider',
      },
    },
    docs: {
      title: 'Seriennr. 0117',
      sub: 'Übergabedokumentation',
      rows: [
        ['Aufstellungszeichnung', 'Rev C', 'Freigegeben', 'ok'],
        ['Schaltplan', 'Rev B', 'Freigegeben', 'ok'],
        ['Prüfbericht', '', 'Abgelegt', 'ok'],
        ['Konformitätserklärung', '', 'Abgelegt', 'ok'],
        ['Betriebsanleitung', 'Rev A', 'Entwurf', 'warn'],
      ],
      foot: '4 von 5 bereit',
    },
  },
} as const

function Tick() {
  return <span aria-hidden="true">✓</span>
}

/** The hero picture: one unit, one record, every stage on it. */
export function UnitRecord({ locale }: { locale: Locale }) {
  const t = L[locale].record
  return (
    <div className="in-mock">
      <p className="in-mock-head m-0">
        {t.title}
        <span>
          {L[locale].example} · {t.sub}
        </span>
      </p>
      {t.rows.map(([k, v, tone]) => (
        <div key={k} className="in-mock-row">
          <span className="font-semibold">{k}</span>
          <span className={`in-chip is-${tone}`}>
            {tone === 'ok' && <Tick />}
            {v}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Selection: a duty in, the sizes that meet it out, a datasheet ready. */
export function SelectionMock({ locale }: { locale: Locale }) {
  const t = L[locale].sel
  return (
    <div className="grid gap-4">
      <div className="in-mock">
        <p className="in-mock-head m-0">
          {t.title}
          <span>{L[locale].example}</span>
        </p>
        <div className="grid grid-cols-3 gap-3 pt-3">
          {t.duty.map(([k, v]) => (
            <div key={k}>
              <p className="m-0 text-[12px] text-[color:var(--hm-faint)]">{k}</p>
              <p className="m-0 mt-0.5 font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="in-mock">
        {t.results.map(([name, verdict, tone, badge]) => (
          <div key={name} className="in-mock-row">
            <span className="font-semibold">
              {name}
              {badge && <small className="text-[color:var(--hm-blue)]">{badge}</small>}
            </span>
            <span className={`in-chip is-${tone}`}>
              {tone === 'ok' && <Tick />}
              {verdict}
            </span>
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-4">
          <span className="in-chip">{t.datasheet}</span>
          <span className="in-chip is-mute">{t.quote} →</span>
        </div>
      </div>
    </div>
  )
}

/** CAD: a selection printout on the left, the pack your rules make of it on the right. */
export function PackMock({ locale, wide = false }: { locale: Locale; wide?: boolean }) {
  const f = L[locale].pack
  // Side by side only where the stage is the full page width; in a half-width row the printout
  // sits on top and the pack below it, so the drawing keeps its size.
  return (
    <div
      className={
        wide
          ? 'grid grid-cols-1 items-center gap-4 md:grid-cols-[0.9fr_auto_1.2fr]'
          : 'grid grid-cols-1 gap-3'
      }
    >
      <div className={`in-mock rotate-[-1.5deg] ${wide ? '' : 'w-[78%]'}`}>
        <p className="in-mono m-0 mb-2">{f.sheet}</p>
        {f.rows.map(([k, v]) => (
          <div key={k} className="in-mock-row">
            <span>{k}</span>
            <span className="in-mono">{v}</span>
          </div>
        ))}
      </div>
      <p className={`in-mono m-0 ${wide ? 'text-center' : 'pl-[22%]'}`} aria-hidden="true">
        {wide ? '→ ' : '↓ '}
        {f.rules}
      </p>
      <figure className="in-mock m-0">
        <svg viewBox="0 0 360 220" width="100%" role="img" aria-label={f.svg.label}>
          <rect x="20" y="180" width="320" height="10" rx="2" fill="#0b1f44" opacity="0.85" />
          <line x1="40" y1="60" x2="320" y2="60" stroke="#034599" strokeWidth="6" strokeLinecap="round" />
          <line x1="40" y1="120" x2="320" y2="120" stroke="#96a3cd" strokeWidth="8" strokeLinecap="round" />
          <g fill="#ffffff" stroke="#0b1f44" strokeWidth="2">
            <rect x="52" y="128" width="46" height="52" rx="10" />
            <rect x="112" y="128" width="46" height="52" rx="10" />
            <rect x="172" y="128" width="46" height="52" rx="10" />
          </g>
          <g stroke="#0b1f44" strokeWidth="2">
            <line x1="75" y1="128" x2="75" y2="120" />
            <line x1="135" y1="128" x2="135" y2="120" />
            <line x1="195" y1="128" x2="195" y2="120" />
          </g>
          <rect x="246" y="78" width="70" height="98" rx="34" fill="#e6eaf8" stroke="#0b1f44" strokeWidth="2" />
          <circle cx="282" cy="34" r="14" fill="#f6c9b0" stroke="#0b1f44" strokeWidth="2" />
          <g fontFamily="ui-monospace, monospace" fontSize="11" fill="#3a4766">
            <text x="40" y="50">{f.svg.discharge}</text>
            <text x="40" y="112">{f.svg.suction}</text>
            <text x="246" y="206">{f.svg.receiver}</text>
            <text x="302" y="38">{f.svg.oil}</text>
          </g>
        </svg>
        <figcaption className="in-mono mt-1.5">{f.caption}</figcaption>
      </figure>
    </div>
  )
}

/** Documents: one serial number, every document on it, with revision and release status. */
export function DossierMock({ locale }: { locale: Locale }) {
  const t = L[locale].docs
  return (
    <div className="in-mock">
      <p className="in-mock-head m-0">
        {t.title}
        <span>
          {L[locale].example} · {t.sub}
        </span>
      </p>
      {t.rows.map(([name, rev, status, tone]) => (
        <div key={name} className="in-mock-row">
          <span>
            {name}
            {rev && <small>{rev}</small>}
          </span>
          <span className={`in-chip is-${tone}`}>
            {tone === 'ok' && <Tick />}
            {status}
          </span>
        </div>
      ))}
      <p className="m-0 pt-4 text-[13px] font-semibold text-[color:var(--hm-blue)]">{t.foot}</p>
    </div>
  )
}
