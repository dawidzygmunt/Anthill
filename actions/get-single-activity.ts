"use server"

import prisma from "@/lib/db"

export const GetSingleActivity = async (activityId: string) => {
  if (!activityId) return { error: "activity Id is required" }
  const action = await prisma.activity.findFirst({
    where: { id: activityId },
  })
  if (!action) return { error: "Can't find activity with this Id" }
  return action
}
