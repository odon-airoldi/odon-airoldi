import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import { useAppContext } from "../contexts/AppContext"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// tempi in secondi
const START_DELAY = .4;     // attesa prima del primo passo
const STEP_DURATION = .6;   // durata di ogni passo
const STEP_GAP = .4;        // pausa tra un passo e l'altro

// le animazioni del logo. Il markup è il logo nella sua forma finale: ogni
// animazione dichiara da dove parte e come ci arriva.
// I pezzi si selezionano per classe (lo scope di useGSAP limita la ricerca a
// questo logo). Gli spostamenti sono su top, in percentuale del logo: 25% = una
// riga, cioè una unità, qualunque sia l'altezza del pezzo. "-=" sale, "+=" scende
const ANIMATIONS = {

    // splash: il logo si forma in 4 passi, con il nome che cambia insieme
    splash({ showName, onComplete }) {
        // partenza: barra in alto e centro della base una unità più in basso
        gsap.set(".item_t, .item_b", { top: "+=25%" });

        const tl = gsap.timeline({
            delay: START_DELAY,
            defaults: { duration: STEP_DURATION, ease: "power3.in" },
            onComplete() { onComplete?.(); },
        });

        // passo 1: tutto tranne la base sale di una unità
        tl.to(".item_l, .item_r, .item_t, .item_lt, .item_rt", { top: "-=25%" });
        if (showName) tl.to(".name_o", { yPercent: 0 }, "<");

        // passo 2: le colonne laterali scendono di una unità
        tl.to(".item_l, .item_r", { top: "+=25%" }, `+=${STEP_GAP}`);

        // passo 3: il centro della base risale di una unità e diventa la barra centrale
        tl.to(".item_b", { top: "-=25%" }, `+=${STEP_GAP}`);
        if (showName) {
            tl.to(".name_o", { yPercent: -100 }, "<");
            tl.to(".name_a", { yPercent: 0 }, "<");
        }

        // passo 4: i corners scendono di una unità e il logo è formato;
        // insieme, A esce e sale il nome completo
        tl.to(".item_lt, .item_rt", { top: "+=25%" }, `+=${STEP_GAP}`);
        if (showName) {
            tl.to(".name_a", { yPercent: -100 }, "<");
            tl.to(".name_full", { yPercent: 0 }, "<");
        }
    },

    // intro (home): barra in alto e centro della base salgono di una unità e
    // completano il logo. Parte dopo la splash, e riparte a ogni visita della home
    intro({ showSplash }) {
        gsap.set(".item_t, .item_b", { top: "+=25%" });
        if (showSplash) return;

        gsap.to(".item_t, .item_b", {
            top: "-=25%",
            delay: START_DELAY,
            duration: STEP_DURATION,
            ease: "power3.inOut",
        });
    },

    // scroll (cv): parte dal logo formato e, scorrendo verso il basso, barra in
    // alto e centro della base scendono di una unità in proporzione a quanto si
    // è scrollato (da inizio a fine pagina). Risalendo il movimento si inverte
    scroll() {
        gsap.to(".item_t, .item_b", {
            top: "+=25%",
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: true },
        });
    },
};

// variant: quale animazione usare, "splash" | "intro" | "scroll"
// showName: mostra sotto il logo il nome, che cambia insieme ai passi della splash
// onComplete: chiamata a logo formato nella splash, per sapere quando chiudersi
export default function AppLogo({ variant = "splash", showName = false, onComplete }) {
    const logoRef = useRef(null);
    const { showSplash } = useAppContext();

    useGSAP(() => {
        // nome sotto il logo: i testi sono sovrapposti dentro una maschera.
        // yPercent: 100 = nascosto sotto la riga, 0 = visibile, -100 = uscito sopra.
        // Nella splash partono tutti nascosti; nelle altre animazioni il logo
        // è già formato, quindi si vede direttamente il nome completo
        if (showName) {
            gsap.set(".name_o, .name_a", { yPercent: 100 });
            gsap.set(".name_full", { yPercent: variant === "splash" ? 100 : 0 });
        }

        ANIMATIONS[variant]({ showName, onComplete, showSplash });
    }, { scope: logoRef, dependencies: [variant, showName, showSplash], revertOnUpdate: true });

    return (

        // posizioni del logo formato
        <div ref={logoRef} className="@container aspect-2/1 w-full relative">
            <div className="bg-zinc-200 absolute left-0 top-1/4 w-1/8 h-3/4 item_l"></div>
            <div className="bg-zinc-200 absolute left-7/8 top-1/4 w-1/8 h-3/4 item_r"></div>
            <div className="bg-zinc-200 absolute left-2/8 top-0 w-4/8 h-1/4 item_t"></div>
            <div className="bg-zinc-200 absolute left-2/8 top-2/4 w-4/8 h-1/4 item_b"></div>
            <div className="bg-zinc-200 absolute left-1/8 top-1/4 w-1/8 h-1/4 item_lt"></div>
            <div className="bg-zinc-200 absolute left-6/8 top-1/4 w-1/8 h-1/4 item_rt"></div>
            <div className="bg-zinc-200 absolute left-1/8 top-3/4 w-1/8 h-1/4 item_bl"></div>
            <div className="bg-zinc-200 absolute left-6/8 top-3/4 w-1/8 h-1/4 item_br"></div>

            {/* overflow-hidden fa da maschera: i testi salgono da sotto la riga. grid con tutti nella stessa cella: stanno sovrapposti */}
            {showName && (
                <div className="absolute -bottom-2/4 inset-x-0 grid text-center uppercase font-[450] leading-none text-[10cqw] overflow-hidden">
                    <span className="col-start-1 row-start-1 name_o">O</span>
                    <span className="col-start-1 row-start-1 name_a">A</span>
                    <span className="col-start-1 row-start-1 name_full">Odon Airoldi</span>
                </div>
            )}
        </div>
    );
}
