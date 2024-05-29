"use server"

import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import weeksPrismaCodesMap from "@/utils/weeks-prisma-codes"

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
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in weeksPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = weeksPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}
