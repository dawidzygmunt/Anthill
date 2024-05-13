"use server"
import prisma from "@/lib/db"
import { Activity } from "@prisma/client"

export const PatchActivity = async (activity: Activity) => {
  const newActivity = await prisma.activity.update({
    where: {
      id: activity.id,
    },
    data: activity,
  })
  return newActivity
}
