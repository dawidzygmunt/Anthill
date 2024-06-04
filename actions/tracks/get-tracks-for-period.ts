"use server"

import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import { handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"

const getTracksForRow = async (trackRowId: string) => {
  try {
    return await prisma.track.findMany({ where: { trackRowId } })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default getTracksForRow
