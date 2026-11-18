import type { Locale } from '@/i18n/config'
import { DOCS_PATH, HVAC_LABEL, HVAC_PATH, PACK_PATH, SELECTION_PATH } from '@/lib/hvac-links'

export { DOCS_PATH, HVAC_PATH, PACK_PATH, SELECTION_PATH }

/**
 * Copy for the HVAC & refrigeration section: /hvac and /hvac/refrigeration-pack-design (and /de/…).
 *
 * One source for the pages, their JSON-LD (lib/schema.ts) and /llms.txt + /llms-full.txt, so the
 * words a crawler, an answer engine and a visitor see can't drift apart. Same reasoning as
 * lib/blog.ts; kept out of i18n/dictionaries because it is a self-contained section.
 *
 * Written for answer engines as much as for search: every section opens with a sentence that
 * answers a question on its own (what it is, who it's for, what it does), uses the words buyers
 * search in (pack, rack, Verbundanlage, CO₂ booster, STEP, BOM, ERP), and the FAQ is rendered
 * visibly on the page *and* as FAQPage schema from the same array.
 *
 * CLAIM GUARDRAILS (the product is in development; see the status lines):
 *  - No customer names. "A European refrigeration manufacturer" is as far as it goes.
 *  - No numbers we haven't measured: no "x% faster", no hours saved. The metrics section defines
 *    what we measure; it never states results.
 *  - No compatibility claims for named selection tools or CAD systems beyond what is true by
 *    definition (a STEP file opens in any mainstream CAD system).
 *  - The engineer signs the design off. The software never claims compliance with a standard.
 */

/** Working product name. One place to change it. */
export const PACK_PRODUCT_NAME = 'SNS Pack Designer'

export type Faq = { q: string; a: string }

