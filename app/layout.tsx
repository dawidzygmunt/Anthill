import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as BetterToast } from "react-hot-toast"
import SideBar from "@/components/sidebar/sidebar"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anthill v2",
  description: "Control your work time with Anthill v2",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <BetterToast />
          <div className="flex">
            <SideBar />
            <main className="flex w-full min-h-screen justify-center mt-10 lg:mt-0">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
