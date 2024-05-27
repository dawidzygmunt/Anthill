"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"

const deleteTrack = async (trackId: string) => {
  try {
    return await prisma.track.delete({ where: { id: trackId } })
  } catch (err) {
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}

export default deleteTrack
