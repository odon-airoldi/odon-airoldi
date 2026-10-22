import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import AppLogo from "./AppLogo"

export default function AppFooter() {

    const { pathname } = useLocation();

    // API key openweathermap
    const apiKey = import.meta.env.VITE_API_KEY_OWM
    const [dataWeather, setDataWeather] = useState({})
    // Chiamata AJAX tramite fetch API openweathermap: nel footer, che sta nel
    // layout e non si rismonta, parte una volta sola invece che a ogni pagina
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lecco&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => {
                setDataWeather(data)
            })
    }, [apiKey])

    return (

        <footer>

            <div className="p-2 sm:p-4 fixed bottom-0 right-0 max-sm:hidden print:hidden">
                <div className="alive text-xs sm:text-sm xl:text-base font-extralight word-spacing-[.5em] leading-none tracking-wide uppercase overflow-hidden">
                    <span className="word-reveal block">LC {dataWeather.name && <span>{Math.round(dataWeather.main?.temp)}°C</span>}</span>
                </div>
            </div>


            <div className={`p-2 sm:p-4 fixed bottom-0 left-0 sm:w-32 lg:w-48 ${pathname === "/" ? 'w-full' : 'w-24'}`}>
                <div className={`w-full`}>
                    {/* home: si completa dopo la splash; cv: si modifica con lo scroll */}
                    <AppLogo variant={pathname === "/" ? "intro" : "scroll"} />
                </div>
            </div>

            {/* <div className="absolute bottom-4 right-4">
                <div className="flex gap-[16px] w-full justify-center">
                    <div className="aspect-2/1 w-[64px] relative x">
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

                    <div className="aspect-2/1 w-[64px] relative a">
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

                    <div className="aspect-2/1 w-[64px] relative b">
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

                    <div className="aspect-2/1 w-[64px] relative c">
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
            </div> */}

        </footer>
    )
}