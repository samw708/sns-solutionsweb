import type { Locale } from '@/i18n/config'
import { DOCS_PATH, HVAC_PATH, PACK_PATH, SELECTION_PATH } from '@/lib/hvac-links'
import type { Faq } from '@/lib/hvac'

/**
 * Copy for the HVAC tool pages that share one template (components/silver/hvac/ToolPage.tsx):
 * /hvac/selection-software and /hvac/document-management, and their /de twins. The English is the
 * silver design canvas's copy (gen_site.py selection() / documents()).
 *
 * Same guardrails as lib/hvac.ts. These are things SNS *builds for* a manufacturer, not boxed
 * products, so the copy says "we build" and never "our product does". No results, no customer
 * names, no claims of compliance with a standard. Example UI is labelled as an example.
 */

export type ToolKey = 'selection' | 'documents'

type SelectionSignature = {
  kind: 'selection'
  heading: string
  sub: string
  example: string
  steps: { name: string; text: string }[]
  duty: { label: string; value: string }[]
  units: { name: string; note: string; action: string }[]
  sheet: string
}

type DocumentsSignature = {
  kind: 'documents'
  heading: string
  sub: string
  doc: string
  serial: string
  states: { name: string; text: string; rev: string; released: boolean }[]
}

export type ToolCopy = {
  path: string
  title: string
  description: string
  keywords: string[]
  /** The page's name in the breadcrumb and in schema serviceType. */
  eyebrow: string
  h1: string
  intro: string
  note: string
  /** 'split': headline left, film right/beneath; 'centred': headline over a wide film. */
  variant: 'split' | 'centred'
  film: { name: string; label: string }
  problems: { heading: string; items: { text: string; note?: string }[] }
  signature: SelectionSignature | DocumentsSignature
  builds: { heading: string; items: { name: string; text: string }[] }
  metrics: { heading: string; sub: string; items: string[] }
  related: { heading: string; open: string; items: { label: string; text: string; href: string }[] }
  faqHeading: string
  faq: Faq[]
  closing: { heading: string; sub: string }
}

