"use server"

import prisma from "@/lib/db"
import { ActivitiesProps } from "@/lib/types"
import { Activity } from "@prisma/client"

export const GetSingleActivity = async (activityId: string) => {
  if (!activityId) return { error: "activity Id is required" }
  const action = await prisma.activity.findFirst({
    where: { id: activityId },
  })
  if (!action) return { error: "Can't find activity with this Id" }
  return action
}
