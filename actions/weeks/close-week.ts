import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"
import React from "react"

export const CloseWeek = async (weekId: string, isClosed: boolean) => {
  try {
    return await prisma.week.update({
      where: { id: weekId },
      data: {
        isClosed: isClosed,
      },
    })
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