const en: Record<ToolKey, ToolCopy> = {
  selection: {
    path: SELECTION_PATH,
    title: 'HVAC selection software',
    description:
      'Selection software for HVAC and refrigeration manufacturers, built on your performance data and rules: the right unit for the duty, with its datasheet and price, in the browser.',
    keywords: [
      'HVAC selection software',
      'HVAC product selection tool',
      'chiller selection software',
      'air handling unit selection software',
      'refrigeration selection software',
      'HVAC configurator',
      'HVAC submittal software',
    ],
    eyebrow: 'Selection software',
    h1: 'Enter the duty. Get the right unit from your range, with its datasheet and price.',
    intro:
      'We build selection tools on your own performance data and rules, so your sales engineers, reps and distributors select the way your best engineer does.',
    note: 'Built for each manufacturer on its own data. We start with one product family and add the rest once it’s in use.',
    variant: 'split',
    film: {
      name: 'selection-film',
      label:
        'A distributor’s enquiry waits overnight in the factory’s queue; entered in the browser, it returns the unit, its datasheet and its price together.',
    },
    problems: {
      heading: 'Where selection goes wrong today',
      items: [
        { text: 'Reps and distributors waiting on the factory for every selection' },
        { text: 'A desktop tool that’s hard to update and doesn’t run on the web' },
        { text: 'Quote, datasheet and submittal coming from different places' },
        {
          text: 'A datasheet in the bid that doesn’t meet the specification',
          note: 'In a 2016 German public tender, a ventilation bid was excluded because the datasheets submitted with it fell short of the required sound insulation. Vergabekammer Nordbayern, 21.VK-3194-25/16.',
        },
      ],
    },
    signature: {
      kind: 'selection',
      heading: 'From the duty to the datasheet.',
      sub: 'Three steps your sales engineer, rep or distributor does in the browser, the way your best engineer would.',
      example: 'Example',
      steps: [
        { name: 'Duty', text: 'Capacity, temperatures, refrigerant and site conditions, typed once.' },
        { name: 'Units that fit', text: 'Your range, filtered by your rules. The best fit first, and why the others don’t fit.' },
        { name: 'Datasheet and price', text: 'Generated from the same selection, in your layout and languages.' },
      ],
      duty: [
        { label: 'Cooling capacity', value: '120 kW' },
        { label: 'Evaporating', value: '−8 °C' },
        { label: 'Refrigerant', value: 'R744' },
      ],
      units: [
        { name: 'CX-140', note: 'Best fit', action: 'Select' },
        { name: 'CX-160', note: 'Larger than needed', action: 'View' },
      ],
      sheet: 'CX-140 datasheet',
    },
    builds: {
      heading: 'What we build',
      items: [
        {
          name: 'Your performance data, versioned',
          text: 'Ratings, correction factors and operating limits from your test data and catalogues, with a record of which version every selection used.',
        },
        {
          name: 'Your selection rules',
          text: 'Which units qualify, which options can be combined, and when a selection needs an engineer to look at it.',
        },
        { name: 'Datasheets and submittals', text: 'Generated for each selection, in your layout and your languages.' },
        { name: 'Selection to quote and design', text: 'The selected unit and its options pass on to quoting and design without being retyped.' },
        { name: 'Access for your sales channel', text: 'Sales engineers, reps and distributors each see what they should, in the browser.' },
      ],
    },
    metrics: {
      heading: 'What we measure',
      sub: 'Before the build and again after the pilot. If a figure doesn’t move, it wasn’t worth building.',
      items: ['Quote turnaround', 'Share of selections that need an engineer', 'Selection errors found after the order'],
    },
    related: {
      heading: 'Where a selection goes next',
      open: 'Open',
      items: [
        { label: 'Pack CAD', text: 'A compressor selection becomes a pack your workshop can build.', href: PACK_PATH },
        { label: 'Document management', text: 'The datasheet joins every other document for that unit.', href: DOCS_PATH },
        { label: 'All HVAC tools', text: 'Quoting, ERP links and service, on one record.', href: HVAC_PATH },
      ],
    },
    faqHeading: 'Questions about selection software',
    faq: [
      {
        q: 'Can it use our existing performance data and spreadsheets?',
        a: 'Yes, and that’s usually where we start. We take the data and rules from your current spreadsheets or tool, check them with your engineers, and build the selection on top.',
      },
      {
        q: 'Does it replace the component makers’ selection tools?',
        a: 'No. Those size their components; this selects your products. Where your units are built from a component selection, such as a refrigeration pack, that printout can feed the next step.',
      },
      {
        q: 'Who can use it?',
        a: 'Whoever you decide: your sales engineers, your reps and distributors, or your customers, each with their own permissions.',
      },
    ],
    closing: {
      heading: 'Bring us one product family.',
      sub: 'Book a free 30-minute call with the spreadsheet or tool you select from today. We’ll tell you what a selection tool on that data would take.',
    },
  },

  documents: {
    path: DOCS_PATH,
    title: 'Document management for HVAC manufacturers',
    description:
      'Drawings, datasheets, test reports and certificates for every HVAC unit, under revision control and one serial number, with the handover dossier assembled automatically.',
    keywords: [
      'HVAC document management',
      'document management for manufacturers',
      'technical documentation HVAC',
      'handover documentation HVAC',
      'O&M manual generation',
      'drawing revision control',
    ],
    eyebrow: 'Document management',
    h1: 'Every drawing, datasheet and certificate for every unit, under one serial number.',
    intro:
      'Drawings, datasheets, test reports and declarations under revision control, linked to the order and the serial number, and assembled into the handover dossier for each unit.',
    note: 'Works alongside the systems you have: your CAD or PDM, your ERP and the shared drives your documents live in today.',
    variant: 'centred',
    film: {
      name: 'documents-film',
      label:
        'A unit’s documents gather under its nameplate; a missing certificate is flagged and filed when it arrives; years later the as-built drawing is still in the file.',
    },
    problems: {
      heading: 'Where documents go wrong today',
      items: [
        { text: 'Drawings and certificates spread across shared drives and paper copies' },
        { text: 'The workshop building from a superseded revision' },
        { text: 'Handover dossiers put together by hand at the end of an order' },
        { text: 'Final payment held while a certificate is chased' },
        { text: 'Service unable to find the as-built documents years later' },
      ],
    },
    signature: {
      kind: 'documents',
      heading: 'The life of one document.',
      sub: 'Every drawing and certificate moves through the same four states, and the register always knows which one it is in.',
      doc: 'GA drawing',
      serial: '0318-02',
      states: [
        { name: 'Draft', text: 'Visible to engineering only.', rev: 'Rev C, in review', released: false },
        { name: 'Released', text: 'The only version the workshop sees.', rev: 'Rev C, released', released: true },
        { name: 'Superseded', text: 'Kept, marked, never built from.', rev: 'Rev B, superseded', released: false },
        { name: 'In the dossier', text: 'Filed under serial 0318-02 with everything else.', rev: 'Handover dossier, unit 2', released: true },
      ],
    },
    builds: {
      heading: 'What we build',
      items: [
        { name: 'One register per order and serial number', text: 'Every document for a unit in one place, from the first datasheet to the final test report.' },
        { name: 'Revision control with release status', text: 'Draft, released and superseded, so the workshop only ever sees the released version.' },
        { name: 'Dossiers assembled automatically', text: 'The handover pack for each unit, from the documents it needs, in the order your customer expects.' },
        { name: 'Documents filled from order data', text: 'Datasheets, nameplates and declarations filled from the selection and the order, not retyped.' },
        { name: 'Incoming documents read and filed', text: 'Supplier certificates and test reports read, matched to the right order and filed.' },
        { name: 'Access for service and customers', text: 'Technicians and customers find the documents for a serial number without asking the office.' },
      ],
    },
    metrics: {
      heading: 'What we measure',
      sub: 'Before the build and again after the pilot. If a figure doesn’t move, it wasn’t worth building.',
      items: ['Time to assemble a handover dossier', 'Documents released at the wrong revision', 'Time to find as-built documents for a service call'],
    },
    related: {
      heading: 'Where the documents come from',
      open: 'Open',
      items: [
        { label: 'Selection software', text: 'Datasheets generated from the selection itself.', href: SELECTION_PATH },
        { label: 'Pack CAD', text: 'Drawings and parts lists from the design rules.', href: PACK_PATH },
        { label: 'All HVAC tools', text: 'Quoting, ERP links and service, on one record.', href: HVAC_PATH },
      ],
    },
    faqHeading: 'Questions about document management',
    faq: [
      {
        q: 'Do we have to move our files?',
        a: 'No. We link to where your documents live today and add the register, the revisions and the dossiers on top. Moving them is optional.',
      },
      {
        q: 'Does it replace our PDM?',
        a: 'No. Your PDM keeps managing CAD files. We connect to it, so released drawings land in the right unit’s register.',
      },
      {
        q: 'Can customers get their documents directly?',
        a: 'Yes, if you want that: each customer sees the documents for their own units, by serial number.',
      },
    ],
    closing: {
      heading: 'Bring us one order’s documents.',
      sub: 'Book a free 30-minute call and bring the folder for one recent order. We’ll show you how its dossier would assemble itself.',
    },
  },
}

