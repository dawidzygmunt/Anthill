"use server"


import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import tracksPrismaCodesMap from "@/utils/tracks-prisma-codes"

const changeActivityForTrackRow = async (
  trackRowId: string,
  activityId: string
) => {
  try {
    return await prisma.trackRow.update({
      data: { activityId },
      where: { id: trackRowId },
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

export default changeActivityForTrackRow
