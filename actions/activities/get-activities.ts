"use server"

import activitiesPrismaCodesMap from "@/app/(routes)/settings/utils/activities-prisma-codes"
import prisma from "@/lib/db"

export const getActivities = async () => {
  try {
    return await prisma.activity.findMany()
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
  }
}
