"use client"

import { getWeeks } from "@/actions/weeks/get-weeks"
import DisplayError from "@/utils/display-error"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"

const SideBar = () => {
  return (
    <aside className="w-[250px] bg-[#072b2b] p-3 flex-col justify-between hidden md:flex">
      <div className="">
        <h1 className="text-md text-gray-100 pb-10">Anthill</h1>
        <Nav />
      </div>
    </aside>
  )
}

export default SideBar
