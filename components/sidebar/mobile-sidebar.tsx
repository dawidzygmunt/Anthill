"use client"

import { Button } from "../ui/button"
import { Nav } from "./nav"

export const MobileSidebar = () => {
  return (
    <div className="bg-[#072b2b] w-[200px] min-h-screen absolute md:hidden z-40 p-2">
      <div className="mt-[65px]">
        <Nav />
      </div>
    </div>
  )
}
