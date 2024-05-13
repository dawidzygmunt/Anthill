"use server"

import prisma from "@/lib/db"

const getTracksForRow = async (trackRowId: string) => {
  try {
    return await prisma.track.findMany({ where: { trackRowId } })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default getTracksForRow
