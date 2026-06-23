"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { startOfMonth, endOfMonth } from "date-fns"

export interface ActivityDistribution {
  id: string
  name: string
  color: string
  hours: number
  percentage: number
}

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

export const getActivityDistribution = async (year: number, month: number): Promise<ActivityDistribution[] | { error: { code: string } | { message: string } }> => {
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

    // Calculate total minutes
    const totalMinutes = tracks.reduce((sum, track) => sum + track.minutes, 0)

    // Group by activity
    const activityMap = new Map<string, { name: string, color: string, minutes: number }>()

    tracks.forEach(track => {
      const activity = track.trackRow.activity
      if (!activity) return

      const current = activityMap.get(activity.id) || { name: activity.name, color: activity.color, minutes: 0 }
      activityMap.set(activity.id, {
        ...current,
        minutes: current.minutes + track.minutes
      })
    })

    // Convert to array and calculate percentages
    const distribution = Array.from(activityMap.entries())
      .map(([id, data]) => ({
        id,
        name: data.name,
        color: data.color,
        hours: Math.round(data.minutes / 60 * 10) / 10,
        percentage: totalMinutes > 0 ? Math.round((data.minutes / totalMinutes) * 100) : 0
      }))
      .sort((a, b) => b.hours - a.hours) // Sort by hours descending

    return distribution
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
