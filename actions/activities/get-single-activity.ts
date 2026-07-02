"use server"

import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import prisma from "@/lib/db"
import { idSchema } from "@/schemas/activities/id-schema"
import { CustomError, handleError } from "@/utils/error-handler"
import { Result, ok } from "@/utils/result"
import { Activity } from "@prisma/client"

export const getSingleActivity = async (
  activityId: string
): Promise<Result<Activity>> => {
  try {
    const parsedData = idSchema.parse({ id: activityId })
    const action = await prisma.activity.findFirst({
      where: { id: parsedData.id },
    })
    if (!action) throw new CustomError("Activity not found", "NOT_FOUND")
    return ok(action)
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
