import type { Locale } from '@/i18n/config'
import { DOCS_PATH, HVAC_PATH, PACK_PATH, SELECTION_PATH } from '@/lib/hvac-links'
import type { Faq } from '@/lib/hvac'

/**
 * Copy for the HVAC tool pages that share one template (components/hvac/ToolPage.tsx):
 * /hvac/selection-software and /hvac/document-management, and their /de twins.
 *
 * Same guardrails as lib/hvac.ts. These are things SNS *builds for* a manufacturer, not boxed
 * products, so the copy says "we build" and never "our product does". No results, no customer
 * names, no claims of compliance with a standard: the documents a unit needs are named, but
 * responsibility for their content stays with the manufacturer (see each page's FAQ).
 */

export type ToolKey = 'selection' | 'documents'

export type ToolCopy = {
  path: string
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  note: string
  problems: { heading: string; items: string[] }
  builds: { heading: string; items: { name: string; text: string }[] }
  metrics: { heading: string; sub: string; items: string[] }
  related: { heading: string; items: { label: string; text: string; href: string }[] }
  faqHeading: string
  faq: Faq[]
  closing: { heading: string; sub: string; cta: string }
  keywords: string[]
}

const en: Record<ToolKey, ToolCopy> = {
  selection: {
    path: SELECTION_PATH,
    title: 'HVAC selection software',
    description:
      'Selection software for HVAC and refrigeration manufacturers, built on your product data and rules: the right unit for the duty, with its datasheet and price, on the web.',
    eyebrow: 'Selection software',
    h1: 'Enter the duty. Get the right unit from your range, with its datasheet and price.',
    intro:
      'HVAC selection software takes a project’s duty (capacity, temperatures, airflow, refrigerant, site conditions) and returns the units from a manufacturer’s range that meet it, with their performance, a datasheet and a price. We build selection tools on your own product data and selection rules, so your sales engineers, reps and distributors select the way your best engineer does.',
    note: 'Built for each manufacturer on its own product data. We start with one product family and add the rest once it is in use.',
    problems: {
      heading: 'Where selection goes wrong today',
      items: [
        'A spreadsheet only one engineer fully understands',
        'A desktop tool that is hard to update and does not run on the web',
        'Reps and distributors waiting on the factory for every selection',
        'Datasheets assembled by hand for each quote',
        'Selections that no longer match what was quoted or built',
      ],
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
        {
          name: 'Datasheets and submittals',
          text: 'A datasheet or submittal generated for each selection, in your layout and your languages.',
        },
        {
          name: 'Selection to quote and design',
          text: 'The selected unit and its options pass on to quoting and design without being retyped.',
        },
        {
          name: 'Access for your sales channel',
          text: 'Sales engineers, reps and distributors each see what they should, in the browser.',
        },
      ],
    },
    metrics: {
      heading: 'What we measure',
      sub: 'Before the build and again after the pilot.',
      items: [
        'Quote turnaround',
        'Share of selections that need an engineer',
        'Selection errors found after the order',
      ],
    },
    related: {
      heading: 'Where a selection goes next',
      items: [
        {
          label: 'Refrigeration pack design',
          text: 'A compressor selection becomes a pack your workshop can build.',
          href: PACK_PATH,
        },
        {
          label: 'Document management',
          text: 'The datasheet joins every other document for that unit.',
          href: DOCS_PATH,
        },
        {
          label: 'All HVAC tools',
          text: 'Quoting, ERP links and service, on one record.',
          href: HVAC_PATH,
        },
      ],
    },
    faqHeading: 'Questions about selection software',
    faq: [
      {
        q: 'What is HVAC selection software?',
        a: 'Software that takes a project’s duty, such as capacity, temperatures, airflow and refrigerant, and returns the units from a manufacturer’s range that meet it, with their performance at that duty, a datasheet and a price. SNS Solutions builds it on the manufacturer’s own performance data and selection rules.',
      },
      {
        q: 'Can it use our existing performance data and spreadsheets?',
        a: 'Yes, and that is usually where we start. We take the data and rules from your current spreadsheets or tool, check them with your engineers, and build the selection on top.',
      },
      {
        q: 'Does it replace the compressor or component makers’ selection tools?',
        a: 'No. Those size their components; this selects your products. Where your units are built from a component selection, such as a refrigeration pack, the component maker’s printout can feed the next step.',
      },
      {
        q: 'Who can use it?',
        a: 'Whoever you decide: your sales engineers, your reps and distributors, or your customers, each with their own permissions.',
      },
      {
        q: 'What does a selection produce?',
        a: 'The selected unit with its performance at the duty, a datasheet or submittal, and the data that quoting and design need to carry on without retyping.',
      },
    ],
    closing: {
      heading: 'Bring us one product family.',
      sub: 'Book a free 30-minute call with the spreadsheet or tool you select from today. We’ll tell you what a selection tool on that data would take.',
      cta: 'Book a free consultation',
    },
    keywords: [
      'HVAC selection software',
      'HVAC product selection tool',
      'chiller selection software',
      'air handling unit selection software',
      'refrigeration selection software',
      'HVAC configurator',
      'HVAC submittal software',
    ],
  },

  documents: {
    path: DOCS_PATH,
    title: 'Document management for HVAC manufacturers',
    description:
      'Drawings, datasheets, test reports and certificates for every HVAC unit, under revision control and one serial number, with the handover dossier assembled automatically.',
    eyebrow: 'Document management',
    h1: 'Every drawing, datasheet and certificate for every unit, under one serial number.',
    intro:
      'Document management for HVAC manufacturers keeps the documents each unit needs (drawings, datasheets, wiring diagrams, test reports, declarations of conformity, pressure equipment documentation, operating and maintenance manuals) under revision control, linked to the order and the serial number, and assembles them into the handover dossier for each unit. We build it around how your documents are actually produced, released and asked for.',
    note: 'Works alongside the systems you have: it links to your CAD or PDM, your ERP and the shared drives your documents live in today.',
    problems: {
      heading: 'Where documents go wrong today',
      items: [
        'Drawings and certificates spread across shared drives and inboxes',
        'The workshop building from a superseded revision',
        'Handover dossiers assembled by hand at the end of every order',
        'Service unable to find the as-built documents years later',
        'Customers asking for the same documents twice',
      ],
    },
    builds: {
      heading: 'What we build',
      items: [
        {
          name: 'One register per order and serial number',
          text: 'Every document for a unit in one place, from the first datasheet to the final test report.',
        },
        {
          name: 'Revision control with release status',
          text: 'Draft, released and superseded, so the workshop only ever sees the released version.',
        },
        {
          name: 'Dossiers assembled automatically',
          text: 'The handover pack for each unit, put together from the documents it needs, in the order your customer expects.',
        },
        {
          name: 'Documents filled from order data',
          text: 'Datasheets, nameplates and declarations filled from the selection and the order, not retyped.',
        },
        {
          name: 'Incoming documents read and filed',
          text: 'Supplier certificates and test reports read, matched to the right order and filed, with AI where it saves time.',
        },
        {
          name: 'Access for service and customers',
          text: 'Technicians and customers find the documents for a serial number without asking the office.',
        },
      ],
    },
    metrics: {
      heading: 'What we measure',
      sub: 'Before the build and again after the pilot.',
      items: [
        'Time to assemble a handover dossier',
        'Documents released at the wrong revision',
        'Time to find as-built documents for a service call',
      ],
    },
    related: {
      heading: 'Where the documents come from',
      items: [
        {
          label: 'Selection software',
          text: 'Datasheets generated from the selection itself.',
          href: SELECTION_PATH,
        },
        {
          label: 'Refrigeration pack design',
          text: 'Schematic, model and parts list from the design rules.',
          href: PACK_PATH,
        },
        {
          label: 'All HVAC tools',
          text: 'Quoting, ERP links and service, on one record.',
          href: HVAC_PATH,
        },
      ],
    },
    faqHeading: 'Questions about document management',
    faq: [
      {
        q: 'What is document management for HVAC manufacturers?',
        a: 'A system that keeps every document an HVAC unit needs, such as drawings, datasheets, wiring diagrams, test reports, declarations of conformity and manuals, under revision control and linked to the order and serial number, and assembles the handover dossier for each unit from the released versions.',
      },
      {
        q: 'Does it replace our PDM or SharePoint?',
        a: 'Not necessarily. CAD files can stay in your PDM and other files where they are today. What we add is the register per order and serial number, the release status, and the dossier for each unit.',
      },
      {
        q: 'Which documents does it handle?',
        a: 'Whatever a unit needs: drawings, datasheets, wiring diagrams, test reports, declarations of conformity, pressure equipment documentation, operating and maintenance manuals, and supplier certificates.',
      },
      {
        q: 'Can it put the handover documentation together automatically?',
        a: 'Yes. Once the documents each unit type needs are defined, the dossier is assembled from the released versions for that serial number.',
      },
      {
        q: 'Who is responsible for the content of the documents?',
        a: 'You are. The system controls versions, release and assembly; your engineers and quality team stay responsible for what the documents say.',
      },
    ],
    closing: {
      heading: 'Bring us one order’s documents.',
      sub: 'Book a free 30-minute call and show us how a handover dossier gets put together today. We’ll tell you what it would take to do it automatically.',
      cta: 'Book a free consultation',
    },
    keywords: [
      'HVAC document management',
      'document management for manufacturers',
      'technical documentation HVAC',
      'handover documentation HVAC',
      'O&M manual generation',
      'drawing revision control',
    ],
  },
}

