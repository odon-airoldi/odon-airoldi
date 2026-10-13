import { gsap } from "gsap"
import { useRef } from "react"
import AppLogo from "./AppLogo"

export default function AppIntro({ onDone }) {
    const containerRef = useRef(null);
    const counterRef = useRef(null);

    // la splash dura quanto l'animazione del logo più un secondo: il contatore
    // segue l'avanzamento del logo e, quando il logo è formato, la splash
    // sparisce in un secondo. Cambiando i tempi del logo, la splash si adatta
    const handleLogoProgress = (progress) => {
        counterRef.current.textContent = Math.round(progress * 100);
    };

    const handleLogoComplete = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: onDone,
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-zinc-950 text-zinc-200 font-zalando font-stretch-[117.5%]">

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-[240px] mx-auto">
                    <AppLogo waitForSplash={false} onProgress={handleLogoProgress} onComplete={handleLogoComplete} />
                </div>
            </div>

            <div className="absolute top-4 left-4 font-extralight text-xl text-center">
                <span ref={counterRef} className="tracking-[1em]">0</span>%
            </div>

            <div className="absolute bottom-4 right-4">
                <div className="flex gap-[10px] w-full justify-center">
                    <div className="aspect-2/1 w-[80px] relative x">
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-0/4 2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-0/4 4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-0/4 4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-0/4 2"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-1/4 2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-1/4 2"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-2/4 2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-2/4 2"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-2/4 1"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-2/4 1 3"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-2/4 1 3"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-2/4 1 3"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-2/4 1 3"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-2/4 1"></div>
                    </div>

                    <div className="aspect-2/1 w-[80px] relative a">
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-0/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-1/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-2/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-3/4"></div>
                    </div>

                    <div className="aspect-2/1 w-[80px] relative b">
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-0/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-0/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-1/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-2/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0/0 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-1/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-2/8 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-3/8 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-4/8 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-5/8 top-2/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-6/8 top-3/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-3/4"></div>
                    </div>

                    <div className="aspect-2/1 w-[80px] relative c">
                        <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-0 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-0 top-1/2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-0 top-3/4"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-4/8 left-2/8 top-0"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-4/8 left-2/8 top-1/2"></div>

                        <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-6/8 top-1/4"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-1/8 left-7/8 top-1/2"></div>
                        <div className="bg-zinc-200 absolute h-1/4 w-2/8 left-6/8 top-3/4"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}
