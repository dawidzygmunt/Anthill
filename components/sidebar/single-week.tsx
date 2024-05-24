import React from "react"
import { DoneIndicator } from "./done-indicator"
import { addDays, format } from "date-fns"
import { Track, TrackRow, Week } from "@prisma/client"
import { timeFormatter } from "@/lib/utils"
import { getSingleActivity } from "@/actions/get-single-activity"

interface SingleWeekProps {
  week: Week & { TrackRow: (TrackRow & { Track: Track[] })[] }
}

export const SingleWeek: React.FC<SingleWeekProps> = async ({ week }) => {
  const from = week.from
  const to = addDays(from, 7)

  const activityMinutesMap = new Map<string, number>()

  const totalMinutes = week.TrackRow.reduce((sum, trackRow) => {
    return sum + trackRow.Track.reduce((sum, track) => sum + track.minutes, 0)
  }, 0)

  week.TrackRow.forEach((trackRow) => {
    trackRow.Track.forEach((track) => {
      const activityId = trackRow.activityId
      const minutes = track.minutes

      if (activityMinutesMap.has(activityId)) {
        activityMinutesMap.set(
          activityId,
          activityMinutesMap.get(activityId)! + minutes
        )
      } else {
        activityMinutesMap.set(activityId, minutes)
      }
    })
  })

  let maxMinutesActivityId = ""
  let maxMinutes = 0
  activityMinutesMap.forEach((minutes, activityId) => {
    if (minutes > maxMinutes) {
      maxMinutes = minutes
      maxMinutesActivityId = activityId
    }
  })

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`
  const mostActivity = await getSingleActivity(maxMinutesActivityId)
  if ("error" in mostActivity) {
    return
  }

  return (
    <div className="px-5 py-5 flex flex-col justify-center my-4 shadow-md bg-[#f1f0f0]">
      <span className="text-md">{formattedDateRange}</span>
      <div className="font-bold my-1">{mostActivity.name}</div>
      <div className="flex justify-between items-center">
        <DoneIndicator isDone={week.isClosed} />
        <div className="text-sm bg-slate-300 px-2 rounded-xl mr-6">
          {timeFormatter(totalMinutes)}
        </div>
      </div>
    </div>
  )
}
