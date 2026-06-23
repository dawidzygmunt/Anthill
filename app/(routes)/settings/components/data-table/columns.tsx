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
          className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
        >
          Activity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "id",
    header: () => (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        ID
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Created At
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.createdAt.toDateString()}
      </span>
    ),
  },
  {
    accessorKey: "deletedAt",
    header: () => (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Status
      </span>
    ),
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          row.original.deletedAt
            ? "bg-gray-100 text-gray-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {row.original.deletedAt ? "Archived" : "Active"}
      </span>
    ),
  },
  {
    accessorKey: "color",
    header: () => (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Color
      </span>
    ),
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
    header: () => (
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Actions
      </span>
    ),
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original

      return <EditActivityFormv2 activity={activity} />
    },
  },
]
