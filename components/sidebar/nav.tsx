"use client"

import {
  Activity,
  Bell,
  ClipboardMinus,
  Home,
  LayoutDashboard,
  Settings,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export const Nav = () => {
  const pathName = usePathname()
  const routes = [
    {
      href: `/`,
      label: "Dashboard",
      active: pathName === `/`,
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: `/activities`,
      label: "Activities",
      active: pathName === `/activities`,
      icon: <Activity size={20} />,
    },
    {
      href: `/settings`,
      label: "Settings",
      active: pathName === `/settings`,
      icon: <Settings size={20} />,
    },
    {
      href: `/security`,
      label: "Security",
      active: pathName === `/security`,
      icon: <Shield size={20} />,
    },
    {
      href: `/notification`,
      label: "Notification",
      active: pathName === `/notification`,
      icon: <Bell size={20} />,
    },
    {
      href: `/reports`,
      label: "Reports",
      active: pathName === `/reports`,
      icon: <ClipboardMinus size={20} />,
    },
  ]
  return (
    <div className="text-gray-100 flex flex-col gap-2">
      {routes.map((route) => (
        <div
          className={`flex flex-col p-2 px-3 hover:cursor-pointer transition-all duration-300 ease-in-out rounded-sm ${route.active ? "bg-[#176869]" : ""}`}
          key={route.href}
        >
          <Link className="flex space-x-2" href={route.href}>
            <span className="text-white/70">{route.icon}</span>
            <p className="text-sm">{route.label}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}
