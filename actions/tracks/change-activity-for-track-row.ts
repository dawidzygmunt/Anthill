"use server"

import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import revalidate from "./revalidate"
import { Result, ok } from "@/utils/result"
import { TrackRow } from "@prisma/client"

const changeActivityForTrackRow = async (
  trackRowId: string,
  activityId: string
): Promise<Result<TrackRow>> => {
  try {
    if (activityId === "DELETE") {
      const tracks = await prisma.track.findMany({
        where: { trackRowId },
      })
      if (tracks.length > 0) {
        throw new CustomError(
          "Cannot delete track row with tracks",
          "CANT_DELETE"
        )
      }
      const result = await prisma.trackRow.delete({
        where: { id: trackRowId },
      })
      revalidate()
      return ok(result)
    }

    return ok(
      await prisma.trackRow.update({
        data: { activityId },
        where: { id: trackRowId },
      })
    )
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default changeActivityForTrackRow
