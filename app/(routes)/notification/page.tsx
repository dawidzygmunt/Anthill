"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import EmailNotificationForm from "./components/email-notification-form"
import NotificationForm from "./components/notification-form"

const Notifications = () => {
  const notifyMe = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {
      // if so, create a notification
      const notification = new Notification(
        "You have already enabled notifications!"
      )
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(
            "You have enabled notifications!"
          )
          // …
        }
      })
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <Card>
          <CardContent className="pt-5">
            <NotificationForm />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="pt-5">
            <EmailNotificationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Notifications
