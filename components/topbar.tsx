"use client"

import { useState } from "react"

import { Bell, Ghost, Menu, Search, Settings, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MobileSidebar } from "./sidebar/mobile-sidebar"

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="bg-white p-2 drop-shadow-sm flex items-center justify-between z-50">
        <div className="flex items-center space-x-3 mx-4">
          {!isOpen ? (
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          )}
          <Avatar>
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>John Doe</span>
        </div>
        <div className="items-center space-x-3 sm:mr-5 text-gray-400 hidden sm:flex">
          <Input className="max-w-40 h-8 bg-gray-50 " placeholder={"Search"} />
          <Button
            variant="ghost"
            size="sm"
            className="px-0 hover:bg-transparent"
          >
            <Bell size={20} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-0 hover:bg-transparent"
          >
            <Settings size={21} />
          </Button>
        </div>
      </div>
      {isOpen && <MobileSidebar />}
    </>
  )
}

export default TopBar
