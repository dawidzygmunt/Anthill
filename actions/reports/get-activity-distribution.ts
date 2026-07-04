"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { Result, ok } from "@/utils/result"
import { startOfMonth, endOfMonth } from "date-fns"
import { buildActivityDistribution, ActivityDistribution } from "@/lib/reports"

export type { ActivityDistribution }

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

export const getActivityDistribution = async (
  year: number,
  month: number
): Promise<Result<ActivityDistribution[]>> => {
  try {
    const monthStart = startOfMonth(new Date(year, month - 1, 1))
    const monthEnd = endOfMonth(monthStart)

    const tracks = await prisma.track.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
        deletedAt: null,
      },
      include: {
        trackRow: {
          include: { activity: true },
        },
      },
    })

    return ok(buildActivityDistribution(tracks))
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
