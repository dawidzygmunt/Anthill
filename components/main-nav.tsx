// "use client"

// import { cn } from "@/lib/utils"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export function MainNavbar({ className }: React.HTMLAttributes<HTMLElement>) {
//   const pathName = usePathname()

//   const routes = [
//     {
//       href: "/",
//       label: "Dashboard",
//       active: pathName === "/",
//     },
//     {
//       href: "/settings",
//       label: "Settings",
//       active: pathName === "/settings",
//     },
//   ]
//   return (
//     <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
//       {routes.map((route) => (
//         <Link
//           key={route.href}
//           href={route.href}
//           className={cn(
//             "text-md font-semibold transition-colors hover:text-primary",
//             route.active ? "text-blue-600 font-bold" : "text-muted-foreground"
//           )}
//         >
//           {route.label}
//         </Link>
//       ))}
//     </nav>
//   )
// }
