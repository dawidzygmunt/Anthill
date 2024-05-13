"use server"

import prisma from "@/lib/db"

const getActivitiesForPeriod = async (from: Date, to: Date) => {
  try {
    const activitiesIds = (
      await prisma.track.groupBy({
        by: "activityId",
        where: {
          date: {
            gte: from,
            lt: to,
          },
        },
      })
    ).map((element) => element.activityId)
    return await prisma.activity.findMany({
      where: { id: { in: activitiesIds } },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getActivitiesForPeriod
