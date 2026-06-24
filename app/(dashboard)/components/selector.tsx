"use client"

import { Activity } from "@prisma/client"
import changeActivityForTrackRow from "../../../actions/tracks/change-activity-for-track-row"
import revalidateTracks from "../../../actions/tracks/revalidate"

import { useEffect, useState } from "react"
import DisplayError from "@/utils/display-error"

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
      if (result && typeof result === "object" && "error" in result) {        DisplayError(result.error)
        setSelectedActivity(activityId)
      } else {
        revalidateTracks()
        setSelectedActivity(value)
      }
    }
  }
  const currentActivity = activities.find((a) => a.id === selectedActivity)

  return (
    <div className="col-span-2 flex items-center gap-2 text-[2px]">
      {currentActivity && (
        <div className="relative flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full blur-sm opacity-60"
            style={{ backgroundColor: currentActivity.color || "#fefefe" }}
          />
          <div
            className="relative w-3 h-3 rounded-sm"
            style={{ backgroundColor: currentActivity.color || "#fefefe" }}
          />
        </div>
      )}
      <form className="flex-1">
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
          <option value="DELETE">Remove this track --</option>
        </select>
      </form>
    </div>
  )
}

export default ActivitySelector
