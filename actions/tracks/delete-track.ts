"use server"

import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"

const deleteTrack = async (trackId: string) => {
  try {
    return await prisma.track.delete({ where: { id: trackId } })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default deleteTrack
