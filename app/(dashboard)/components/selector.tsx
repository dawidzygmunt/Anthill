"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Activity } from "@prisma/client"
import changeActivityForTrackRow from "../server-actions/change-activity-for-track-row"
import revalidateTracks from "../server-actions/revalidate-tracks"

import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"

interface Props {
  activities: Activity[]
  activityId: string
  trackRowId?: string
  onChange?: (activityId: string) => void
}

export function ActivitySelector({
  activities,
  activityId,
  onChange,
  trackRowId,
}: Props) {
  const [selectedActivity, setSelectedActivity] = useState(activityId)

  useEffect(() => {
    setSelectedActivity(activityId)
  }, [activityId])

  const handleActivityChange = async (value: string) => {
    if (onChange) onChange(value)
    else if (trackRowId) {
      const result = await changeActivityForTrackRow(trackRowId, value)
      if ("error" in result) {
        toast.error(result.error)
        setSelectedActivity(activityId)
      } else {
        revalidateTracks()
        setSelectedActivity(value)
      }
    }
  }
  return (
    <div className="col-span-2 flex items-center text-[2px]">
      <form className="w-[200px] space-y-6">
        <select
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedActivity}
          onChange={(e) => handleActivityChange(e.target.value)}
        >
          <option value="">Select your activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
          <option value="new">Add new +</option>
        </select>
      </form>
    </div>
  )
}

export default ActivitySelector
