"use server"

import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import prisma from "@/lib/db"
import { idSchema } from "@/schemas/activities/id-schema"
import { CustomError, handleError } from "@/utils/error-handler"

export const deleteActivity = async (id: string) => {
  try {
    if (!id) throw new CustomError("activity ID is required", "ID_REQUIRED")
    const parsedData = idSchema.parse({ id: id })

    const activity = await prisma.activity.delete({
      where: {
        id: parsedData.id,
      },
    })
    return activity
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
