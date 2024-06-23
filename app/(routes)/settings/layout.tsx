import NotAuthorized from "@/components/not-authorized"
import OfflineNotification from "@/components/offline-notification"
import { handleError } from "@/utils/error-handler"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { useContext } from "react"

// export const metadata: Metadata = {
//   title: "Anthill v2",
//   description: "Control your work time with Anthill v2",
// }

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
