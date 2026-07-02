"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Activity } from "@prisma/client"

export const getActivities = async (): Promise<Result<Activity[]>> => {
  try {
    const actions = await prisma.activity.findMany({
      where: {
        deletedAt: null,
      },
    })
    return ok(actions)
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}

export const getAllActivities = async (): Promise<Result<Activity[]>> => {
  try {
    const actions = await prisma.activity.findMany()
    return ok(actions)
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
