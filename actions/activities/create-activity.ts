"use server"

import {
  default as activitiesPrismaCodesMap,
  default as prismaCodesMap,
} from "@/app/(routes)/settings/utils/activities-prisma-codes"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { getRandomHexColor } from "@/lib/utils"
import { z } from "zod"

const activitySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Activity Name is required" })
    .max(40, "Activity Name cannot be longer than 40 characters"),
})

export const createActivity = async (data: ActivitiesProps) => {
  const randomColor = getRandomHexColor()
  try {
    const parsedData = activitySchema.parse(data)
    const activity = await prisma.activity.create({
      data: { name: parsedData.name, color: randomColor },
    })
    return activity
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in prismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = activitiesPrismaCodesMap[prismaCode]
      return { error: message }
    }
  }
}
