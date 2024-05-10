"use server"

import prisma from "@/lib/db"

const activities = prisma.activity.findMany()
const getAllActivities = async () => {
  return await activities
}

export default getAllActivities
