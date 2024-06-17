"use server"

import prisma from "@/lib/db"
import { editFormSchema } from "@/schemas/edit-form-schema"
import revalidate from "../tracks/revalidate"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import { CustomError, handleError } from "@/utils/error-handler"
import { currentUser } from "@clerk/nextjs/server"

export const patchActivity = async (activity: {
  id: string
  color: string
  name: string
  deletedAt?: Date | null
}) => {
  try {
    const user = await currentUser()
    if (!user?.id || user.publicMetadata?.role !== "admin") {
      throw new CustomError("User not authorized", "NOT_AUTH")
    }
    const data = editFormSchema.parse(activity)

    const updatedActivity = await prisma.activity.update({
      where: {
        id: data.id,
      },
      data: activity,
    })
    revalidate("/settings")
    return updatedActivity
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
