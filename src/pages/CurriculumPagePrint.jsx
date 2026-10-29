
import { Link } from "react-router-dom";
import { introText, stack, education, experience } from "../data/data"
import { useAppContext } from "../contexts/AppContext"
import odonAiroldiCv from "../assets/odon-airoldi-cv.jpg"


export default function CurriculumPagePrint() {

    const { works } = useAppContext();

    return (
        <div className="h-[297mm] p-[8pt] relative bg-white text-black font-zalando font-stretch-[117.5%]">

            {/* pagina solo per generare il pdf: React 19 sposta il meta nell'<head>, e lo toglie quando si lascia la pagina. noindex = fuori dai motori di ricerca */}
            <meta name="robots" content="noindex, nofollow" />

            <div className="grid grid-cols-12 gap-x-2 xl:gap-x-4 gap-y-[12pt]">
                <header className="col-span-12">
                    <div className="text-[24pt] leading-[.8] font-medium tracking-tighter uppercase">
                        <h1><span>Odon</span> <span>Airoldi</span></h1>
                        <h2><span>Full stack</span> <span>developer</span></h2>
                        <h3><span>Design</span> <span>minded</span></h3>
                    </div>
                </header>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        Odon
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        Airoldi
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        17 12 87
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        Lecco
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        340 9900243
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        odon.airoldi@gmail.com
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        <Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        <Link to="https://www.linkedin.com/in/odon-airoldi/">linkedin.com/in/odon-airoldi</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-[6pt] font-normal word-spacing-[.5em] leading-none tracking-wide uppercase border-t border-black pt-[2pt]">
                        <Link to="https://github.com/odon-airoldi">github.com/odon-airoldi</Link>
                    </div>
                </div>
                <div className="col-span-4">
                    <p className="text-[8pt] font-light leading-none tracking-wide uppercase">
                        Web developer con un background nel graphic design. Sviluppo applicazioni web modulari e scalabili, curando layout ed esperienza utente.
                    </p>
                </div>
                <div className="col-span-4">
                    <p className="text-[8pt] font-light leading-none tracking-wide uppercase">
                        Competenze sviluppate nelle esperienze professionali su progetti reali e consolidate con un percorso formativo full-stack.
                    </p>
                </div>
                <div className="col-span-4">
                    <p className="text-[8pt] font-light leading-none tracking-wide uppercase">
                        Oggi seguo ogni progetto da due punti di vista, come funziona e come si vede, unendo logica e design in un unico processo.
                    </p>
                </div>
                <div className="col-span-4 col-start-5 mt-[6pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[4pt] mb-[8pt]">
                        Formazione
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[4pt]">
                        {
                            education.map((item) => (
                                <li key={item.id}>
                                    <span className="inline-block -translate-x-full">{item.organization}</span>
                                    <ul>
                                        {
                                            item.focus.map((focus) => (
                                                <li key={focus}>{focus}</li>
                                            ))
                                        }
                                        <li>{item.location}</li>
                                        <li>{item.year_start === item.year_end ? item.year_start : `${item.year_start} ${item.year_end}`}</li>
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <div className="col-span-4 mt-[6pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[4pt] mb-[6pt]">
                        Esperienza
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[4pt]">
                        {
                            experience.map((item) => (
                                <li key={item.id}>
                                    <span className="inline-block -translate-x-full">{item.organization}</span>
                                    <ul>
                                        {
                                            item.focus.map((focus) => (
                                                <li key={focus}>{focus}</li>
                                            ))
                                        }
                                        <li>{item.location}</li>
                                        <li>{item.year_start === item.year_end ? item.year_start : `${item.year_start} ${item.year_end}`}</li>
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-span-4 col-start-5 mt-[6pt]">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[4pt] mb-[6pt]">
                        Core stack
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[4pt]">
                        {
                            // stack è piatto: raggruppato per type come in AppList
                            Object.entries(Object.groupBy(stack, (item) => item.type)).map(([group, items]) => (
                                <li key={group}>
                                    <span className="inline-block -translate-x-full capitalize">{group}</span>
                                    <ul>
                                        {
                                            items.map((item) => (
                                                <li key={item.id}>{item.title}</li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-span-4 mt-[6pt] relative">
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[4pt] mb-[6pt]">
                        Selected works
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[4pt]">
                        {
                            // solo i website, con il link al sito: i graphic rimandano al portfolio qui sotto
                            <li>
                                <span className="inline-block -translate-x-full">Website</span>
                                <ul>
                                    {
                                        works
                                            ?.filter((item) => item.type === "website")
                                            .map((item) => (
                                                <li key={item.slug}><Link to={item.url}>{item.title}</Link></li>
                                            ))
                                    }
                                </ul>
                            </li>
                        }
                        <li>
                            <span className="inline-block -translate-x-full">Graphic</span>
                            <ul>
                                <li>Guarda i progetti su<br /> <Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="text-[8pt] font-light leading-none tracking-wide uppercase border-t border-black pt-[4pt] mb-[6pt] mt-[18pt]">
                        Lingue
                    </div>
                    <ul className="text-[6pt] tracking-widest grid gap-y-[4pt]">
                        <li>
                            <span className="inline-block -translate-x-full">Italiano</span>
                            <ul>
                                <li>Lingua madre</li>
                            </ul>
                        </li>
                        <li>
                            <span className="inline-block -translate-x-full">Inglese</span>
                            <ul>
                                <li>A2</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="absolute right-[8pt] bottom-[8pt] text-[24pt] leading-[.8] font-medium tracking-tighter uppercase"><Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link></div>
            <img src={odonAiroldiCv} alt="Odon Airoldi" className="absolute bottom-[8pt] left-[8pt] w-[128pt] h-[160pt]" />
            <footer className="absolute bottom-[176pt] left-[8pt] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap uppercase text-[4pt] leading-none">
                Autorizzo il trattamento dei dati personali ai sensi del GDPR Reg. UE 2016/679
            </footer>
        </div >
    );
}

