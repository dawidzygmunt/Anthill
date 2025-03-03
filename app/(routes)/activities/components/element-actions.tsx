"use client"
import { deleteActivity } from "@/actions/activities/delete-activity"
import revalidate from "@/actions/tracks/revalidate"
import { Button } from "@/components/ui/button"
import DisplayError from "@/utils/display-error"
import { Activity } from "@prisma/client"
import { EditIcon, Trash2 } from "lucide-react"
import Link from "next/link"
import React from "react"
import toast from "react-hot-toast"

export const ElementActions = ({ activity }: { activity: Activity }) => {
  const handleDelete = async () => {
    const result = await deleteActivity(activity.id)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    revalidate(`/settings`)
    toast.success("Activity deleted")
  }
  return (
    <div className="flex flex-1">
      <Link href={`/settings/${activity.id}`}>
        <Button className="mr-1">
          <EditIcon className="w-5 h-5" />
        </Button>
      </Link>

      <Button className="ml-2" variant="destructive" onClick={handleDelete}>
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  )
}
