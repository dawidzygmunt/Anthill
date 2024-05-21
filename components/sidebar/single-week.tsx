import React from "react"
import { DoneIndicator } from "./done-indicator"
import { addDays, format } from "date-fns"
import { Track, TrackRow } from "@prisma/client"

interface SingleWeekProps {
  data: TrackRow & { Track: Track[] }
}

export const SingleWeek: React.FC<SingleWeekProps> = ({ data }) => {
  const from = data.from
  const to = addDays(from, 7)
  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`
  const totalMinutes = data.Track.reduce((sum, track) => sum + track.minutes, 0)
  const roundedMinutes = Math.round(totalMinutes / 30) * 30
  const totalHours = Math.floor(roundedMinutes / 60)
  const totalRoundedMinutes = roundedMinutes % 60
  const formattedTime = `${totalHours}:${totalRoundedMinutes === 0 ? "00" : totalRoundedMinutes}`

  return (
    <div className="px-5 py-5 flex flex-col justify-center my-4 shadow-md bg-[#f1f0f0]">
      <span className="text-sm">{formattedDateRange}</span>
      <div className="flex items-center">
        {/* <DoneIndicator isDone={data.createdAt} /> */}

        {formattedTime}
        {/* {data.id} */}
      </div>
    </div>
  )
}
