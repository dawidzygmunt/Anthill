"use server"

import activitiesPrismaCodesMap from "@/app/(routes)/settings/utils/activities-prisma-codes"
import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import { idSchema } from "@/schemas/activities/id-schema"

export const getSingleActivity = async (activityId: string) => {
  try {
    const parsedData = idSchema.parse({ id: activityId })
    const action = await prisma.activity.findFirst({
      where: { id: parsedData.id },
    })
    if (!action) return { error: "Can't find activity with this Id" }
    return action
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
