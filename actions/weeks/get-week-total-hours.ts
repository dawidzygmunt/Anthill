"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { computeTotalMinutes } from "@/lib/aggregations"
import { toUtcMidnight } from "@/lib/utils"

const getWeekTotalHours = async (from: Date): Promise<Result<{ totalMinutes: number }>> => {
  try {
    const normalizedFrom = toUtcMidnight(from)
    const week = await prisma.week.findFirst({
      where: { from: normalizedFrom },
      include: { TrackRow: { include: { Track: true } } },
      orderBy: { createdAt: "asc" },
    })

    if (!week) {
      return ok({ totalMinutes: 0 })
    }

    const totalMinutes = computeTotalMinutes(week.TrackRow)

    return ok({ totalMinutes })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getWeekTotalHours
