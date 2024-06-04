"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"

export const getActivities = async () => {
  try {
    const actions = await prisma.activity.findMany({
      where: {
        deletedAt: null,
      },
    })
    return actions
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}

export const getAllActivities = async () => {
  try {
    const actions = await prisma.activity.findMany()
    return actions
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
