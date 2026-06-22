"use client"

import { Clock, Folder, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Time", icon: Clock },
    { href: "/settings", label: "Projects", icon: Folder },
    { href: "/reports", label: "Reports", icon: BarChart3 },
  ]

  return (
    <nav className="ah-mobile-bottom-nav lg:hidden">
      {routes.map((route) => {
        const Icon = route.icon
        const isActive = pathname === route.href
        return (
          <Link
            key={route.href}
            href={route.href}
            className={`ah-mobile-nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={24} />
            <span>{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
