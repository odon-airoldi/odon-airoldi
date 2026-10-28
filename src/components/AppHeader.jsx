import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

// due testi sovrapposti nella stessa cella (grid): con show il secondario sale dal
// basso e il primario esce salendo; tornando indietro fanno il percorso inverso.
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

    // geometrie al centro e menu in fondo al primo schermo; scrollando le geometrie
    // si ancorano in cima, il menu sale e quando le raggiunge le schiaccia insieme
    // allo scroll (squash: 0 aperte, 1 alte la metà) restando agganciato sotto.
    // Tutto si calcola in update(), a ogni scroll e resize
    const geoRef = useRef(null)
    const navRef = useRef(null)
    const spacerRef = useRef(null)
    const titleRef = useRef(null)
    // true quando il testo di presentazione (#about) arriva sotto il menu
    const [aboutReached, setAboutReached] = useState(false)

    // misure che non dipendono dallo scroll (cambiano solo con la larghezza)
    const getSizes = () => {
        const box = geoRef.current.querySelector(".geo-box")
        // box aperto: largo 4 volte l'altezza (aspect 4/1)
        const openBox = box.offsetWidth / 4
        // padding del blocco geometrie (tutto tranne il box)
        const padding = geoRef.current.offsetHeight - box.offsetHeight
        return { openBox, padding, open: padding + openBox, nav: navRef.current.offsetHeight }
    }

    // useLayoutEffect: la prima volta gira prima che il browser disegni, senza salti
    useLayoutEffect(() => {
        const update = () => {
            const { openBox, padding, open, nav } = getSizes()

            // titolo alto mezzo schermo meno metà geometrie aperte: le centra
            titleRef.current.style.height = `calc(50svh - ${open / 2}px)`

            // posizione a schermo del menu se non fosse sticky: il fondo dello spazio
            // qui sotto. Non cambia con lo schiacciamento, che lo spazio compensa
            const natural = spacerRef.current.getBoundingClientRect().bottom
            // quanto il menu è salito oltre le geometrie aperte, su quanto si
            // schiacciano al massimo (metà box): da 0 a 1
            const squash = gsap.utils.clamp(0, 1, (open - natural) / (openBox / 2))
            const current = padding + openBox * (1 - squash / 2)

            // i box leggono --squash nella loro altezza (vedi geoBoxClass)
            geoRef.current.style.setProperty("--squash", squash)
            // menu agganciato subito sotto le geometrie, qualunque sia la loro altezza
            navRef.current.style.top = `${current}px`
            // lo spazio cresce di quanto le geometrie si accorciano: menu e pagina
            // sotto non si spostano mentre si schiacciano
            spacerRef.current.style.height = `calc(50svh + ${open / 2 - nav - current}px)`

            // Math.round: la posizione può avere decimali
            const about = document.getElementById("about")
            setAboutReached(!!about && Math.round(about.getBoundingClientRect().top) <= Math.round(navRef.current.getBoundingClientRect().bottom))
        }
        // al montaggio e al resize due volte: la prima imposta titolo e spazio,
        // la seconda calcola lo schiacciamento con le loro altezze già corrette
        const updateTwice = () => { update(); update() }
        updateTwice()
        window.addEventListener("scroll", update)
        window.addEventListener("resize", updateTwice)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", updateTwice)
        }
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
        const about = document.getElementById("about")
        // arrivati lì le geometrie sono schiacciate: alte padding + metà box
        const { openBox, padding, nav } = getSizes()
        const top = about.getBoundingClientRect().top + window.scrollY - (padding + openBox / 2) - nav
        // lo smooth del browser ha una velocità fissa: con GSAP si sceglie la durata
        setAboutForced(true)
        gsap.to(window, { scrollTo: top, duration: 1.5, ease: "power2.inOut", onComplete: () => setAboutForced(null) })
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

    // box delle geometrie: alto 1/4 della sua larghezza (3 box, gap-2 = 1rem in tutto),
    // fino alla metà man mano che --squash va da 0 a 1. È un container (size): le barre verticali
    // sono larghe 25cqh, 1/4 dell'altezza come le orizzontali (h-1/4), così lo
    // spessore resta uguale in tutte le direzioni anche da schiacciate
    const geoBoxClass = "geo-box relative [container-type:size] h-[calc((100cqw-1rem)/12*(1-var(--squash,0)/2))]"

    // le parole .word-reveal (dentro i genitori .alive) sono animate da AppLayout, insieme a quelle
    // della pagina, così partono tutte in un'unica successione
    return (

        // contents: l'header non crea un suo box, quindi gli sticky qui sotto non restano
        // chiusi in uno schermo ma valgono per tutto il layout, alto quanto la pagina
        <header className="contents">

            {/* titolo: alto mezzo schermo meno metà geometrie, così le geometrie partono centrate */}
            <div className="p-2" ref={titleRef}>
                <div className="text-[6vw] lg:text-[4vw] leading-[.8] font-[450] tracking-tighter uppercase">
                    <h1 className="alive overflow-hidden"><span className="word-reveal inline-block">Odon</span> <span className="word-reveal inline-block">Airoldi</span></h1>
                    <h2 className="alive overflow-hidden"><span className="word-reveal inline-block">fullstack</span> <span className="word-reveal inline-block">developer</span></h2>
                    <h3 className="alive overflow-hidden"><span className="word-reveal inline-block">design</span> <span className="word-reveal inline-block">minded</span></h3>
                </div>
            </div>


            {/* geometrie: partono dal centro e si fermano in cima */}
            <div ref={geoRef} className="sticky top-0 z-10 p-2">
                {/* @container: i box calcolano la loro altezza dalla larghezza della griglia (cqw) */}
                <div className="@container grid grid-cols-3 gap-2">
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

            {/* spazio tra geometrie e menu: porta il menu in fondo al primo schermo */}
            {/* altezza impostata da update() */}
            <div ref={spacerRef}></div>

            {/* menu: sale con lo scroll e si ferma sotto le geometrie (top = loro altezza) */}
            {/* stile del testo qui, ereditato dalle voci. [&_button]:uppercase: il reset di
                Tailwind mette text-transform: none sui button, che quindi non lo ereditano */}
            {/* top impostato da update(): l'altezza attuale delle geometrie */}
            <nav ref={navRef} className="sticky z-10 px-2 pb-2 grid grid-cols-12 font-stretch-[125%] text-xs md:text-sm xl:text-base font-extralight leading-none tracking-wide uppercase [&_button]:uppercase">

                <div className="md:col-span-4 max-md:hidden">
                    <div className="alive overflow-hidden">
                        <span className="word-reveal block">{time}</span>
                    </div>
                </div>

                <div className="col-span-4 md:col-span-3">
                    <button className="alive overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={aboutOpen ? handleBackToTop : handleAboutMe}>
                        <span className="word-reveal block"><SwapText show={aboutOpen} primary="About me" secondary="Odon Airoldi" /></span>
                    </button>
                </div>

                <div className="col-span-4 md:col-span-2">
                    <button className="alive overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={handleCopyEmail}>
                        <span className="word-reveal block"><SwapText show={copied} primary="Email me" secondary="Copied" /></span>
                    </button>
                </div>

                <div className="col-span-4 md:col-span-2">
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
        </header>
    )
}
