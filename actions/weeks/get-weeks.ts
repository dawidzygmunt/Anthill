import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import weeksPrismaCodesMap from "@/utils/weeks-prisma-codes"

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
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in weeksPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = weeksPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}
