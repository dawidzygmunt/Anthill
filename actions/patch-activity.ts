"use server"
import prisma from "@/lib/db"
import { Activity } from "@prisma/client"
import { z } from "zod"

const activitySchema = z.object({
  id: z.string({ message: "activity Id is required" }),
})

export const PatchActivity = async (activity: Activity) => {
  const result = activitySchema.safeParse(activity)
  if (!result.success) return { error: result.error }
  const newActivity = await prisma.activity.update({
    where: {
      id: activity.id,
    },
    data: activity,
  })
  if (!newActivity)
    return { message: `Activity with this ${activity.id} Id not found` }
  return newActivity
}
