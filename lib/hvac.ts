import type { Locale } from '@/i18n/config'
import { DOCS_PATH, HVAC_LABEL, HVAC_PATH, PACK_PATH, SELECTION_PATH } from '@/lib/hvac-links'

export { DOCS_PATH, HVAC_PATH, PACK_PATH, SELECTION_PATH }

/**
 * Copy for the HVAC & refrigeration section: /hvac and /hvac/refrigeration-pack-design (and /de/…).
 * The English is the silver design canvas's copy (gen_hvac.py, gen_site.py pack_cad()).
 *
 * One source for the pages, their JSON-LD (lib/schema.ts) and /llms.txt + /llms-full.txt, so the
 * words a crawler, an answer engine and a visitor see can't drift apart. The FAQ is rendered
 * visibly on the page *and* as FAQPage schema from the same array.
 *
 * CLAIM GUARDRAILS:
 *  - Pack CAD is built for each pack manufacturer, on its own rules, and what we build for a
 *    manufacturer stays theirs. It is not sold off the shelf. CO₂ booster packs are our current
 *    speciality; never say "in development" or offer "design partner" places.
 *  - No customer names. No manufacturer is named, ever.
 *  - No numbers we haven't measured: no "x% faster", no hours saved. The metrics section defines
 *    what we measure; it never states results.
 *  - No compatibility claims for named selection tools or CAD systems.
 *  - The engineer signs the design off. The software never claims compliance with a standard.
 *  - Example UI (the mock cards) is labelled as an example.
 */

/** Product name. One place to change it. */
export const PACK_PRODUCT_NAME = 'Pack CAD'

export type Faq = { q: string; a: string }

/** A line in an example UI card. `em` sits right-aligned and muted; `right` is a plain right column. */
export type MockRow = { a: string; sub?: string; flag?: boolean; em?: string; right?: string; hi?: boolean }
export type Mock = { title: string; rows: MockRow[] }

export type HvacTool = {
  id: 'selection' | 'cad' | 'documents' | 'quoting' | 'erp' | 'service'
  name: string
  /** The one-liner under the name in the index; also the panel heading. */
  headline: string
  line: string
  points: string[]
  /** A film in public/sns/site, or an example card. */
  film?: { name: string; label: string }
  mock?: Mock
  status?: string
  cta: string
  /** The tool's own page; tools without one link to the contact page. */
  href?: string
  /** A second, text link (Pack CAD: "Send us a past job"). */
  pastJob?: string
}

