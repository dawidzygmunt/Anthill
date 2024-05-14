"use server"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { error } from "console"
import { z } from "zod"

const activitySchema = z.object({
  name: z.string().min(2, { message: "Activity Name is required" }),
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
    return { error: "Internal error" }
  }
}
