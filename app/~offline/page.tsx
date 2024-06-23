import OfflineNotification from "@/components/offline-notification"
import { WifiOffIcon } from "lucide-react"
import React from "react"

const XddPage = () => {
  return (
    <div className="text-4xl flex justify-center items-center min-h-screen">
      <OfflineNotification />
      No internet connection <WifiOffIcon />
    </div>
  )
}

export default XddPage