const en = {
  /** Breadcrumb names (from lib/hvac-links.ts). */
  crumbHub: HVAC_LABEL.en.hub,
  crumbPack: HVAC_LABEL.en.pack,
  crumb: { sns: 'SNS Solutions', industries: 'Industries', hvac: 'HVAC & Refrigeration' },
  example: 'Example',
  bookCall: 'Book a free 30-minute call',
  pastJob: 'Send us a past job',

  hub: {
    title: 'Software for HVAC & refrigeration manufacturers',
    description:
      'Selection software, CAD automation, document management and quoting built for HVAC and refrigeration manufacturers, and measured on quote turnaround and engineering hours.',
    h1: 'Software for HVAC and refrigeration manufacturers.',
    intro:
      'Selection, design, documents and quoting, built on your own product data and connected from enquiry to service call.',
    seeTools: 'See the tools',
    flow: {
      label: 'One record from enquiry to service call',
      steps: ['Enquiry', 'Selection', 'Quote', 'Design & CAD', 'Documents', 'ERP & workshop', 'Service'],
      text: 'One record from enquiry to service call. In most manufacturers the same unit is typed into one system after another; connected, each step starts from what the last one already knows.',
    },
    toolsHeading: 'The tools we build',
    toolsSub:
      'Built around how HVAC equipment is actually selected, designed, documented and serviced. Each one works from your own product data and rules.',
    tools: [
      {
        id: 'selection',
        name: 'Selection software',
        headline: 'Enter the duty. Get the right unit.',
        film: {
          name: 'selection-film',
          label:
            'A distributor’s enquiry waits overnight in the factory’s queue; entered in the browser, it returns the unit, its datasheet and its price.',
        },
        line: 'Your performance data and selection rules, on the web, for every sales engineer, rep and distributor.',
        points: [
          'Runs on your performance data and rules',
          'Datasheet and quote from the same selection',
          'Access for your sales channel, each with their own rights',
        ],
        cta: 'See selection software',
        href: SELECTION_PATH,
      },
      {
        id: 'cad',
        name: 'CAD & design automation',
        headline: 'From the selection to a pack your workshop can build.',
        film: { name: 'pack-model-drawing', label: 'The 3D pack turns to the front and becomes its drawing, in register.' },
        status: 'Current speciality: CO₂ booster packs',
        line: 'Pack CAD takes the selection from your manufacturer’s tool and produces the pack in 3D and 2D, inside your engineering rules. It flags what isn’t possible, and says why.',
        points: [
          'The 3D model and the 2D drawings from one selection',
          'Changes in plain words, checked against your rules',
          'Built for your packs, on your own rules',
        ],
        cta: 'See Pack CAD',
        href: PACK_PATH,
        pastJob: 'Send us a past job',
      },
      {
        id: 'documents',
        name: 'Document management',
        headline: 'Every document, under one serial number.',
        film: {
          name: 'documents-film',
          label: 'A unit’s documents gather under its nameplate; a missing certificate is flagged and filed when it arrives.',
        },
        line: 'Drawings, datasheets and certificates under revision control, with the handover dossier put together for you.',
        points: ['Revision control from draft to released', 'Handover dossier assembled per unit', 'Found again when service needs it'],
        cta: 'See document management',
        href: DOCS_PATH,
      },
      {
        id: 'quoting',
        name: 'Quoting & CPQ',
        headline: 'Quotes built from the selection.',
        film: { name: 'quoting-film', label: 'A selection retyped into a separate quote by hand; then the selection itself becomes the quote, priced by your rules, with its datasheet and submittal.' },
        line: 'Quotes built from the selection, not retyped from it, with prices and options from your own rules.',
        points: ['Prices and options from your own rules', 'The same data the workshop builds from', 'Follow-up on quotes nobody has answered'],
        cta: 'Talk to us about quoting',
      },
      {
        id: 'erp',
        name: 'ERP & parts lists',
        headline: 'Parts lists that arrive complete.',
        film: { name: 'erp-film', label: 'A parts list from design is retyped into the ERP row by row and misses a later change; then the list arrives complete with your part numbers, and a change after release is flagged.' },
        line: 'A parts list leaves design once and arrives in purchasing complete, with your part numbers.',
        points: ['CAD and PDM parts lists synced into your ERP', 'Your part numbers, not retyped descriptions', 'Changes after release flagged, not lost'],
        cta: 'Talk to us about your ERP',
      },
      {
        id: 'service',
        name: 'Service & after-sales',
        headline: 'What was shipped, by serial number.',
        film: { name: 'service-film', label: 'Years after handover, the technician’s questions at the unit become the unit’s own file under its serial number; what they find goes back to engineering.' },
        line: 'The as-built unit, its documents, its service history and its spare parts, under the serial number the technician is standing in front of.',
        points: ['As-built configuration and documents per unit', 'Service history and spare parts by serial number', 'What the field learns, back to engineering'],
        cta: 'Talk to us about service',
      },
    ] as HvacTool[],
    ai: {
      heading: 'AI where it moves a number, not where it makes a demo.',
      body: 'We measure the figure first, then build the smallest thing that moves it: drafting quotes from enquiries, checking selections against your rules, filing certificates against the right order.',
    },
    metrics: {
      heading: 'The figures we measure, before and after',
      rows: [
        { metric: 'Quote turnaround', definition: 'Working days from an enquiry arriving to a priced quote going out.' },
        { metric: 'Engineering hours per order', definition: 'Design and drawing hours spent on each sold pack or unit.' },
        { metric: 'First-time-right rate', definition: 'Share of orders built without a drawing revision or a workshop query.' },
        { metric: 'Quote-to-order rate', definition: 'Share of sent quotes that turn into orders.' },
        { metric: 'Quoted vs actual margin', definition: 'The gap between the margin at quote and the margin after the build.' },
        { metric: 'On-time delivery', definition: 'Share of orders shipped on the date promised to the customer.' },
        { metric: 'First-time fix rate', definition: 'Share of service calls closed on the first visit.' },
      ],
      methodHeading: 'How we measure',
      method: [
        { k: '1', name: 'Baseline', text: 'We measure the figure on your recent orders before we touch anything.' },
        { k: '2', name: 'Pilot', text: 'One workflow, live on real orders, in weeks.' },
        { k: '3', name: 'Measure again', text: 'Same figure, same method, side by side. You decide what comes next.' },
      ],
    },
    faqHeading: 'Questions manufacturers ask us',
    faq: [
      {
        q: 'What software does an HVAC manufacturer need?',
        a: 'Usually a selection tool for its own range, CAD for design, a document system for drawings, datasheets and certificates, a way to build quotes, an ERP for parts and purchasing, and a service record for each unit. Most of the hours are lost in the gaps between them, where the same data is retyped from one system into the next.',
      },
      {
        q: 'Do you replace our ERP or CRM?',
        a: 'No. Use them where they fit; we connect to them. What generic systems don’t know is how an HVAC unit is selected against a duty, which documents a unit needs at handover, or how a pack is built from a compressor selection. That HVAC-specific layer is what we build.',
      },
      {
        q: 'Can we buy Pack CAD off the shelf?',
        a: 'No. We build it for each pack manufacturer, around your own components, rules and frames. Our current speciality is CO₂ booster packs. If you build refrigeration packs, send us a past job and we’ll show you what it would produce.',
      },
      {
        q: 'How do you measure whether it worked?',
        a: 'We pick one figure, such as quote turnaround or engineering hours per order, measure it on your recent orders before the build, run a pilot on real orders, and measure the same figure the same way afterwards. You see both numbers side by side.',
      },
      {
        q: 'Do you work with manufacturers outside Austria?',
        a: 'Yes. We’re based in Vienna and work in English and German with manufacturers across Europe.',
      },
      {
        q: 'How do we start?',
        a: 'With a free 30-minute online call. Tell us which tool or figure is hurting and how the work runs today. We’ll tell you what it would take to fix it, or tell you honestly that software wouldn’t.',
      },
    ] as Faq[],
    closing: {
      heading: 'Which tool would you fix first?',
      sub: 'Book a free 30-minute call. Bring the spreadsheet, the folder or the figure that hurts, and the way the work runs today.',
    },
  },

  pack: {
    title: 'Pack CAD: refrigeration pack design software',
    description:
      'Pack CAD turns the selection from your compressor manufacturer’s tool into a refrigeration pack in 3D and 2D, inside your engineering rules. Built for each pack manufacturer; CO₂ booster packs are our current speciality.',
    h1: 'From the selection to a pack your workshop can build.',
    intro:
      'Pack CAD takes the selection from your manufacturer’s tool and produces the pack in 3D and 2D, inside your engineering rules. It flags what isn’t possible, and says why.',
    speciality: ['Current speciality: CO₂ booster packs.', 'Built for each manufacturer, on its own rules.'],
    loopLabel: 'A refrigeration pack drawn as a wireframe, filling in as solid metal, then the camera pulls back to the whole pack.',

    gap: {
      heading: 'A selection printout is not a pack.',
      sub: 'The selection software sizes the compressors. Everything between those compressors and a pack on the workshop floor is still drawn by an engineer, from rules that are rarely written down.',
      printoutLabel: 'An example compressor selection printout',
      printout: {
        title: 'COMPRESSOR SELECTION',
        groups: [
          [
            ['Refrigerant', 'R744 (CO₂)'],
            ['System', 'Transcritical booster'],
            ['MT evaporating', '−8 °C'],
            ['LT evaporating', '−32 °C'],
            ['Gas cooler out', '35 °C'],
          ],
          [
            ['MT compressors', '4 ×  semi-hermetic'],
            ['LT compressors', '2 ×  semi-hermetic'],
            ['MT duty', '240 kW (4 × 60 kW)'],
          ],
        ],
        missing: 'Valves, headers, vessels, oil system, frame: not included',
      },
      addsHeading: 'What Pack CAD adds, by your rules',
      adds: [
        ['Suction and discharge headers', 'sized and placed'],
        ['Valves: high-pressure, flash gas, expansion, service', 'chosen'],
        ['Receivers and vessels', 'placed'],
        ['Oil separation and return', 'laid out'],
        ['The frame, the layout and the pipe runs', 'drawn'],
        ['A parts list with your part numbers', 'listed'],
      ],
    },

    stepsHeading: 'How it works',
    stepsSub: 'One job, from the printout to the files your workshop builds from.',
    steps: [
      { name: 'Upload the printout', text: 'The PDF your selection software already produces. Pack CAD reads the compressors, refrigerant, temperatures and duties from it.' },
      { name: 'Check the spec', text: 'What was read becomes a specification your engineer reviews. Nothing is assumed silently.' },
      { name: 'Your rules applied', text: 'Headers, valves, vessels and the oil system chosen and placed from your catalogue and your house rules.' },
      { name: 'Design and detail', text: 'The pack in 3D on your frame family, with its schematic and 2D drawings. Edit it in plain words or directly.' },
      { name: 'Outputs', text: 'Parts list for the quote, drawings for the workshop, STEP and DXF for exchanging files.' },
    ],
    stepsFilm: 'The compressors on a selection printout lift off and land on the pack drawing; everything the printout leaves out draws in around them.',

    rules: {
      heading: 'Inside your rules, and honest about them.',
      body: 'Every manufacturer builds packs differently: which valves, which header sizes, how the oil system runs, which frames. We write those rules down with your engineers. Pack CAD applies them to every pack, and when a change breaks one, it says which and why instead of drawing it anyway.',
      points: [
        'Your components and part numbers',
        'Your sizing rules for headers, lines and vessels',
        'Your frame families and layout conventions',
        'Your engineers sign the design off',
      ],
      film: 'The pack in plan between the site’s depth limits: growing deeper is flagged with the rule’s name, so it grows one bay longer instead.',
    },

    scale: {
      heading: 'Take a medium pack and make it larger, properly.',
      body: 'A larger pack is not a stretched drawing. More capacity changes header diameters, valve sizes, vessel volumes and often the frame. Because the pack comes from your rules, picking a larger size runs them again and every part follows.',
      items: [
        'Header diameters, from your velocity limits',
        'Valve sizes, from your selection tables',
        'Vessel volumes, from the new capacity',
        'The frame, a bay longer when it needs one',
        'The drawings and the parts list, again',
      ],
    },

    outputs: {
      heading: 'What comes out',
      film: 'The 3D pack turns to the front; a wipe shows model and drawing in register; the drawing settles into its sheet and each part lights with its row in the parts list.',
      items: [
        { name: '3D model', text: 'The pack on your frame family, every part in place.' },
        { name: '2D drawings', text: 'General arrangement and detail sheets, in your drawing frame, generated from the model.' },
        { name: 'Parts list', text: 'Every part on the drawing with its quantity, ready for the quote and purchasing.' },
      ],
    },

    own: {
      heading: 'Built for your packs, and nobody else’s.',
      body: 'There’s no generic version to install. We start from your past jobs and build the system around your components, your frames and your engineers’ rules. What we build for you stays yours.',
      photo: 'A printed general arrangement drawing on a desk with a coffee cup and a pencil.',
    },

    faqHeading: 'Questions about Pack CAD',
    faq: [
      {
        q: 'Can we buy Pack CAD off the shelf?',
        a: 'No. We build it for each manufacturer, around your components, sizing rules, frame families and drawing standards, and what we build for you stays yours. Our current speciality is CO₂ transcritical booster packs. Other pack types start the same way, from your past jobs and your rules.',
      },
      {
        q: 'Which selection software does it read?',
        a: 'It reads the printout your selection software produces. Each format is set up with the manufacturer who uses it, so tell us which tool your engineers work with.',
      },
      {
        q: 'Do our engineers still draw packs in another CAD system?',
        a: 'Pack CAD is built so your engineers design, edit and detail packs in it directly. STEP and DXF are there for exchanging files with customers and other systems.',
      },
      {
        q: 'Can it scale an existing pack to a larger size?',
        a: 'Yes, that’s one of the main reasons it exists. Choosing a larger size runs your rules again and resizes headers, valves, vessels and the frame together.',
      },
      {
        q: 'Who is responsible for the final design?',
        a: 'Your engineers. Pack CAD shows what it decided and why; the engineer checks and signs off the design, as with any pack today.',
      },
    ] as Faq[],

    closing: {
      heading: 'Bring us one past job.',
      sub: 'Send a selection printout and the drawing your engineers made from it. We’ll show you what Pack CAD would produce.',
    },
  },
}

