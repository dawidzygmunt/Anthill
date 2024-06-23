"use client"
import { WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null
  return (
    <div className="flex w-full justify-center">
      <div className="fixed flex justify-center top-0 w-[250px] bg-gray-600 opacity-95 text-[#e6e6e6] text-md p-2 m-1 z-30 rounded-3xl">
        You are currently offline
        <WifiOff className="ml-2" />
      </div>
    </div>
  )
}

export default OfflineNotification
