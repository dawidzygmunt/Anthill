"use server"
import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"

export const getWeeks = async (from: Date, to: Date) => {
  try {
    return await prisma.week.findMany({
      where: {
        from: {
          gte: from,
          lt: to,
        },
      },
      include: {
        TrackRow: {
          include: {
            Track: true,
          },
        },
      },
      orderBy: {
        from: "desc",
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
