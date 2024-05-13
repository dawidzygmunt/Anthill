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
    const data = activitySchema.parse(activity)
    const result = await prisma.activity.findFirst({
      where: { id: data.id },
    })

    const updatedActivity = await prisma.activity.update({
      where: {
        id: activity.id,
      },
      data: activity,
    })
    return updatedActivity
  } catch (err: any) {
    if ("errors" in err && err.errors.length > 0) {
      return { error: err.errors[0].message }
    }
    return { error: "Something went wrong!" }
  }
}
