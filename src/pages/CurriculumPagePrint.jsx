
import { Link } from "react-router-dom";
import { stack, formazione, esperienza, work } from "../data/data"
import odonAiroldiCv from "../assets/odon-airoldi-cv.jpg"

export default function CurriculumPagePrint() {

    return (
        <div className="h-[297mm] p-[8pt] relative bg-white text-black font-zalando font-stretch-[117.5%]">

            {/* pagina solo per generare il pdf: React 19 sposta il meta nell'<head>,
                e lo toglie quando si lascia la pagina. noindex = fuori dai motori di ricerca */}
            <meta name="robots" content="noindex, nofollow" />

            <div className="grid grid-cols-12 gap-x-2 xl:gap-x-4 gap-y-[16pt]">
                <header className="col-span-12">
                    <div className="text-[32pt] leading-[.8] font-extralight tracking-tighter uppercase">
                        <h1 className="flex justify-between"><span>Odon</span> <span>Airoldi</span></h1>
                        <h2 className="flex justify-between"><span>fullstack</span> <span>developer</span></h2>
                        <h3 className="flex justify-between"><span>from graphic</span> <span>design</span></h3>
                    </div>
                </header>
                <div className="col-span-12">
                    <p className="text-[12pt] font-extralight uppercase leading-none text-justify word-spacing-[.5em]">
                        Formazione artistica ed esperienza nel graphic design sono all'origine del mio orientamento allo sviluppo web. Ho intrapreso questa direzione nel corso delle mie esperienze professionali, per poi consolidarla attraverso un percorso formativo fullstack. Metodo progettuale e sensibilità visiva accompagnano oggi il mio lavoro da sviluppatore.
                    </p>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        Odon
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        Airoldi
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        17 12 87
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        Lecco
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        340 9900243
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        odon.airoldi@gmail.com
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        <Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        <Link to="https://www.linkedin.com/in/odon-airoldi/">linkedin.com/in/odon-airoldi</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[6pt]">
                        <Link to="https://github.com/odon-airoldi">github.com/odon-airoldi</Link>
                    </div>
                </div>
                <div className="col-span-4 col-start-5 mt-[16pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[6pt] mb-[8pt]">
                        Formazione
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[8pt]">
                        {
                            formazione.map((item) => (
                                <li key={item.id}>
                                    <span className="inline-block -translate-x-full">{item.title}</span>
                                    <ul>
                                        {
                                            item.items.map((voce) => (
                                                <li key={voce}>{voce}</li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className="col-span-4 mt-[16pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[6pt] mb-[8pt]">
                        Esperienza
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[8pt]">
                        {
                            esperienza.map((item) => (
                                <li key={item.id}>
                                    <span className="inline-block -translate-x-full">{item.title}</span>
                                    <ul>
                                        {
                                            item.items.map((voce) => (
                                                <li key={voce}>{voce}</li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-span-4 col-start-5 mt-[16pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[6pt] mb-[8pt]">
                        Stack
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[8pt]">
                        {
                            stack.map((item) => (
                                <li key={item.id}>
                                    <span className="inline-block -translate-x-full">{item.title}</span>
                                    <ul>
                                        {
                                            item.items.map((voce) => (
                                                <li key={voce}>{voce}</li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-span-4 mt-[16pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[6pt] mb-[8pt]">
                        Work
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[8pt]">
                        {
                            work
                                .filter((item) => item.title === "Websites")
                                .map((item) => (
                                    <li key={item.id}>
                                        <span className="inline-block -translate-x-full">{item.title}</span>
                                        <ul>
                                            {
                                                item.items.map((voce) => (
                                                    <li key={voce.title}><Link to={voce.url}>{voce.title}</Link></li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                        }
                        <li>
                            <span className="inline-block -translate-x-full">Designs</span>
                            <ul>
                                <li>Guarda i progetti su<br /> <Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <img src={odonAiroldiCv} alt="Odon Airoldi" className="absolute bottom-[8pt] left-[8pt] w-[128pt] h-[160pt]" />
            <footer className="absolute bottom-[8pt] right-[8pt] uppercase text-[5pt] leading-none">
                Autorizzo il trattamento dei dati personali ai sensi del GDPR Reg. UE 2016/679
            </footer>
        </div>
    );
}

