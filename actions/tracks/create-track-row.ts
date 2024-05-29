"use server"

import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import tracksPrismaCodesMap from "@/utils/tracks-prisma-codes"
import revalidateTracks from "./revalidate"

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
        return {
          error: "Track row already exists",
        }
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
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in tracksPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = tracksPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}

export default createTrackRow
