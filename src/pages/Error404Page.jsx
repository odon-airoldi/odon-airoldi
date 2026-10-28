import { Link } from "react-router-dom"
import { useState } from "react"
import { stack } from "../data/data"
import AppList from "../components/AppList"
import { useAppContext } from "../contexts/AppContext"

export default function Error404Page() {


    return (

        <div className="fixed inset-0 z-50 font-zalando font-stretch-[125%]">

            <div className="w-full h-full flex items-center- justify-center gap-[1px] p-[1px]">
                <div className="aspect-3/4 w-1/3 relative">
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-1/3 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-3/4"></div>
                </div>

                <div className="aspect-3/4 w-1/3 relative">
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-3/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-1/3 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-1/3 top-3/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-3/4"></div>
                </div>

                <div className="aspect-3/4 w-1/3 relative">
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-0 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-1/3 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-0/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-1/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-2/4"></div>
                    <div className="bg-zinc-200 absolute h-1/4 w-1/3 left-2/3 top-3/4"></div>
                </div>
            </div>

        </div>
    )
}