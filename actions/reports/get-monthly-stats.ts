"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import { startOfMonth, endOfMonth, subMonths, eachDayOfInterval, isWeekend } from "date-fns"

export interface MonthlyStats {
  totalHours: number
  previousMonthHours: number
  percentageChange: number
  dailyAverage: number
  targetDaily: number
  daysLogged: number
  workdaysInMonth: number
  mostTracked: {
    name: string
    color: string
    hours: number
    percentage: number
  } | null
}

const reportsPrismaCodesMap: Record<string, string> = {
  P2002: "5000",
  P2025: "5001",
}

export const getMonthlyStats = async (year: number, month: number): Promise<MonthlyStats | { error: { code: string } | { message: string } }> => {
  try {
    const monthStart = startOfMonth(new Date(year, month - 1, 1))
    const monthEnd = endOfMonth(monthStart)

    const prevMonthStart = startOfMonth(subMonths(monthStart, 1))
    const prevMonthEnd = endOfMonth(prevMonthStart)

    // Get all tracks for current month
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

    // Get previous month tracks
    const prevTracks = await prisma.track.findMany({
      where: {
        date: { gte: prevMonthStart, lte: prevMonthEnd },
        deletedAt: null
      }
    })

    // Calculate total minutes
    const totalMinutes = tracks.reduce((sum, track) => sum + track.minutes, 0)
    const prevMonthMinutes = prevTracks.reduce((sum, track) => sum + track.minutes, 0)

    // Calculate percentage change
    const percentageChange = prevMonthMinutes > 0
      ? ((totalMinutes - prevMonthMinutes) / prevMonthMinutes) * 100
      : 0

    // Calculate days logged (unique dates)
    const uniqueDates = new Set(tracks.map(track => track.date.toISOString().split('T')[0]))
    const daysLogged = uniqueDates.size

    // Calculate workdays in month (excluding weekends)
    const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
    const workdaysInMonth = allDays.filter(day => !isWeekend(day)).length

    // Calculate daily average
    const dailyAverage = daysLogged > 0 ? totalMinutes / daysLogged / 60 : 0

    // Find most tracked activity
    const activityMinutes = new Map<string, { minutes: number, name: string, color: string }>()

    tracks.forEach(track => {
      const activity = track.trackRow.activity
      if (activity) {
        const current = activityMinutes.get(activity.id) || { minutes: 0, name: activity.name, color: activity.color }
        activityMinutes.set(activity.id, {
          ...current,
          minutes: current.minutes + track.minutes
        })
      }
    })

    let mostTracked = null
    if (activityMinutes.size > 0) {
      const sorted = Array.from(activityMinutes.values()).sort((a, b) => b.minutes - a.minutes)
      const top = sorted[0]
      mostTracked = {
        name: top.name,
        color: top.color,
        hours: top.minutes / 60,
        percentage: totalMinutes > 0 ? (top.minutes / totalMinutes) * 100 : 0
      }
    }

    return {
      totalHours: totalMinutes / 60,
      previousMonthHours: prevMonthMinutes / 60,
      percentageChange: Math.round(percentageChange),
      dailyAverage: Math.round(dailyAverage * 10) / 10,
      targetDaily: 8.0,
      daysLogged,
      workdaysInMonth,
      mostTracked
    }
  } catch (error) {
    return handleError(error, reportsPrismaCodesMap)
  }
}
