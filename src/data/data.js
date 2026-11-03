// Nei progetti di graphic design prendono forma le mie prime competenze nello sviluppo web, poi coltivate nelle esperienze professionali e consolidate attraverso un percorso formativo full-stack. Metodo progettuale e sensibilità visiva accompagnano oggi il mio lavoro da sviluppatore.
const introText = `
Web developer con un background nel graphic design. Sviluppo applicazioni web modulari e scalabili, curando layout ed esperienza utente. Competenze sviluppate nelle esperienze professionali su progetti reali e consolidate con un percorso formativo full-stack. Oggi seguo ogni progetto da due punti di vista, come funziona e come si vede, unendo logica e design in un unico processo.
`;

const stack = [
    {
        id: 1,
        type: "front-end",
        title: "HTML"
    },
    {
        id: 2,
        type: "front-end",
        title: "CSS"
    },
    {
        id: 3,
        type: "front-end",
        title: "JavaScript"
    },
    {
        id: 4,
        type: "front-end",
        title: "React"
    },
    {
        id: 5,
        type: "front-end",
        title: "Tailwind"
    },
    {
        id: 6,
        type: "front-end",
        title: "Bootstrap"
    },
    {
        id: 7,
        type: "front-end",
        title: "Vite"
    },
    {
        id: 8,
        type: "back-end",
        title: "Node"
    },
    {
        id: 9,
        type: "back-end",
        title: "Express"
    },
    {
        id: 10,
        type: "back-end",
        title: "PHP"
    },
    {
        id: 11,
        type: "back-end",
        title: "Laravel"
    },
    {
        id: 12,
        type: "back-end",
        title: "REST API"
    },
    {
        id: 13,
        type: "database",
        title: "MySQL"
    },
    {
        id: 14,
        type: "database",
        title: "SQLite"
    },
    {
        id: 15,
        type: "CMS",
        title: "WordPress"
    },
    {
        id: 16,
        type: "CMS",
        title: "WooCommerce"
    },
    {
        id: 17,
        type: "CMS",
        title: "nopCommerce"
    },
    {
        id: 18,
        type: "tool",
        title: "Git"
    },
    {
        id: 19,
        type: "tool",
        title: "GitHub"
    },
    {
        id: 20,
        type: "tool",
        title: "npm"
    },
    {
        id: 21,
        type: "tool",
        title: "FTP"
    },
    {
        id: 22,
        type: "design",
        title: "Illustrator"
    },
    {
        id: 23,
        type: "design",
        title: "InDesign"
    },
    {
        id: 24,
        type: "design",
        title: "Photoshop"
    }
]

const experience = [
    {
        id: 1,
        organization: "Tuttocialde",
        focus: ["Front-end developer", "Graphic designer"],
        description: "Ho sviluppato e mantenuto il front-end degli e-commerce Tuttocialde, Caffè Agostani e Cialda Mia, occupandomi degli aggiornamenti di cataloghi e promozioni. Ho realizzato i template per le dem promozionali e curato materiali di comunicazione, packaging e identità visiva dei marchi. Come unico referente interno per queste attività, ho gestito il lavoro in autonomia, coordinando esigenze digitali e grafiche.",
        location: "Molteno",
        year_start: 2022,
        year_end: 2025
    },
    {
        id: 2,
        organization: "Studiolabo",
        focus: ["Front-end developer"],
        description: "Ho sviluppato in front-end le interfacce progettate dal designer interno e contribuito alla manutenzione e all’evoluzione di siti ad alto traffico, tra cui Fuorisalone e Policlinico di Milano. Ho collaborato con sviluppatori senior su repository condivise, utilizzando Git per il versionamento del codice. L’esperienza mi ha permesso di consolidare le pratiche di sviluppo in team e l’utilizzo di framework CSS e JavaScript.",
        location: "Milano",
        year_start: 2020,
        year_end: 2022
    },
    {
        id: 3,
        organization: "Ardesia Studio",
        focus: ["Graphic designer", "Co-founder"],
        description: "Ho realizzato progetti di comunicazione visiva, con particolare attenzione a branding e packaging, seguendo il confronto con i clienti, le revisioni e la preparazione dei materiali per la stampa. Ho inoltre progettato e sviluppato siti WordPress, gestendo le attività dalla definizione del progetto alla realizzazione. Ho maturato esperienza trasversale tra sviluppo web, organizzazione del lavoro e gestione delle richieste del cliente.",
        location: "Bergamo",
        year_start: 2014,
        year_end: 2019
    },
    {
        id: 4,
        organization: "Office Milano",
        focus: ["Graphic designer"],
        description: "Ho supportato la realizzazione di progetti grafici, occupandomi dell’adattamento di layout, della preparazione di materiali per la stampa e della creazione di illustrazioni vettoriali.",
        location: "Milano",
        year_start: 2012,
        year_end: 2012
    },
    {
        id: 5,
        organization: "Oikos",
        focus: ["Graphic designer"],
        description: "Ho collaborato alla produzione di materiali grafici e fotografici per la comunicazione dei prodotti, preparando contenuti visivi e supportando l’allestimento dei set fotografici.",
        location: "Monza",
        year_start: 2011,
        year_end: 2011
    },
]

const education = [
    {
        id: 1,
        organization: "Boolean",
        focus: ["Web Development"],
        description: "Tech academy",
        location: "Online",
        year_start: 2026,
        year_end: 2026
    },
    {
        id: 2,
        organization: "Isgmd",
        focus: ["Graphic Design"],
        description: "Design academy",
        location: "Lecco",
        year_start: 2010,
        year_end: 2012
    },
    {
        id: 3,
        organization: "Brera",
        focus: ["Scultura"],
        description: "Accademia di belle arti",
        location: "Milano",
        year_start: 2007,
        year_end: 2009
    },
    // {
    //     id: 4,
    //     organization: "Liceo Artistico",
    //     focus: ["Architettura"],
    //     location: "Lecco",
    //     year_start: 2002,
    //     year_end: 2006
    // },
]

export { introText, stack, education, experience }
