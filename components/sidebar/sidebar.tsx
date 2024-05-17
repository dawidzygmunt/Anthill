"use client"

import { SingleWeek } from "./single-week"
import { addDays } from "date-fns"
import { ChevronRight, Home, MenuSquare, Settings, X } from "lucide-react"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Nav } from "./nav"

const SideBar = () => {
  const today = new Date()
  const to = addDays(today, 7)
  const data = {
    from: today,
    to: to,
    ActivityName: "abc",
    isDone: true,
    workTime: 40,
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <aside
        className={`w-[250px] hidden bg-[#e6e6e6] lg:flex flex-col min-h-screen 
      justify-between`}
      >
        <div>
          <SingleWeek data={data} />
        </div>

        <div className="p-4 bg-[#0d1321] text-[#8d8d8d] flex">
          <Nav />
        </div>
      </aside>

      <div className={`bg-[#0d1321] w-[15px] flex items-center lg:hidden`}>
        <button
          className="lg:hidden bg-inherit text-white rounded-full m-0 p-0 translate-x-1 hover:bg-black"
          onClick={toggleSidebar}
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <div
        className={`w-[250px] bg-[#e6e6e6] flex flex-col
         items-end absolute left-0 top-0 min-h-screen z-50 justify-between
         ${isSidebarOpen ? "" : "hidden"}`}
      >
        <div className="bg-[#0d1321]w-4 left-0">
          <Button className="px-3 m-2">
            <X size={20} onClick={toggleSidebar} />
          </Button>
        </div>
        <div className="p-4 bg-[#0d1321] w-full text-[#8d8d8d] flex">
          <Nav />
        </div>
      </div>
    </>
  )
}

export default SideBar
