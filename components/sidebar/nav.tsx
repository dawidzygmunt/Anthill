"use client"

import { Clock, Folder, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Nav = () => {
  const pathName = usePathname()
  const routes = [
    { href: `/`, label: "Time sheet", icon: Clock },
    { href: `/settings`, label: "Projects", icon: Folder },
    { href: `/reports`, label: "Reports", icon: BarChart3 },
  ]

  return (
    <nav className="ah-nav">
      {routes.map((route) => {
        const Icon = route.icon
        const isActive = pathName === route.href
        return (
          <Link
            key={route.href}
            href={route.href}
            className={`ah-nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
