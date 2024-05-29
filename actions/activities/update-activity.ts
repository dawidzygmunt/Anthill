"use server"

import prisma from "@/lib/db"
import { editFormSchema } from "@/schemas/edit-form-schema"
import { extractErrorMessage } from "@/lib/utils"
import activitiesPrismaCodesMap from "@/app/(routes)/settings/utils/activities-prisma-codes"

export const patchActivity = async (activity: {
  id: string
  color: string
  name: string
}) => {
  try {
    const data = editFormSchema.parse(activity)
    const result = await prisma.activity.findFirst({
      where: { id: data.id },
    })
    if (!result) return { error: "Activity not found" }

    const updatedActivity = await prisma.activity.update({
      where: {
        id: data.id,
      },
      data: activity,
    })
    return updatedActivity
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
