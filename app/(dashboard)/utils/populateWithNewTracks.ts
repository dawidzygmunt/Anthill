import { Track } from "@prisma/client"
import { addDays, differenceInDays, isSameDay } from "date-fns"

const populateWithNewTracks = (
  tracks: Track[],
  activityId: string,
  from: Date,
  to: Date
) => {
  const days = differenceInDays(to, from)

  const dates = Array.from(Array(days).keys()).map((shift) =>
    addDays(from, shift)
  )

  return dates.map(
    (date) =>
      tracks.find((track) => isSameDay(track.date, date)) || {
        date,
        activityId,
      }
  )
}

export default populateWithNewTracks
