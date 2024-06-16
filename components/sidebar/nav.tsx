"use client"

import { Home, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export const Nav = () => {
  const pathName = usePathname()
  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathName === `/`,
      icon: <Home />,
    },
    {
      href: `/settings`,
      label: "Settings",
      active: pathName === `/settings`,
      icon: <Settings />,
    },
  ]
  return (
    <div className="p-4 bg-[#0d1321] text-[#8d8d8d] flex ">
      {routes.map((route) => (
        <div
          className={`flex flex-col items-center mr-2 hover:cursor-pointer transition-all
          duration-300 ease-in-out ${route.active ? "text-slate-100 " : ""} hover:text-slate-600`}
          key={route.href}
        >
          <Link className={`flex flex-col items-center `} href={route.href}>
            {route.icon}
            <p className="text-sm">{route.label}</p>
          </Link>
        </div>
      ))}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