export type HvacCopy = typeof en

const de: HvacCopy = {
  crumbHub: HVAC_LABEL.de.hub,
  crumbPack: HVAC_LABEL.de.pack,
  crumb: { sns: 'SNS Solutions', industries: 'Branchen', hvac: 'HLK & Kältetechnik' },
  example: 'Beispiel',
  bookCall: 'Kostenloses Erstgespräch buchen',
  pastJob: 'Schicken Sie uns einen alten Auftrag',

  hub: {
    title: 'Software für Hersteller in HLK und Kältetechnik',
    description:
      'Auslegungssoftware, CAD-Automatisierung, Dokumentenmanagement und Angebotserstellung für Hersteller in HLK und Kältetechnik, gemessen an Angebotsdauer und Konstruktionsstunden.',
    h1: 'Software für Hersteller in HLK und Kältetechnik.',
    intro:
      'Auslegung, Konstruktion, Unterlagen und Angebote, auf Ihren eigenen Produktdaten gebaut und verbunden von der Anfrage bis zum Serviceeinsatz.',
    seeTools: 'Zu den Werkzeugen',
    flow: {
      label: 'Ein Datensatz von der Anfrage bis zum Serviceeinsatz',
      steps: ['Anfrage', 'Auslegung', 'Angebot', 'Konstruktion & CAD', 'Unterlagen', 'ERP & Werkstatt', 'Service'],
      text: 'Ein Datensatz von der Anfrage bis zum Serviceeinsatz. Bei den meisten Herstellern wird dieselbe Anlage in ein System nach dem anderen getippt; verbunden beginnt jeder Schritt mit dem, was der vorige schon weiß.',
    },
    toolsHeading: 'Die Werkzeuge, die wir bauen',
    toolsSub:
      'Gebaut danach, wie HLK-Anlagen tatsächlich ausgelegt, konstruiert, dokumentiert und gewartet werden. Jedes arbeitet mit Ihren eigenen Produktdaten und Regeln.',
    tools: [
      {
        id: 'selection',
        name: 'Auslegungssoftware',
        headline: 'Anforderung eingeben. Das passende Gerät erhalten.',
        film: {
          name: 'selection-film',
          label:
            'Die Anfrage eines Händlers wartet über Nacht in der Warteschlange des Werks; im Browser eingegeben, liefert sie Gerät, Datenblatt und Preis.',
        },
        line: 'Ihre Leistungsdaten und Auslegungsregeln, im Browser, für jeden Vertriebsingenieur, Vertreter und Händler.',
        points: [
          'Arbeitet mit Ihren Leistungsdaten und Regeln',
          'Datenblatt und Angebot aus derselben Auslegung',
          'Zugang für Ihren Vertrieb, jeweils mit eigenen Rechten',
        ],
        cta: 'Zur Auslegungssoftware',
        href: SELECTION_PATH,
      },
      {
        id: 'cad',
        name: 'CAD & Konstruktionsautomatisierung',
        headline: 'Von der Auslegung zu einer Anlage, die Ihre Werkstatt bauen kann.',
        film: { name: 'pack-model-drawing', label: 'Die 3D-Anlage dreht sich nach vorne und wird deckungsgleich zu ihrer Zeichnung.' },
        status: 'Derzeitiger Schwerpunkt: CO₂-Booster-Anlagen',
        line: 'Pack CAD übernimmt die Auslegung aus dem Programm Ihres Verdichterherstellers und erstellt die Anlage in 3D und 2D, innerhalb Ihrer Konstruktionsregeln. Es zeigt, was nicht geht, und sagt, warum.',
        points: [
          '3D-Modell und 2D-Zeichnungen aus einer Auslegung',
          'Änderungen in einfachen Worten, gegen Ihre Regeln geprüft',
          'Für Ihre Anlagen gebaut, nach Ihren eigenen Regeln',
        ],
        cta: 'Zu Pack CAD',
        href: PACK_PATH,
        pastJob: 'Schicken Sie uns einen alten Auftrag',
      },
      {
        id: 'documents',
        name: 'Dokumentenmanagement',
        headline: 'Jede Unterlage, unter einer Seriennummer.',
        film: {
          name: 'documents-film',
          label: 'Die Unterlagen einer Anlage sammeln sich unter ihrem Typenschild; ein fehlendes Zertifikat wird markiert und abgelegt, sobald es eintrifft.',
        },
        line: 'Zeichnungen, Datenblätter und Zertifikate unter Revisionsverwaltung, die Übergabedokumentation wird für Sie zusammengestellt.',
        points: ['Revisionsverwaltung vom Entwurf bis zur Freigabe', 'Übergabedokumentation je Anlage zusammengestellt', 'Wiedergefunden, wenn der Service sie braucht'],
        cta: 'Zum Dokumentenmanagement',
        href: DOCS_PATH,
      },
      {
        id: 'quoting',
        name: 'Angebote & CPQ',
        headline: 'Angebote aus der Auslegung.',
        film: { name: 'quoting-film', label: 'Eine Auslegung wird von Hand in ein separates Angebot abgetippt; dann wird die Auslegung selbst zum Angebot, nach Ihren Preisregeln, mit Datenblatt und Freigabeunterlagen.' },
        line: 'Angebote aus der Auslegung erstellt, nicht aus ihr abgetippt, mit Preisen und Optionen nach Ihren eigenen Regeln.',
        points: ['Preise und Optionen nach Ihren eigenen Regeln', 'Dieselben Daten, nach denen die Werkstatt baut', 'Nachfassen bei Angeboten, auf die niemand geantwortet hat'],
        cta: 'Über Angebote sprechen',
      },
      {
        id: 'erp',
        name: 'ERP & Stücklisten',
        headline: 'Stücklisten, die vollständig ankommen.',
        film: { name: 'erp-film', label: 'Eine Stückliste aus der Konstruktion wird Zeile für Zeile ins ERP abgetippt und verpasst eine spätere Änderung; dann kommt die Liste vollständig mit Ihren Teilenummern an, und eine Änderung nach Freigabe wird markiert.' },
        line: 'Eine Stückliste verlässt die Konstruktion einmal und kommt vollständig im Einkauf an, mit Ihren Artikelnummern.',
        points: ['Stücklisten aus CAD und PDM mit Ihrem ERP abgeglichen', 'Ihre Artikelnummern statt abgetippter Beschreibungen', 'Änderungen nach der Freigabe markiert, nicht verloren'],
        cta: 'Über Ihr ERP sprechen',
      },
      {
        id: 'service',
        name: 'Service & After-Sales',
        headline: 'Was ausgeliefert wurde, nach Seriennummer.',
        film: { name: 'service-film', label: 'Jahre nach der Übergabe werden die Fragen des Technikers an der Anlage zur eigenen Akte der Anlage unter ihrer Seriennummer; was er vorfindet, geht zurück an die Konstruktion.' },
        line: 'Die Anlage in ihrer Ist-Ausführung, ihre Unterlagen, ihre Servicehistorie und ihre Ersatzteile, unter der Seriennummer, vor der der Techniker steht.',
        points: ['Ist-Konfiguration und Unterlagen je Anlage', 'Servicehistorie und Ersatzteile nach Seriennummer', 'Was der Service lernt, zurück in die Konstruktion'],
        cta: 'Über Service sprechen',
      },
    ] as HvacTool[],
    ai: {
      heading: 'KI dort, wo sie eine Zahl bewegt, nicht dort, wo sie eine Demo macht.',
      body: 'Wir messen zuerst die Kennzahl und bauen dann das Kleinste, das sie bewegt: Angebote aus Anfragen entwerfen, Auslegungen gegen Ihre Regeln prüfen, Zertifikate dem richtigen Auftrag zuordnen.',
    },
    metrics: {
      heading: 'Die Kennzahlen, die wir vorher und nachher messen',
      rows: [
        { metric: 'Angebotsdauer', definition: 'Arbeitstage vom Eingang einer Anfrage bis zum Versand eines bepreisten Angebots.' },
        { metric: 'Konstruktionsstunden pro Auftrag', definition: 'Konstruktions- und Zeichenstunden für jede verkaufte Anlage oder jedes verkaufte Gerät.' },
        { metric: 'Erstmalig-richtig-Quote', definition: 'Anteil der Aufträge, die ohne Zeichnungsrevision oder Rückfrage der Werkstatt gebaut werden.' },
        { metric: 'Auftragsquote', definition: 'Anteil der versendeten Angebote, aus denen ein Auftrag wird.' },
        { metric: 'Kalkulierte gegenüber tatsächlicher Marge', definition: 'Die Differenz zwischen der Marge im Angebot und der Marge nach dem Bau.' },
        { metric: 'Liefertreue', definition: 'Anteil der Aufträge, die zum zugesagten Termin ausgeliefert werden.' },
        { metric: 'Erstbehebungsquote', definition: 'Anteil der Serviceeinsätze, die beim ersten Besuch abgeschlossen werden.' },
      ],
      methodHeading: 'Wie wir messen',
      method: [
        { k: '1', name: 'Ausgangswert', text: 'Wir messen die Kennzahl an Ihren letzten Aufträgen, bevor wir etwas verändern.' },
        { k: '2', name: 'Pilot', text: 'Ein Ablauf, live mit echten Aufträgen, in wenigen Wochen.' },
        { k: '3', name: 'Erneut messen', text: 'Dieselbe Kennzahl, dieselbe Methode, im direkten Vergleich. Sie entscheiden, wie es weitergeht.' },
      ],
    },
    faqHeading: 'Fragen, die Hersteller uns stellen',
    faq: [
      {
        q: 'Welche Software braucht ein HLK-Hersteller?',
        a: 'Meist ein Auslegungsprogramm für das eigene Programm, CAD für die Konstruktion, ein Dokumentensystem für Zeichnungen, Datenblätter und Zertifikate, einen Weg zur Angebotserstellung, ein ERP für Teile und Einkauf und eine Serviceakte je Anlage. Die meisten Stunden gehen in den Lücken dazwischen verloren, wo dieselben Daten von einem System ins nächste getippt werden.',
      },
      {
        q: 'Ersetzen Sie unser ERP oder CRM?',
        a: 'Nein. Nutzen Sie sie, wo sie passen; wir binden sie an. Was allgemeine Systeme nicht wissen: wie ein HLK-Gerät gegen eine Anforderung ausgelegt wird, welche Unterlagen eine Anlage bei der Übergabe braucht oder wie eine Verbundanlage aus einer Verdichterauslegung entsteht. Diese HLK-spezifische Ebene bauen wir.',
      },
      {
        q: 'Können wir Pack CAD fertig kaufen?',
        a: 'Nein. Wir bauen es für jeden Anlagenhersteller, um Ihre eigenen Komponenten, Regeln und Rahmen herum. Unser derzeitiger Schwerpunkt sind CO₂-Booster-Anlagen. Wenn Sie Kälteverbundanlagen bauen, schicken Sie uns einen alten Auftrag, und wir zeigen Ihnen, was daraus entstehen würde.',
      },
      {
        q: 'Wie messen Sie, ob es funktioniert hat?',
        a: 'Wir wählen eine Kennzahl, etwa die Angebotsdauer oder die Konstruktionsstunden pro Auftrag, messen sie vor dem Projekt an Ihren letzten Aufträgen, betreiben einen Pilot mit echten Aufträgen und messen danach dieselbe Kennzahl auf dieselbe Weise. Sie sehen beide Werte nebeneinander.',
      },
      {
        q: 'Arbeiten Sie auch mit Herstellern außerhalb Österreichs?',
        a: 'Ja. Wir sitzen in Wien und arbeiten auf Deutsch und Englisch mit Herstellern in ganz Europa.',
      },
      {
        q: 'Wie fangen wir an?',
        a: 'Mit einem kostenlosen 30-minütigen Online-Gespräch. Sagen Sie uns, welches Werkzeug oder welche Kennzahl schmerzt und wie die Arbeit heute läuft. Wir sagen Ihnen, was eine Lösung braucht, oder ehrlich, dass Software es nicht lösen würde.',
      },
    ] as Faq[],
    closing: {
      heading: 'Welches Werkzeug würden Sie zuerst angehen?',
      sub: 'Buchen Sie ein kostenloses 30-minütiges Gespräch. Bringen Sie die Tabelle, den Ordner oder die Kennzahl mit, die schmerzt, und wie die Arbeit heute läuft.',
    },
  },

  pack: {
    title: 'Pack CAD: Software zur Konstruktion von Kälteverbundanlagen',
    description:
      'Pack CAD macht aus der Auslegung im Programm Ihres Verdichterherstellers eine Kälteverbundanlage in 3D und 2D, innerhalb Ihrer Konstruktionsregeln. Für jeden Anlagenhersteller gebaut; unser derzeitiger Schwerpunkt sind CO₂-Booster-Anlagen.',
    h1: 'Von der Auslegung zu einer Anlage, die Ihre Werkstatt bauen kann.',
    intro:
      'Pack CAD übernimmt die Auslegung aus dem Programm Ihres Verdichterherstellers und erstellt die Anlage in 3D und 2D, innerhalb Ihrer Konstruktionsregeln. Es zeigt, was nicht geht, und sagt, warum.',
    speciality: ['Derzeitiger Schwerpunkt: CO₂-Booster-Anlagen.', 'Für jeden Hersteller gebaut, nach seinen eigenen Regeln.'],
    loopLabel: 'Eine Kälteverbundanlage als Drahtmodell, das sich zu massivem Metall füllt; dann zieht die Kamera auf die ganze Anlage zurück.',

    gap: {
      heading: 'Ein Auslegungsausdruck ist noch keine Anlage.',
      sub: 'Die Auslegungssoftware dimensioniert die Verdichter. Alles zwischen diesen Verdichtern und einer Anlage in der Werkstatt zeichnet noch immer ein Konstrukteur, nach Regeln, die selten aufgeschrieben sind.',
      printoutLabel: 'Ein Beispiel für einen Ausdruck einer Verdichterauslegung',
      printout: {
        title: 'VERDICHTERAUSLEGUNG',
        groups: [
          [
            ['Kältemittel', 'R744 (CO₂)'],
            ['System', 'Transkritischer Booster'],
            ['NK Verdampfung', '−8 °C'],
            ['TK Verdampfung', '−32 °C'],
            ['Gaskühleraustritt', '35 °C'],
          ],
          [
            ['NK Verdichter', '4 ×  halbhermetisch'],
            ['TK Verdichter', '2 ×  halbhermetisch'],
            ['NK Leistung', '240 kW (4 × 60 kW)'],
          ],
        ],
        missing: 'Ventile, Sammelrohre, Behälter, Ölsystem, Rahmen: nicht enthalten',
      },
      addsHeading: 'Was Pack CAD ergänzt, nach Ihren Regeln',
      adds: [
        ['Saug- und Drucksammelrohre', 'dimensioniert und gesetzt'],
        ['Ventile: Hochdruck, Flashgas, Expansion, Service', 'ausgewählt'],
        ['Sammler und Behälter', 'platziert'],
        ['Ölabscheidung und Ölrückführung', 'ausgelegt'],
        ['Rahmen, Aufstellung und Rohrführung', 'gezeichnet'],
        ['Eine Stückliste mit Ihren Artikelnummern', 'aufgelistet'],
      ],
    },

    stepsHeading: 'So funktioniert es',
    stepsSub: 'Ein Auftrag, vom Ausdruck bis zu den Dateien, nach denen Ihre Werkstatt baut.',
    steps: [
      { name: 'Ausdruck hochladen', text: 'Das PDF, das Ihre Auslegungssoftware schon erzeugt. Pack CAD liest daraus Verdichter, Kältemittel, Temperaturen und Leistungen.' },
      { name: 'Spezifikation prüfen', text: 'Aus dem Gelesenen wird eine Spezifikation, die Ihr Konstrukteur prüft. Nichts wird stillschweigend angenommen.' },
      { name: 'Ihre Regeln angewandt', text: 'Sammelrohre, Ventile, Behälter und Ölsystem aus Ihrem Katalog und nach Ihren Hausregeln ausgewählt und gesetzt.' },
      { name: 'Konstruieren und detaillieren', text: 'Die Anlage in 3D auf Ihrer Rahmenfamilie, mit Schema und 2D-Zeichnungen. Bearbeiten Sie sie in einfachen Worten oder direkt.' },
      { name: 'Ergebnisse', text: 'Stückliste für das Angebot, Zeichnungen für die Werkstatt, STEP und DXF für den Dateiaustausch.' },
    ],
    stepsFilm: 'Die Verdichter auf einem Auslegungsausdruck heben ab und landen auf der Anlagenzeichnung; alles, was der Ausdruck auslässt, zeichnet sich um sie herum ein.',

    rules: {
      heading: 'Innerhalb Ihrer Regeln, und ehrlich dazu.',
      body: 'Jeder Hersteller baut Anlagen anders: welche Ventile, welche Sammelrohrgrößen, wie das Ölsystem läuft, welche Rahmen. Wir schreiben diese Regeln mit Ihren Konstrukteuren auf. Pack CAD wendet sie auf jede Anlage an, und wenn eine Änderung eine Regel verletzt, sagt es welche und warum, statt sie trotzdem zu zeichnen.',
      points: [
        'Ihre Komponenten und Artikelnummern',
        'Ihre Dimensionierungsregeln für Sammelrohre, Leitungen und Behälter',
        'Ihre Rahmenfamilien und Aufstellungskonventionen',
        'Ihre Konstrukteure geben die Konstruktion frei',
      ],
      film: 'Die Anlage im Grundriss zwischen den Tiefengrenzen des Standorts: Tiefer zu werden wird mit dem Namen der Regel markiert, also wird sie stattdessen ein Feld länger.',
    },

    scale: {
      heading: 'Eine mittlere Anlage größer machen, und zwar richtig.',
      body: 'Eine größere Anlage ist keine gestreckte Zeichnung. Mehr Leistung ändert Sammelrohrdurchmesser, Ventilgrößen, Behältervolumen und oft den Rahmen. Weil die Anlage aus Ihren Regeln entsteht, führt eine größere Wahl sie erneut aus, und jedes Teil folgt.',
      items: [
        'Sammelrohrdurchmesser, aus Ihren Geschwindigkeitsgrenzen',
        'Ventilgrößen, aus Ihren Auswahltabellen',
        'Behältervolumen, aus der neuen Leistung',
        'Der Rahmen, ein Feld länger, wenn nötig',
        'Zeichnungen und Stückliste, neu',
      ],
    },

    outputs: {
      heading: 'Was herauskommt',
      film: 'Die 3D-Anlage dreht sich nach vorne; ein Wischübergang zeigt Modell und Zeichnung deckungsgleich; die Zeichnung setzt sich in ihr Blatt, und jedes Teil leuchtet mit seiner Zeile in der Stückliste auf.',
      items: [
        { name: '3D-Modell', text: 'Die Anlage auf Ihrer Rahmenfamilie, jedes Teil an seinem Platz.' },
        { name: '2D-Zeichnungen', text: 'Aufstellungs- und Detailzeichnungen in Ihrem Zeichnungsrahmen, aus dem Modell erzeugt.' },
        { name: 'Stückliste', text: 'Jedes Teil der Zeichnung mit seiner Menge, bereit für Angebot und Einkauf.' },
      ],
    },

    own: {
      heading: 'Für Ihre Anlagen gebaut, für niemanden sonst.',
      body: 'Es gibt keine allgemeine Version zum Installieren. Wir beginnen mit Ihren früheren Aufträgen und bauen das System um Ihre Komponenten, Ihre Rahmen und die Regeln Ihrer Konstrukteure. Was wir für Sie bauen, bleibt Ihres.',
      photo: 'Eine ausgedruckte Aufstellungszeichnung auf einem Schreibtisch mit Kaffeetasse und Bleistift.',
    },

    faqHeading: 'Fragen zu Pack CAD',
    faq: [
      {
        q: 'Können wir Pack CAD fertig kaufen?',
        a: 'Nein. Wir bauen es für jeden Hersteller, um Ihre Komponenten, Dimensionierungsregeln, Rahmenfamilien und Zeichnungsstandards herum, und was wir für Sie bauen, bleibt Ihres. Unser derzeitiger Schwerpunkt sind transkritische CO₂-Booster-Anlagen. Andere Anlagentypen beginnen genauso, mit Ihren früheren Aufträgen und Ihren Regeln.',
      },
      {
        q: 'Welche Auslegungssoftware liest es?',
        a: 'Es liest den Ausdruck, den Ihre Auslegungssoftware erzeugt. Jedes Format wird mit dem Hersteller eingerichtet, der es nutzt; sagen Sie uns also, mit welchem Programm Ihre Konstrukteure arbeiten.',
      },
      {
        q: 'Zeichnen unsere Konstrukteure Anlagen weiter in einem anderen CAD-System?',
        a: 'Pack CAD ist so gebaut, dass Ihre Konstrukteure Anlagen direkt darin konstruieren, bearbeiten und detaillieren. STEP und DXF sind für den Dateiaustausch mit Kunden und anderen Systemen da.',
      },
      {
        q: 'Kann es eine bestehende Anlage auf eine größere Leistung skalieren?',
        a: 'Ja, das ist einer der Hauptgründe, warum es das gibt. Eine größere Wahl führt Ihre Regeln erneut aus und passt Sammelrohre, Ventile, Behälter und Rahmen gemeinsam an.',
      },
      {
        q: 'Wer ist für die endgültige Konstruktion verantwortlich?',
        a: 'Ihre Konstrukteure. Pack CAD zeigt, was es entschieden hat und warum; der Konstrukteur prüft und gibt die Konstruktion frei, wie heute bei jeder Anlage.',
      },
    ] as Faq[],

    closing: {
      heading: 'Bringen Sie uns einen alten Auftrag.',
      sub: 'Schicken Sie einen Auslegungsausdruck und die Zeichnung, die Ihre Konstrukteure daraus gemacht haben. Wir zeigen Ihnen, was Pack CAD daraus erstellen würde.',
    },
  },
}

const COPY: Record<Locale, HvacCopy> = { en, de }

export function getHvac(locale: Locale): HvacCopy {
  return COPY[locale]
}
