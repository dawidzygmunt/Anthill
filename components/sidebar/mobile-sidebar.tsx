"use client"

import { ChevronRight, X } from "lucide-react"
import { Button } from "../ui/button"
import { ListWeeks } from "./list-weeks"
import { Nav } from "./nav"
import { useState } from "react"

export const MobileSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div>
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
        <div className="">
          <Button className="px-3 m-2">
            <X size={20} onClick={toggleSidebar} />
          </Button>
          {/* <ListWeeks data={data12} /> */}
        </div>
        <div className="p-4 bg-[#0d1321] w-full text-[#8d8d8d] flex">
          <Nav />
        </div>
      </div>
    </div>
  )
}
