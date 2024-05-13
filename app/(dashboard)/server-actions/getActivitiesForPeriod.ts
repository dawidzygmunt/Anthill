"use server"

import prisma from "@/lib/db"

const getTrackRowsForPeriod = async (from: Date) => {
  try {
    return await prisma.trackRow.findMany({
      where: { from },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getTrackRowsForPeriod
