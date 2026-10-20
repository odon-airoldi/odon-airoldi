import { Link } from "react-router-dom"
import { useState } from "react"
import { stack } from "../data/data"
import AppList from "../components/AppList"
import { useAppContext } from "../contexts/AppContext"

export default function IndexPage() {

    const { works } = useAppContext();

    const [copied, setCopied] = useState(false)

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('odon.airoldi@gmail.com')
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch { }
    }

    return (

        <div className="py-4">

            <div className="grid grid-cols-12 gap-x-2 xl:gap-x-4">
                <div className="md:col-span-4 max-sm:hidden">
                    <div className="alive text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden">
                        <span className="word-reveal block">O<span className="max-md:hidden">don</span> A<span className="max-md:hidden">iroldi</span></span>
                    </div>
                </div>
                <div className="sm:col-span-3 md:col-span-2 sm:col-start-3 max-sm:hidden">
                    <div className="alive text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Stack</span>
                    </div>
                    <AppList list={stack} groupBy="type" />
                </div>
                <div className="sm:col-span-3 md:col-span-2 max-sm:hidden">
                    <div className="alive text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden mb-4">
                        <span className="word-reveal block">Work</span>
                    </div>
                    <AppList list={works} groupBy="type" />
                </div>
                <div className="col-span-12 sm:col-span-2 md:col-span-2">
                    <Link className="alive text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] max-sm:text-[6vw] leading-none tracking-wide uppercase overflow-hidden hover:text-zinc-50" to="/cv">
                        <span className="word-reveal block max-sm:flex max-sm:justify-end"><span>C V</span></span>
                    </Link>
                </div>
                <div className="sm:col-span-2 md:col-span-2 max-sm:hidden">
                    <button className="alive text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden cursor-pointer block w-full text-left hover:text-zinc-50" type="button" onClick={handleCopyEmail}>
                        <span className="word-reveal block">{copied ? "Email copied" : "Email me"}</span>
                    </button>
                </div>
            </div>
        </div >
    )
}