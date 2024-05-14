"use server"

import prisma from "@/lib/db"

const getTrackRowsForPeriod = async (from: Date) => {
  try {
    return await prisma.trackRow.findMany({
      where: { from },
      orderBy: { createdAt: "asc" },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getTrackRowsForPeriod
