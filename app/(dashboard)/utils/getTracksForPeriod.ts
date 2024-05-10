"use server"

import prisma from "@/lib/db"
import { addDays, differenceInDays, isSameDay } from "date-fns"

const getTracksForPeriod = async (activityId: string, from: Date, to: Date) => {
  return await prisma.track.findMany({
    where: {
      activityId,
      date: {
        gte: from,
        lt: to,
      },
    },
  })
}

export default getTracksForPeriod
