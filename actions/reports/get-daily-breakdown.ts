"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { startOfMonth, endOfMonth, getDay, format } from "date-fns"

export interface DailyBreakdown {
  day: string
  dayIndex: number
  total: number
  activities: Array<{
    id: string
    name: string
    color: string
    hours: number
  }>
}

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getDailyBreakdown = async (year: number, month: number): Promise<DailyBreakdown[] | { error: { code: string } | { message: string } }> => {
  try {
    const monthStart = startOfMonth(new Date(year, month - 1, 1))
    const monthEnd = endOfMonth(monthStart)

    // Get all tracks for the month
    const tracks = await prisma.track.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
        deletedAt: null
      },
      include: {
        trackRow: {
          include: { activity: true }
        }
      }
    })

    // Group by day of week (0-6, where 0 is Sunday)
    const dayMap = new Map<number, Map<string, { name: string, color: string, minutes: number }>>()

    tracks.forEach(track => {
      const dayIndex = getDay(track.date)
      const activity = track.trackRow.activity

      if (!activity) return

      if (!dayMap.has(dayIndex)) {
        dayMap.set(dayIndex, new Map())
      }

      const activitiesForDay = dayMap.get(dayIndex)!
      const current = activitiesForDay.get(activity.id) || { name: activity.name, color: activity.color, minutes: 0 }
      activitiesForDay.set(activity.id, {
        ...current,
        minutes: current.minutes + track.minutes
      })
    })

    // Convert to array format, starting from Monday
    const result: DailyBreakdown[] = []

    // Reorder to start from Monday (1) instead of Sunday (0)
    const orderedDays = [1, 2, 3, 4, 5, 6, 0] // Mon-Sun

    orderedDays.forEach((dayIndex) => {
      const activitiesMap = dayMap.get(dayIndex)
      const activities = activitiesMap
        ? Array.from(activitiesMap.entries()).map(([id, data]) => ({
            id,
            name: data.name,
            color: data.color,
            hours: data.minutes / 60
          }))
        : []

      const total = activities.reduce((sum, act) => sum + act.hours, 0)

      result.push({
        day: dayNames[dayIndex],
        dayIndex,
        total: Math.round(total * 10) / 10,
        activities
      })
    })

    return result
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
