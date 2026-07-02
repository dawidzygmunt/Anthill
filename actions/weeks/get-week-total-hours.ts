"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { Result, ok } from "@/utils/result"

const getWeekTotalHours = async (from: Date): Promise<Result<{ totalMinutes: number }>> => {
  try {
    const week = await prisma.week.findFirst({
      where: { from },
      include: { TrackRow: { include: { Track: true } } },
      orderBy: { createdAt: "asc" },
    })

    if (!week) {
      return ok({ totalMinutes: 0 })
    }

    const totalMinutes = week.TrackRow.reduce((sum, trackRow) => {
      const rowTotal = trackRow.Track.reduce((rowSum, track) => {
        return rowSum + (track.minutes || 0)
      }, 0)
      return sum + rowTotal
    }, 0)

    return ok({ totalMinutes })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getWeekTotalHours
