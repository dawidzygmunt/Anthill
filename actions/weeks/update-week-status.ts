"use server"

import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"

type UpdateWeekStatusParams =
  | { weekId: string; from?: never; isClosed: boolean }
  | { weekId?: never; from: Date; isClosed: boolean }

export const updateWeekStatus = async (params: UpdateWeekStatusParams) => {
  try {
    if ("weekId" in params && params.weekId) {
      return await prisma.week.update({
        where: { id: params.weekId },
        data: { isClosed: params.isClosed },
      })
    }

    if ("from" in params && params.from) {
      const week = await prisma.week.findFirst({
        where: { from: params.from },
      })
      if (!week) {
        throw new CustomError("Week not found", "NOT_FOUND")
      }
      return await prisma.week.update({
        where: { id: week.id },
        data: { isClosed: params.isClosed },
      })
    }

    throw new CustomError(
      "Either weekId or from date required",
      "INVALID_INPUT"
    )
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}

// Backward compatibility exports (deprecated)
/** @deprecated Use updateWeekStatus instead */
export const CloseWeek = async (weekId: string, isClosed: boolean) =>
  updateWeekStatus({ weekId, isClosed })

/** @deprecated Use updateWeekStatus instead */
export const updateSingleWeek = async (from: Date, isClosed: boolean) =>
  updateWeekStatus({ from, isClosed })
