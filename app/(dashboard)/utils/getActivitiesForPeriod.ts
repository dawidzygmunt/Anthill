"use server"

import prisma from "@/lib/db"

const getActivitiesForPeriod = async (from: Date, to: Date) => {
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
}

export default getActivitiesForPeriod
