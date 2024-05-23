import React from "react"
import { DoneIndicator } from "./done-indicator"
import { addDays, format } from "date-fns"
import { Track, TrackRow, Week } from "@prisma/client"

interface SingleWeekProps {
  week: Week & { TrackRow: (TrackRow & { Track: Track[] })[] }
}

export const SingleWeek: React.FC<SingleWeekProps> = ({ week }) => {
  const from = week.from
  const to = addDays(from, 7)
  // console.log(week)

  const totalMinutes = week.TrackRow.reduce((sum, trackRow) => {
    return sum + trackRow.Track.reduce((sum, track) => sum + track.minutes, 0)
  }, 0)

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`
  // const totalMinutes = data.Track.reduce((sum, track) => sum + track.minutes, 0)
  // const roundedMinutes = Math.round(totalMinutes / 30) * 30
  // const totalHours = Math.floor(roundedMinutes / 60)
  // const totalRoundedMinutes = roundedMinutes % 60
  // const formattedTime = `${totalHours}:${totalRoundedMinutes === 0 ? "00" : totalRoundedMinutes}`

  return (
    <div className="px-5 py-5 flex flex-col justify-center my-4 shadow-md bg-[#f1f0f0]">
      <span className="text-sm">{formattedDateRange}</span>
      <div className="flex items-center">
        <DoneIndicator isDone={week.isClosed} />
        {totalMinutes}
        {/* {data.Track.map((track) => (
          <div key={track.id} className="flex items-center">
            <span className="text-sm">{track.minutes}</span>
            <span className="text-sm ml-2">{track.minutes} minutes</span>
          </div>
        ))} */}
      </div>
    </div>
  )
}
