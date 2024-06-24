"use client"
import { Button } from "@/components/ui/button"
import React from "react"

const Playground = () => {
  const notifyMe = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {
      // if so, create a notification
      const notification = new Notification("Test notification!")
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Access granted!")
          // …
        }
      })
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  return (
    <div className="flex min-h-screen items-center">
      <Button onClick={notifyMe}>Notify me</Button>
    </div>
  )
}

export default Playground
