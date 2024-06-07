"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"

export const getActivities = async () => {
  try {
    const actions = await prisma.activity.findMany({
      where: {
        deletedAt: null,
      },
    })
    return actions
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}

export const getAllActivities = async () => {
  try {
    const actions = await prisma.activity.findMany()
    return actions
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
