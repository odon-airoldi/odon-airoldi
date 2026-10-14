import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"

gsap.registerPlugin(useGSAP)

// tempi in secondi
const START_DELAY = .4;     // attesa prima del primo passo
const STEP_DURATION = .6;   // durata di ogni passo
const STEP_GAP = .4;        // pausa tra un passo e l'altro

// nome sotto il logo (con showName): cambia all'inizio di alcuni passi e a logo
// formato diventa il nome completo
const NAME = "Odon Airoldi";
const STEP_NAMES = { 2: "O", 3: "A" };

// animated: con false il logo compare già formato, senza animazione (es. nel footer)
// showName: mostra il nome sotto il logo, che segue i passi dell'animazione
// onComplete: chiamata a logo formato, usata dalla splash per sapere quando chiudersi
export default function AppLogo({ animated = true, showName = false, onComplete }) {
    const logoRef = useRef(null);
    // senza animazione il logo è già formato, quindi il nome è già completo
    const [name, setName] = useState(animated ? "" : NAME);

    // all'inizio di un passo mostra il suo nome, se ne ha uno
    const showStepName = (step) => {
        if (STEP_NAMES[step]) setName(STEP_NAMES[step]);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: START_DELAY,
            defaults: { duration: STEP_DURATION, ease: "power3.in" },
            onComplete() {
                setName(NAME);
                onComplete?.();
            },
        });

        // i pezzi si selezionano per classe (vedi il markup): lo scope di useGSAP
        // limita la ricerca a questo logo.
        // Gli spostamenti sono su top, in percentuale del logo: 25% = una riga,
        // cioè una unità, qualunque sia l'altezza del pezzo. "-=" sale, "+=" scende

        // passo 1: tutto tranne la base sale di una unità
        tl.to(".item_l, .item_r, .item_t, .item_lt, .item_rt", { top: "-=25%", onStart: () => showStepName(1) });

        // passo 2: le colonne laterali scendono di una unità
        tl.to(".item_l, .item_r", { top: "+=25%", onStart: () => showStepName(2) }, `+=${STEP_GAP}`);

        // passo 3: il centro della base risale di una unità e diventa la barra centrale
        tl.to(".item_b", { top: "-=25%", onStart: () => showStepName(3) }, `+=${STEP_GAP}`);

        // passo 4: i corners scendono di una unità e il logo è formato
        tl.to(".item_lt, .item_rt", { top: "+=25%", onStart: () => showStepName(4) }, `+=${STEP_GAP}`);

        // senza animazione: la timeline salta subito alla fine, il logo è già formato
        if (!animated) tl.progress(1, true);

        return () => tl.kill();
    }, { scope: logoRef, dependencies: [animated] });

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

            {showName && <div className="absolute -bottom-2/4 inset-x-0 text-center uppercase font-[450] leading-none text-[10cqw]">{name}</div>}
        </div>
    );
}
