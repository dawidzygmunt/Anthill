"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Prisma, Week } from "@prisma/client"
import { toUtcMidnight } from "@/lib/utils"

type TrackRowsInput = Prisma.TrackRowCreateNestedManyWithoutWeekInput

export const createWeek = async (
  from: Date,
  trackRows?: TrackRowsInput
): Promise<Result<Week>> => {
  try {
    const normalizedFrom = toUtcMidnight(from)
    return ok(
      await prisma.week.upsert({
        where: { from: normalizedFrom },
        update: {},
        create: { from: normalizedFrom, TrackRow: trackRows },
      })
    )
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
