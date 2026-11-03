import { Link } from "react-router-dom";
import { stack, education, experience } from "../data/data"
import { useAppContext } from "../contexts/AppContext"
import odonAiroldiCv from "../assets/odon-airoldi-cv.jpg"


export default function CurriculumPagePrint() {

    const { works } = useAppContext();

    return (
        <div className="h-[297mm] p-[8pt] relative bg-white text-black font-zalando font-stretch-[117.5%] text-[6pt] leading-[1.5] tracking-wide">

            {/* pagina solo per generare il pdf: React 19 sposta il meta nell'<head>, e lo toglie quando si lascia la pagina. noindex = fuori dai motori di ricerca */}
            <meta name="robots" content="noindex, nofollow" />


            <div className="grid grid-cols-24">

                <div className="col-span-24">
                    <div className="flex gap-[8pt] justify-center uppercase">
                        <div className="">odon.airoldi@gmail.com</div>
                        <div className="">+39 340 9900243</div>
                        <div className="">Lecco LC</div>
                        <div className=""><Link to="https://www.linkedin.com/in/odon-airoldi/">linkedin.com/in/odon-airoldi</Link></div>
                        <div className=""><Link to="https://github.com/odon-airoldi">github.com/odon-airoldi</Link></div>
                        <div className=""><Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link></div>
                    </div>
                </div>

                <div className="col-span-15 col-start-10">
                    <div className="text-[24pt] leading-[.8] font-medium uppercase mt-[24pt] mb-[16pt]">
                        <h1 className="inline-block -translate-x-full">Odon Airoldi</h1>
                        {/* <h2 className="inline-block">Full stack developer</h2> */}
                        <h2 className="inline-block">Front end developer</h2>
                    </div>
                </div>

                <div className="col-span-4 col-start-3">
                    <div className="mb-[24pt]">
                        <div className="text-[10pt] leading-none tracking-wide uppercase mb-[6pt]">
                            Core stack
                        </div>
                        <ul className="tracking-widest grid gap-y-[4pt]">
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

                    <div className="mb-[24pt]">
                        <div className="text-[10pt] leading-none tracking-wide uppercase mb-[6pt]">
                            Education
                        </div>
                        <ul className="tracking-widest grid gap-y-[4pt]">
                            {
                                education.map((item) => (
                                    <li key={item.id}>
                                        <span className="inline-block -translate-x-full">{item.organization}</span>
                                        <ul>
                                            <li>{item.description}</li>
                                            {
                                                item.focus.map((focus) => (
                                                    <li key={focus}>{focus}</li>
                                                ))
                                            }
                                            <li>{item.year_start === item.year_end ? <span>{item.year_start}</span> : <span>{item.year_start} {item.year_end}</span>} <span>{item.location}</span></li>
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="mb-[24pt]">
                        <div className="text-[10pt] leading-none tracking-wide uppercase mb-[6pt]">
                            Languages
                        </div>
                        <ul className="tracking-widest grid gap-y-[4pt]">
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


                <div className="col-span-15 col-start-10">

                    <div className="mb-[24pt]">
                        <p>
                            Web developer con sei anni di esperienza nello sviluppo front-end e competenze back-end consolidate attraverso progetti professionali e una formazione full-stack. Progetto applicazioni web trasformando requisiti e design in interfacce concrete e funzionali. Il background nel graphic design completa il mio profilo tecnico e arricchisce il mio approccio alla UX/UI.
                        </p>
                    </div>
                    <div className="mb-[24pt]">
                        <div className="text-[10pt] leading-none tracking-wide uppercase mb-[6pt]">
                            Selected works
                        </div>
                        <ul className="tracking-widest grid gap-y-[4pt]">
                            {
                                works
                                    ?.filter((item) => item.type === "website" && item.slug !== "essense-magazine")
                                    .map((item) => (
                                        <li key={item.slug}>
                                            <span className="inline-block -translate-x-full">{item.title}</span>
                                            <ul>
                                                <li><Link to={item.url}>{item.url_text}</Link></li>
                                                <li className="">{item.description}</li>
                                            </ul>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className="mb-[24pt]">
                        <div className="text-[10pt] leading-none tracking-wide uppercase mb-[6pt]">
                            Experience
                        </div>
                        <ul className="tracking-widest grid gap-y-[4pt]">
                            {
                                experience.map((item) => (
                                    <li key={item.id}>
                                        <span className="inline-block -translate-x-full">{item.organization}</span>
                                        <ul>
                                            <li className="flex gap-[16pt]">
                                                {
                                                    item.focus.map((focus) => (
                                                        <span key={focus}>{focus}</span>
                                                    ))
                                                }
                                                <span>{item.year_start === item.year_end ? <span>{item.year_start}</span> : <span>{item.year_start} {item.year_end}</span>} <span>{item.location}</span></span>
                                            </li>
                                            <li className="">
                                                {item.description}
                                            </li>
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>




            <img src={odonAiroldiCv} alt="Odon Airoldi" className="absolute left-[8pt] bottom-[8pt] w-5/24" />
            <div className="absolute right-[8pt] bottom-[8pt] text-[24pt] leading-[.8] font-medium uppercase"><Link to="https://www.odon-airoldi.com">odon-airoldi.com</Link></div>
            <footer className="absolute bottom-[8pt] left-[8pt] _[writing-mode:vertical-rl] _rotate-180 whitespace-nowrap uppercase text-[4pt] leading-none">
                Autorizzo il trattamento dei dati personali ai sensi del GDPR Reg. UE 2016/679
            </footer>
        </div >
    );
}

