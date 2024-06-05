"use server"

import prismaCodesMap from "@/app/(routes)/settings/utils/prismaCodes"
import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"
import { idSchema } from "@/schemas/activities/id-schema"
import revalidate from "../tracks/revalidate"

export const deleteActivity = async (id: string) => {
  try {
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
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
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
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
