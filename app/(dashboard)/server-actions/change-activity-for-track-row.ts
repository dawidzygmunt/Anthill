"use server"

import prisma from "@/lib/db"

const changeActivityForTrackRow = async (
  fromActivityId: string,
  toActivityId: string,
  from: Date,
  to: Date
) => {
  try {
    return await prisma.track.updateMany({
      data: { activityId: toActivityId },
      where: { date: { gte: from, lt: to }, activityId: fromActivityId },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default changeActivityForTrackRow