const en = {
  /** Breadcrumb names (from lib/hvac-links.ts). */
  crumbHub: HVAC_LABEL.en.hub,
  crumbPack: HVAC_LABEL.en.pack,
  /** Must match an option in contactForm.services exactly so the form pre-selects it. */
  contactService: 'HVAC & Refrigeration',

  hub: {
    title: 'Software for HVAC & refrigeration manufacturers',
    description:
      'Selection software, CAD automation, document management and quoting built for HVAC and refrigeration manufacturers, and measured on quote turnaround and engineering hours.',
    eyebrow: 'HVAC & refrigeration manufacturers',
    h1: 'Business software built for HVAC and refrigeration manufacturers.',
    intro:
      'SNS Solutions builds the software an HVAC or refrigeration manufacturer runs on: selection tools, CAD and design automation, document management, quoting, and the links into ERP and service. Each tool works from your own product data and rules, they share one record from enquiry to service call, and each is measured against the figures that decide whether an order makes money.',
    heroLine:
      'Selection, design, documents and quoting, built on your own product data and connected from enquiry to service call.',
    restHeading: 'And the rest of the chain',
    toolsHeading: 'The tools we build',
    toolsSub:
      'General-purpose software treats a chiller, an air handler or a compressor pack like any other product. These are built around how HVAC equipment is actually selected, designed, documented and serviced.',
    tools: [
      {
        id: 'selection',
        name: 'Selection software',
        headline: 'Enter the duty. Get the right unit.',
        line: 'Your performance data and rules, on the web, for every sales engineer, rep and distributor.',
        tagline: 'Enter the duty. Get the right unit from your range, with its datasheet and price.',
        points: [
          'Runs on your performance data and selection rules',
          'On the web, for sales engineers, reps and distributors',
          'Datasheet and quote from the same selection',
        ],
        href: SELECTION_PATH,
        cta: 'Selection software',
      },
      {
        id: 'cad',
        name: 'CAD & design automation',
        headline: 'Describe the pack. Get one your workshop can build.',
        line: 'From the compressor selection printout to schematic, 3D model and parts list, by your own design rules.',
        tagline: 'Describe the pack. Get one your workshop can build, designed to your rules.',
        points: [
          'From the selection printout to schematic, 3D model and parts list',
          'Your catalogue and your house rules',
          'STEP export into the CAD system you already use',
        ],
        href: PACK_PATH,
        cta: 'Pack design software',
      },
      {
        id: 'documents',
        name: 'Document management',
        headline: 'Every document, under one serial number.',
        line: 'Drawings, datasheets and certificates under revision control, with the handover dossier put together for you.',
        tagline: 'Every drawing, datasheet and certificate for every unit, under one serial number.',
        points: [
          'Revision control from draft to released',
          'Handover dossier assembled per unit, automatically',
          'Found again in seconds when service needs it',
        ],
        href: DOCS_PATH,
        cta: 'Document management',
      },
      {
        id: 'quoting',
        name: 'Quoting & CPQ',
        headline: 'Quotes built from the selection.',
        line: 'Prices and options from your own rules.',
        tagline: 'Quotes built from the selection, not retyped from it.',
        points: [
          'Prices and options from your own rules',
          'The same data the workshop builds from',
          'Follow-up on quotes nobody has answered',
        ],
        cta: 'Talk about quoting',
      },
      {
        id: 'erp',
        name: 'ERP & parts lists',
        headline: 'Parts lists that arrive complete.',
        line: 'Synced from CAD and PDM into your ERP.',
        tagline: 'A parts list leaves design once and arrives in purchasing complete.',
        points: [
          'CAD and PDM parts lists synced into your ERP',
          'Your part numbers, not retyped descriptions',
          'Changes after release flagged, not lost',
        ],
        cta: 'Talk about your ERP',
      },
      {
        id: 'service',
        name: 'Service & after-sales',
        headline: 'What was shipped, by serial number.',
        line: 'Service history and spare parts for every unit.',
        tagline: 'What was shipped, under the serial number the technician is standing in front of.',
        points: [
          'As-built configuration and documents per unit',
          'Service history and spare parts by serial number',
          'What the field learns, back to engineering',
        ],
        cta: 'Talk about service',
      },
    ],
    flow: {
      heading: 'One record from enquiry to service call',
      sub: 'In most manufacturers the same unit is typed into five systems. Connected, each step starts from what the last one already knows.',
      steps: ['Enquiry', 'Selection', 'Quote', 'Design & CAD', 'Documents', 'ERP & workshop', 'Service'],
    },
    ai: {
      eyebrow: 'AI',
      heading: 'AI where it moves a number, not where it makes a demo.',
      line: 'We measure the figure first, then build the smallest thing that moves it: drafting quotes from enquiries, checking selections, filing certificates.',
      body: 'We start from the figure you want to move and measure it before we build anything. Then we build the smallest thing that can move it: reading enquiries and tender specifications into a draft selection and quote, checking a selection against your rules before it goes out, filing incoming certificates against the right order, or flagging orders whose margin is drifting.',
    },
    metrics: {
      eyebrow: 'The metrics',
      heading: 'The numbers that decide whether an HVAC manufacturer makes money.',
      short: 'Built and judged on the numbers you run on.',
      shortSub: 'We measure one of these before we build, and again after the pilot.',
      detailsLabel: 'What each one measures',
      sub: 'These are the figures we baseline before a build and measure again after it. If a system doesn’t move one of them, it isn’t worth building.',
      cols: { metric: 'Metric', definition: 'What it measures', where: 'Where the time usually goes' },
      rows: [
        {
          metric: 'Quote turnaround',
          definition: 'Working days from an enquiry arriving to a priced quote going out.',
          where: 'Re-selecting compressors, redrawing a similar pack, waiting for engineering.',
        },
        {
          metric: 'Engineering hours per order',
          definition: 'Design and drawing hours spent on each sold pack or unit.',
          where: 'Drawing variants by hand that differ from the last one only in size.',
        },
        {
          metric: 'First-time-right rate',
          definition: 'Share of orders built without a drawing revision or a workshop query.',
          where: 'Rules that live in one engineer’s head and get applied differently each time.',
        },
        {
          metric: 'Quote-to-order rate',
          definition: 'Share of sent quotes that turn into orders.',
          where: 'Slow quotes, and quotes nobody follows up.',
        },
        {
          metric: 'Quoted vs actual margin',
          definition: 'The gap between the margin at quote and the margin after the build.',
          where: 'Parts lists that change between quote, design and purchasing.',
        },
        {
          metric: 'On-time delivery',
          definition: 'Share of orders shipped on the date promised to the customer.',
          where: 'Late design release holding up purchasing and the workshop.',
        },
        {
          metric: 'First-time fix rate',
          definition: 'Share of service calls closed on the first visit.',
          where: 'Technicians arriving without the as-built data for the unit in front of them.',
        },
      ],
      methodHeading: 'How we measure',
      method: [
        { k: '01', name: 'Baseline', text: 'We measure the figure on your recent orders before we touch anything.' },
        { k: '02', name: 'Pilot', text: 'One workflow, live on real orders, in weeks.' },
        { k: '03', name: 'Measure again', text: 'Same figure, same method, side by side. You decide what comes next.' },
      ],
    },

    faqHeading: 'Questions manufacturers ask us',
    faqShort: 'Good to know',
    faq: [
      {
        q: 'What software does an HVAC manufacturer need?',
        a: 'Usually a selection tool for its own product range, CAD for design, a document system for drawings, datasheets and certificates, a way to build quotes, an ERP for parts and purchasing, and a service record for each unit. Most of the hours are lost in the gaps between them, where the same data is retyped from one system into the next.',
      },
      {
        q: 'What is HVAC selection software?',
        a: 'Software that takes a project’s duty, such as capacity, temperatures, airflow and refrigerant, and returns the units from a manufacturer’s range that meet it, with their performance, a datasheet and a price. We build it on the manufacturer’s own performance data and selection rules.',
      },
      {
        q: 'Why not use a generic ERP, CRM or document management system?',
        a: 'Use them where they fit; we connect to them rather than replace them. What generic systems do not know is how an HVAC unit is selected against a duty, which documents a unit needs at handover, or how a pack is built from a compressor selection. That HVAC-specific layer is what we build.',
      },
      {
        q: 'How can AI help an HVAC manufacturer?',
        a: 'Where it moves a measurable figure: drafting selections and quotes from enquiries and tender specifications, checking selections against your rules before they go out, filing incoming certificates and test reports, and giving service technicians the as-built data for a unit. We measure the figure before and after, so the answer is a number rather than an impression.',
      },
      {
        q: 'How do you measure whether a software project worked?',
        a: 'We pick one figure, such as quote turnaround or engineering hours per order, measure it on your recent orders before the build, run a pilot on real orders, and measure the same figure the same way afterwards. You see both numbers side by side.',
      },
      {
        q: 'Do you work with manufacturers outside Austria?',
        a: 'Yes. SNS Solutions is based in Vienna and works in English and German with manufacturers across Europe. Our pack design software is being built with a refrigeration manufacturer outside Austria.',
      },
      {
        q: 'How do we start?',
        a: 'With a free 30-minute online call. Tell us which tool or figure is hurting and how the work runs today, and we will tell you what it would take to fix it, or tell you honestly that software would not.',
      },
    ] as Faq[],
    closing: {
      heading: 'Which tool would you fix first?',
      sub: 'Book a free 30-minute call. Bring the spreadsheet, the folder or the figure that hurts, and the way the work runs today.',
      cta: 'Book a free consultation',
    },
  },

  pack: {
    title: 'Refrigeration pack design software',
    description:
      'Turn a compressor selection printout into a refrigeration pack your workshop can build: schematic, 3D model and parts list, designed to your own rules. CO₂ booster packs first.',
    eyebrow: 'Refrigeration pack design software',
    h1: 'Describe the pack. Get one your workshop can build, designed to your rules.',
    intro:
      'SNS Pack Designer turns the printout from your compressor selection software into a complete refrigeration pack (also called a compressor rack): a schematic, a 3D model and a parts list. The valves, headers, receivers and oil system the printout leaves out are placed by your company’s own design rules, so the result looks like a pack your engineers drew.',
    status:
      'In development with a European refrigeration manufacturer, starting with CO₂ transcritical booster packs. We are taking on a small number of further manufacturers as design partners.',
    primaryCta: 'Become a design partner',

    gap: {
      eyebrow: 'The gap',
      heading: 'A selection printout is not a pack.',
      sub: 'The selection software sizes the compressors. Everything between those compressors and a pack on the workshop floor is still drawn by an engineer, from rules that are rarely written down.',
      hasHeading: 'What the printout gives you',
      has: [
        'Compressor models and how many',
        'Refrigerant and operating temperatures',
        'Cooling capacity and power input at each operating point',
        'Suction and discharge conditions',
      ],
      needsHeading: 'What the workshop still needs',
      needs: [
        'Suction and discharge headers, sized and positioned',
        'Valves: high-pressure, flash gas, expansion and service',
        'Receivers and vessels, and where they sit',
        'Oil separation and oil return',
        'The frame, the layout and the pipe runs',
        'A parts list with your part numbers',
      ],
    },

    stepsHeading: 'How it works',
    steps: [
      {
        k: '01',
        name: 'Upload the printout',
        text: 'The PDF your compressor selection software already produces. The software reads the compressors, refrigerant, temperatures and duties from it.',
      },
      {
        k: '02',
        name: 'Check the pack spec',
        text: 'What was read becomes a structured specification your engineer reviews and corrects. Nothing is assumed silently.',
      },
      {
        k: '03',
        name: 'Your rules applied',
        text: 'Headers, valves, vessels and the oil system are chosen and placed from your catalogue and your house rules.',
      },
      {
        k: '04',
        name: 'Schematic and 3D model',
        text: 'A schematic of the circuit and a 3D model of the pack on your own frame family.',
      },
      {
        k: '05',
        name: 'Files for quoting and the workshop',
        text: 'A parts list for the quote, a STEP model for your engineers to finish, and workshop documents per pack family.',
      },
    ],

    rules: {
      eyebrow: 'Designed to your rules',
      heading: 'Your catalogue and your standards, not a generic library.',
      body: 'Every manufacturer builds packs differently: which valve brands, which header sizes, how the oil system is laid out, which frames. We write those rules down with your engineers and the software applies them to every pack. Your rules and catalogue sit in their own layer, separate from the core software.',
      points: [
        'Your components and part numbers',
        'Your sizing rules for headers, lines and vessels',
        'Your frame families and layout conventions',
        'Your engineers sign the design off',
      ],
    },

    scale: {
      eyebrow: 'Sizing up',
      heading: 'Take a medium pack and make it larger, properly.',
      body: 'A larger pack is not a stretched drawing. More capacity changes header diameters, valve sizes, vessel volumes and often the frame. Because the pack is generated from rules rather than copied from an earlier drawing, picking a larger size runs the rules again and every part follows.',
    },

    outputs: {
      heading: 'What you get out, in the order we are building it',
      items: [
        {
          stage: 'First',
          name: 'Quote and parts list',
          text: 'A priced parts list from the selection, so a quote goes out before engineering has drawn anything.',
        },
        {
          stage: 'Next',
          name: 'STEP model',
          text: 'A 3D model in STEP, which opens in SolidWorks, Inventor, Creo, Solid Edge and other CAD systems, for your engineers to finish.',
        },
        {
          stage: 'Then',
          name: 'Workshop outputs',
          text: 'The documents your workshop builds from, defined per pack family with your team.',
        },
      ],
    },

    faqHeading: 'Questions about pack design',
    faq: [
      {
        q: 'What is refrigeration pack design software?',
        a: 'Software that turns a compressor selection into a complete refrigeration pack design: the schematic, the 3D model and the parts list, including the headers, valves, vessels and oil system that the selection does not cover. SNS Pack Designer does this by applying the manufacturer’s own design rules.',
      },
      {
        q: 'Which compressor selection software does it read?',
        a: 'It reads the printout (PDF) that your selection software produces. Each format is set up with the manufacturer who uses it, so tell us which selection tool your engineers work with.',
      },
      {
        q: 'Does it replace SolidWorks or our CAD system?',
        a: 'No. It produces a STEP model, which opens in SolidWorks, Inventor, Creo, Solid Edge and other CAD systems, and your engineers finish and release the design there as they do today.',
      },
      {
        q: 'Which pack types and refrigerants does it support?',
        a: 'CO₂ transcritical booster packs first, because that is what we are building with our first manufacturer. Other pack types follow once their rules are written with a manufacturer who builds them.',
      },
      {
        q: 'Can it scale an existing pack design to a larger size?',
        a: 'Yes, that is one of the main reasons it exists. The pack is generated from rules, so choosing a larger size re-runs the rules and resizes headers, valves, vessels and the frame together, rather than stretching an old drawing.',
      },
      {
        q: 'Who is responsible for the final design?',
        a: 'Your engineers. The software applies the rules you give it and shows what it decided and why; the engineer checks, finishes and signs off the design, as with any pack today.',
      },
      {
        q: 'Is it available now?',
        a: 'It is in development with a European refrigeration manufacturer. We are taking on a small number of further manufacturers as design partners, who shape the rules and outputs for their own pack families.',
      },
    ] as Faq[],

    partner: {
      heading: 'Build it with us for your packs.',
      sub: 'We are looking for one or two more manufacturers whose engineers want to stop redrawing the same pack in a different size. Book a call and bring a selection printout.',
      cta: 'Become a design partner',
    },
  },
}

