import { gsap } from "gsap"
import { useState, useEffect, useRef } from "react"
import AppLogo from "./AppLogo"

export default function AppIntro({ worksReady, onClose }) {
    const containerRef = useRef(null);

    // true quando l'animazione del logo è finita
    const [logoDone, setLogoDone] = useState(false);

    // la splash sparisce quando logo e dati sono entrambi pronti, in qualunque ordine arrivino.
    // L'effetto si riesegue a ogni cambio di logoDone o worksReady: parte solo quando li trova tutti e due a true.
    // Se i dati arrivano prima (il caso normale) il fade segue il logo; se tardano, il logo resta formato e aspetta
    useEffect(() => {
        // uno dei due non è ancora pronto: per ora non fare nulla
        if (!logoDone || !worksReady) return;

        gsap.to(containerRef.current, {
            opacity: 0,
            delay: .6, // delay dopo che il logo è formato
            duration: 1,
            ease: "power1.out",
            onComplete: onClose,
        });

    }, [worksReady, logoDone])

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-zinc-950 text-zinc-200 font-zalando font-stretch-[125%]">

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 sm:w-64 mx-auto">
                    {/* il logo segnala solo di aver finito: il fade lo decide l'effetto qui sopra */}
                    <AppLogo variant="splash" showName onFormed={() => setLogoDone(true)} />
                </div>
            </div>

        </div>
    );
}
