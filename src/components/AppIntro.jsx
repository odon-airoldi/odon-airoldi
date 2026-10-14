import { gsap } from "gsap"
import { useRef } from "react"
import AppLogo from "./AppLogo"

export default function AppIntro({ onDone }) {
    const containerRef = useRef(null);

    // la splash segue l'animazione del logo: quando il logo è formato resta
    // ferma un secondo e poi sparisce. Cambiando i tempi del logo, la splash
    // si adatta
    const handleLogoComplete = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            delay: .6, // delay dopo che il logo è formato
            duration: 1,
            ease: "power1.out",
            onComplete: onDone,
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-zinc-950 text-zinc-200 font-zalando font-stretch-[125%]">

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 sm:w-64 mx-auto">
                    <AppLogo variant="splash" showName onComplete={handleLogoComplete} />
                </div>
            </div>

        </div>
    );
}
