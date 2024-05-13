"use server"

import prisma from "@/lib/db"

const getActivitiesForPeriod = async (from: Date, to: Date) => {
  try {
    return (
      await prisma.trackRow.findMany({
        where: { from },
        include: {
          activity: true,
        },
      })
    ).map((element) => element.activity)
  } catch (err) {
    console.log(err)
    return { error: "Something went wrong" }
  }
}

export default getActivitiesForPeriod
