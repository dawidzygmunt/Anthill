"use server"

import activitiesPrismaCodesMap from "@/app/(routes)/settings/utils/activities-prisma-codes"
import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import { idSchema } from "@/schemas/activities/id-schema"

export const deleteActivity = async (id: string) => {
  try {
    const parsedData = idSchema.parse({ id: id })

    const activity = await prisma.activity.delete({
      where: {
        id: parsedData.id,
      },
    })
    return activity
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in activitiesPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = activitiesPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}
