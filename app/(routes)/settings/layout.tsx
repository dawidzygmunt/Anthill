import NotAuthorized from "@/components/not-authorized"
import { handleError } from "@/utils/error-handler"
import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anthill v2",
  description: "Control your work time with Anthill v2",
}

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  try {
    const user = await currentUser()
    if (user?.id && user.publicMetadata?.role === "admin") {
      return <>{children}</>
    }
  } catch (error) {
    handleError(error)
  }
  return <NotAuthorized />
}
