"use server"
import prisma from "@/lib/db"
import { Activity } from "@prisma/client"
import { z } from "zod"

const activitySchema = z.object({
  id: z.string().min(3, { message: "Activity id required" }),
  name: z.string().min(1, { message: "Name is required" }),
})

export const PatchActivity = async (activity: Activity) => {
  try {
    const result = activitySchema.parse(activity)
    const newActivity = await prisma.activity.update({
      where: {
        id: activity.id,
      },
      data: activity,
    })
    if (!newActivity)
      return { error: `Activity with this ${activity.id} Id not found` }
    return newActivity
  } catch (err: any) {
    if ("errors" in err && err.error.length > 0) {
      return { error: err.errors[0].message }
    }
    return { error: "Something went wrong!" }
  }
}
