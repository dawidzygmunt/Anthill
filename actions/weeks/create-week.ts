"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"

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
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
