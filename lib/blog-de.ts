import { IMMVELA_URL } from '@/lib/site'
import type { BlogPost } from '@/lib/blog'

/**
 * The German versions of the blog posts in lib/blog.ts, keyed by slug. Same slug, same date, same product and the same
 * related posts as the English original (those come from lib/blog.ts), so /blog/<slug> and /de/blog/<slug> are one
 * article in two languages and hreflang pairs them. Translated faithfully: same claims, same facts, nothing added.
 * Changing an English post means changing its German version here too.
 */

export type BlogTranslation = Pick<BlogPost, 'title' | 'eyebrow' | 'description' | 'readTime' | 'intro' | 'sections' | 'takeaways' | 'faq' | 'cta'>

const contactHref = (service: string) => `/de/contact?service=${encodeURIComponent(service)}`
const IMMVELA_DE = `${IMMVELA_URL}/de`

export const BLOG_DE: Record<string, BlogTranslation> = {
  'real-estate-data-fragmentation': {
    title: 'Das eigentliche Datenproblem in der Immobilienbranche (und warum mehr Software es nicht löst)',
    eyebrow: 'Immobilien',
    description:
      'Ein Inserat liegt an fünf Orten und stimmt an keinem mit sich selbst überein. Woher die Datenzersplitterung im Immobilienbüro kommt und warum eine weitere App sie meist verschlimmert.',
    readTime: '8 Min. Lesezeit',
    intro: [
      'Bis ein einzelnes Inserat online geht, wurden seine Angaben meist fünf- oder sechsmal abgetippt: einmal in das Exporttool für die Portale, einmal in das CRM, sofern das Büro eines hat, einmal in die Broschüre, einmal in die Social-Media-Texte und mindestens noch einmal in einen E-Mail-Verlauf, den nie wieder jemand durchsucht. Keine dieser Kopien aktualisiert die anderen. Bis Freitag können die Wohnfläche in der Broschüre und die Wohnfläche im Portal still und leise voneinander abweichen, und es fällt niemandem auf, bis es ein Käufer bemerkt.',
      'Das ist Datenzersplitterung in der Immobilienbranche: kein fehlendes Tool, sondern das Fehlen eines einzigen Ortes, dem die richtige Fassung einer Angabe gehört. Alles, was danach kommt, ist eine Vermutung darüber, was die letzte Person eingetippt hat.',
    ],
    sections: [
      {
        heading: 'Wo die Zersplitterung tatsächlich entsteht',
        paragraphs: [
          'Verfolgen Sie ein Inserat durch sein Leben, und Sie sehen, wie dieselben paar Angaben bei jeder Übergabe neu eingetippt werden. Die technischen Daten der Immobilie (Wohnfläche, Baujahr, die Werte aus dem Energieausweis) wandern aus dem PDF, das der Verkäufer übergibt, in das Werkzeug, mit dem der Makler das Inserat entwirft, und getrennt davon ins Portal. Die Kontaktdaten eines Interessenten wandern aus einem Formular in ein CRM, wenn es eines gibt, und in die Notiz-App des Maklers, wenn nicht. Konditionen werden per E-Mail oder WhatsApp verhandelt und existieren öfter, als man zugeben möchte, nur dort.',
          'Nichts davon ist ein ungewöhnlicher Fehler. Es ist das, was standardmäßig passiert, wenn jedes Werkzeug im Büro seine eigene Kopie der Wahrheit führt.',
        ],
      },
      {
        heading: 'Warum „einfach ein CRM einführen“ das Problem nicht löst',
        paragraphs: [
          'Ein CRM sieht nach der Lösung aus, und es löst ein echtes Problem, aber es ist ein weiterer Ort, an dem man Dinge eintippt, kein Ort, aus dem alles andere liest. Das Portal hat weiterhin seinen eigenen Export. Das Dokumententool hat weiterhin seinen eigenen Upload. Das Veröffentlichungstool hat weiterhin seinen eigenen Entwurf. Ein CRM auf diesen Stapel zu legen, spart keinen Schritt, es fügt einen hinzu, es sei denn, jedes andere Werkzeug ist so gebaut, dass es daraus liest.',
          'Die Lücke ist kein fehlendes Stück Software. Es fehlt eine Architektur: Nichts im Büro ist als maßgebliche Fassung festgelegt, also geht jedes Werkzeug stillschweigend davon aus, dass es selbst sie ist.',
        ],
      },
      {
        heading: 'Was es konkret kostet',
        bullets: [
          'Zahlen driften auseinander: Eine Wohnfläche, die dreimal eingetippt wurde, sind am Ende drei leicht unterschiedliche Zahlen, wenn ein Käufer die Broschüre mit dem Portalinserat vergleicht.',
          'Falsche Zahlen in der Anzeige: Ein Energiewert, der im Ausweis stimmte, kann veralten oder vertippt werden, bis er in einem veröffentlichten Inserat ankommt.',
          'Erfahrene Leute beim Kopieren und Einfügen: Die Personen, die am besten mit Kunden sprechen können, verbringen jeden Tag einen Teil ihrer Zeit damit, Angaben neu einzugeben, die diese Kunden schon jemand anderem gegeben haben.',
          'Leistungsdaten, die nirgends ankommen: Was der Beitrag zu einem Inserat tatsächlich gebracht hat (Aufrufe, Anfragen, was zum Abschluss führte), gelangt meist nie dorthin zurück, wo es das nächste Inserat verbessern könnte.',
        ],
      },
      {
        heading: 'Die Lösung liegt in der Architektur, nicht in einer weiteren App',
        paragraphs: [
          'Die eigentliche Lösung ist ein geprüfter Datensatz pro Immobilie, Interessent und Geschäft, aus dem jedes nachgelagerte Werkzeug liest und in den es zurückschreibt. Eine Angabe wird einmal bestätigt und gilt dann überall, wo sie verwendet wird, statt bei jedem Schritt neu eingetippt zu werden und sich dabei jedes Mal ein Stück weiter von der Wahrheit zu entfernen.',
          'Das ist der Gedanke hinter Immvela, dem eigenen Produkt von SNS für Immobilienmakler. Es liest den Energieausweis und den Grundbuchauszug und zeigt jeden gelesenen Wert als Entwurf, den der Makler bestätigt. Exposé, Broschüre und Social-Media-Texte entwirft es nur aus bestätigten Werten, und zu jedem bestätigten Wert ist festgehalten, wer ihn bestätigt hat und aus welchem Dokument er stammt. Eine Anzeige, der die Energiewerte fehlen, wird zurückgehalten statt veröffentlicht.',
        ],
      },
      {
        heading: 'Was Sie vor Ihrem nächsten Inserat prüfen sollten',
        bullets: [
          'Gibt es einen Ort, an dem eine Angabe wie die Wohnfläche oder der Energiekennwert bestätigt wird, oder fragt jedes Werkzeug sie separat ab?',
          'Wenn sich diese Angabe ändert, wird sie überall aktualisiert, wo sie verwendet wird, oder nur in dem Werkzeug, in dem Sie sie geändert haben?',
          'Kommt irgendetwas nach der Veröffentlichung (Anfragen, Interaktion, was zum Abschluss führte) zurück in den Datensatz, oder endet es auf der Plattform, auf der es entstanden ist?',
        ],
      },
    ],
    takeaways: [
      'Zersplitterung ist kein fehlendes Tool. Es fehlt der eine Datensatz, aus dem jedes Werkzeug liest und in den es zurückschreibt.',
      'Ein CRM allein behebt das nicht; es schafft nur einen weiteren Ort, an dem Daten von der Wahrheit abweichen können.',
      'Die Kosten zeigen sich als auseinanderdriftende Zahlen, falsche Werte in veröffentlichten Anzeigen, verlorene Zeit erfahrener Leute beim Abtippen und Leistungsdaten, die nie wiederverwendet werden.',
    ],
    faq: [
      {
        q: 'Was ist Datenzersplitterung in der Immobilienbranche?',
        a: 'Wenn dieselben Angaben zu Immobilie, Interessent oder Geschäft getrennt in einem Portal, einem CRM, einer Dokumentenablage und einem Nachrichtenverlauf gespeichert sind, ohne einen einzigen Datensatz, nach dem sich alle richten, sodass die Kopien mit der Zeit auseinanderlaufen.',
      },
      {
        q: 'Warum behebt ein CRM-Wechsel die Datenzersplitterung nicht?',
        a: 'Ein CRM ist trotzdem nur ein weiteres System mit seiner eigenen Kopie der Daten. Solange Portal, Veröffentlichungstool, Dokumententool und alles andere nicht so gebaut sind, dass sie daraus lesen und dorthin zurückschreiben, wird es zu einem weiteren Ort, an dem Angaben dem Rest widersprechen können, nicht zu dem Ort, an dem sie geklärt werden.',
      },
      {
        q: 'Wie sieht eine einzige verlässliche Datenquelle für ein Maklerbüro in der Praxis aus?',
        a: 'Ein geprüfter Datensatz pro Immobilie, Interessent und Geschäft, aus dem jedes Werkzeug liest und in den es zurückschreibt, sodass eine einmal bestätigte Angabe (eine Wohnfläche, ein Energiewert, der Status eines Interessenten) überall stimmt, wo sie verwendet wird, statt bei jedem Schritt neu eingegeben zu werden und wieder abzuweichen.',
      },
    ],
    cta: {
      heading: 'Sehen Sie, wie ein geprüfter Datensatz funktioniert',
      sub: 'Immvela ist das eigene Produkt von SNS für Immobilienmakler, gebaut genau um dieses Problem. Es befindet sich in einer geschlossenen Beta.',
      label: 'Immvela ansehen',
      href: IMMVELA_DE,
      external: true,
    },
  },

  'immvela-one-record-real-estate-operating-system': {
    title: 'Immvela: Ein geprüfter Datensatz statt sieben Logins',
    eyebrow: 'Immvela · Produkt',
    description:
      'Was Immvela tatsächlich ist: die Idee hinter dem Produkt von SNS für Immobilienmakler, was es heute kann und welche Grenzen fest eingebaut sind, statt nur in Richtlinien zu stehen.',
    readTime: '8 Min. Lesezeit',
    intro: [
      'Immvela ist das eigene Produkt von SNS für Immobilienmakler in Österreich, Deutschland und der Schweiz. Alles, was es tut, liest aus einem Datensatz pro Immobilie und schreibt dorthin zurück: die Dokumente, die daraus bestätigten Werte und die Texte, die aus diesen Werten entworfen werden. Es befindet sich in einer geschlossenen Beta, Deutsch zuerst, Englisch verfügbar.',
      'Der Sinn, das aufzuschreiben, ist nicht die Liste der Funktionen. Es ist die Architektur darunter, denn sie entscheidet, ob das Ganze mit der Zeit nützlicher wird oder nur weitere unverbundene KI-Funktionen ansammelt.',
    ],
    sections: [
      {
        heading: 'Die Grundidee: Alles teilt sich einen Datensatz',
        paragraphs: [
          'Die meisten Produkte für „KI in der Immobilienbranche“ sind eine einzelne Funktion, die an die vorhandenen Werkzeuge eines Büros angeschraubt wird. Das heißt, jede neue Funktion leitet ihre Angaben wieder von vorne ab. Immvela ist andersherum gebaut: Es gibt einen geprüften Datensatz pro Immobilie, und alles, was Immvela tut, liest daraus und schreibt dorthin zurück. Eine Wohnfläche wird einmal bestätigt, und jeder Text, der für dieses Inserat entworfen wird, verwendet dieselbe Zahl.',
          'Deshalb wird es auch als Betriebssystem beschrieben und nicht als Werkzeug: Der Datensatz ist das, worauf alles andere aufsetzt, und er soll im zwölften Monat mehr wert sein als am ersten Tag. Die meisten KI-Einzellösungen sind das Gegenteil und bauen nichts auf, weil nichts in irgendetwas anderes zurückfließt.',
        ],
      },
      {
        heading: 'Was es heute kann',
        bullets: [
          'Dokumente: Es liest den Energieausweis und den Grundbuchauszug, verwahrt die übrigen Dokumente eines Inserats, prüft Dokumente gegeneinander und markiert Widersprüche und Nachweise, die bald ablaufen. Jeder gelesene Wert ist ein Entwurf, bis der Makler ihn bestätigt.',
          'Wer was bestätigt hat: Zu jedem bestätigten Wert ist festgehalten, wer ihn bestätigt hat und aus welchem Dokument er stammt. Inserate, Werte und Dokumente gehören dem Büro, nicht einem einzelnen Makler.',
          'Texte: Exposé, Broschüre und Social-Media-Texte werden aus bestätigten Werten entworfen, im Deutsch des Landes, in dem das Inserat liegt, mit dem Markenauftritt des Büros auf den Dokumenten.',
          'Veröffentlichen: Beiträge gehen von einem Ort aus an Instagram, Facebook, LinkedIn, TikTok und YouTube, und erst, nachdem jemand sie freigegeben hat. Eine Anzeige, der die Energiewerte fehlen, wird zurückgehalten, für jeden Makler im Büro.',
          'Home Staging: Fotos lassen sich mit KI einrichten, und jedes so eingerichtete Foto ist als virtuell eingerichtet gekennzeichnet.',
          'Import: Inserate kommen über einen OpenImmo-Export aus onOffice, Justimmo, Propstack oder FLOWFACT.',
        ],
      },
      {
        heading: 'Als Nächstes',
        paragraphs: ['Noch nicht im Produkt und auch auf der Website von Immvela als „als Nächstes“ gekennzeichnet:'],
        bullets: [
          'Anfragen: Anfragen beantworten und einordnen. Es wird nie eine Besichtigung vereinbaren oder einen Preis nennen.',
          'Büroregeln: Das Büro legt fest, welche Dokumente nötig sind, welche Vorlagen gelten und dass eine Führungskraft vor jeder Veröffentlichung freigibt.',
          'Eine Übersicht für die Inhaberin oder den Inhaber, was jeder Makler bestätigt und veröffentlicht hat.',
          'Veröffentlichen auf den Portalen, willhaben und ImmoScout24.',
          'Ein Rundgangvideo aus einem einzigen Gang durch die Immobilie mit dem Handy.',
        ],
      },
      {
        heading: 'Drei Grenzen, die in die Architektur eingebaut sind, nicht in Richtlinien',
        bullets: [
          'Zahlen in erzeugten Texten stammen nur aus Werten, die das Büro bestätigt hat. Immvela erfindet keine Angaben zur Immobilie, um eine Lücke zu füllen.',
          'Nichts geht von selbst hinaus. Jeder Beitrag wird zuerst von einem Menschen freigegeben, und Immvela vereinbart weder Preise noch Termine noch Vertragsbedingungen.',
          'KI-Bilder sind gekennzeichnet: Jedes virtuell eingerichtete Foto ist als solches gekennzeichnet.',
        ],
      },
      {
        heading: 'Warum „Betriebssystem“ und nicht „KI-Tool“',
        paragraphs: [
          'Ein Tool beantwortet eine Anfrage, einmal, für sich allein. Ein Betriebssystem ist das, worauf alles andere läuft. Genau darauf setzt Immvela: weniger darauf, dass eine einzelne Funktion für sich besonders schlau ist, und mehr darauf, dass der Datensatz darunter genau und beständig bleibt, während immer mehr darauf aufgebaut wird.',
        ],
      },
    ],
    takeaways: [
      'Immvela führt einen geprüften Datensatz pro Immobilie, und alles, was es tut, liest daraus und schreibt dorthin zurück.',
      'Heute liest es Dokumente, entwirft Exposé, Broschüre und Texte aus bestätigten Werten und veröffentlicht nach Freigabe in sozialen Kanälen. Es befindet sich in einer geschlossenen Beta.',
      'Angaben nur aus bestätigten Werten, nichts ohne Freigabe veröffentlicht, eingerichtete Fotos als solche gekennzeichnet: eingebaut in die Funktionsweise, nicht einem Richtliniendokument überlassen.',
    ],
    faq: [
      {
        q: 'Was ist Immvela?',
        a: 'Immvela ist das Produkt von SNS Solutions für Immobilienmakler in Österreich, Deutschland und der Schweiz: eine persönliche KI-Assistenz für Immobilien, aufgebaut um einen geprüften Datensatz pro Immobilie. Es befindet sich in einer geschlossenen Beta.',
      },
      {
        q: 'Was kann Immvela heute?',
        a: 'Es liest den Energieausweis und den Grundbuchauszug und lässt den Makler jeden Wert bestätigen, prüft Dokumente gegeneinander, entwirft Exposé, Broschüre und Social-Media-Texte aus bestätigten Werten, richtet Fotos mit sichtbarer Kennzeichnung virtuell ein und veröffentlicht nach Freigabe auf Instagram, Facebook, LinkedIn, TikTok und YouTube. Das Beantworten von Anfragen kommt als Nächstes.',
      },
      {
        q: 'Trifft Immvela selbst verbindliche Entscheidungen?',
        a: 'Nein. Nichts wird veröffentlicht, bevor ein Mensch es freigibt, und Immvela vereinbart weder Preise noch Termine noch Vertragsbedingungen. Das Beantworten von Anfragen kommt als Nächstes, und es wird nie eine Besichtigung vereinbaren oder einen Preis nennen.',
      },
      {
        q: 'Für wen ist Immvela gebaut?',
        a: 'Für Immobilienmakler und Maklerbüros in Österreich, Deutschland und der Schweiz. Inserate, Dokumente und bestätigte Werte gehören dem Büro, und jede Person hat ihren eigenen Login.',
      },
    ],
    cta: {
      heading: 'Sehen Sie, was Immvela kann',
      sub: 'Die Website von Immvela zeigt, was es heute kann und was als Nächstes kommt, und dort können Sie sich für die geschlossene Beta bewerben.',
      label: 'Immvela ansehen',
      href: IMMVELA_DE,
      external: true,
    },
  },

  'why-quotes-go-unanswered': {
    title: 'Warum Vertriebsteams Aufträge verlieren, nachdem das Angebot verschickt ist',
    eyebrow: 'Vertrieb & Nachfassen',
    description:
      'Ein Angebot geht hinaus, dann Stille. Warum die Lücke beim Nachfassen ein Datenproblem ist und kein Disziplinproblem, und was sie ohne CRM-Umstieg schließt.',
    readTime: '6 Min. Lesezeit',
    intro: [
      'In vielen Vertriebsteams geht ein Angebot als PDF im Anhang einer E-Mail hinaus. Erfasst wird es, wenn überhaupt, als Zeile in einer Tabelle oder als Export aus dem Angebotstool. Ab diesem Moment hängt es allein davon ab, ob jemand daran denkt nachzufassen, ob daraus ein Auftrag wird.',
      'Diese Lücke, die Stille zwischen „Angebot verschickt“ und entweder „gewonnen“ oder „verloren“, ist der Ort, an dem ein spürbarer Teil des Umsatzes unbemerkt verschwindet.',
    ],
    sections: [
      {
        heading: 'Wo das Geld tatsächlich verloren geht',
        paragraphs: [
          'Angebote werden verschickt und dann vergessen, nicht aus Nachlässigkeit, sondern weil nichts im Ablauf zum Nachfassen auffordert. Die Tabelle taugt als Liste und versagt als Erinnerung. Es gibt keinen festen Auslöser, keinen Anstoß nach drei Tagen, keine Nachfrage nach sieben, also hängt es an dem Verkäufer, der zufällig daran denkt, an einem Tag, an dem er auch anderes zu tun hat, ob ein Interessent nachgefasst wird.',
        ],
      },
      {
        heading: 'Warum das ein Datenproblem ist und kein Disziplinproblem',
        paragraphs: [
          'Es liegt nahe, das unter „wir müssen einfach konsequenter nachfassen“ abzulegen. Die genauere Diagnose ist struktureller Art: Die Angebotsdaten (Kunde, Betrag, was angeboten wurde, Versanddatum) liegen in einem Format, mit dem nichts anderes arbeiten kann. Eine Tabelle, angelegt von wem auch immer, mit den Spaltennamen, die diese Person gewählt hat, auf Deutsch oder Englisch, je nach Büro. Mit Daten, die keine einheitliche Form haben, kann nichts automatisch arbeiten, egal wie diszipliniert das Team ist.',
        ],
      },
      {
        heading: 'Wie eine Lösung ohne erzwungenen CRM-Umstieg aussieht',
        paragraphs: [
          'Die meisten kleinen Teams führen kein vollständiges CRM ein, nur um das Nachfassen zu regeln, und „einfach ein CRM einführen“ fügt ein System hinzu, statt die Lücke zu schließen. Die Lösung, die tatsächlich genutzt wird, arbeitet mit dem, was schon da ist: Sie liest den Export, den das Team bereits hat, egal wie die Spalten heißen, verschickt Erinnerungen, die vom tatsächlichen Verkäufer kommen, und hört auf, sobald der Kunde antwortet.',
          'Genau so ist QFUtool aufgebaut, das Werkzeug von SNS für genau diese Lücke; ausführlich beschrieben im nächsten Beitrag.',
        ],
      },
      {
        heading: 'Die Schutzmechanismen, die gern vergessen werden',
        bullets: [
          'Ein Abmeldelink mit einem Klick in jeder E-Mail, sofort wirksam.',
          'Versand nur während der Arbeitszeiten, damit eine Erinnerung nie um 2 Uhr nachts ankommt.',
          'Eine Obergrenze für den Angebotswert, damit die größten Aufträge einen Anruf bekommen statt einer Vorlage.',
          'Ein tägliches Versandlimit, damit eine neue Domain langsam Vertrauen aufbaut, statt in Spamfilter zu laufen.',
        ],
        paragraphs: [
          'Nichts davon ist an ein bestimmtes Tool gebunden. Das sollte jede automatisierte E-Mail haben, bevor sie eine echte Kundenbeziehung berührt.',
        ],
      },
    ],
    takeaways: [
      'Die Lücke beim Nachfassen ist ein Problem der Datenform: Angebotsdaten liegen in einer Tabelle, mit der nichts anderes arbeiten kann.',
      'Es ist kein Disziplinproblem: Es gibt gar keinen festen Auslöser, der überhaupt zum Nachfassen auffordert.',
      'Die Lösung, die genutzt wird, arbeitet mit dem Export, den ein Team schon hat, statt einen CRM-Umstieg zu verlangen.',
    ],
    faq: [
      {
        q: 'Warum bleiben Angebote unbeantwortet?',
        a: 'Meist nicht, weil Kunden kein Interesse haben, sondern weil nichts im Ablauf ein Nachfassen auslöst. Das Angebot wird in einer Tabelle erfasst, wenn überhaupt, und ob nachgefasst wird, hängt davon ab, dass eine Person daran denkt.',
      },
      {
        q: 'Brauche ich ein CRM, um das Nachfassen zu regeln?',
        a: 'Nein. Ein CRM löst ein breiteres Problem, bringt aber ein System mit, das man lernen und in das man umziehen muss. Die engere Lösung, die Tabelle oder den Export zu lesen, den Sie ohnehin führen, und daraus Erinnerungen zu automatisieren, schließt die Lücke ohne Umstieg.',
      },
      {
        q: 'Ist automatisches Nachfassen für jeden Auftrag richtig?',
        a: 'Nicht für die größten. Eine vernünftige Einrichtung hält Angebote über einem festgelegten Wert aus Vorlagen-E-Mails heraus, weil ein großer Auftrag einen Anruf verdient.',
      },
    ],
    cta: {
      heading: 'Sehen Sie genau, wie das Nachfassen funktioniert',
      sub: 'QFUtool ist das Werkzeug von SNS für Verkäufer, die ihren eigenen Angeboten nachgehen, gebaut genau um diese Lücke.',
      label: 'Mehr über QFUtool lesen',
      href: '/de/blog/qfutool-automated-quote-follow-up',
    },
  },

  'qfutool-automated-quote-follow-up': {
    title: 'QFUtool: Automatisches Nachfassen für die Angebote, denen niemand nachgeht',
    eyebrow: 'QFUtool · Produkt',
    description: 'Was QFUtool macht, wie es mit dem Export arbeitet, den Sie schon haben, welche Regeln es einhält und was es kostet.',
    readTime: '6 Min. Lesezeit',
    intro: [
      'QFUtool fasst bei Angeboten nach, die Sie bereits verschickt haben. Exportieren Sie sie aus Ihrem Angebotstool als Excel oder CSV, prüfen Sie in einfachen Worten, was es gleich verschicken wird, und es schreibt jedem Kunden in Ihrem Namen, von Ihrer eigenen Domain, während der Arbeitszeiten, und übergibt Ihnen die, die antworten. Gebaut von SNS Solutions für Verkäufer, die ihren eigenen Angeboten nachgehen: kein CRM und kein Plattformumstieg.',
    ],
    sections: [
      {
        heading: 'So funktioniert es',
        ordered: true,
        bullets: [
          'Den Export so hochladen, wie er ist. QFUtool erkennt Spalten an ihrem Inhalt statt an ihrem Namen, auf Englisch oder Deutsch.',
          'In einfachen Worten bestätigen: nicht „Spalte F ist der Betrag“, sondern „wir schreiben gleich Dirk wegen eines Angebots über 3.450 € für einen Website-Relaunch“. Nichts geht aufgrund eines Lesefehlers hinaus.',
          'Senden. Eine E-Mail pro Angebot, von Ihrer eigenen Domain, mit dem Namen des richtigen Verkäufers, persönlich mit dem Namen des Kunden, dem Betrag, dem Angebotsgegenstand und der Angebotsnummer.',
        ],
      },
      {
        heading: 'Warum es von Ihrer eigenen Domain sendet',
        paragraphs: [
          'Die Nachricht kommt von Ihrer Adresse, signiert für Ihre Domain, und Antworten landen in Ihrem normalen Posteingang. Eine Erinnerung, die nach einer Massenversand-Plattform aussieht, wird ignoriert oder als Spam markiert, genau in dem Moment, in dem sie wie eine Person wirken muss, die kurz nachfragt.',
        ],
      },
      {
        heading: 'Was eine Abfolge stoppt',
        paragraphs: [
          'Eine Antwort, eine Abmeldung, eine unzustellbare E-Mail oder eine Spam-Beschwerde storniert jede Nachricht, die für diese Person noch geplant ist. Kunden, die antworten, kommen auf Ihre Liste, damit Sie selbst übernehmen.',
        ],
      },
      {
        heading: 'Die Regeln, die es einhält',
        bullets: [
          'Versand zwischen 08:00 und 18:00, auf Wunsch nur an Werktagen.',
          '50 E-Mails am Tag zum Start: Eine neue Domain gewinnt Vertrauen langsam.',
          'Eine Wertgrenze: Angebote darüber werden Ihnen zum Anrufen aufgelistet, nicht gemailt.',
          'Nie doppelt: Laden Sie nächste Woche den neuen Export hoch, werden bereits nachgefasste Angebote übersprungen.',
          'Abmeldung mit einem Klick in jeder E-Mail, sofort wirksam, ohne Login.',
          'Ein Hauptschalter, der aus ist, bis Sie ihn umlegen, damit Sie importieren und genau lesen können, was hinausgehen würde.',
        ],
      },
      {
        heading: 'Preise',
        bullets: [
          'Test: 14 Tage kostenlos, 10 Erinnerungen im Monat, 1 Nutzer. Die Laufzeit beginnt, sobald Ihre Versanddomain verifiziert ist.',
          'Starter: 19 € im Monat, 40 Erinnerungen, 1 Nutzer.',
          'Pro: 49 € im Monat, 150 Erinnerungen, 5 Nutzer.',
          'Business: nach Vereinbarung, unbegrenzte Erinnerungen und Nutzer.',
        ],
        paragraphs: ['Preise wie zum Zeitpunkt des Schreibens auf qfutool.com angegeben; dort stehen immer die aktuellen.'],
      },
      {
        heading: 'Wo die Daten liegen',
        paragraphs: ['In einer in der EU gehosteten Datenbank in Irland, verschlüsselt bei der Übertragung und im Ruhezustand.'],
      },
      {
        heading: 'Für wen es ist',
        paragraphs: [
          'Für Verkäufer, die Angebote verschicken und ihnen selbst nachgehen, in jedem Handwerk und jeder Dienstleistung, und die das verlässlich erledigt haben wollen, ohne dafür ein CRM einzuführen.',
        ],
      },
    ],
    takeaways: [
      'QFUtool liest den Angebotsexport, den Sie schon haben, und macht das Nachfassen zu einer automatischen Abfolge, die Sie vorher bestätigen.',
      'Jede E-Mail kommt mit dem Namen und von der Domain des tatsächlichen Verkäufers, und die Abfolge stoppt, sobald ein Kunde antwortet, sich abmeldet oder eine E-Mail unzustellbar ist.',
      'Der kostenlose 14-Tage-Test umfasst 10 Erinnerungen; bezahlte Pakete beginnen bei 19 € im Monat.',
    ],
    faq: [
      {
        q: 'Was ist QFUtool?',
        a: 'Ein Werkzeug von SNS Solutions, das bei verschickten Angeboten per E-Mail nachfasst, von Ihrer eigenen Adresse und während der Arbeitszeiten, aufgebaut auf dem Export, den Sie ohnehin führen, statt ein CRM zu verlangen.',
      },
      {
        q: 'Muss meine Tabelle einen bestimmten Aufbau haben?',
        a: 'Nein. Spalten werden an ihrem Inhalt erkannt statt an ihrem Namen, auf Englisch oder Deutsch, und Sie bestätigen, was verstanden wurde, bevor irgendetwas verschickt wird.',
      },
      {
        q: 'Was kostet QFUtool?',
        a: 'Ein 14-tägiger kostenloser Test umfasst 10 Erinnerungen und beginnt, sobald Ihre Versanddomain verifiziert ist. Starter kostet 19 € im Monat (40 Erinnerungen), Pro 49 € im Monat (150 Erinnerungen, 5 Nutzer), Business nach Vereinbarung. Die aktuellen Preise stehen auf qfutool.com.',
      },
      {
        q: 'Was passiert, wenn ein Kunde antwortet?',
        a: 'Alles, was für diesen Kunden noch geplant ist, wird storniert, und er kommt auf Ihre Liste, damit Sie selbst nachfassen. Eine Abmeldung, eine unzustellbare E-Mail oder eine Spam-Beschwerde bewirken dasselbe.',
      },
    ],
    cta: {
      heading: 'Probieren Sie es mit Ihren eigenen Angeboten',
      sub: '14 Tage kostenlos, 10 Erinnerungen inklusive.',
      label: 'Kostenlos testen',
      href: 'https://www.qfutool.com/',
      external: true,
    },
  },

  'ai-outbound-for-service-businesses': {
    title: 'Vom Nachfassen zur Kaltakquise: Wohin sich KI-gestützte Vertriebsautomatisierung entwickelt',
    eyebrow: 'KI-Kaltakquise',
    description:
      'Nachfassen und Kaltakquise klingen ähnlich, scheitern aber unterschiedlich. Was sie trennt, warum für Kaltakquise eine höhere Messlatte gilt und in welche Richtung sich QFUtool bewegt.',
    readTime: '7 Min. Lesezeit',
    intro: [
      'Ein Großteil der Diskussion über „KI im Vertrieb“ dreht sich gerade um eingehende Anfragen: einen Chatbot, der eine bereits eingetroffene Anfrage beantwortet. Die ausgehende Hälfte, also Menschen aktiv anzusprechen, die noch nicht angefragt haben, wird weit weniger automatisiert, und das aus einem bestimmten Grund: Sie braucht dieselben sauberen, bestätigten, strukturierten Daten wie alles andere, sonst ist sie nur Spam mit besserer Grammatik.',
    ],
    sections: [
      {
        heading: 'Nachfassen ist das einfache Ende der Kaltakquise',
        paragraphs: [
          'Die heutige Form von QFUtool, also jemanden zu erinnern, der bereits ein Angebot angefragt hat, ist bewusst das schmale Ende der ausgehenden Ansprache mit geringem Risiko. Der Empfänger hat sich schon gemeldet, also wird eine Erinnerung erwartet und ist kein Kaltkontakt. Das ist echte Automatisierung, aber sie erreicht noch keine Menschen, die sich gar nicht gemeldet haben. Das ist ein anderes und schwierigeres Problem.',
        ],
      },
      {
        heading: 'Warum Kaltakquise schwerer richtig zu machen ist',
        paragraphs: [
          'Kaltakquise scheitert aus einem anderen Grund als das Nachfassen. Die Anforderungen an die Datenqualität sind höher: Ein falscher Name oder eine veraltete Angabe beim ersten Kontakt wirkt nachlässig, nicht automatisiert, und es gibt keine bestehende Beziehung, die den Fehler auffängt. Auch die rechtlichen Anforderungen sind höher: Die Regeln zur Einwilligung unterscheiden sich für jemanden, der nie mit einem Unternehmen zu tun hatte, und jemanden, dem man wegen seines eigenen Angebots nachgeht. Ein Tool, das diese Vorarbeit überspringt, automatisiert keine Ansprache, es automatisiert Spam.',
        ],
      },
      {
        heading: 'Die Richtung, in die sich QFUtool bewegt',
        paragraphs: [
          'Kaltakquise ist die erklärte Richtung, in die sich QFUtool als Nächstes bewegt. Das ist heute keine fertige Funktion, sondern eine Erweiterung derselben Grundsätze, die die Nachfass-Funktion bereits beweist: vom Namen und der Domain der echten Person senden, sofort aufhören, sobald sich jemand abwendet, nie außerhalb der Geschäftszeiten senden und eine Obergrenze halten, die die größten Chancen an einen Menschen statt an eine Vorlage gibt. Die Idee ist, diese Schutzmechanismen auf einen neuen Teil des Vertriebswegs auszuweiten, statt Kaltakquise als eigenes, lockereres Produkt zu bauen.',
        ],
      },
      {
        heading: 'Was Sie fragen sollten, bevor Sie ein Tool für „KI-Kaltakquise“ kaufen',
        bullets: [
          'Verlangt es saubere, bestätigte Daten, oder improvisiert es um Lücken in dem, was es bekommt?',
          'Hört es verlässlich und beim ersten Mal auf, sobald sich jemand abmeldet?',
          'Wirkt es, als käme es von einer Person, oder als käme es von einer Plattform?',
          'Gibt es eine Wertgrenze, die die größten Chancen an einen Menschen statt an eine Vorlage gibt?',
        ],
      },
    ],
    takeaways: [
      'Nachfassen (jemanden erinnern, der sich schon gemeldet hat) und Kaltakquise (jemanden ansprechen, der das nicht hat) scheitern unterschiedlich: Für Kaltakquise gelten höhere Anforderungen an Datenqualität und Rechtskonformität.',
      'QFUtool ist heute ein Werkzeug zum Nachfassen; Kaltakquise ist die erklärte Richtung, in die es sich bewegt, mit denselben Schutzmechanismen statt lockereren.',
      'Kaltakquise funktioniert erst, wenn die Daten darunter verlässlich sind; wer das überspringt, verschickt Spam mit besserer Grammatik.',
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen KI für eingehende und für ausgehende Ansprache?',
        a: 'Automatisierung für eingehende Ansprache reagiert auf jemanden, der sich bereits gemeldet hat, etwa mit einer Anfrage oder einer Angebotsanfrage. Automatisierung für ausgehende Ansprache nimmt Kontakt zu jemandem auf, der sich noch nicht gemeldet hat, und das erhöht die Anforderungen an Datengenauigkeit und Einwilligung.',
      },
      {
        q: 'Ist QFUtool heute ein Tool für Kaltakquise?',
        a: 'Noch nicht. Heute automatisiert es das Nachfassen bei Angeboten, die ein Kunde bereits angefragt hat, also bei Kontakten, die von ihm ausgingen. Kaltakquise, also neue Interessenten anzusprechen, ist die erklärte Richtung, in die es sich bewegt.',
      },
    ],
    cta: {
      heading: 'Möchten Sie erfahren, wann die Kaltakquise kommt?',
      sub: 'Erzählen Sie uns, wie Ihre Akquise heute aussieht, und wir halten Sie auf dem Laufenden, sobald es so weit ist.',
      label: 'Kontakt aufnehmen',
      href: contactHref('QFUtool'),
    },
  },

  'ai-infrastructure-for-real-estate-agencies': {
    title: 'Was „KI-Infrastruktur“ für ein Maklerbüro tatsächlich bedeutet',
    eyebrow: 'KI-Infrastruktur',
    description:
      'Die meiste „KI für Immobilien“ ist ein Chatbot, der an dieselben zersplitterten Werkzeuge angeschraubt wird. Echte KI-Infrastruktur ist die Datenebene darunter. Was das in der Praxis heißt.',
    readTime: '9 Min. Lesezeit',
    intro: [
      'Maklerbüros kaufen immer neue KI-Tools, und die Ergebnisse bauen nicht aufeinander auf. Hier ein Textgenerator, dort ein Chatbot, anderswo eine Preisassistenz: jedes für sich nützlich, und das Ganze ein Jahr später nicht stimmiger als am ersten Tag. Die übliche Erklärung lautet, die Tools seien noch nicht gut genug. Die genauere ist, dass KI auf zersplitterten Daten die Zersplitterung nur schneller wiederholt.',
      '„KI-Infrastruktur“ ist keine Funktion und kein Chatbot. Es ist die Daten- und Ablaufebene unter jeder KI-Funktion: der Teil, der entscheidet, ob diese Funktion mit der Zeit nützlicher wird oder nur Rauschen hinzufügt. Was das konkret bedeutet.',
    ],
    sections: [
      {
        heading: 'Die Falle, ein Tool nach dem anderen zu kaufen',
        paragraphs: [
          'Ein typisches Maklerbüro hat bereits ein CRM, ein Exporttool für die Portale, WhatsApp für alles Dringende, ein gemeinsames Laufwerk für Dokumente, ein Home-Staging-Tool und ein Veröffentlichungstool, und keines davon teilt einen Datensatz. Jede neue KI-Funktion wird auf dieselbe Weise an diesen Stapel angeschraubt: Sie liest den Kontext, den sie bekommt, erzeugt ein Ergebnis und vergisst alles, sobald die Sitzung endet. Keine von ihnen teilt einen Datensatz, also wird keine genauer, je länger das Büro sie nutzt. Genau deshalb driften die Ergebnisse, und Makler vertrauen ihnen nach wenigen Monaten nicht mehr.',
        ],
      },
      {
        heading: 'Was Infrastruktur konkret bedeutet',
        bullets: [
          'Ein geprüfter Datensatz pro Immobilie, Interessent und Geschäft, aus dem jedes Werkzeug liest und in den es zurückschreibt, statt dass jedes Werkzeug seine eigene Kopie führt.',
          'Eine Bestätigungsebene, damit die KI nie eine Angabe behauptet, die sie nicht bekommen hat: Sie arbeitet nur mit dem, was ein Mensch bereits bestätigt hat.',
          'Eine Nachvollziehbarkeit, damit sich jedes erzeugte Dokument und jede Aktion auf genau den Stand des Datensatzes zurückführen lässt, aus dem es entstanden ist.',
        ],
        paragraphs: [
          'Immvela ist als funktionierendes Beispiel dafür gebaut, nicht als Sonderfall: Exposé, Broschüre und Texte werden nur aus Werten entworfen, die der Makler bestätigt hat, zu jedem bestätigten Wert ist festgehalten, wer ihn bestätigt hat und aus welchem Dokument er stammt, und nichts wird veröffentlicht, bevor ein Mensch es freigibt.',
        ],
      },
      {
        heading: 'Warum sich das aufbaut, statt zu verfallen',
        paragraphs: [
          'Eine Angabe wird einmal korrigiert, und jedes Werkzeug, das sie verwendet, nutzt die korrigierte Fassung. Das Ergebnis jedes Schritts wird zur Grundlage des nächsten: Ein bestätigtes Inserat speist die Broschüre, und die Broschüre speist die Texte. Das ist das Schwungrad: im zwölften Monat mehr wert als am ersten Tag.',
          'Ein Stapel unverbundener KI-Einzeltools bewirkt das Gegenteil. Nichts fließt in irgendetwas anderes zurück, also wird die Genauigkeit mit der Nutzung nicht besser; sie wird nur jedes Mal neu ausgewürfelt, Tool für Tool.',
        ],
      },
      {
        heading: 'Eine kurze Checkliste, bevor Sie die nächste KI-Funktion kaufen',
        bullets: [
          'Liest sie denselben Datensatz wie Ihre anderen Werkzeuge, oder führt sie ihre eigene, abgeschottete Kopie?',
          'Behauptet sie je eine Angabe, die sie nicht bekommen hat, oder hält sie sich streng an das, was bestätigt ist?',
          'Wenn Sie sie morgen entfernen, sind Ihre Daten darin eingeschlossen, oder liegen sie in einem System, das tatsächlich Ihnen gehört?',
          'Können Sie ein bestimmtes Ergebnis auf genau den Stand des Datensatzes zurückführen, aus dem es entstanden ist?',
        ],
      },
    ],
    takeaways: [
      'KI-Infrastruktur ist die Daten- und Ablaufebene unter einer Funktion, nicht die Funktion selbst.',
      'Sie zahlt sich nur aus, wenn Ergebnisse in einen gemeinsamen, geprüften Datensatz zurückfließen. Sonst beginnt jedes Tool jedes Mal bei null.',
      'Prüfen Sie vor dem Kauf der nächsten KI-Funktion, ob sie denselben Datensatz liest und schreibt wie alles andere, was Sie nutzen.',
    ],
    faq: [
      {
        q: 'Was bedeutet „KI-Infrastruktur“ für ein Maklerbüro?',
        a: 'Die Daten- und Ablaufebene unter jeder KI-Funktion: ein geprüfter Datensatz pro Immobilie, Interessent und Geschäft, die Regel, dass KI nur mit bestätigten Angaben arbeitet, und eine Spur von jedem erzeugten Ergebnis zurück zu dem Stand des Datensatzes, aus dem es entstanden ist.',
      },
      {
        q: 'Warum behebt ein weiteres KI-Tool die Datenzersplitterung nicht?',
        a: 'Ein angeschraubtes KI-Tool führt meist seine eigene Kopie des Kontexts, den es bekommt, und vergisst ihn danach. Ohne einen gemeinsamen Datensatz, aus dem es liest und in den es zurückschreibt, fügt jedes neue Tool nur eine weitere eigenständige, abdriftende Kopie der Wahrheit hinzu, statt die Zahl der vorhandenen zu verringern.',
      },
      {
        q: 'Wie setzt Immvela das in der Praxis um?',
        a: 'Ein geprüfter Datensatz pro Immobilie, aus dem alles, was Immvela tut, liest und in den es zurückschreibt. Erzeugte Texte verwenden nur Werte, die der Makler bestätigt hat, zu jedem bestätigten Wert ist festgehalten, wer ihn bestätigt hat und aus welchem Dokument er stammt, und nichts wird veröffentlicht, bevor ein Mensch es freigibt.',
      },
    ],
    cta: {
      heading: 'Unsicher, ob es ein Datenproblem oder ein Tool-Problem ist?',
      sub: 'Dreißig Minuten, kostenlos. Erzählen Sie uns, wie die Daten Ihres Teams tatsächlich fließen, und wir sagen Ihnen, wo sie brechen.',
      label: 'Kostenloses Erstgespräch buchen',
      href: contactHref('AI & IT Consulting'),
    },
  },
}
