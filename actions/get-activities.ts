"use server"

import prisma from "@/lib/db"

export const GetActivities = async () => {
  const actions = await prisma.activity.findMany()
  return actions
}
