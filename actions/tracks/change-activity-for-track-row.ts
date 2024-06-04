"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"

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
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default changeActivityForTrackRow
