import { Home, Settings } from "lucide-react"
import React from "react"

export const Nav = () => {
  return (
    <div className="p-4 bg-[#0d1321] text-[#8d8d8d] flex">
      <div
        className="flex flex-col items-center mr-2 hover:cursor-pointer hover:text-slate-600 transition-all
          duration-300 ease-in-out"
      >
        <Home />
        <p className="text-sm">Home</p>
      </div>
      <div
        className="flex flex-col items-center mx-2 hover:cursor-pointer hover:text-slate-600 transition-all
          duration-300 ease-in-out"
      >
        <Settings size={25} />
        <p className="text-sm">Settings</p>
      </div>
    </div>
  )
}
