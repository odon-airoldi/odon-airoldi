import { gsap } from "gsap"
import { useRef, useState } from "react"
import AppLogo from "./AppLogo"

export default function AppIntro({ onDone }) {
    const containerRef = useRef(null);
    const counterRef = useRef(null);

    // la splash segue l'animazione del logo: il contatore ne mostra
    // l'avanzamento e, quando il logo è formato, la splash resta ferma HOLD
    // secondi e poi sparisce in un secondo. Cambiando i tempi del logo, la
    // splash si adatta
    // testo sotto il logo: cambia all'inizio di alcuni passi, e alla fine
    // mostra il nome completo
    const STEP_LABELS = { 2: "O", 3: "A" };
    const [label, setLabel] = useState("");

    const handleLogoStep = (step) => {
        if (STEP_LABELS[step]) setLabel(STEP_LABELS[step]);
    };

    const handleLogoProgress = (progress) => {
        counterRef.current.textContent = Math.round(progress * 100);
    };

    // a logo formato aspetta HOLD secondi, poi la splash svanisce
    const HOLD = 1;
    const handleLogoComplete = () => {
        setLabel("Odon Airoldi");
        gsap.to(containerRef.current, {
            opacity: 0,
            delay: HOLD,
            duration: 1,
            ease: "power1.out",
            onComplete: onDone,
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-zinc-950 text-zinc-200 font-zalando font-stretch-[117.5%]">

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-[240px] mx-auto">
                    <AppLogo waitForSplash={false} onProgress={handleLogoProgress} onStep={handleLogoStep} onComplete={handleLogoComplete} />
                    {/* altezza fissa: lo spazio resta riservato anche quando il testo è vuoto,
                        così il logo non si sposta quando compare */}
                    <div className="mt-6 h-6 leading-6 font-extralight text-xl uppercase tracking-wide text-center">
                        {label}
                    </div>
                </div>
            </div>

            <div className="absolute top-4 left-4 font-extralight text-xl text-center">
                <span ref={counterRef} className="tracking-[1em]">0</span>%
            </div>

        </div>
    );
}