const de: Record<ToolKey, ToolCopy> = {
  selection: {
    path: SELECTION_PATH,
    title: 'Auslegungssoftware für HLK-Hersteller',
    description:
      'Auslegungssoftware für Hersteller in HLK und Kältetechnik, auf Ihren Produktdaten und Regeln: das passende Gerät für die Anforderung, mit Datenblatt und Preis, im Browser.',
    eyebrow: 'Auslegungssoftware',
    h1: 'Leistung eingeben. Das passende Gerät aus Ihrem Programm erhalten, mit Datenblatt und Preis.',
    intro:
      'HLK-Auslegungssoftware nimmt die Anforderungen eines Projekts auf (Leistung, Temperaturen, Luftmenge, Kältemittel, Standortbedingungen) und liefert die Geräte aus dem Programm eines Herstellers, die sie erfüllen, mit Leistungsdaten, Datenblatt und Preis. Wir bauen Auslegungsprogramme auf Ihren eigenen Produktdaten und Auslegungsregeln, damit Ihre Vertriebsingenieure, Vertreter und Händler so auslegen wie Ihr bester Ingenieur.',
    note: 'Für jeden Hersteller auf seinen eigenen Produktdaten gebaut. Wir beginnen mit einer Produktfamilie und ergänzen die übrigen, sobald sie im Einsatz ist.',
    problems: {
      heading: 'Wo die Auslegung heute hakt',
      items: [
        'Eine Tabelle, die nur ein Ingenieur ganz versteht',
        'Ein Desktop-Programm, das schwer zu pflegen ist und nicht im Browser läuft',
        'Vertreter und Händler, die für jede Auslegung auf das Werk warten',
        'Datenblätter, die für jedes Angebot von Hand zusammengestellt werden',
        'Auslegungen, die nicht mehr zu Angebot oder Ausführung passen',
      ],
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
        {
          name: 'Datenblätter und Einreichunterlagen',
          text: 'Ein Datenblatt oder eine Einreichunterlage für jede Auslegung, in Ihrem Layout und Ihren Sprachen.',
        },
        {
          name: 'Von der Auslegung zu Angebot und Konstruktion',
          text: 'Das ausgewählte Gerät und seine Optionen gehen ohne Abtippen an Angebot und Konstruktion weiter.',
        },
        {
          name: 'Zugang für Ihren Vertrieb',
          text: 'Vertriebsingenieure, Vertreter und Händler sehen jeweils, was sie sehen sollen, im Browser.',
        },
      ],
    },
    metrics: {
      heading: 'Was wir messen',
      sub: 'Vor dem Projekt und erneut nach dem Pilotbetrieb.',
      items: [
        'Angebotsdauer',
        'Anteil der Auslegungen, die einen Ingenieur brauchen',
        'Auslegungsfehler, die erst nach dem Auftrag auffallen',
      ],
    },
    related: {
      heading: 'Wohin eine Auslegung weitergeht',
      items: [
        {
          label: 'Konstruktion von Kälteverbundanlagen',
          text: 'Aus einer Verdichterauslegung wird eine Anlage, die Ihre Werkstatt bauen kann.',
          href: PACK_PATH,
        },
        {
          label: 'Dokumentenmanagement',
          text: 'Das Datenblatt landet bei allen anderen Unterlagen dieser Anlage.',
          href: DOCS_PATH,
        },
        {
          label: 'Alle HLK-Werkzeuge',
          text: 'Angebote, ERP-Anbindung und Service, auf einem Datensatz.',
          href: HVAC_PATH,
        },
      ],
    },
    faqHeading: 'Fragen zur Auslegungssoftware',
    faq: [
      {
        q: 'Was ist HLK-Auslegungssoftware?',
        a: 'Software, die die Anforderungen eines Projekts wie Leistung, Temperaturen, Luftmenge und Kältemittel aufnimmt und die passenden Geräte aus dem Programm eines Herstellers liefert, mit ihrer Leistung bei dieser Anforderung, einem Datenblatt und einem Preis. SNS Solutions baut sie auf den eigenen Leistungsdaten und Auslegungsregeln des Herstellers.',
      },
      {
        q: 'Kann sie unsere vorhandenen Leistungsdaten und Tabellen nutzen?',
        a: 'Ja, und dort beginnen wir meistens. Wir übernehmen Daten und Regeln aus Ihren Tabellen oder Ihrem bisherigen Programm, prüfen sie mit Ihren Ingenieuren und bauen die Auslegung darauf auf.',
      },
      {
        q: 'Ersetzt sie die Auslegungsprogramme der Verdichter- und Komponentenhersteller?',
        a: 'Nein. Diese dimensionieren ihre Komponenten; diese Software wählt Ihre Produkte aus. Wo Ihre Geräte aus einer Komponentenauslegung entstehen, etwa bei einer Verbundanlage, kann der Ausdruck des Komponentenherstellers den nächsten Schritt speisen.',
      },
      {
        q: 'Wer kann sie nutzen?',
        a: 'Wen Sie festlegen: Ihre Vertriebsingenieure, Ihre Vertreter und Händler oder Ihre Kunden, jeweils mit eigenen Berechtigungen.',
      },
      {
        q: 'Was liefert eine Auslegung?',
        a: 'Das ausgewählte Gerät mit seiner Leistung bei der Anforderung, ein Datenblatt oder eine Einreichunterlage und die Daten, die Angebot und Konstruktion ohne Abtippen weiterverwenden.',
      },
    ],
    closing: {
      heading: 'Bringen Sie uns eine Produktfamilie.',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch mit der Tabelle oder dem Programm, mit dem Sie heute auslegen. Wir sagen Ihnen, was ein Auslegungsprogramm auf diesen Daten braucht.',
      cta: 'Kostenlose Beratung buchen',
    },
    keywords: [
      'Auslegungssoftware HLK',
      'Auslegungsprogramm Klimatechnik',
      'Kaltwassersatz Auslegung Software',
      'Lüftungsgerät Auslegungsprogramm',
      'Auslegungssoftware Kältetechnik',
      'HLK Konfigurator',
    ],
  },

  documents: {
    path: DOCS_PATH,
    title: 'Dokumentenmanagement für HLK-Hersteller',
    description:
      'Zeichnungen, Datenblätter, Prüfberichte und Zertifikate jeder HLK-Anlage, revisionssicher unter einer Seriennummer, mit automatisch zusammengestellter Übergabedokumentation.',
    eyebrow: 'Dokumentenmanagement',
    h1: 'Jede Zeichnung, jedes Datenblatt und jedes Zertifikat jeder Anlage, unter einer Seriennummer.',
    intro:
      'Dokumentenmanagement für HLK-Hersteller hält die Unterlagen, die jede Anlage braucht (Zeichnungen, Datenblätter, Schaltpläne, Prüfberichte, Konformitätserklärungen, Druckgeräte-Dokumentation, Betriebs- und Wartungsanleitungen), unter Revisionsverwaltung, verknüpft sie mit Auftrag und Seriennummer und stellt daraus die Übergabedokumentation für jede Anlage zusammen. Wir bauen es danach, wie Ihre Unterlagen tatsächlich entstehen, freigegeben und angefragt werden.',
    note: 'Arbeitet mit den Systemen, die Sie haben: Es bindet Ihr CAD oder PDM, Ihr ERP und die Laufwerke an, auf denen Ihre Unterlagen heute liegen.',
    problems: {
      heading: 'Wo Unterlagen heute schiefgehen',
      items: [
        'Zeichnungen und Zertifikate verstreut über Laufwerke und Postfächer',
        'Die Werkstatt baut nach einer überholten Revision',
        'Übergabedokumentation am Ende jedes Auftrags von Hand zusammengestellt',
        'Der Service findet die Ist-Unterlagen Jahre später nicht',
        'Kunden fragen dieselben Unterlagen zweimal an',
      ],
    },
    builds: {
      heading: 'Was wir bauen',
      items: [
        {
          name: 'Ein Register je Auftrag und Seriennummer',
          text: 'Alle Unterlagen einer Anlage an einem Ort, vom ersten Datenblatt bis zum letzten Prüfbericht.',
        },
        {
          name: 'Revisionsverwaltung mit Freigabestatus',
          text: 'Entwurf, freigegeben, überholt: Die Werkstatt sieht immer nur die freigegebene Fassung.',
        },
        {
          name: 'Automatisch zusammengestellte Dokumentation',
          text: 'Die Übergabeunterlagen je Anlage, aus den benötigten Dokumenten in der Reihenfolge, die Ihr Kunde erwartet.',
        },
        {
          name: 'Unterlagen aus Auftragsdaten befüllt',
          text: 'Datenblätter, Typenschilder und Erklärungen aus Auslegung und Auftrag befüllt, nicht abgetippt.',
        },
        {
          name: 'Eingehende Unterlagen gelesen und abgelegt',
          text: 'Lieferantenzertifikate und Prüfberichte gelesen, dem richtigen Auftrag zugeordnet und abgelegt, mit KI, wo sie Zeit spart.',
        },
        {
          name: 'Zugang für Service und Kunden',
          text: 'Techniker und Kunden finden die Unterlagen zu einer Seriennummer, ohne im Büro nachzufragen.',
        },
      ],
    },
    metrics: {
      heading: 'Was wir messen',
      sub: 'Vor dem Projekt und erneut nach dem Pilotbetrieb.',
      items: [
        'Zeit bis zur fertigen Übergabedokumentation',
        'Unterlagen, die in falscher Revision freigegeben wurden',
        'Zeit, bis der Service die Ist-Unterlagen findet',
      ],
    },
    related: {
      heading: 'Woher die Unterlagen kommen',
      items: [
        {
          label: 'Auslegungssoftware',
          text: 'Datenblätter direkt aus der Auslegung erzeugt.',
          href: SELECTION_PATH,
        },
        {
          label: 'Konstruktion von Kälteverbundanlagen',
          text: 'Schema, Modell und Stückliste aus den Konstruktionsregeln.',
          href: PACK_PATH,
        },
        {
          label: 'Alle HLK-Werkzeuge',
          text: 'Angebote, ERP-Anbindung und Service, auf einem Datensatz.',
          href: HVAC_PATH,
        },
      ],
    },
    faqHeading: 'Fragen zum Dokumentenmanagement',
    faq: [
      {
        q: 'Was ist Dokumentenmanagement für HLK-Hersteller?',
        a: 'Ein System, das alle Unterlagen einer HLK-Anlage wie Zeichnungen, Datenblätter, Schaltpläne, Prüfberichte, Konformitätserklärungen und Anleitungen unter Revisionsverwaltung hält, mit Auftrag und Seriennummer verknüpft und die Übergabedokumentation jeder Anlage aus den freigegebenen Fassungen zusammenstellt.',
      },
      {
        q: 'Ersetzt es unser PDM oder SharePoint?',
        a: 'Nicht unbedingt. CAD-Dateien können in Ihrem PDM bleiben und andere Dateien dort, wo sie heute liegen. Wir ergänzen das Register je Auftrag und Seriennummer, den Freigabestatus und die Dokumentation je Anlage.',
      },
      {
        q: 'Welche Unterlagen verwaltet es?',
        a: 'Was eine Anlage braucht: Zeichnungen, Datenblätter, Schaltpläne, Prüfberichte, Konformitätserklärungen, Druckgeräte-Dokumentation, Betriebs- und Wartungsanleitungen und Lieferantenzertifikate.',
      },
      {
        q: 'Kann es die Übergabedokumentation automatisch zusammenstellen?',
        a: 'Ja. Sobald festgelegt ist, welche Unterlagen ein Anlagentyp braucht, wird die Dokumentation aus den freigegebenen Fassungen für diese Seriennummer zusammengestellt.',
      },
      {
        q: 'Wer ist für den Inhalt der Unterlagen verantwortlich?',
        a: 'Sie. Das System steuert Versionen, Freigabe und Zusammenstellung; Ihre Ingenieure und Ihr Qualitätsteam bleiben für den Inhalt verantwortlich.',
      },
    ],
    closing: {
      heading: 'Bringen Sie uns die Unterlagen eines Auftrags.',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch und zeigen Sie uns, wie eine Übergabedokumentation heute entsteht. Wir sagen Ihnen, was es braucht, sie automatisch zu erstellen.',
      cta: 'Kostenlose Beratung buchen',
    },
    keywords: [
      'Dokumentenmanagement HLK',
      'Dokumentenmanagement Hersteller',
      'Technische Dokumentation Kältetechnik',
      'Übergabedokumentation Anlagenbau',
      'Revisionsverwaltung Zeichnungen',
      'Betriebsanleitung erstellen',
    ],
  },
}

const COPY: Record<Locale, Record<ToolKey, ToolCopy>> = { en, de }

export const TOOL_KEYS: ToolKey[] = ['selection', 'documents']

export function getTool(locale: Locale, key: ToolKey): ToolCopy {
  return COPY[locale][key]
}
