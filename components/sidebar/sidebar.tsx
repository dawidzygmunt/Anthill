"use client"

import { SingleWeek } from "./single-week"
import { addDays } from "date-fns"
import { Home, MenuSquare, Settings, X } from "lucide-react"
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

      <Button className="lg:hidden" onClick={toggleSidebar}>
        <MenuSquare size={25} />
      </Button>
      <div
        className={`w-[250px] bg-[#e6e6e6] flex flex-col
         items-end absolute min-h-screen z-50 justify-between
         ${isSidebarOpen ? "" : "hidden"}`}
      >
        <div>
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
