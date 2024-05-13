"use server"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { error } from "console"
import { z } from "zod"

const activitySchema = z.object({
  id: z.string({ message: "Activity name is required" }),
})

export const PostActivities = async (data: ActivitiesProps) => {
  const result = activitySchema.safeParse(data)
  if (!result.success) return { error: result.error }
  const activity = await prisma.activity.create({
    data: data,
  })
  return activity
}