export type HvacCopy = typeof en

const de: HvacCopy = {
  crumbHub: HVAC_LABEL.de.hub,
  crumbPack: HVAC_LABEL.de.pack,
  contactService: 'HLK & Kältetechnik',

  hub: {
    title: 'Software für Hersteller in HLK und Kältetechnik',
    description:
      'Auslegungssoftware, CAD-Automatisierung, Dokumentenmanagement und Angebotserstellung für Hersteller in HLK und Kältetechnik, gemessen an Angebotsdauer und Konstruktionsstunden.',
    eyebrow: 'Hersteller in HLK und Kältetechnik',
    h1: 'Unternehmenssoftware für Hersteller in HLK und Kältetechnik.',
    intro:
      'SNS Solutions entwickelt die Software, mit der ein Hersteller in HLK und Kältetechnik arbeitet: Auslegungsprogramme, CAD und Konstruktionsautomatisierung, Dokumentenmanagement, Angebotserstellung und die Anbindung an ERP und Service. Jedes Werkzeug arbeitet mit Ihren eigenen Produktdaten und Regeln, alle teilen einen Datensatz von der Anfrage bis zum Serviceeinsatz, und jedes wird an den Kennzahlen gemessen, die über den Ertrag eines Auftrags entscheiden.',
    heroLine:
      'Auslegung, Konstruktion, Dokumente und Angebote, auf Ihren eigenen Produktdaten gebaut und verbunden von der Anfrage bis zum Serviceeinsatz.',
    restHeading: 'Und der Rest der Kette',
    toolsHeading: 'Die Werkzeuge, die wir bauen',
    toolsSub:
      'Allgemeine Software behandelt einen Kaltwassersatz, ein Lüftungsgerät oder eine Verbundanlage wie jedes andere Produkt. Diese Werkzeuge sind darauf gebaut, wie HLK-Anlagen tatsächlich ausgelegt, konstruiert, dokumentiert und gewartet werden.',
    tools: [
      {
        id: 'selection',
        name: 'Auslegungssoftware',
        headline: 'Leistung eingeben. Das passende Gerät erhalten.',
        line: 'Ihre Leistungsdaten und Regeln, im Browser, für jeden Vertriebsingenieur, Vertreter und Händler.',
        tagline: 'Leistung eingeben. Das passende Gerät aus Ihrem Programm erhalten, mit Datenblatt und Preis.',
        points: [
          'Arbeitet mit Ihren Leistungsdaten und Auslegungsregeln',
          'Im Browser, für Vertriebsingenieure, Vertreter und Händler',
          'Datenblatt und Angebot aus derselben Auslegung',
        ],
        href: SELECTION_PATH,
        cta: 'Auslegungssoftware',
      },
      {
        id: 'cad',
        name: 'CAD & Konstruktionsautomatisierung',
        headline: 'Anlage beschreiben. Eine erhalten, die Ihre Werkstatt bauen kann.',
        line: 'Vom Auslegungsausdruck zu Schema, 3D-Modell und Stückliste, nach Ihren eigenen Konstruktionsregeln.',
        tagline:
          'Beschreiben Sie die Anlage. Sie erhalten eine, die Ihre Werkstatt bauen kann, nach Ihren Regeln konstruiert.',
        points: [
          'Vom Auslegungsausdruck zu Schema, 3D-Modell und Stückliste',
          'Ihr Katalog und Ihre Hausregeln',
          'STEP-Export in das CAD-System, das Sie bereits nutzen',
        ],
        href: PACK_PATH,
        cta: 'Software für Verbundanlagen',
      },
      {
        id: 'documents',
        name: 'Dokumentenmanagement',
        headline: 'Jede Unterlage, unter einer Seriennummer.',
        line: 'Zeichnungen, Datenblätter und Zertifikate unter Revisionsverwaltung, die Übergabedokumentation wird für Sie zusammengestellt.',
        tagline: 'Jede Zeichnung, jedes Datenblatt und jedes Zertifikat jeder Anlage, unter einer Seriennummer.',
        points: [
          'Revisionsverwaltung vom Entwurf bis zur Freigabe',
          'Übergabedokumentation je Anlage, automatisch zusammengestellt',
          'In Sekunden wiedergefunden, wenn der Service sie braucht',
        ],
        href: DOCS_PATH,
        cta: 'Dokumentenmanagement',
      },
      {
        id: 'quoting',
        name: 'Angebote & CPQ',
        headline: 'Angebote aus der Auslegung.',
        line: 'Preise und Optionen nach Ihren eigenen Regeln.',
        tagline: 'Angebote aus der Auslegung erstellt, nicht aus ihr abgetippt.',
        points: [
          'Preise und Optionen nach Ihren eigenen Regeln',
          'Dieselben Daten, nach denen die Werkstatt baut',
          'Nachfassen bei Angeboten, auf die niemand geantwortet hat',
        ],
        cta: 'Über Angebote sprechen',
      },
      {
        id: 'erp',
        name: 'ERP & Stücklisten',
        headline: 'Stücklisten, die vollständig ankommen.',
        line: 'Aus CAD und PDM direkt in Ihr ERP.',
        tagline: 'Eine Stückliste verlässt die Konstruktion einmal und kommt vollständig im Einkauf an.',
        points: [
          'Stücklisten aus CAD und PDM mit Ihrem ERP abgeglichen',
          'Ihre Artikelnummern statt abgetippter Beschreibungen',
          'Änderungen nach der Freigabe markiert, nicht verloren',
        ],
        cta: 'Über Ihr ERP sprechen',
      },
      {
        id: 'service',
        name: 'Service & Kundendienst',
        headline: 'Was ausgeliefert wurde, nach Seriennummer.',
        line: 'Servicehistorie und Ersatzteile für jede Anlage.',
        tagline: 'Was ausgeliefert wurde, unter der Seriennummer, vor der der Techniker steht.',
        points: [
          'Ist-Konfiguration und Unterlagen je Anlage',
          'Servicehistorie und Ersatzteile nach Seriennummer',
          'Was der Service lernt, zurück an die Konstruktion',
        ],
        cta: 'Über Service sprechen',
      },
    ],
    flow: {
      heading: 'Ein Datensatz von der Anfrage bis zum Serviceeinsatz',
      sub: 'Bei den meisten Herstellern wird dasselbe Gerät in fünf Systeme getippt. Verbunden beginnt jeder Schritt mit dem, was der vorherige bereits weiß.',
      steps: ['Anfrage', 'Auslegung', 'Angebot', 'Konstruktion & CAD', 'Dokumente', 'ERP & Werkstatt', 'Service'],
    },
    ai: {
      eyebrow: 'KI',
      heading: 'KI dort, wo sie eine Kennzahl bewegt, nicht dort, wo sie eine Demo füllt.',
      line: 'Wir messen zuerst die Kennzahl und bauen dann das Kleinste, das sie bewegt: Angebote aus Anfragen entwerfen, Auslegungen prüfen, Zertifikate ablegen.',
      body: 'Wir beginnen bei der Kennzahl, die Sie bewegen wollen, und messen sie, bevor wir etwas bauen. Dann bauen wir das Kleinste, das sie bewegen kann: Anfragen und Ausschreibungstexte in einen Entwurf für Auslegung und Angebot übertragen, eine Auslegung vor dem Versand gegen Ihre Regeln prüfen, eingehende Zertifikate dem richtigen Auftrag zuordnen oder Aufträge markieren, deren Marge wegläuft.',
    },
    metrics: {
      eyebrow: 'Die Kennzahlen',
      heading: 'Die Zahlen, die entscheiden, ob ein HLK-Hersteller Geld verdient.',
      short: 'Gebaut und gemessen an den Zahlen, die für Sie zählen.',
      shortSub: 'Wir messen eine davon vor dem Projekt und erneut nach dem Pilot.',
      detailsLabel: 'Was jede Kennzahl misst',
      sub: 'Diese Werte messen wir vor einem Projekt und danach erneut. Bewegt ein System keinen davon, lohnt es sich nicht.',
      cols: { metric: 'Kennzahl', definition: 'Was sie misst', where: 'Wo die Zeit meist verloren geht' },
      rows: [
        {
          metric: 'Angebotsdauer',
          definition: 'Arbeitstage vom Eingang einer Anfrage bis zum Versand eines Angebots mit Preis.',
          where: 'Verdichter neu auslegen, eine ähnliche Anlage neu zeichnen, auf die Konstruktion warten.',
        },
        {
          metric: 'Konstruktionsstunden pro Auftrag',
          definition: 'Konstruktions- und Zeichenstunden für jede verkaufte Anlage.',
          where: 'Varianten von Hand zeichnen, die sich von der letzten nur in der Größe unterscheiden.',
        },
        {
          metric: 'Fehlerfrei beim ersten Mal',
          definition: 'Anteil der Aufträge, die ohne Zeichnungsänderung oder Rückfrage der Werkstatt gebaut werden.',
          where: 'Regeln, die nur im Kopf eines Konstrukteurs existieren und jedes Mal anders angewendet werden.',
        },
        {
          metric: 'Auftragsquote',
          definition: 'Anteil der versendeten Angebote, aus denen ein Auftrag wird.',
          where: 'Langsame Angebote und Angebote, bei denen niemand nachfasst.',
        },
        {
          metric: 'Kalkulierte gegenüber tatsächlicher Marge',
          definition: 'Die Differenz zwischen der Marge im Angebot und der Marge nach dem Bau.',
          where: 'Stücklisten, die sich zwischen Angebot, Konstruktion und Einkauf ändern.',
        },
        {
          metric: 'Liefertreue',
          definition: 'Anteil der Aufträge, die zum zugesagten Termin ausgeliefert werden.',
          where: 'Späte Konstruktionsfreigabe, die Einkauf und Werkstatt aufhält.',
        },
        {
          metric: 'Erstbehebungsquote',
          definition: 'Anteil der Serviceeinsätze, die beim ersten Besuch abgeschlossen werden.',
          where: 'Techniker, die ohne die Ist-Daten der Anlage vor Ort ankommen.',
        },
      ],
      methodHeading: 'Wie wir messen',
      method: [
        { k: '01', name: 'Ausgangswert', text: 'Wir messen die Kennzahl an Ihren letzten Aufträgen, bevor wir etwas verändern.' },
        { k: '02', name: 'Pilot', text: 'Ein Ablauf, live mit echten Aufträgen, in wenigen Wochen.' },
        { k: '03', name: 'Erneut messen', text: 'Dieselbe Kennzahl, dieselbe Methode, im direkten Vergleich. Sie entscheiden, wie es weitergeht.' },
      ],
    },

    faqHeading: 'Fragen, die Hersteller uns stellen',
    faqShort: 'Gut zu wissen',
    faq: [
      {
        q: 'Welche Software braucht ein HLK-Hersteller?',
        a: 'Meist ein Auslegungsprogramm für das eigene Produktprogramm, CAD für die Konstruktion, ein Dokumentensystem für Zeichnungen, Datenblätter und Zertifikate, einen Weg zur Angebotserstellung, ein ERP für Teile und Einkauf und eine Serviceakte je Anlage. Die meisten Stunden gehen in den Lücken dazwischen verloren, wo dieselben Daten von einem System ins nächste getippt werden.',
      },
      {
        q: 'Was ist HLK-Auslegungssoftware?',
        a: 'Software, die die Anforderungen eines Projekts wie Leistung, Temperaturen, Luftmenge und Kältemittel aufnimmt und die passenden Geräte aus dem Programm eines Herstellers liefert, mit Leistungsdaten, Datenblatt und Preis. Wir bauen sie auf den eigenen Leistungsdaten und Auslegungsregeln des Herstellers.',
      },
      {
        q: 'Warum nicht ein allgemeines ERP-, CRM- oder Dokumentensystem verwenden?',
        a: 'Nutzen Sie sie, wo sie passen; wir binden sie an, statt sie zu ersetzen. Was allgemeine Systeme nicht wissen: wie ein HLK-Gerät gegen eine Anforderung ausgelegt wird, welche Unterlagen eine Anlage bei der Übergabe braucht oder wie eine Verbundanlage aus einer Verdichterauslegung entsteht. Diese HLK-spezifische Ebene bauen wir.',
      },
      {
        q: 'Wie kann KI einem HLK-Hersteller helfen?',
        a: 'Dort, wo sie eine messbare Kennzahl bewegt: Auslegungen und Angebote aus Anfragen und Ausschreibungstexten entwerfen, Auslegungen vor dem Versand gegen Ihre Regeln prüfen, eingehende Zertifikate und Prüfberichte ablegen und Servicetechnikern die Ist-Daten einer Anlage geben. Wir messen die Kennzahl vorher und nachher, damit die Antwort eine Zahl ist und kein Eindruck.',
      },
      {
        q: 'Wie messen Sie, ob ein Softwareprojekt funktioniert hat?',
        a: 'Wir wählen eine Kennzahl, etwa die Angebotsdauer oder die Konstruktionsstunden pro Auftrag, messen sie vor dem Projekt an Ihren letzten Aufträgen, betreiben einen Pilot mit echten Aufträgen und messen danach dieselbe Kennzahl auf dieselbe Weise. Sie sehen beide Werte nebeneinander.',
      },
      {
        q: 'Arbeiten Sie auch mit Herstellern außerhalb Österreichs?',
        a: 'Ja. SNS Solutions sitzt in Wien und arbeitet auf Deutsch und Englisch mit Herstellern in ganz Europa. Unsere Software zur Konstruktion von Verbundanlagen entsteht gemeinsam mit einem Kältetechnik-Hersteller außerhalb Österreichs.',
      },
      {
        q: 'Wie fangen wir an?',
        a: 'Mit einem kostenlosen 30-minütigen Online-Gespräch. Sagen Sie uns, welches Werkzeug oder welche Kennzahl schmerzt und wie die Arbeit heute läuft. Wir sagen Ihnen, was eine Lösung braucht, oder ehrlich, dass Software es nicht lösen würde.',
      },
    ],
    closing: {
      heading: 'Welches Werkzeug würden Sie zuerst angehen?',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch. Bringen Sie die Tabelle, den Ordner oder die Kennzahl mit, die schmerzt, und wie die Arbeit heute läuft.',
      cta: 'Kostenlose Beratung buchen',
    },
  },

  pack: {
    title: 'Software zur Konstruktion von Kälteverbundanlagen',
    description:
      'Aus dem Ausdruck der Verdichterauslegung eine Kälteverbundanlage, die Ihre Werkstatt bauen kann: Schema, 3D-Modell und Stückliste nach Ihren Regeln. Zuerst CO₂-Booster-Anlagen.',
    eyebrow: 'Software zur Konstruktion von Kälteverbundanlagen',
    h1: 'Beschreiben Sie die Anlage. Sie erhalten eine, die Ihre Werkstatt bauen kann, nach Ihren Regeln konstruiert.',
    intro:
      'SNS Pack Designer macht aus dem Ausdruck Ihrer Verdichterauslegungs-Software eine vollständige Kälteverbundanlage: ein Schema, ein 3D-Modell und eine Stückliste. Die Ventile, Sammelrohre, Sammler und das Ölsystem, die im Ausdruck fehlen, werden nach den Konstruktionsregeln Ihres Unternehmens gesetzt. Das Ergebnis sieht aus wie eine Anlage, die Ihre Konstrukteure gezeichnet haben.',
    status:
      'In Entwicklung gemeinsam mit einem europäischen Kältetechnik-Hersteller, beginnend mit transkritischen CO₂-Booster-Anlagen. Wir nehmen eine kleine Zahl weiterer Hersteller als Entwicklungspartner auf.',
    primaryCta: 'Entwicklungspartner werden',

    gap: {
      eyebrow: 'Die Lücke',
      heading: 'Ein Auslegungsausdruck ist noch keine Anlage.',
      sub: 'Die Auslegungssoftware dimensioniert die Verdichter. Alles zwischen diesen Verdichtern und einer fertigen Anlage in der Werkstatt zeichnet bis heute ein Konstrukteur, nach Regeln, die selten aufgeschrieben sind.',
      hasHeading: 'Was der Ausdruck liefert',
      has: [
        'Verdichtermodelle und Anzahl',
        'Kältemittel und Betriebstemperaturen',
        'Kälteleistung und Leistungsaufnahme je Betriebspunkt',
        'Saug- und Druckbedingungen',
      ],
      needsHeading: 'Was die Werkstatt noch braucht',
      needs: [
        'Saug- und Drucksammelrohre, dimensioniert und positioniert',
        'Ventile: Hochdruck-, Flashgas-, Expansions- und Serviceventile',
        'Sammler und Behälter und ihre Position',
        'Ölabscheidung und Ölrückführung',
        'Rahmen, Aufstellung und Rohrführung',
        'Eine Stückliste mit Ihren Artikelnummern',
      ],
    },

    stepsHeading: 'So funktioniert es',
    steps: [
      {
        k: '01',
        name: 'Ausdruck hochladen',
        text: 'Das PDF, das Ihre Verdichterauslegungs-Software bereits erstellt. Die Software liest Verdichter, Kältemittel, Temperaturen und Leistungen daraus.',
      },
      {
        k: '02',
        name: 'Anlagenspezifikation prüfen',
        text: 'Das Gelesene wird zu einer strukturierten Spezifikation, die Ihr Konstrukteur prüft und korrigiert. Nichts wird stillschweigend angenommen.',
      },
      {
        k: '03',
        name: 'Ihre Regeln angewendet',
        text: 'Sammelrohre, Ventile, Behälter und das Ölsystem werden aus Ihrem Katalog und nach Ihren Hausregeln gewählt und gesetzt.',
      },
      {
        k: '04',
        name: 'Schema und 3D-Modell',
        text: 'Ein Schema des Kreislaufs und ein 3D-Modell der Anlage auf Ihrer eigenen Rahmenfamilie.',
      },
      {
        k: '05',
        name: 'Dateien für Angebot und Werkstatt',
        text: 'Eine Stückliste für das Angebot, ein STEP-Modell zur Fertigstellung durch Ihre Konstrukteure und Werkstattunterlagen je Anlagenfamilie.',
      },
    ],

    rules: {
      eyebrow: 'Nach Ihren Regeln',
      heading: 'Ihr Katalog und Ihre Standards, keine allgemeine Bibliothek.',
      body: 'Jeder Hersteller baut Verbundanlagen anders: welche Ventilmarken, welche Sammelrohrgrößen, wie das Ölsystem aufgebaut ist, welche Rahmen. Wir schreiben diese Regeln mit Ihren Konstrukteuren auf, und die Software wendet sie auf jede Anlage an. Ihre Regeln und Ihr Katalog liegen in einer eigenen Ebene, getrennt von der Kernsoftware.',
      points: [
        'Ihre Komponenten und Artikelnummern',
        'Ihre Auslegungsregeln für Sammelrohre, Leitungen und Behälter',
        'Ihre Rahmenfamilien und Aufstellungskonventionen',
        'Ihre Konstrukteure geben die Konstruktion frei',
      ],
    },

    scale: {
      eyebrow: 'Größer auslegen',
      heading: 'Aus einer mittleren Anlage eine größere machen, richtig.',
      body: 'Eine größere Anlage ist keine gestreckte Zeichnung. Mehr Leistung ändert Sammelrohrdurchmesser, Ventilgrößen, Behältervolumen und oft den Rahmen. Weil die Anlage aus Regeln erzeugt und nicht von einer früheren Zeichnung kopiert wird, führt eine größere Baugröße die Regeln erneut aus, und jedes Teil folgt.',
    },

    outputs: {
      heading: 'Was Sie erhalten, in der Reihenfolge, in der wir es bauen',
      items: [
        {
          stage: 'Zuerst',
          name: 'Angebot und Stückliste',
          text: 'Eine bepreiste Stückliste aus der Auslegung, damit ein Angebot hinausgeht, bevor die Konstruktion etwas gezeichnet hat.',
        },
        {
          stage: 'Danach',
          name: 'STEP-Modell',
          text: 'Ein 3D-Modell im STEP-Format, das sich in SolidWorks, Inventor, Creo, Solid Edge und anderen CAD-Systemen öffnen lässt, zur Fertigstellung durch Ihre Konstrukteure.',
        },
        {
          stage: 'Dann',
          name: 'Werkstattunterlagen',
          text: 'Die Unterlagen, nach denen Ihre Werkstatt baut, je Anlagenfamilie gemeinsam mit Ihrem Team festgelegt.',
        },
      ],
    },

    faqHeading: 'Fragen zur Konstruktion von Verbundanlagen',
    faq: [
      {
        q: 'Was ist Software zur Konstruktion von Kälteverbundanlagen?',
        a: 'Software, die aus einer Verdichterauslegung eine vollständige Konstruktion einer Kälteverbundanlage macht: Schema, 3D-Modell und Stückliste, einschließlich der Sammelrohre, Ventile, Behälter und des Ölsystems, die die Auslegung nicht abdeckt. SNS Pack Designer tut das, indem er die Konstruktionsregeln des Herstellers anwendet.',
      },
      {
        q: 'Welche Verdichterauslegungs-Software kann sie lesen?',
        a: 'Sie liest den Ausdruck (PDF), den Ihre Auslegungssoftware erstellt. Jedes Format wird mit dem Hersteller eingerichtet, der es nutzt. Sagen Sie uns also, mit welchem Auslegungsprogramm Ihre Konstrukteure arbeiten.',
      },
      {
        q: 'Ersetzt sie SolidWorks oder unser CAD-System?',
        a: 'Nein. Sie erzeugt ein STEP-Modell, das sich in SolidWorks, Inventor, Creo, Solid Edge und anderen CAD-Systemen öffnen lässt. Ihre Konstrukteure stellen die Konstruktion dort fertig und geben sie frei, so wie heute.',
      },
      {
        q: 'Welche Anlagentypen und Kältemittel werden unterstützt?',
        a: 'Zuerst transkritische CO₂-Booster-Anlagen, weil wir diese mit unserem ersten Hersteller bauen. Weitere Anlagentypen folgen, sobald ihre Regeln mit einem Hersteller aufgeschrieben sind, der sie baut.',
      },
      {
        q: 'Kann sie eine bestehende Anlage auf eine größere Baugröße auslegen?',
        a: 'Ja, das ist einer der Hauptgründe, warum es sie gibt. Die Anlage wird aus Regeln erzeugt, also führt eine größere Baugröße die Regeln erneut aus und passt Sammelrohre, Ventile, Behälter und Rahmen gemeinsam an, statt eine alte Zeichnung zu strecken.',
      },
      {
        q: 'Wer ist für die endgültige Konstruktion verantwortlich?',
        a: 'Ihre Konstrukteure. Die Software wendet die Regeln an, die Sie ihr geben, und zeigt, was sie entschieden hat und warum. Der Konstrukteur prüft, stellt fertig und gibt frei, wie bei jeder Anlage heute.',
      },
      {
        q: 'Ist sie bereits verfügbar?',
        a: 'Sie ist in Entwicklung gemeinsam mit einem europäischen Kältetechnik-Hersteller. Wir nehmen eine kleine Zahl weiterer Hersteller als Entwicklungspartner auf, die Regeln und Ergebnisse für ihre eigenen Anlagenfamilien mitgestalten.',
      },
    ],

    partner: {
      heading: 'Bauen Sie sie mit uns für Ihre Anlagen.',
      sub: 'Wir suchen ein bis zwei weitere Hersteller, deren Konstrukteure nicht mehr dieselbe Anlage in einer anderen Größe neu zeichnen wollen. Buchen Sie ein Gespräch und bringen Sie einen Auslegungsausdruck mit.',
      cta: 'Entwicklungspartner werden',
    },
  },
}

const COPY: Record<Locale, HvacCopy> = { en, de }

export function getHvac(locale: Locale): HvacCopy {
  return COPY[locale]
}
