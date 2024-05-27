"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"
import { idSchema } from "@/schemas/activities/id-schema"

export const getSingleActivity = async (activityId: string) => {
  try {
    const parsedData = idSchema.parse({ id: activityId })
    const action = await prisma.activity.findFirst({
      where: { id: parsedData.id },
    })
    if (!action) return { error: "Can't find activity with this Id" }
    return action
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
