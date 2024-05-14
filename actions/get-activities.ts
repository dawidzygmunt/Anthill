"use server"

import prisma from "@/lib/db"

export const getActivities = async () => {
  try {
    const actions = await prisma.activity.findMany()
    return actions
  } catch (err: any) {
    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
