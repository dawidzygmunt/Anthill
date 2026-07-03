"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Week } from "@prisma/client"
import { toUtcMidnight } from "@/lib/utils"

export const getSingleWeek = async (from: Date): Promise<Result<Week | null>> => {
  try {
    const normalizedFrom = toUtcMidnight(from)
    return ok(
      await prisma.week.findFirst({
        where: {
          from: normalizedFrom,
        },
      })
    )
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
