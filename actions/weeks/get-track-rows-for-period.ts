"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Prisma } from "@prisma/client"

type WeekWithTracks = Prisma.WeekGetPayload<{
  include: { TrackRow: { include: { Track: true } } }
}>

const getTrackRowsForPeriod = async (
  from: Date
): Promise<Result<WeekWithTracks | null>> => {
  try {
    return ok(
      await prisma.week.findFirst({
        where: { from },
        include: { TrackRow: { include: { Track: true } } },
        orderBy: { createdAt: "asc" },
      })
    )
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getTrackRowsForPeriod
