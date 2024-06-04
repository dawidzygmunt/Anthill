"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"

export const getActivities = async () => {
  try {
    return await prisma.activity.findMany()
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
