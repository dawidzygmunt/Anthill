"use server"

import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import prisma from "@/lib/db"
import { idSchema } from "@/schemas/activities/id-schema"
import revalidate from "../tracks/revalidate"
import { CustomError, handleError } from "@/utils/error-handler"
import { currentUser } from "@clerk/nextjs/server"

export const deleteActivity = async (id: string) => {
  try {
    const user = await currentUser()
    if (!user?.id || user.publicMetadata?.role !== "admin") {
      throw new CustomError("User not authorized", "NOT_AUTH")
    }
    if (!id) throw new CustomError("activity ID is required", "ID_REQUIRED")
    const parsedData = idSchema.parse({ id: id })

    const activity = await prisma.activity.update({
      where: {
        id: parsedData.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
    revalidate("/settings")
    return activity
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}

export const hardDeleteActivity = async (id: string) => {
  try {
    const parsedData = idSchema.parse({ id: id })

    const activity = await prisma.activity.delete({
      where: {
        id: parsedData.id,
      },
    })
    revalidate("/settings")
    return activity
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
