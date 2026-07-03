"use server"

import prisma from "@/lib/db"

import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import revalidateTracks from "./revalidate"
import { CustomError, handleError } from "@/utils/error-handler"
import { Result, ok } from "@/utils/result"
import { Week, TrackRow } from "@prisma/client"
import { toUtcMidnight } from "@/lib/utils"

const createTrackRow = async (
  activityId: string,
  from: Date
): Promise<Result<{ week: Week; trackRow: TrackRow }>> => {
  try {
    const normalizedFrom = toUtcMidnight(from)
    const result = await prisma.$transaction(async (prisma) => {
      const week = await prisma.week.upsert({
        where: { from: normalizedFrom },
        update: {},
        create: { from: normalizedFrom },
      })

      const existingTrackRow = await prisma.trackRow.findFirst({
        where: {
          activityId,
          weekId: week.id,
        },
      })
      if (existingTrackRow) {
        throw new CustomError("Track row already exists", "ALREADY_EXISTS")
      }

      const trackRow = await prisma.trackRow.create({
        data: {
          activityId,
          weekId: week.id,
        },
      })
      return { week, trackRow }
    })

    revalidateTracks()
    return ok(result)
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}
export default createTrackRow
