"use server"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { error } from "console"
import { z } from "zod"

const prismaCodesMap: Record<string, string> = {
  P2002: "Activity with this name already exists!",
}

const activitySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Activity Name is required" })
    .max(100, "Activity Name cannot be longer than 100 characters"),
})

export const PostActivities = async (data: ActivitiesProps) => {
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
