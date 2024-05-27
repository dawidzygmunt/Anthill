"use server"

import prisma from "@/lib/db"
import prismaCodesMap from "@/utils/prisma-codes"
import { tr } from "@faker-js/faker"
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
      return { week, trackRow }
    })
    revalidateTracks()
    return result
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    return { error: "Something went wrong" }
  }
}

export default createTrackRow
