"use client"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

import { Activity } from "@prisma/client"
import Link from "next/link"
import { AddActivityForm } from "./add-activity-form"
import { useState } from "react"
import { ActivitiesProps } from "@/lib/types"
import { PostActivities } from "@/actions/post-activities"
import toast from "react-hot-toast"
import { DeleteActivity } from "@/actions/delete-activity"

export const ActivitiesList = ({ data }: { data: Activity[] }) => {
  const [activities, setActivities] = useState(data)

  async function handleActivityAdd(activity: ActivitiesProps) {
    const newActivity = await PostActivities(activity)
    if ("error" in newActivity) {
      toast.error(newActivity.error)
      return
    }
    setActivities([...activities, newActivity])
    toast.success("Activity added")

    toast.error("Internal error")
  }

  const handleDelete = async (id: string) => {
    const result = await DeleteActivity(id)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Activity deleted")
  }
  return (
    <div className="flex flex-col">
      <AddActivityForm onActivityAdd={handleActivityAdd} />
      {activities?.map((activity, index) => (
        <div
          key={index}
          className="px-3 pl-5 py-2 bg-[#e5e3e3] m-3 w-[400px] rounded-sm flex justify-between items-center"
        >
          {activity.name}
          <div>
            <Link href={`/settings/${activity.id}`}>
              <Button className="mr-1">
                <Edit size={15} />
              </Button>
            </Link>
            <Button
              className="ml-2"
              onClick={() => handleDelete(activity.id)}
              variant="destructive"
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
