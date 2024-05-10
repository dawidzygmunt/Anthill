"use server"

import prisma from "@/lib/db"
import { addDays, differenceInDays, isSameDay } from "date-fns"

const getTracksForPeriod = async (activityId: string, from: Date, to: Date) => {
  const days = differenceInDays(to, from)

  const dates = Array.from(Array(days).keys()).map((shift) =>
    addDays(from, shift)
  )

  const tracks = await prisma.track.findMany({
    where: {
      activityId,
      date: {
        gte: from,
        lt: to,
      },
    },
  })

  return dates.map(
    (date) =>
      tracks.find((track) => isSameDay(track.date, date)) || {
        date,
        activityId,
      }
  )
}

export default getTracksForPeriod
