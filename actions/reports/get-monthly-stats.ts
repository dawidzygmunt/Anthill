"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { Result, ok } from "@/utils/result"
import { startOfMonth, endOfMonth, subMonths } from "date-fns"
import { buildMonthlyStats, MonthlyStats } from "@/lib/reports"

export type { MonthlyStats }

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

export const getMonthlyStats = async (year: number, month: number): Promise<Result<MonthlyStats>> => {
  try {
    const monthStart = startOfMonth(new Date(year, month - 1, 1))
    const monthEnd = endOfMonth(monthStart)

    const prevMonthStart = startOfMonth(subMonths(monthStart, 1))
    const prevMonthEnd = endOfMonth(prevMonthStart)

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

    const prevTracks = await prisma.track.findMany({
      where: {
        date: { gte: prevMonthStart, lte: prevMonthEnd },
        deletedAt: null,
      },
    })

    return ok(buildMonthlyStats(tracks, prevTracks, monthStart, monthEnd))
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
