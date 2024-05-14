"use server"

import prismaCodesMap from "@/app/(routes)/settings/utils/prismaCodes"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { z } from "zod"

const activitySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Activity Name is required" })
    .max(100, "Activity Name cannot be longer than 100 characters"),
})

export const postActivities = async (data: ActivitiesProps) => {
  try {
    const parsedData = activitySchema.parse(data)
    const activity = await prisma.activity.create({
      data: { name: parsedData.name },
    })
    return activity
  } catch (err: any) {
    if ("errors" in err && err.errors.lenght > 0)
      return { error: err.errors[0].message }
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    return { error: "Something went wrong" }
  }
}
