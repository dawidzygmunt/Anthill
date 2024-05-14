"use server"

import prisma from "@/lib/db"
import revalidateTracks from "./revalidateTracks"

const prismaCodesMap: Record<string, string> = {
  P2002: "Row for this activity already exists in this week!",
}

const createTrackRow = async (activityId: string, from: Date) => {
  try {
    const result = await prisma.trackRow.create({ data: { from, activityId } })
    revalidateTracks()
    return result
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    return { error: "Something went wrong" }
  }
}

export default createTrackRow
