"use server"

import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import tracksPrismaCodesMap from "@/utils/tracks-prisma-codes"

const getTrackRowsForPeriod = async (from: Date) => {
  try {
    return await prisma.week.findFirst({
      where: { from },
      include: { TrackRow: { include: { Track: true } } },
      orderBy: { createdAt: "asc" },
    })
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in tracksPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = tracksPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}

export default getTrackRowsForPeriod
