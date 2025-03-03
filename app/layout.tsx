import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster as BetterToast } from "react-hot-toast"
import SideBar from "@/components/sidebar/sidebar"

const inter = Inter({ subsets: ["latin"] })

import type { Metadata, Viewport } from "next"
import OfflineNotification from "@/components/offline-notification"
import TopBar from "@/components/topbar"

const APP_NAME = "Anthill v2"
const APP_DEFAULT_TITLE = "App"
const APP_TITLE_TEMPLATE = "%s - PWA App"
const APP_DESCRIPTION = "Best Anthill app in the world!"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#3e4e6b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OfflineNotification />
        <BetterToast />
        <div className="flex">
          <SideBar />
          <main className="flex flex-col w-full min-h-screen">
            <TopBar />
            <div className="bg-[#f4f8f9] w-full h-full pt-3">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
