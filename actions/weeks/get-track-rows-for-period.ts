"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Prisma } from "@prisma/client"
import { toUtcMidnight } from "@/lib/utils"

type WeekWithTracks = Prisma.WeekGetPayload<{
  include: { TrackRow: { include: { Track: true } } }
}>

const getTrackRowsForPeriod = async (
  from: Date
): Promise<Result<WeekWithTracks | null>> => {
  try {
    const normalizedFrom = toUtcMidnight(from)
    return ok(
      await prisma.week.findFirst({
        where: { from: normalizedFrom },
        include: { TrackRow: { include: { Track: true } } },
        orderBy: { createdAt: "asc" },
      })
    )
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getTrackRowsForPeriod
