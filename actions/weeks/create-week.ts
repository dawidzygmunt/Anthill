"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"

export const createWeek = async (from: Date, to: Date, TrackRows: any) => {
  try {
    const week = await prisma.week.findFirst({
      where: { from },
    })
    if (!week) {
      return await prisma.week.create({
        data: {
          from,
          TrackRow: TrackRows,
        },
      })
    }
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
