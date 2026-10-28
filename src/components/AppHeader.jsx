import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin)

// due testi sovrapposti nella stessa cella (grid): con show il secondario sale dal
// basso e il primario esce salendo; tornando indietro fanno il percorso inverso.
// La cella è larga quanto il testo più lungo, così la voce non cambia larghezza.
// overflow-hidden nasconde quello fuori posto
function SwapText({ show, primary, secondary }) {
    const base = "col-start-1 row-start-1 transition-transform duration-500 ease-out"
    return (
        <span className="grid overflow-hidden">
            <span className={`${base} ${show ? "-translate-y-full" : "translate-y-0"}`} aria-hidden={show}>{primary}</span>
            <span className={`${base} ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>{secondary}</span>
        </span>
    )
}

export default function AppHeader() {

    const { pathname } = useLocation();

    // posizioni iniziali e sticky sono tutte in CSS (variabili --geo-* in App.css):
    // qui solo lo schiacciamento delle geometrie e il testo della voce About me
    const geoRef = useRef(null)
    const navRef = useRef(null)

    // spazio occupato in cima da geometrie e menu ancorati. Il blocco geometrie
    // resta alto come da aperte anche quando i box si schiacciano
    const stuckHeight = () => geoRef.current.offsetHeight + navRef.current.offsetHeight

    // schiacciamento legato allo scroll (scrub): --squash va da 0 (aperte) a 1
    // (box alti la metà). Parte quando il menu, in fondo al primo schermo, tocca le
    // geometrie, cioè dopo aver scrollato altezza schermo - geometrie - menu, e dura
    // quanto l'altezza delle geometrie: il menu le segue restando agganciato sotto
    useGSAP(() => {
        const start = () => window.innerHeight - stuckHeight()
        gsap.to(document.documentElement, {
            "--squash": 1,
            ease: "none",
            scrollTrigger: {
                start,
                end: () => start() + geoRef.current.offsetHeight,
                scrub: true,
                invalidateOnRefresh: true,
            },
        })
    })

    // true quando il testo di presentazione (#about) arriva sotto geometrie e menu
    const [aboutReached, setAboutReached] = useState(false)

    useEffect(() => {
        const check = () => {
            const about = document.getElementById("about")
            // Math.round: la posizione può avere decimali
            setAboutReached(!!about && Math.round(about.getBoundingClientRect().top) <= stuckHeight())
        }
        check()
        window.addEventListener("scroll", check)
        return () => window.removeEventListener("scroll", check)
    }, [])

    // ora corrente (ore:minuti), aggiornata ogni secondo così il cambio di minuto è puntuale
    const formatTime = () => new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
    const [time, setTime] = useState(formatTime)

    useEffect(() => {
        const interval = setInterval(() => setTime(formatTime()), 1000)
        return () => clearInterval(interval)
    }, [])

    // API key openweathermap
    const apiKey = import.meta.env.VITE_API_KEY_OWM
    const [dataWeather, setDataWeather] = useState({})
    // Chiamata AJAX tramite fetch API openweathermap: temperatura di Lecco
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lecco&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => {
                setDataWeather(data)
            })
    }, [apiKey])

    // la voce diventa Odon Airoldi quando si arriva al testo (aboutReached), ma al
    // click cambia subito, come Email me: aboutForced vale durante lo scorrimento
    // (true verso il testo, false verso la cima), poi torna null e decide lo scroll
    const [aboutForced, setAboutForced] = useState(null)
    const aboutOpen = aboutForced ?? aboutReached

    // scorre fino al testo di presentazione (#about in IndexPage), fermandosi
    // sotto geometrie e menu ancorati in cima, che altrimenti lo coprirebbero
    const handleAboutMe = () => {
        setAboutForced(true)
        // lo smooth del browser ha una velocità fissa: con GSAP si sceglie la durata
        gsap.to(window, { scrollTo: { y: "#about", offsetY: stuckHeight() }, duration: 1.5, ease: "power2.inOut", onComplete: () => setAboutForced(null) })
    }

    // torna in cima alla pagina, con la stessa durata di handleAboutMe
    const handleBackToTop = () => {
        setAboutForced(false)
        gsap.to(window, { scrollTo: 0, duration: 1.5, ease: "power2.inOut", onComplete: () => setAboutForced(null) })
    }

    // apre il pdf in una nuova scheda, nel lettore pdf del browser. Il file
    // sta in public/ (indirizzo fisso): quando il cv cambia va riesportato lì
    const handleGetCv = () => {
        window.open("/odon-airoldi-cv.pdf", "_blank");
    };

    const [copied, setCopied] = useState(false)

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('odon.airoldi@gmail.com')
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch { }
    }

    // box delle geometrie: alto --geo-box, fino alla metà man mano che --squash va
    // da 0 a 1. È un container (size): le barre verticali sono larghe 25cqh, 1/4
    // dell'altezza come le orizzontali (h-1/4), così lo spessore resta uguale in
    // tutte le direzioni anche da schiacciate
    const geoBoxClass = "relative [container-type:size] h-[calc(var(--geo-box)*(1-var(--squash)/2))]"

    // le parole .word-reveal (dentro i genitori .alive) sono animate da AppLayout, insieme a quelle
    // della pagina, così partono tutte in un'unica successione
    return (

        // l'header contiene solo il titolo. Geometrie e menu stanno fuori, direttamente
        // nel layout (alto quanto la pagina): uno sticky dentro l'header, alto meno di
        // uno schermo, si sgancerebbe appena l'header esce dallo schermo
        <>

            {/* titolo: alto mezzo schermo meno metà geometrie, così le geometrie partono centrate */}
            <header className="p-2 h-[calc(50svh-var(--geo-height)/2)]">
                <div className="text-[6vw] lg:text-[4vw] leading-[.8] font-[450] tracking-tighter uppercase">
                    <h1 className="alive overflow-hidden"><span className="word-reveal inline-block">Odon</span> <span className="word-reveal inline-block">Airoldi</span></h1>
                    <h2 className="alive overflow-hidden"><span className="word-reveal inline-block">fullstack</span> <span className="word-reveal inline-block">developer</span></h2>
                    <h3 className="alive overflow-hidden"><span className="word-reveal inline-block">design</span> <span className="word-reveal inline-block">minded</span></h3>
                </div>
            </header>


            {/* geometrie: partono dal centro e si fermano in cima. Altezza fissa: quando i
                box si schiacciano il blocco non si accorcia e la pagina sotto non si sposta.
                Gradiente: pieno fino a metà, zinc-950 al 70% di opacità all'80% (dove finisce il
                menu agganciato), poi trasparente */}
            <div ref={geoRef} className="sticky top-0 z-10 h-(--geo-height)">
                <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-2">
                    <div className={geoBoxClass}>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-0 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-[25cqh] left-0 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-8/16 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-[25cqh] right-0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-8/16 top-3/4"></div>
                    </div>
                    <div className={geoBoxClass}>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-0 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-[25cqh] left-0 top-1/2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-0 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-4/16 top-0"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-4/16 top-1/2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-12/16 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-[25cqh] right-0 top-1/2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-12/16 top-3/4"></div>
                    </div>
                    <div className={geoBoxClass}>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-4/16 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-8/16 left-4/16 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] left-0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-0/16 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] right-0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/16 left-12/16 top-1/4"></div>
                    </div>
                </div>
            </div>

            {/* menu: mt lo porta in fondo al primo schermo (alto 1lh + pb-2); sale con lo
                scroll e si ferma sotto le geometrie, seguendole mentre si schiacciano.
                Mobile: 3 colonne uguali, voci a sinistra, al centro e a destra (justify-self),
                così non si spostano quando cambia il testo; da md la griglia a 12 colonne. Stile del testo qui, ereditato dalle voci. [&_button]:uppercase: il reset di
                Tailwind mette text-transform: none sui button, che quindi non lo ereditano */}
            <nav ref={navRef} className="sticky z-10 top-[calc(var(--geo-height)-var(--geo-box)*var(--squash)/2)] mt-[calc(50svh-var(--geo-height)/2-1lh-0.5rem)] px-2 pb-2 grid grid-cols-3 md:grid-cols-12 font-stretch-[125%] text-xs md:text-sm xl:text-base font-extralight leading-none tracking-wide uppercase [&_button]:uppercase bg-zinc-950">

                <div className="md:col-span-4 max-md:hidden">
                    <div className="alive overflow-hidden">
                        <span className="word-reveal block">{time}</span>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <button className="alive overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={aboutOpen ? handleBackToTop : handleAboutMe}>
                        <span className="word-reveal block"><SwapText show={aboutOpen} primary="About me" secondary="Odon Airoldi" /></span>
                    </button>
                </div>

                <div className="justify-self-center md:justify-self-auto md:col-span-2">
                    <button className="alive overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={handleCopyEmail}>
                        <span className="word-reveal block"><SwapText show={copied} primary="Email me" secondary="Copied" /></span>
                    </button>
                </div>

                <div className="justify-self-end md:justify-self-auto md:col-span-2">
                    <button className="alive overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={handleGetCv}>
                        <span className="word-reveal block">Get CV</span>
                    </button>
                </div>

                <div className="md:col-span-1 max-md:hidden text-right">
                    <div className="alive overflow-hidden">
                        <span className="word-reveal block">LC {dataWeather.name && <span>{Math.round(dataWeather.main?.temp)}°C</span>}</span>
                    </div>
                </div>

            </nav>
        </>
    )
}
