"use client"

import {
  deleteActivity,
  hardDeleteActivity,
} from "@/actions/activities/delete-activity"
import { patchActivity } from "@/actions/activities/update-activity"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DisplayError from "@/utils/display-error"
import { Activity } from "@prisma/client"
import { Delete, Edit, MoreHorizontal, Trash2, Undo2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const EditActivityFormv2 = ({ activity }: { activity: Activity }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleEdit = async (activityId: string) => {
    router.push(`/settings/${activityId}?${searchParams}`)
  }

  const handleDelete = async (activityId: string) => {
    const result = await deleteActivity(activityId)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    toast.success("Activity deleted")
  }

  const handleHardDelete = async (activityId: string) => {
    const result = await hardDeleteActivity(activityId)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    toast.success("Activity deleted")
  }

  const handleRestore = async (activity: Activity) => {
    const result = await patchActivity({ ...activity, deletedAt: null })
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    toast.success("Activity restored")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {!activity.deletedAt ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <Link href={`/settings/${activity.id}?${searchParams}`}> */}
          <DropdownMenuItem
            onClick={() => handleEdit(activity.id)}
            className="flex gap-2 justify-between"
          >
            Edit
            <Edit size={20} />
          </DropdownMenuItem>
          {/* </Link> */}

          <DropdownMenuItem
            onClick={() => handleDelete(activity.id)}
            className="flex gap-2 justify-between"
          >
            Delete
            <Trash2 size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex gap-2 justify-between"
            onClick={() => handleRestore(activity)}
          >
            Restore
            <Undo2 size={20} />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleHardDelete(activity.id)}
            className="flex gap-2 justify-between"
          >
            Hard delete
            <Delete size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
