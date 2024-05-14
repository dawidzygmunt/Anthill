"use server"

import prisma from "@/lib/db"
import revalidateTracks from "./revalidateTracks"

const createTrackRow = async (activityId: string, from: Date) => {
  try {
    const result = await prisma.trackRow.create({ data: { from, activityId } })
    revalidateTracks()
    return result
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default createTrackRow
