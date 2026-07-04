import { eachDayOfInterval, getDay, getWeek, isWeekend, startOfWeek } from "date-fns"
import { aggregateActivityMinutes, computePercentageChange } from "@/lib/aggregations"

type TrackWithActivity = {
  minutes: number
  date: Date
  trackRow: {
    activity: { id: string; name: string; color: string } | null
  }
}

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

export const buildMonthlyStats = (
  tracks: TrackWithActivity[],
  prevTracks: { minutes: number }[],
  monthStart: Date,
  monthEnd: Date
): MonthlyStats => {
  const totalMinutes = tracks.reduce((sum, track) => sum + track.minutes, 0)
  const prevMonthMinutes = prevTracks.reduce((sum, track) => sum + track.minutes, 0)

  const percentageChange = computePercentageChange(totalMinutes, prevMonthMinutes)

  const uniqueDates = new Set(tracks.map((track) => track.date.toISOString().split("T")[0]))
  const daysLogged = uniqueDates.size

  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const workdaysInMonth = allDays.filter((day) => !isWeekend(day)).length

  const dailyAverage = daysLogged > 0 ? totalMinutes / daysLogged / 60 : 0

  const activityMinutes = aggregateActivityMinutes(tracks)

  let mostTracked = null
  if (activityMinutes.size > 0) {
    const sorted = Array.from(activityMinutes.values()).sort((a, b) => b.minutes - a.minutes)
    const top = sorted[0]
    mostTracked = {
      name: top.name,
      color: top.color,
      hours: top.minutes / 60,
      percentage: totalMinutes > 0 ? (top.minutes / totalMinutes) * 100 : 0,
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
    mostTracked,
  }
}

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

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// Reorder to start from Monday (1) instead of Sunday (0)
const orderedDays = [1, 2, 3, 4, 5, 6, 0]

export const buildDailyBreakdown = (tracks: TrackWithActivity[]): DailyBreakdown[] => {
  const dayMap = new Map<number, Map<string, { name: string; color: string; minutes: number }>>()

  tracks.forEach((track) => {
    const dayIndex = getDay(track.date)
    const activity = track.trackRow.activity

    if (!activity) return

    if (!dayMap.has(dayIndex)) {
      dayMap.set(dayIndex, new Map())
    }

    const activitiesForDay = dayMap.get(dayIndex)!
    const current = activitiesForDay.get(activity.id) || {
      name: activity.name,
      color: activity.color,
      minutes: 0,
    }
    activitiesForDay.set(activity.id, {
      ...current,
      minutes: current.minutes + track.minutes,
    })
  })

  return orderedDays.map((dayIndex) => {
    const activitiesMap = dayMap.get(dayIndex)
    const activities = activitiesMap
      ? Array.from(activitiesMap.entries()).map(([id, data]) => ({
          id,
          name: data.name,
          color: data.color,
          hours: data.minutes / 60,
        }))
      : []

    const total = activities.reduce((sum, act) => sum + act.hours, 0)

    return {
      day: dayNames[dayIndex],
      dayIndex,
      total: Math.round(total * 10) / 10,
      activities,
    }
  })
}

export interface WeeklyTotal {
  weekLabel: string
  weekNumber: number
  hours: number
  startDate: Date
}

export const buildWeeklyTotals = (
  tracks: { minutes: number; date: Date }[]
): { weeks: WeeklyTotal[]; average: number } => {
  const weekMap = new Map<number, { minutes: number; startDate: Date }>()

  tracks.forEach((track) => {
    const weekNumber = getWeek(track.date)
    const weekStart = startOfWeek(track.date, { weekStartsOn: 1 }) // Monday

    const current = weekMap.get(weekNumber) || { minutes: 0, startDate: weekStart }
    weekMap.set(weekNumber, {
      minutes: current.minutes + track.minutes,
      startDate: current.startDate,
    })
  })

  const weeks = Array.from(weekMap.entries())
    .map(([weekNumber, data]) => ({
      weekLabel: `W${weekNumber}`,
      weekNumber,
      hours: Math.round((data.minutes / 60) * 10) / 10,
      startDate: data.startDate,
    }))
    .sort((a, b) => a.weekNumber - b.weekNumber)

  const totalHours = weeks.reduce((sum, week) => sum + week.hours, 0)
  const average = weeks.length > 0 ? Math.round((totalHours / weeks.length) * 10) / 10 : 0

  return { weeks, average }
}

export interface ActivityDistribution {
  id: string
  name: string
  color: string
  hours: number
  percentage: number
}

export const buildActivityDistribution = (tracks: TrackWithActivity[]): ActivityDistribution[] => {
  const totalMinutes = tracks.reduce((sum, track) => sum + track.minutes, 0)

  const activityMap = new Map<string, { name: string; color: string; minutes: number }>()

  tracks.forEach((track) => {
    const activity = track.trackRow.activity
    if (!activity) return

    const current = activityMap.get(activity.id) || {
      name: activity.name,
      color: activity.color,
      minutes: 0,
    }
    activityMap.set(activity.id, {
      ...current,
      minutes: current.minutes + track.minutes,
    })
  })

  return Array.from(activityMap.entries())
    .map(([id, data]) => ({
      id,
      name: data.name,
      color: data.color,
      hours: Math.round((data.minutes / 60) * 10) / 10,
      percentage: totalMinutes > 0 ? Math.round((data.minutes / totalMinutes) * 100) : 0,
    }))
    .sort((a, b) => b.hours - a.hours) // Sort by hours descending
}
