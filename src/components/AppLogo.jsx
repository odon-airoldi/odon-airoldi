import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

// tempi in secondi
const START_DELAY = .4;     // attesa prima del primo passo
const STEP_DURATION = .6;   // durata di ogni passo
const STEP_GAP = .4;        // pausa tra un passo e l'altro

// animated: con false il logo compare già formato, senza animazione (es. nel footer)
// showName: mostra sotto il logo il nome, che cambia insieme ai passi
// onComplete: chiamata a logo formato, usata dalla splash per sapere quando chiudersi
export default function AppLogo({ animated = true, showName = false, onComplete }) {
    const logoRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: START_DELAY,
            defaults: { duration: STEP_DURATION, ease: "power3.in" },
            onComplete() { onComplete?.(); },
        });

        // nome sotto il logo: i testi sono sovrapposti dentro una maschera, e si
        // muovono insieme ai passi ("<" = nello stesso momento del passo).
        // yPercent: 100 = nascosto sotto la riga, 0 = visibile, -100 = uscito sopra
        if (showName) gsap.set(".name_o, .name_a, .name_full", { yPercent: 100 });

        // i pezzi si selezionano per classe (vedi il markup): lo scope di useGSAP
        // limita la ricerca a questo logo.
        // Gli spostamenti sono su top, in percentuale del logo: 25% = una riga,
        // cioè una unità, qualunque sia l'altezza del pezzo. "-=" sale, "+=" scende

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

        // senza animazione: la timeline salta subito alla fine, il logo è già formato
        if (!animated) tl.progress(1, true);

        return () => tl.kill();
    }, { scope: logoRef, dependencies: [animated, showName] });

    return (

        <div ref={logoRef} className="@container aspect-2/1 w-full relative">
            <div className="bg-zinc-200 absolute left-0 top-1/4 w-1/8 h-3/4 item_l"></div>
            <div className="bg-zinc-200 absolute left-7/8 top-1/4 w-1/8 h-3/4 item_r"></div>
            <div className="bg-zinc-200 absolute left-2/8 top-1/4 w-4/8 h-1/4 item_t"></div>
            <div className="bg-zinc-200 absolute left-2/8 top-3/4 w-4/8 h-1/4 item_b"></div>
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
