"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"

export const getSingleActivity = async (activityId: string) => {
  try {
    if (!activityId) return { error: "activity Id is required" }
    const action = await prisma.activity.findFirst({
      where: { id: activityId },
    })
    if (!action) return { error: "Can't find activity with this Id" }
    return action
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
