import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

// tempi in secondi
const START_DELAY = .2;     // attesa prima dell'animazione
const STEP_DURATION = .6;   // durata dell'animazione

// le animazioni del logo. Il markup è il logo nella sua forma finale: ogni
// animazione dichiara da dove parte e come ci arriva.
// I pezzi si selezionano per classe (lo scope di useGSAP limita la ricerca a
// questo logo). Gli spostamenti sono su top, in percentuale del logo: 25% = una
// riga, cioè una unità, qualunque sia l'altezza del pezzo. "-=" sale, "+=" scende
const ANIMATIONS = {

    // intro: barra in alto e centro della base salgono di una unità e completano il logo
    intro() {
        gsap.set(".item_t, .item_b", { top: "+=25%" });

        gsap.to(".item_t, .item_b", {
            top: "-=25%",
            delay: START_DELAY,
            duration: STEP_DURATION,
            ease: "power3.inOut",
        });
    },
};

// variant: quale animazione usare (per ora solo "intro")
export default function AppLogo({ variant = "intro" }) {
    const logoRef = useRef(null);

    useGSAP(() => {
        ANIMATIONS[variant]();
    }, { scope: logoRef, dependencies: [variant], revertOnUpdate: true });

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
        </div>
    );
}
