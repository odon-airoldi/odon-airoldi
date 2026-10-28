import { Link } from "react-router-dom"
import { stack, education, experience } from "../data/data"
import AppList from "../components/AppList"
import { useAppContext } from "../contexts/AppContext"

export default function IndexPage() {

    const { works } = useAppContext();

    return (

        <div className="py-[10vw]">

            <div className="grid grid-cols-12 gap-y-[10vw]">

                <div id="about" className="col-span-12">
                    <p className="alive text-base sm:text-[2vw] font-extralight uppercase leading-none">
                        <span className="overflow-hidden"><span className="word-reveal block">Web developer con un background nel graphic design.</span></span>
                        <span className="overflow-hidden"><span className="word-reveal block">Competenze sviluppate nelle esperienze professionali e consolidate con un percorso formativo fullstack.</span></span>
                        <span className="overflow-hidden"><span className="word-reveal block">Oggi seguo ogni progetto da due punti di vista, come funziona e come si vede.</span></span>
                    </p>
                </div>

                <div className="col-span-6 col-start-7 md:col-span-4 md:col-start-5">
                    <div className="alive text-xs md:text-sm xl:text-base font-stretch-[125%] font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Stack</span>
                    </div>
                    <AppList list={stack} groupBy="type" />
                </div>
                <div className="col-span-6 col-start-7 md:col-span-4">
                    <div className="alive text-xs md:text-sm xl:text-base font-stretch-[125%] font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Work</span>
                    </div>
                    <AppList list={works} groupBy="type" />
                </div>
                <div className="col-span-6 col-start-7 md:col-span-4 md:col-start-5">
                    <div className="alive text-xs md:text-sm xl:text-base font-stretch-[125%] font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Formazione</span>
                    </div>
                    <AppList list={education} groupBy="organization" />
                </div>
                <div className="col-span-6 col-start-7 md:col-span-4">
                    <div className="alive text-xs md:text-sm xl:text-base font-stretch-[125%] font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Esperienza</span>
                    </div>
                    <AppList list={experience} groupBy="organization" />
                </div>
            </div>
        </div >
    )
}