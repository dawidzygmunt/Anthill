"use server"

import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { getRandomHexColor } from "@/lib/utils"
import { handleError } from "@/utils/error-handler"
import activitiesPrismaCodesMap from "@/utils/prisma-codes/activities-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Activity } from "@prisma/client"
import { z } from "zod"

const activitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Activity Name is required" })
    .max(40, { message: "Activity Name is too long" }),
})

export const createActivity = async (
  data: ActivitiesProps
): Promise<Result<Activity>> => {
  try {
    const parsedData = activitySchema.parse(data)
    const activity = await prisma.activity.create({
      data: { name: parsedData.name, color: getRandomHexColor() },
    })
    return ok(activity)
  } catch (error) {
    return handleError(error, activitiesPrismaCodesMap)
  }
}