const de: Record<ToolKey, ToolCopy> = {
  selection: {
    path: SELECTION_PATH,
    title: 'Auslegungssoftware für HLK-Hersteller',
    description:
      'Auslegungssoftware für Hersteller in HLK und Kältetechnik, auf Ihren Leistungsdaten und Regeln: das passende Gerät für die Anforderung, mit Datenblatt und Preis, im Browser.',
    keywords: [
      'Auslegungssoftware HLK',
      'Auslegungsprogramm Klimatechnik',
      'Kaltwassersatz Auslegung Software',
      'Lüftungsgerät Auslegungsprogramm',
      'Auslegungssoftware Kältetechnik',
      'HLK Konfigurator',
    ],
    eyebrow: 'Auslegungssoftware',
    h1: 'Anforderung eingeben. Das passende Gerät aus Ihrem Programm erhalten, mit Datenblatt und Preis.',
    intro:
      'Wir bauen Auslegungsprogramme auf Ihren eigenen Leistungsdaten und Regeln, damit Ihre Vertriebsingenieure, Vertreter und Händler so auslegen wie Ihr bester Ingenieur.',
    note: 'Für jeden Hersteller auf seinen eigenen Daten gebaut. Wir beginnen mit einer Produktfamilie und ergänzen die übrigen, sobald sie im Einsatz ist.',
    variant: 'split',
    film: {
      name: 'selection-film',
      label:
        'Die Anfrage eines Händlers wartet über Nacht in der Warteschlange des Werks; im Browser eingegeben, liefert sie Gerät, Datenblatt und Preis zusammen.',
    },
    problems: {
      heading: 'Wo die Auslegung heute hakt',
      items: [
        { text: 'Vertreter und Händler, die für jede Auslegung auf das Werk warten' },
        { text: 'Ein Desktop-Programm, das schwer zu pflegen ist und nicht im Browser läuft' },
        { text: 'Angebot, Datenblatt und Einreichunterlage aus verschiedenen Quellen' },
        {
          text: 'Ein Datenblatt im Angebot, das die Ausschreibung nicht erfüllt',
          note: 'In einem öffentlichen Vergabeverfahren in Deutschland wurde 2016 ein Lüftungsangebot ausgeschlossen, weil die mitgelieferten Datenblätter die geforderte Schalldämmung nicht erreichten. Vergabekammer Nordbayern, 21.VK-3194-25/16.',
        },
      ],
    },
    signature: {
      kind: 'selection',
      heading: 'Von der Anforderung zum Datenblatt.',
      sub: 'Drei Schritte, die Ihr Vertriebsingenieur, Vertreter oder Händler im Browser erledigt, so wie Ihr bester Ingenieur.',
      example: 'Beispiel',
      steps: [
        { name: 'Anforderung', text: 'Leistung, Temperaturen, Kältemittel und Standortbedingungen, einmal eingegeben.' },
        { name: 'Passende Geräte', text: 'Ihr Programm, nach Ihren Regeln gefiltert. Das passendste Gerät zuerst, und warum die anderen nicht passen.' },
        { name: 'Datenblatt und Preis', text: 'Aus derselben Auslegung erzeugt, in Ihrem Layout und Ihren Sprachen.' },
      ],
      duty: [
        { label: 'Kälteleistung', value: '120 kW' },
        { label: 'Verdampfung', value: '−8 °C' },
        { label: 'Kältemittel', value: 'R744' },
      ],
      units: [
        { name: 'CX-140', note: 'Passt am besten', action: 'Wählen' },
        { name: 'CX-160', note: 'Größer als nötig', action: 'Ansehen' },
      ],
      sheet: 'Datenblatt CX-140',
    },
    builds: {
      heading: 'Was wir bauen',
      items: [
        {
          name: 'Ihre Leistungsdaten, versioniert',
          text: 'Leistungswerte, Korrekturfaktoren und Einsatzgrenzen aus Ihren Messdaten und Katalogen, mit Nachweis, welche Version jede Auslegung verwendet hat.',
        },
        {
          name: 'Ihre Auslegungsregeln',
          text: 'Welche Geräte in Frage kommen, welche Optionen kombinierbar sind und wann ein Ingenieur auf eine Auslegung schauen muss.',
        },
        { name: 'Datenblätter und Einreichunterlagen', text: 'Für jede Auslegung erzeugt, in Ihrem Layout und Ihren Sprachen.' },
        { name: 'Von der Auslegung zu Angebot und Konstruktion', text: 'Das ausgewählte Gerät und seine Optionen gehen ohne Abtippen an Angebot und Konstruktion weiter.' },
        { name: 'Zugang für Ihren Vertrieb', text: 'Vertriebsingenieure, Vertreter und Händler sehen jeweils, was sie sehen sollen, im Browser.' },
      ],
    },
    metrics: {
      heading: 'Was wir messen',
      sub: 'Vor dem Projekt und erneut nach dem Pilotbetrieb. Wenn sich eine Kennzahl nicht bewegt, war es den Bau nicht wert.',
      items: ['Angebotsdauer', 'Anteil der Auslegungen, die einen Ingenieur brauchen', 'Auslegungsfehler, die erst nach dem Auftrag auffallen'],
    },
    related: {
      heading: 'Wohin eine Auslegung weitergeht',
      open: 'Öffnen',
      items: [
        { label: 'Pack CAD', text: 'Aus einer Verdichterauslegung wird eine Anlage, die Ihre Werkstatt bauen kann.', href: PACK_PATH },
        { label: 'Dokumentenmanagement', text: 'Das Datenblatt landet bei allen anderen Unterlagen dieser Anlage.', href: DOCS_PATH },
        { label: 'Alle HLK-Werkzeuge', text: 'Angebote, ERP-Anbindung und Service, auf einem Datensatz.', href: HVAC_PATH },
      ],
    },
    faqHeading: 'Fragen zur Auslegungssoftware',
    faq: [
      {
        q: 'Kann sie unsere vorhandenen Leistungsdaten und Tabellen nutzen?',
        a: 'Ja, und dort beginnen wir meistens. Wir übernehmen Daten und Regeln aus Ihren Tabellen oder Ihrem bisherigen Programm, prüfen sie mit Ihren Ingenieuren und bauen die Auslegung darauf auf.',
      },
      {
        q: 'Ersetzt sie die Auslegungsprogramme der Komponentenhersteller?',
        a: 'Nein. Diese dimensionieren ihre Komponenten; diese Software wählt Ihre Produkte aus. Wo Ihre Geräte aus einer Komponentenauslegung entstehen, etwa bei einer Kälteverbundanlage, kann dieser Ausdruck den nächsten Schritt speisen.',
      },
      {
        q: 'Wer kann sie nutzen?',
        a: 'Wen Sie festlegen: Ihre Vertriebsingenieure, Ihre Vertreter und Händler oder Ihre Kunden, jeweils mit eigenen Berechtigungen.',
      },
    ],
    closing: {
      heading: 'Bringen Sie uns eine Produktfamilie.',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch mit der Tabelle oder dem Programm, mit dem Sie heute auslegen. Wir sagen Ihnen, was ein Auslegungsprogramm auf diesen Daten braucht.',
    },
  },

  documents: {
    path: DOCS_PATH,
    title: 'Dokumentenmanagement für HLK-Hersteller',
    description:
      'Zeichnungen, Datenblätter, Prüfberichte und Zertifikate jeder HLK-Anlage, unter Revisionsverwaltung und einer Seriennummer, mit automatisch zusammengestellter Übergabedokumentation.',
    keywords: [
      'Dokumentenmanagement HLK',
      'Dokumentenmanagement Hersteller',
      'Technische Dokumentation Kältetechnik',
      'Übergabedokumentation Anlagenbau',
      'Revisionsverwaltung Zeichnungen',
      'Betriebsanleitung erstellen',
    ],
    eyebrow: 'Dokumentenmanagement',
    h1: 'Jede Zeichnung, jedes Datenblatt und jedes Zertifikat jeder Anlage, unter einer Seriennummer.',
    intro:
      'Zeichnungen, Datenblätter, Prüfberichte und Erklärungen unter Revisionsverwaltung, verknüpft mit Auftrag und Seriennummer und zur Übergabedokumentation jeder Anlage zusammengestellt.',
    note: 'Arbeitet mit den Systemen, die Sie haben: Ihrem CAD oder PDM, Ihrem ERP und den Laufwerken, auf denen Ihre Unterlagen heute liegen.',
    variant: 'centred',
    film: {
      name: 'documents-film',
      label:
        'Die Unterlagen einer Anlage sammeln sich unter ihrem Typenschild; ein fehlendes Zertifikat wird markiert und abgelegt, sobald es eintrifft; Jahre später liegt die Ist-Zeichnung noch in der Akte.',
    },
    problems: {
      heading: 'Wo Unterlagen heute schiefgehen',
      items: [
        { text: 'Zeichnungen und Zertifikate verstreut über Laufwerke und Papierkopien' },
        { text: 'Die Werkstatt baut nach einer überholten Revision' },
        { text: 'Übergabedokumentation am Ende jedes Auftrags von Hand zusammengestellt' },
        { text: 'Die Schlusszahlung bleibt offen, während einem Zertifikat nachgelaufen wird' },
        { text: 'Der Service findet die Ist-Unterlagen Jahre später nicht' },
      ],
    },
    signature: {
      kind: 'documents',
      heading: 'Das Leben eines Dokuments.',
      sub: 'Jede Zeichnung und jedes Zertifikat durchläuft dieselben vier Zustände, und das Register weiß immer, in welchem es ist.',
      doc: 'Aufstellungszeichnung',
      serial: '0318-02',
      states: [
        { name: 'Entwurf', text: 'Nur für die Konstruktion sichtbar.', rev: 'Rev. C, in Prüfung', released: false },
        { name: 'Freigegeben', text: 'Die einzige Fassung, die die Werkstatt sieht.', rev: 'Rev. C, freigegeben', released: true },
        { name: 'Überholt', text: 'Aufbewahrt, markiert, nie danach gebaut.', rev: 'Rev. B, überholt', released: false },
        { name: 'In der Dokumentation', text: 'Unter Seriennummer 0318-02 abgelegt, mit allem anderen.', rev: 'Übergabedokumentation, Anlage 2', released: true },
      ],
    },
    builds: {
      heading: 'Was wir bauen',
      items: [
        { name: 'Ein Register je Auftrag und Seriennummer', text: 'Alle Unterlagen einer Anlage an einem Ort, vom ersten Datenblatt bis zum letzten Prüfbericht.' },
        { name: 'Revisionsverwaltung mit Freigabestatus', text: 'Entwurf, freigegeben, überholt: Die Werkstatt sieht immer nur die freigegebene Fassung.' },
        { name: 'Automatisch zusammengestellte Dokumentation', text: 'Die Übergabeunterlagen je Anlage, aus den benötigten Dokumenten in der Reihenfolge, die Ihr Kunde erwartet.' },
        { name: 'Unterlagen aus Auftragsdaten befüllt', text: 'Datenblätter, Typenschilder und Erklärungen aus Auslegung und Auftrag befüllt, nicht abgetippt.' },
        { name: 'Eingehende Unterlagen gelesen und abgelegt', text: 'Lieferantenzertifikate und Prüfberichte gelesen, dem richtigen Auftrag zugeordnet und abgelegt.' },
        { name: 'Zugang für Service und Kunden', text: 'Techniker und Kunden finden die Unterlagen zu einer Seriennummer, ohne im Büro nachzufragen.' },
      ],
    },
    metrics: {
      heading: 'Was wir messen',
      sub: 'Vor dem Projekt und erneut nach dem Pilotbetrieb. Wenn sich eine Kennzahl nicht bewegt, war es den Bau nicht wert.',
      items: ['Zeit bis zur fertigen Übergabedokumentation', 'Unterlagen, die in falscher Revision freigegeben wurden', 'Zeit, bis der Service die Ist-Unterlagen findet'],
    },
    related: {
      heading: 'Woher die Unterlagen kommen',
      open: 'Öffnen',
      items: [
        { label: 'Auslegungssoftware', text: 'Datenblätter direkt aus der Auslegung erzeugt.', href: SELECTION_PATH },
        { label: 'Pack CAD', text: 'Zeichnungen und Stücklisten aus den Konstruktionsregeln.', href: PACK_PATH },
        { label: 'Alle HLK-Werkzeuge', text: 'Angebote, ERP-Anbindung und Service, auf einem Datensatz.', href: HVAC_PATH },
      ],
    },
    faqHeading: 'Fragen zum Dokumentenmanagement',
    faq: [
      {
        q: 'Müssen wir unsere Dateien verschieben?',
        a: 'Nein. Wir verknüpfen die Orte, an denen Ihre Unterlagen heute liegen, und ergänzen Register, Revisionen und Dokumentation darüber. Ein Umzug ist optional.',
      },
      {
        q: 'Ersetzt es unser PDM?',
        a: 'Nein. Ihr PDM verwaltet weiter die CAD-Dateien. Wir binden es an, damit freigegebene Zeichnungen im Register der richtigen Anlage landen.',
      },
      {
        q: 'Können Kunden ihre Unterlagen direkt abrufen?',
        a: 'Ja, wenn Sie das möchten: Jeder Kunde sieht die Unterlagen seiner eigenen Anlagen, nach Seriennummer.',
      },
    ],
    closing: {
      heading: 'Bringen Sie uns die Unterlagen eines Auftrags.',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch und bringen Sie den Ordner eines aktuellen Auftrags mit. Wir zeigen Ihnen, wie sich seine Dokumentation selbst zusammenstellen würde.',
    },
  },
}

const COPY: Record<Locale, Record<ToolKey, ToolCopy>> = { en, de }

export const TOOL_KEYS: ToolKey[] = ['selection', 'documents']

export function getTool(locale: Locale, key: ToolKey): ToolCopy {
  return COPY[locale][key]
}
