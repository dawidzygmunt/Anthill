"use server"

import prisma from "@/lib/db"
import { editFormSchema } from "@/schemas/edit-form-schema"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import { handleError } from "@/utils/error-handler"

export const patchActivity = async (activity: {
  id: string
  color: string
  name: string
}) => {
  try {
    const data = editFormSchema.parse(activity)

    const updatedActivity = await prisma.activity.update({
      where: {
        id: data.id,
      },
      data: activity,
    })
    return updatedActivity
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
