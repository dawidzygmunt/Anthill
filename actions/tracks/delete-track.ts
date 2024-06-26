"use server"

import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

const deleteTrack = async (trackId: string) => {
  try {
    return await prisma.track.delete({ where: { id: trackId } })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default deleteTrack
