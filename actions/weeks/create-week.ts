"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { Prisma } from "@prisma/client"

type TrackRowsInput = Prisma.TrackRowCreateNestedManyWithoutWeekInput

export const createWeek = async (from: Date, trackRows?: TrackRowsInput) => {
  try {
    const existingWeek = await prisma.week.findFirst({
      where: { from },
    })

    if (existingWeek) {
      return existingWeek
    }

    return await prisma.week.create({
      data: {
        from,
        TrackRow: trackRows,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
