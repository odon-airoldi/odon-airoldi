import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { useAppContext } from "../contexts/AppContext"

gsap.registerPlugin(useGSAP)

// il logo è una griglia di 8×4 unità, fatta di quadratini da 1 unità.
// data-group dice in quali passi dell'animazione si muove ogni quadratino
// (può averne più di uno, es. "1 3"). Le posizioni nel CSS sono quelle di
// partenza; alla fine dell'animazione formano il logo
const PIECES = [
    // riga 0
    { col: 0, row: 0, group: "2" },
    { col: 1, row: 0, group: "4" },
    { col: 2, row: 0 },
    { col: 3, row: 0 },
    { col: 4, row: 0 },
    { col: 5, row: 0 },
    { col: 6, row: 0, group: "4" },
    { col: 7, row: 0, group: "2" },
    // riga 1
    { col: 0, row: 1, group: "2" },
    { col: 7, row: 1, group: "2" },
    // riga 2
    { col: 0, row: 2, group: "2" },
    { col: 7, row: 2, group: "2" },
    { col: 1, row: 2, group: "1" },
    { col: 2, row: 2, group: "1 3" },
    { col: 3, row: 2, group: "1 3" },
    { col: 4, row: 2, group: "1 3" },
    { col: 5, row: 2, group: "1 3" },
    { col: 6, row: 2, group: "1" },
];

// waitForSplash: di default il logo aspetta la fine della splash (es. nel
// footer). Dentro la splash stessa va passato false, altrimenti non partirebbe
// mai: lì showSplash resta true finché la splash non viene rimossa.
// onProgress(0→1) e onComplete: avanzamento e fine dell'animazione, usati dalla
// splash per il contatore e per sapere quando chiudersi
export default function AppLogo({ waitForSplash = true, onProgress, onComplete }) {
    const logoRef = useRef(null);
    const { showSplash } = useAppContext();
    const waiting = waitForSplash && showSplash;

    useGSAP(() => {
        // quadratini di un passo: [data-group~="1"] trova "1" anche dentro "1 3"
        const group = (name) => logoRef.current.querySelectorAll(`[data-group~="${name}"]`);

        // finché aspetta la splash il logo resta invisibile, poi parte l'animazione
        gsap.set(logoRef.current.children, { opacity: waiting ? 0 : 1 });
        if (waiting) return;

        // yPercent: 100 = un quadratino, cioè una unità. "+=" e "-=" sommano allo
        // spostamento già fatto (i "1 3" scendono nel passo 1 e risalgono nel 3)
        // STEP_DURATION: durata di ogni passo, STEP_GAP: pausa tra un passo e l'altro
        const STEP_DURATION = .9;
        const STEP_GAP = .2;
        const step = { duration: STEP_DURATION, ease: "power4.inOut" };
        const tl = gsap.timeline({
            delay: .2,
            onUpdate() { onProgress?.(this.progress()); },
            onComplete() { onComplete?.(); },
        });

        // passo 1: i quadratini 1 scendono di una unità
        tl.to(group("1"), { yPercent: "+=100", ...step });

        // passo 2: i 2 scendono di una unità
        tl.to(group("2"), { yPercent: "+=100", ...step }, `+=${STEP_GAP}`);

        // passo 3: i 3 risalgono di una unità
        tl.to(group("3"), { yPercent: "-=100", ...step }, `+=${STEP_GAP}`);

        // passo 4: i 4 scendono di una unità e il logo è formato
        tl.to(group("4"), { yPercent: "+=100", ...step }, `+=${STEP_GAP}`);

        return () => tl.kill();
    }, { scope: logoRef, dependencies: [waiting] });

    /* animazione precedente: 8 pezzi che partono da un quadrato 3×3 e si allargano.
       Per ripristinarla, sostituisci con questo il contenuto di useGSAP qui sopra
       e il markup in fondo al file con quello commentato lì

    useGSAP(() => {
        const [d1, d2, d3, d4, d5, d6, d7, d8] = logoRef.current.children;

        // il logo è una griglia di 8×4 unità quadrate (aspect 2/1): u è il lato di
        // un'unità in pixel, ricavato dalla larghezza reale del contenitore
        const u = logoRef.current.offsetWidth / 8;

        // sqX/sqY: posizione di partenza nel quadrato 3×3, w: larghezza finale
        const items = [
            { el: d1, sqX: 2, sqY: 0, w: 2 },
            { el: d2, sqX: 2.5, sqY: 0, w: 1 },
            { el: d3, sqX: 2, sqY: 0, w: 2 },
            { el: d4, sqX: 0, sqY: 1, w: 4 },
            { el: d5, sqX: 0, sqY: 1, w: 4 },
            { el: d6, sqX: -2, sqY: 0, w: 2 },
            { el: d7, sqX: -2.5, sqY: 0, w: 1 },
            { el: d8, sqX: -2, sqY: 0, w: 2 },
        ];

        items.forEach(({ el, sqX, sqY, w }) =>
            gsap.set(el, { x: sqX * u, y: sqY * u, scaleX: 1 / w, transformOrigin: 'center center', opacity: showSplash ? 0 : 1 })
        );

        if (showSplash) return;

        const tl = gsap.timeline({ delay: .2 });

        // passo 1: angoli e lati verso l'esterno, i pezzi si allargano
        tl.to([d1, d3, d6, d8], { x: 0, scaleX: 1, duration: .6, ease: "power4.inOut" }, 0);
        tl.to([d2, d7], { x: 0, duration: .6, ease: "power4.inOut" }, 0);
        tl.to([d4, d5], { scaleX: 1, duration: .6, ease: "power4.inOut" }, 0);

        // passo 2: i due pezzi centrali salgono di una unità
        tl.to([d4, d5], { y: 0, duration: .8, ease: "power4.inOut", delay: .2 });

        return () => tl.kill();
    }, { scope: logoRef, dependencies: [showSplash] });
    */

    return (

        <div ref={logoRef} className="aspect-2/1 w-full relative">
            {PIECES.map(({ col, row, group }) => (
                <div
                    key={`${col}-${row}`}
                    data-group={group}
                    className="bg-zinc-200 absolute w-1/8 h-1/4"
                    style={{ left: `${col * 12.5}%`, top: `${row * 25}%` }}
                />
            ))}
        </div>

        /* markup dell'animazione precedente
        <div ref={logoRef} className="aspect-2/1 w-full relative">
            <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-0 top-1/4"></div>
            <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0 top-1/2"></div>
            <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-0 top-3/4"></div>

            <div className="bg-zinc-200 absolute h-1/4 w-4/8 left-2/8 top-0"></div>
            <div className="bg-zinc-200 absolute h-1/4 w-4/8 left-2/8 top-1/2"></div>

            <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-6/8 top-1/4"></div>
            <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-1/2"></div>
            <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-6/8 top-3/4"></div>
        </div>
        */

    );
}
