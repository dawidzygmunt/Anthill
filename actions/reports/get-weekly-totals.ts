"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { startOfMonth, endOfMonth, getWeek, startOfWeek } from "date-fns"

export interface WeeklyTotal {
  weekLabel: string
  weekNumber: number
  hours: number
  startDate: Date
}

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

export const getWeeklyTotals = async (year: number, month: number): Promise<{ weeks: WeeklyTotal[], average: number } | { error: { code: string } | { message: string } }> => {
  try {
    const monthStart = startOfMonth(new Date(year, month - 1, 1))
    const monthEnd = endOfMonth(monthStart)

    // Get all tracks for the month
    const tracks = await prisma.track.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
        deletedAt: null
      }
    })

    // Group by week
    const weekMap = new Map<number, { minutes: number, startDate: Date }>()

    tracks.forEach(track => {
      const weekNumber = getWeek(track.date)
      const weekStart = startOfWeek(track.date, { weekStartsOn: 1 }) // Monday

      const current = weekMap.get(weekNumber) || { minutes: 0, startDate: weekStart }
      weekMap.set(weekNumber, {
        minutes: current.minutes + track.minutes,
        startDate: current.startDate
      })
    })

    // Convert to array
    const weeks = Array.from(weekMap.entries())
      .map(([weekNumber, data]) => ({
        weekLabel: `W${weekNumber}`,
        weekNumber,
        hours: Math.round(data.minutes / 60 * 10) / 10,
        startDate: data.startDate
      }))
      .sort((a, b) => a.weekNumber - b.weekNumber)

    // Calculate average
    const totalHours = weeks.reduce((sum, week) => sum + week.hours, 0)
    const average = weeks.length > 0 ? Math.round(totalHours / weeks.length * 10) / 10 : 0

    return { weeks, average }
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
