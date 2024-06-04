"use server"

import prisma from "@/lib/db"

const getTrackRowsForPeriod = async (from: Date) => {
  try {
    return await prisma.week.findFirst({
      where: { from },
      include: { TrackRow: { include: { Track: true } } },
      orderBy: { createdAt: "asc" },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getTrackRowsForPeriod
