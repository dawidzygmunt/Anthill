"use server"
import prismaCodesMap from "@/utils/prisma-codes"
import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"

export const updateSingleWeek = async (from: Date, isDone: boolean) => {
  try {
    const week = await prisma.week.findFirst({
      where: {
        from,
      },
    })
    if (!week) return { error: "There are no activities for this week" }
    return await prisma.week.update({
      where: { id: week.id },
      data: {
        isClosed: isDone,
      },
    })
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    console.log(err.message)
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
