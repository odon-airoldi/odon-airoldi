import { Link } from "react-router-dom"

export default function AppFooter() {

    return (

        <footer>

            {/* stessa griglia del menu nell'header: i link stanno sotto le sue prime due voci */}
            <div className="grid grid-cols-12 p-2">
                <div className="col-span-6 md:col-span-4 md:col-start-5">
                    <Link to="https://github.com/odon-airoldi" target="_blank" rel="noopener noreferrer" className="alive block text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden hover:text-zinc-50">
                        <span className="word-reveal block">GitHub</span>
                    </Link>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <Link to="https://www.linkedin.com/in/odon-airoldi/" target="_blank" rel="noopener noreferrer" className="alive block text-xs md:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden hover:text-zinc-50">
                        <span className="word-reveal block">LinkedIn</span>
                    </Link>
                </div>
            </div>

        </footer>
    )
}