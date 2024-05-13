"use server"

import prisma from "@/lib/db"

const changeActivityForTrackRow = async (
  trackRowId: string,
  activityId: string
) => {
  try {
    return await prisma.trackRow.update({
      data: { activityId },
      where: { id: trackRowId },
    })
  } catch (err) {
    return { error: "Something went wrong" }
  }
}

export default changeActivityForTrackRow
