import OfflineNotification from "@/components/offline-notification"
import { WifiOffIcon } from "lucide-react"
import React from "react"

const XddPage = () => {
  return (
    <div className="text-4xl flex justify-center items-center min-h-screen">
      <OfflineNotification />
      <span className="m-2">No internet connection </span>
      <WifiOffIcon />
    </div>
  )
}

export default XddPage
