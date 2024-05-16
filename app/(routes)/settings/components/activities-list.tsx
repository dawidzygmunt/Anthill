"use client"
import { Button } from "@/components/ui/button"
import { Activity } from "@prisma/client"
import Link from "next/link"
import { AddActivityForm } from "./add-activity-form"
import { useState } from "react"
import { ActivitiesProps } from "@/lib/types"
import { postActivities } from "@/actions/post-activities"
import toast from "react-hot-toast"
import { deleteActivity } from "@/actions/delete-activity"
import { DeleteIcon } from "./delete-icon"
import { EditIcon } from "./edit-icon"

export const ActivitiesList = ({ data }: { data: Activity[] }) => {
  const [activities, setActivities] = useState(data)

  async function handleActivityAdd(activity: ActivitiesProps) {
    const newActivity = await postActivities(activity)
    if ("error" in newActivity) {
      toast.error(newActivity.error)
      return
    }
    setActivities([...activities, newActivity])
    toast.success("Activity added")
  }

  const handleDelete = async (id: string) => {
    const result = await deleteActivity(id)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    setActivities(activities.filter((activity) => activity.id !== result.id))
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
                <EditIcon className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              className="ml-2"
              onClick={() => handleDelete(activity.id)}
              variant="destructive"
            ></Button>
            <DeleteIcon className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}
