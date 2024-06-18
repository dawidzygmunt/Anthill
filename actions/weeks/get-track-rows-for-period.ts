"use server"

import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

const getTrackRowsForPeriod = async (from: Date) => {
  try {
    // const { userId } = auth()
    // if (!userId) {
    //   throw new CustomError("User not authenticated", "NOT_AUTHENTICATED")
    // }

    return await prisma.week.findFirst({
      where: { from },
      include: { TrackRow: { include: { Track: true } } },
      orderBy: { createdAt: "asc" },
    })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getTrackRowsForPeriod
