"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Week } from "@prisma/client"

export const getSingleWeek = async (from: Date): Promise<Result<Week | null>> => {
  try {
    return ok(
      await prisma.week.findFirst({
        where: {
          from,
        },
      })
    )
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
