import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
import { Fragment, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { createInfiniteGallery } from "../utils/gsap"

gsap.registerPlugin(useGSAP)

// lista a due livelli (titolo + voci) usata da Stack, Formazione, Esperienza e Work.
// Una voce può essere una stringa (semplice riga di testo) oppure un oggetto
// (come in Work): in quel caso diventa un bottone che apre il contenuto
// corrispondente — se ha `url` mostra descrizione e link, se ha `gallery` apre la
// gallery a schermo intero
export default function AppList({ list, groupBy }) {

    const [openId, setOpenId] = useState(null)

    // gallery infinita e trascinabile (vedi createInfiniteGallery in utils/gsap):
    // itemsRef/dragProxyRef vivono dentro il portal, montati solo per la voce
    // aperta. useGSAP dipende da openId, quindi ad ogni apertura/chiusura/cambio la
    // gallery precedente viene ripulita (via la funzione di cleanup ritornata) e se
    // ne crea una nuova. Lo swipe verso l'alto la chiude come il click sullo sfondo
    const itemsRef = useRef(null)
    const dragProxyRef = useRef(null)

    useGSAP(() => {
        if (!itemsRef.current) return
        return createInfiniteGallery(itemsRef.current, dragProxyRef.current, () => setOpenId(null))
    }, { dependencies: [openId] })

    if (!list) return null

    const groups = Object.groupBy(list, (item) => item[groupBy])

    return (
        <ul className="text-[.625rem] lg:text-xs tracking-widest grid grid-rows-1 gap-y-[1vw]">
            {
                Object.entries(groups).map(([group, items]) => (
                    <li key={group} className="alive font-extralight leading-[1.5]">
                        <span className="inline-block reveal-shift capitalize max-sm:text-right">{group}</span>
                        <ul className="ul">
                            {items.map((item, index) => (
                                item.type === "website" ?
                                    <li key={index}>
                                        <button className="cursor-pointer flex gap-1 items-center hover:text-zinc-50" onClick={() => setOpenId(openId === item.slug ? null : item.slug)}>
                                            <span>{item.title}</span>
                                            {
                                                openId !== item.slug &&
                                                <span className="relative w-[12px] h-[8px] mt-[4px]">
                                                    <span className="absolute top-0 left-0 w-8/12 h-1/8 bg-zinc-200"></span>
                                                    <span className="absolute top-0 left-0 w-1/12 h-6/8 bg-zinc-200"></span>
                                                    <span className="absolute top-0 left-7/12 w-1/12 h-3/8 bg-zinc-200"></span>
                                                    <span className="absolute top-5/8 left-0 w-2/12 h-1/8 bg-zinc-200"></span>
                                                    <span className="absolute top-5/8 left-4/12 w-8/12 h-1/8 bg-zinc-200"></span>
                                                    <span className="absolute top-0 left-11/12 w-1/12 h-6/8 bg-zinc-200"></span>
                                                    <span className="absolute top-3/8 left-4/12 w-1/12 h-3/8 bg-zinc-200"></span>
                                                    <span className="absolute top-0 left-10/12 w-2/12 h-1/8 bg-zinc-200"></span>
                                                </span>
                                            }
                                        </button>
                                        {openId === item.slug &&
                                            <div className="mt-[1em] mb-[2em] -ms-[3em] w-full relative">
                                                <div className="absolute -top-[1.75em] left-[0.25em] w-[2.25em] h-[1.5em]">
                                                    <span className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200"></span>
                                                    <span className="absolute top-0 left-0 w-[1px] h-full bg-zinc-200"></span>
                                                </div>
                                                <div>
                                                    <p>{item.description}</p>
                                                    <div className="flex gap-2 items-center mt-[.25em]">
                                                        <span className="relative w-[12px] h-[8px] mt-[4px]">
                                                            <span className="absolute top-0 left-0 w-8/12 h-1/8 bg-zinc-200"></span>
                                                            <span className="absolute top-0 left-0 w-1/12 h-6/8 bg-zinc-200"></span>
                                                            <span className="absolute top-0 left-7/12 w-1/12 h-3/8 bg-zinc-200"></span>
                                                            <span className="absolute top-5/8 left-0 w-2/12 h-1/8 bg-zinc-200"></span>
                                                            <span className="absolute top-5/8 left-4/12 w-8/12 h-1/8 bg-zinc-200"></span>
                                                            <span className="absolute top-0 left-11/12 w-1/12 h-6/8 bg-zinc-200"></span>
                                                            <span className="absolute top-3/8 left-4/12 w-1/12 h-3/8 bg-zinc-200"></span>
                                                            <span className="absolute top-0 left-10/12 w-2/12 h-1/8 bg-zinc-200"></span>
                                                        </span>
                                                        <Link className="hover:text-zinc-50" to={item.url} target="_blank">{item.url_text}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                    : item.type === "graphic" ?
                                        <li key={index}>
                                            <button className="cursor-pointer flex gap-1 items-center hover:text-zinc-50" onClick={() => setOpenId(openId === item.slug ? null : item.slug)}>
                                                <span>{item.title}</span>
                                                {
                                                    openId !== item.slug &&
                                                    <span className="relative w-[12px] h-[8px] mt-[2px] bg-orange-6-00">
                                                        <span className="absolute top-0 left-0 w-9/12 h-1/8 bg-zinc-200"></span>
                                                        <span className="absolute top-0 left-0 w-1/12 h-5/8 bg-zinc-200"></span>
                                                        <span className="absolute top-3/8 left-3/12 w-9/12 h-1/8 bg-zinc-200"></span>
                                                        <span className="absolute top-3/8 left-3/12 w-1/12 h-4/8 bg-zinc-200"></span>
                                                        <span className="absolute top-3/8 left-11/12 w-1/12 h-5/8 bg-zinc-200"></span>
                                                        <span className="absolute top-7/8 left-3/12 w-9/12 h-1/8 bg-zinc-200"></span>
                                                    </span>
                                                }
                                            </button>
                                            {openId === item.slug && createPortal(
                                                <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
                                                    <div className="absolute inset-0 z-51 bg-zinc-950/75" onClick={() => setOpenId(null)}></div>
                                                    <ul className="grid place-items-center z-52 pointer-events-none" ref={itemsRef}>
                                                        {item.images.map((path) => (
                                                            <li key={path} className="col-start-1 row-start-1 px-4 py-8">
                                                                <img src={path} draggable={false} className="pointer-events-auto max-h-[calc(100svh-64px)]" />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="drag-proxy hidden" ref={dragProxyRef}></div>
                                                </div>, document.body)
                                            }
                                        </li>
                                        : item.organization ?
                                            <Fragment key={index}>
                                                {item.focus?.map((f) => <li key={f}>{f}</li>)}
                                                <li>{item.location}</li>
                                                <li>{item.year_start === item.year_end ? item.year_start : `${item.year_start} ${item.year_end}`}</li>
                                            </Fragment>
                                            :
                                            <li key={index}>{item.title}</li>
                            ))}
                        </ul>
                    </li>
                ))
            }

        </ul>
        // <ul className="text-[.625rem] lg:text-xs tracking-widest grid grid-rows-1 gap-y-[1vw]">
        //     {
        //         list.map((item) => (
        //             <li key={item.id} className="alive font-extralight leading-[1.5]">
        //                 <span className="inline-block reveal-shift max-sm:text-right">{item.title}</span>
        //                 <ul className="ul">
        //                     {
        //                         item.items.map((voce) => (
        //                             typeof voce === "string" ? (
        //                                 <li key={voce}>{voce}</li>
        //                             ) : (
        //                                 <li key={voce.id} className="">
        //                                     <button className="cursor-pointer flex gap-1 items-center hover:text-zinc-50" onClick={() => setOpenId(openId === voce.id ? null : voce.id)}>
        //                                         <span>{voce.title}</span>
        //                                         {voce.url ?
        //                                             (openId !== voce.id ?
        //                                                 <span className="relative w-[12px] h-[8px] mt-[4px]">
        //                                                     <span className="absolute top-0 left-0 w-8/12 h-1/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-0 left-0 w-1/12 h-6/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-0 left-7/12 w-1/12 h-3/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-5/8 left-0 w-2/12 h-1/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-5/8 left-4/12 w-8/12 h-1/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-0 left-11/12 w-1/12 h-6/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-3/8 left-4/12 w-1/12 h-3/8 bg-zinc-200"></span>
        //                                                     <span className="absolute top-0 left-10/12 w-2/12 h-1/8 bg-zinc-200"></span>
        //                                                 </span>
        //                                                 :
        //                                                 <></>
        //                                             )
        //                                             :
        //                                             <span className="relative w-[12px] h-[8px] mt-[2px] bg-orange-6-00">
        //                                                 <span className="absolute top-0 left-0 w-9/12 h-1/8 bg-zinc-200"></span>
        //                                                 <span className="absolute top-0 left-0 w-1/12 h-5/8 bg-zinc-200"></span>
        //                                                 <span className="absolute top-3/8 left-3/12 w-9/12 h-1/8 bg-zinc-200"></span>
        //                                                 <span className="absolute top-3/8 left-3/12 w-1/12 h-4/8 bg-zinc-200"></span>
        //                                                 <span className="absolute top-3/8 left-11/12 w-1/12 h-5/8 bg-zinc-200"></span>
        //                                                 <span className="absolute top-7/8 left-3/12 w-9/12 h-1/8 bg-zinc-200"></span>
        //                                             </span>
        //                                         }
        //                                     </button>
        //                                     {openId === voce.id && voce.url &&
        //                                         <div className="mt-[1em] mb-[2em] -ms-[3em] w-full relative">
        //                                             <div className="absolute -top-[1.75em] left-[0.25em] w-[2.25em] h-[1.5em]">
        //                                                 <span className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200"></span>
        //                                                 <span className="absolute top-0 left-0 w-[1px] h-full bg-zinc-200"></span>
        //                                             </div>

        //                                             <div>
        //                                                 <p>{voce.description}</p>
        //                                                 <div className="flex gap-2 items-center mt-[.25em]">
        //                                                     <span className="relative w-[12px] h-[8px] mt-[4px]">
        //                                                         <span className="absolute top-0 left-0 w-8/12 h-1/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-0 left-0 w-1/12 h-6/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-0 left-7/12 w-1/12 h-3/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-5/8 left-0 w-2/12 h-1/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-5/8 left-4/12 w-8/12 h-1/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-0 left-11/12 w-1/12 h-6/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-3/8 left-4/12 w-1/12 h-3/8 bg-zinc-200"></span>
        //                                                         <span className="absolute top-0 left-10/12 w-2/12 h-1/8 bg-zinc-200"></span>
        //                                                     </span>
        //                                                     <Link className="hover:text-zinc-50" to={voce.url} target="_blank">{voce.url_text}</Link>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     }
        //                                     {openId === voce.id && voce.gallery && createPortal(
        //                                         <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
        //                                             <div className="absolute inset-0 z-51 bg-zinc-950/75" onClick={() => setOpenId(null)}></div>
        //                                             <ul className="grid place-items-center z-52 pointer-events-none" ref={itemsRef}>
        //                                                 {voce.gallery.map((img) => (
        //                                                     <li key={img} className="col-start-1 row-start-1 px-4 py-8">
        //                                                         <img src={img} draggable={false} className="pointer-events-auto max-h-[calc(100svh-64px)]" />
        //                                                     </li>
        //                                                 ))}
        //                                             </ul>
        //                                             <div className="drag-proxy hidden" ref={dragProxyRef}></div>
        //                                         </div>, document.body)
        //                                     }
        //                                 </li>
        //                             )
        //                         ))
        //                     }
        //                 </ul>
        //             </li>
        //         ))
        //     }
        // </ul>
    )
}
