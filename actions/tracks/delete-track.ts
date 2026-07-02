"use server"

import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { Result, ok } from "@/utils/result"
import { Track } from "@prisma/client"

const deleteTrack = async (trackId: string): Promise<Result<Track>> => {
  try {
    return ok(await prisma.track.delete({ where: { id: trackId } }))
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default deleteTrack
