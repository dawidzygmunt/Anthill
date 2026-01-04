"use client"

import { Clock, icons, Settings } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"
import IconWrapper from "./icon-wrapper"
import { cn } from "@/lib/utils"
import Link from "next/link"

const Navbar = () => {
  const pathName = usePathname()

  const routes = [
    {
      href: "/",
      label: "Time Sheet",
      icon: (
        <IconWrapper>
          <Clock />
        </IconWrapper>
      ),
      active: pathName === "/",
    },
    {
      href: "/settings",
      label: "Projects",
      icon: (
        <IconWrapper>
          <Settings />
        </IconWrapper>
      ),
      active: pathName === "/settings",
    },
  ]

  return (
    <div className="bg-white shadow-sm p-4 border-b flex justify-between items-center">
      <div
        className="flex text-blue-600 font-medium text-lg space-x-2 items-center justify-center"
        id="burger-menu-wrap"
      >
        <Clock size={30} />
        <h1>Time Tracker</h1>
      </div>

      <div className="flex space-x-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              buttonVariants({ variant: "secondary", size: "default" }),
              "space-x-2",
              route.active
                ? "bg-blue-600 text-white hover:bg-blue-600"
                : "hover:bg-gray-300/50"
            )}
          >
            {route.icon}
            <p>{route.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar
