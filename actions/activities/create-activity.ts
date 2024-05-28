"use server"

import prismaCodesMap from "@/app/(routes)/settings/utils/prismaCodes"
import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"
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
  } catch (err: any) {
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
