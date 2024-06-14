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
import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  Delete,
  Edit,
  MoreHorizontal,
  Trash2,
  Undo2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { EditActivityFormv2 } from "./edit-activity-option"

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

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{row.original.createdAt.toDateString().split("GMT")}</span>
    ),
  },
  {
    accessorKey: "deletedAt",
    header: "Status",
    cell: ({ row }) => (
      <span>{row.original.deletedAt ? "Deleted" : "Active"}</span>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original

      return <EditActivityFormv2 activity={activity} />
    },
  },
]
