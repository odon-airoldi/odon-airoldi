import { Link } from "react-router-dom"

export default function Error404Page() {

    // box come le geometrie dell'header: stessa griglia (3 colonne, p-2, gap-2),
    // alti --geo-box (App.css). Container (size): le barre verticali sono larghe
    // 25cqh, 1/4 dell'altezza come le orizzontali (h-1/4), stesso spessore
    const boxClass = "relative [container-type:size] h-(--geo-box)"

    return (

        <div className="fixed inset-0 z-50 font-zalando font-stretch-[125%] bg-zinc-950 text-zinc-200 flex items-center">

            {/* link alla home in alto a sinistra, stesso stile del testo di presentazione */}
            <Link to="/" className="absolute top-2 left-2 text-xs md:text-sm xl:text-base font-extralight uppercase leading-[1.25] hover:text-zinc-50">
                Page not found back to index
            </Link>

            <div className="grid grid-cols-3 gap-2 p-2 w-full">

                {/* 4: verticale a sinistra in alto, orizzontale sulla terza riga fino alla verticale
                    di destra (senza sovrapporsi), verticale a destra per tutta l'altezza */}
                <div className={boxClass}>
                    <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] left-0 top-0"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-[calc(100%-25cqh)] left-0 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-full w-[25cqh] right-0 top-0"></div>
                </div>

                {/* 0: orizzontali sopra e sotto, verticali ai lati nelle due righe centrali */}
                <div className={boxClass}>
                    <div className="bg-zinc-200 absolute h-1/4 w-full left-0 top-0"></div>
                    <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] left-0 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] right-0 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-full left-0 top-3/4"></div>
                </div>

                {/* 4 */}
                <div className={boxClass}>
                    <div className="bg-zinc-200 absolute h-2/4 w-[25cqh] left-0 top-0"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-[calc(100%-25cqh)] left-0 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-full w-[25cqh] right-0 top-0"></div>
                </div>

            </div>

        </div>
    )
}
