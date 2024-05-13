"use server"

import prisma from "@/lib/db"
import revalidateTracks from "./revalidateTracks"

const createTrackRow = async (activityId: string, from: Date) => {
  await prisma.trackRow.create({ data: { from, activityId } })
  revalidateTracks()
}

export default createTrackRow
