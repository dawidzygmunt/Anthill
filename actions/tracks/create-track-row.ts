"use server"

import prisma from "@/lib/db"

import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import revalidateTracks from "./revalidate"
import { CustomError, handleError } from "@/utils/error-handler"

const createTrackRow = async (activityId: string, from: Date) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      let week = await prisma.week.findFirst({
        where: {
          from,
        },
      })
      if (!week) {
        week = await prisma.week.create({
          data: {
            from,
          },
        })
      }

      const istTackRow = await prisma.trackRow.findFirst({
        where: {
          activityId,
          weekId: week.id,
        },
      })
      if (istTackRow) {
        throw new CustomError("Track row already exists", "ALREADY_EXISTS")
      }

      const trackRow = await prisma.trackRow.create({
        data: {
          activityId,
          weekId: week.id,
        },
      })
      revalidateTracks()
      return { week, trackRow }
    })
    return result
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}
export default createTrackRow
