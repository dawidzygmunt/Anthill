"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  deleteActivity,
  hardDeleteActivity,
} from "@/actions/activities/delete-activity"
import {
  ArrowUpDown,
  Delete,
  Edit,
  MoreHorizontal,
  Trash2,
  Undo2,
} from "lucide-react"
import { patchActivity } from "@/actions/activities/update-activity"
import toast from "react-hot-toast"
import { Activity } from "@prisma/client"
import DisplayError from "@/utils/display-error"

const handleDelete = async (activityId: string) => {
  const result = await deleteActivity(activityId)
  if ("error" in result) {
    DisplayError(result.error)
    return
  }
  toast.success("Activity deleted")
}

const handleHardDelete = async (activityId: string) => {
  const result = await hardDeleteActivity(activityId)
  if ("error" in result) {
    DisplayError(result.error)
    return
  }
  toast.success("Activity deleted")
}

const handleRestore = async (activity: Activity) => {
  const result = await patchActivity({ ...activity, deletedAt: null })
  if ("error" in result) {
    DisplayError(result.error)
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {!row.original.deletedAt ? (
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/settings/${activity.id}`}>
                <DropdownMenuItem className="flex gap-2 justify-between">
                  Edit
                  <Edit size={20} />
                </DropdownMenuItem>
              </Link>
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
    },
  },
]
