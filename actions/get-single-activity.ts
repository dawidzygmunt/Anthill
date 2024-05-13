"use server"

import prisma from "@/lib/db"

export const GetSingleActivity = async (activityId: string) => {
  const action = await prisma.activity.findFirst({
    where: { id: activityId },
  })
  return action
}
