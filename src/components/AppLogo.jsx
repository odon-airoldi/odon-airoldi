import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { useAppContext } from "../contexts/AppContext"

gsap.registerPlugin(useGSAP)

// tempi in secondi
const START_DELAY = .4;     // attesa prima del primo passo
const STEP_DURATION = .6;   // durata di ogni passo
const STEP_GAP = .4;        // pausa tra un passo e l'altro

// waitForSplash: di default il logo aspetta la fine della splash (es. nel
// footer). Dentro la splash stessa va passato false, altrimenti non partirebbe
// mai: lì showSplash resta true finché la splash non viene rimossa.
// onProgress(0→1), onStep(n) e onComplete: avanzamento, inizio di ogni passo e
// fine dell'animazione, usati dalla splash per il contatore, il testo sotto il
// logo e per sapere quando chiudersi
export default function AppLogo({ waitForSplash = true, onProgress, onStep, onComplete }) {
    const logoRef = useRef(null);
    const { showSplash } = useAppContext();
    const waiting = waitForSplash && showSplash;

    useGSAP(() => {
        // i pezzi del logo, nello stesso ordine del markup qui sotto
        const [leftSide, rightSide, topBar, leftCorner, rightCorner, baseCenter] = logoRef.current.children;

        // finché aspetta la splash il logo resta invisibile, poi parte l'animazione
        gsap.set(logoRef.current.children, { opacity: waiting ? 0 : 1 });
        if (waiting) return;

        const tl = gsap.timeline({
            delay: START_DELAY,
            defaults: { duration: STEP_DURATION, ease: "power3.in" },
            onUpdate() { onProgress?.(this.progress()); },
            onComplete() { onComplete?.(); },
        });

        // gli spostamenti sono su top, in percentuale del logo: 25% = una riga,
        // cioè una unità, qualunque sia l'altezza del pezzo. "-=" sale, "+=" scende

        // passo 1: tutto tranne la base sale di una unità
        tl.to([leftSide, rightSide, topBar, leftCorner, rightCorner], { top: "-=25%", onStart: () => onStep?.(1) });

        // passo 2: le colonne laterali scendono di una unità
        tl.to([leftSide, rightSide], { top: "+=25%", onStart: () => onStep?.(2) }, `+=${STEP_GAP}`);

        // passo 3: il centro della base risale di una unità e diventa la barra centrale
        tl.to(baseCenter, { top: "-=25%", onStart: () => onStep?.(3) }, `+=${STEP_GAP}`);

        // passo 4: i corners scendono di una unità e il logo è formato
        tl.to([leftCorner, rightCorner], { top: "+=25%", onStart: () => onStep?.(4) }, `+=${STEP_GAP}`);

        return () => tl.kill();
    }, { scope: logoRef, dependencies: [waiting] });

    return (

        <div ref={logoRef} className="aspect-2/1 w-full relative">
            {/* posizioni di partenza, appoggiate alla base del logo (righe 1-3).
                Le estremità della base non si muovono mai */}
            <div className="bg-zinc-200 absolute left-0   top-1/4 w-1/8 h-3/4"></div>   {/* leftSide */}
            <div className="bg-zinc-200 absolute left-7/8 top-1/4 w-1/8 h-3/4"></div>   {/* rightSide */}
            <div className="bg-zinc-200 absolute left-2/8 top-1/4 w-4/8 h-1/4"></div>   {/* topBar */}
            <div className="bg-zinc-200 absolute left-1/8 top-1/4 w-1/8 h-1/4"></div>   {/* leftCorner */}
            <div className="bg-zinc-200 absolute left-6/8 top-1/4 w-1/8 h-1/4"></div>   {/* rightCorner */}
            <div className="bg-zinc-200 absolute left-2/8 top-3/4 w-4/8 h-1/4"></div>   {/* baseCenter */}
            <div className="bg-zinc-200 absolute left-1/8 top-3/4 w-1/8 h-1/4"></div>   {/* baseLeft */}
            <div className="bg-zinc-200 absolute left-6/8 top-3/4 w-1/8 h-1/4"></div>   {/* baseRight */}
        </div>
    );
}
