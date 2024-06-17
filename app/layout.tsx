import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as BetterToast } from "react-hot-toast"
import SideBar from "@/components/sidebar/sidebar"
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import SyncActiveOrganization from "@/components/sync-active-organization"

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
      <SyncActiveOrganization />
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <BetterToast />
          <div className="flex">
            <SideBar />
            <main className="flex flex-col w-full min-h-screen items-center mt-5 lg:mt-0">
              <div className="w-full flex justify-end p-2">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
