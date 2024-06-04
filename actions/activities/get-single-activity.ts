"use server"

import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import prisma from "@/lib/db"
import { idSchema } from "@/schemas/activities/id-schema"
import { CustomError, handleError } from "@/utils/error-handler"

export const getSingleActivity = async (activityId: string) => {
  try {
    const parsedData = idSchema.parse({ id: activityId })
    const action = await prisma.activity.findFirst({
      where: { id: parsedData.id },
    })
    if (!action) throw new CustomError("Activity not found", "NOT_FOUND")
    return action
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
