"use server"

import prisma from "@/lib/db"

const getTracksForPeriod = async (activityId: string, from: Date, to: Date) => {
  try {
    return await prisma.track.findMany({
      where: {
        activityId,
        date: {
          gte: from,
          lt: to,
        },
      },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getTracksForPeriod
