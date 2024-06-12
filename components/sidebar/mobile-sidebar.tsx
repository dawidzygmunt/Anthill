"use client"

import { ChevronRight, X } from "lucide-react"
import { Button } from "../ui/button"
import { ListWeeks } from "./list-weeks"
import { Nav } from "./nav"
import { useState } from "react"
import { ListWeeksProps } from "@/lib/types"

export const MobileSidebar = ({ weeks }: ListWeeksProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <div
        className={`bg-[#0d1321] w-[15px] flex items-center min-h-screen lg:hidden`}
      >
        <button
          className="lg:hidden bg-inherit text-white rounded-full m-0 p-0 translate-x-1 hover:bg-black"
          onClick={toggleSidebar}
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <div
        className={`w-[200px] lg:w-[270px] bg-[#e6e6e6] flex flex-col
         absolute top-0 min-h-screen z-50 justify-between
         ${isSidebarOpen ? "" : "hidden"}`}
      >
        <div>
          <div className="flex justify-end">
            <Button className="w-[25px] h-[25px] rounded-full p-0 m-1">
              <X size={15} onClick={toggleSidebar} />
            </Button>
          </div>
          <ListWeeks weeks={weeks} />
        </div>
        <div className="p-4 bg-[#0d1321] w-full text-[#8d8d8d] flex">
          <Nav />
        </div>
      </div>
    </div>
  )
}
