"use server"
import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"

export const PostActivities = async (data: ActivitiesProps) => {
  const activity = await prisma.activity.create({
    data: data,
  })
  return activity
}
