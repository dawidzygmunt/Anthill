"use server"

import prismaCodesMap from "@/utils/prisma-codes"
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
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    return { error: "Something went wrong" }
  }
}

export default changeActivityForTrackRow
