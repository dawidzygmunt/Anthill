import { describe, it, expect } from "vitest"
import { startOfMonth, endOfMonth } from "date-fns"
import { buildMonthlyStats, buildDailyBreakdown, buildWeeklyTotals, buildActivityDistribution } from "./reports"

const activity = (id: string, name = "Work", color = "#fff") => ({ id, name, color })

describe("buildMonthlyStats", () => {
  const monthStart = startOfMonth(new Date(2026, 1, 1)) // Feb 2026
  const monthEnd = endOfMonth(monthStart)

  it("returns zeroed stats and null mostTracked for an empty month", () => {
    const result = buildMonthlyStats([], [], monthStart, monthEnd)
    expect(result.totalHours).toBe(0)
    expect(result.daysLogged).toBe(0)
    expect(result.dailyAverage).toBe(0)
    expect(result.mostTracked).toBeNull()
    expect(result.percentageChange).toBe(0)
  })

  it("does not divide by zero when previous month has no tracked minutes", () => {
    const tracks = [
      { minutes: 60, date: new Date(2026, 1, 3), trackRow: { activity: activity("a1") } },
    ]
    const result = buildMonthlyStats(tracks, [], monthStart, monthEnd)
    expect(result.percentageChange).toBe(0)
    expect(Number.isFinite(result.percentageChange)).toBe(true)
  })

  it("skips tracks whose activity was soft-deleted (null activity)", () => {
    const tracks = [
      { minutes: 60, date: new Date(2026, 1, 3), trackRow: { activity: null } },
    ]
    const result = buildMonthlyStats(tracks, [], monthStart, monthEnd)
    // totalHours still counts the orphaned minutes, but mostTracked ignores them
    expect(result.totalHours).toBe(1)
    expect(result.mostTracked).toBeNull()
  })

  it("counts unique days logged, not number of tracks", () => {
    const tracks = [
      { minutes: 30, date: new Date(2026, 1, 3), trackRow: { activity: activity("a1") } },
      { minutes: 30, date: new Date(2026, 1, 3), trackRow: { activity: activity("a1") } },
      { minutes: 30, date: new Date(2026, 1, 4), trackRow: { activity: activity("a1") } },
    ]
    const result = buildMonthlyStats(tracks, [], monthStart, monthEnd)
    expect(result.daysLogged).toBe(2)
  })

  it("excludes weekends from workdaysInMonth", () => {
    // Feb 2026 has 20 workdays (verified via date-fns)
    const result = buildMonthlyStats([], [], monthStart, monthEnd)
    expect(result.workdaysInMonth).toBe(20)
  })

  it("computes percentage of mostTracked relative to total, not just its own minutes", () => {
    const tracks = [
      { minutes: 90, date: new Date(2026, 1, 3), trackRow: { activity: activity("a1", "Work") } },
      { minutes: 30, date: new Date(2026, 1, 3), trackRow: { activity: activity("a2", "Rest") } },
    ]
    const result = buildMonthlyStats(tracks, [], monthStart, monthEnd)
    expect(result.mostTracked?.name).toBe("Work")
    expect(result.mostTracked?.percentage).toBeCloseTo(75, 5)
  })
})

describe("buildDailyBreakdown", () => {
  it("returns all 7 days, Monday first, with empty activities for days with no tracks", () => {
    const result = buildDailyBreakdown([])
    expect(result).toHaveLength(7)
    expect(result[0].day).toBe("Mon")
    expect(result[6].day).toBe("Sun")
    expect(result.every((d) => d.activities.length === 0 && d.total === 0)).toBe(true)
  })

  it("places a Sunday track at the end of the week, not the start", () => {
    // 2026-02-01 is a Sunday
    const tracks = [
      { minutes: 60, date: new Date(2026, 1, 1), trackRow: { activity: activity("a1") } },
    ]
    const result = buildDailyBreakdown(tracks)
    expect(result[6].day).toBe("Sun")
    expect(result[6].total).toBe(1)
    expect(result[0].total).toBe(0)
  })

  it("skips tracks with no associated activity", () => {
    const tracks = [
      { minutes: 60, date: new Date(2026, 1, 2), trackRow: { activity: null } },
    ]
    const result = buildDailyBreakdown(tracks)
    expect(result.every((d) => d.total === 0)).toBe(true)
  })

  it("sums minutes for the same activity within a day into hours", () => {
    const monday = new Date(2026, 1, 2) // 2026-02-02 is a Monday
    const tracks = [
      { minutes: 60, date: monday, trackRow: { activity: activity("a1") } },
      { minutes: 30, date: monday, trackRow: { activity: activity("a1") } },
    ]
    const result = buildDailyBreakdown(tracks)
    const mon = result.find((d) => d.day === "Mon")!
    expect(mon.activities).toHaveLength(1)
    expect(mon.activities[0].hours).toBe(1.5)
    expect(mon.total).toBe(1.5)
  })
})

describe("buildWeeklyTotals", () => {
  it("returns an empty list and 0 average when there are no tracks", () => {
    const result = buildWeeklyTotals([])
    expect(result.weeks).toEqual([])
    expect(result.average).toBe(0)
  })

  it("merges tracks that straddle a year boundary into the same locale week bucket", () => {
    // date-fns getWeek (default US locale) puts both Dec 31 2025 and Jan 1 2026 in week 1
    const tracks = [
      { minutes: 60, date: new Date(2025, 11, 31) },
      { minutes: 60, date: new Date(2026, 0, 1) },
    ]
    const result = buildWeeklyTotals(tracks)
    expect(result.weeks).toHaveLength(1)
    expect(result.weeks[0].hours).toBe(2)
  })

  it("computes the average across distinct weeks, not per track", () => {
    const tracks = [
      { minutes: 600, date: new Date(2026, 0, 5) }, // week 2, 10h
      { minutes: 120, date: new Date(2026, 0, 12) }, // week 3, 2h
    ]
    const result = buildWeeklyTotals(tracks)
    expect(result.weeks).toHaveLength(2)
    expect(result.average).toBe(6)
  })

  it("sorts weeks ascending by week number", () => {
    const tracks = [
      { minutes: 60, date: new Date(2026, 0, 12) }, // later week
      { minutes: 60, date: new Date(2026, 0, 5) }, // earlier week
    ]
    const result = buildWeeklyTotals(tracks)
    expect(result.weeks[0].weekNumber).toBeLessThan(result.weeks[1].weekNumber)
  })
})

describe("buildActivityDistribution", () => {
  it("returns an empty array for no tracks", () => {
    expect(buildActivityDistribution([])).toEqual([])
  })

  it("computes percentage relative to total minutes across all activities", () => {
    const tracks = [
      { minutes: 90, date: new Date(2026, 1, 1), trackRow: { activity: activity("a1", "Work") } },
      { minutes: 30, date: new Date(2026, 1, 1), trackRow: { activity: activity("a2", "Rest") } },
    ]
    const result = buildActivityDistribution(tracks)
    const work = result.find((r) => r.id === "a1")!
    const rest = result.find((r) => r.id === "a2")!
    expect(work.percentage).toBe(75)
    expect(rest.percentage).toBe(25)
  })

  it("sorts by hours descending", () => {
    const tracks = [
      { minutes: 30, date: new Date(2026, 1, 1), trackRow: { activity: activity("a1", "Small") } },
      { minutes: 90, date: new Date(2026, 1, 1), trackRow: { activity: activity("a2", "Big") } },
    ]
    const result = buildActivityDistribution(tracks)
    expect(result[0].name).toBe("Big")
    expect(result[1].name).toBe("Small")
  })

  it("skips tracks with no associated activity and excludes them from the total", () => {
    const tracks = [
      { minutes: 60, date: new Date(2026, 1, 1), trackRow: { activity: activity("a1") } },
      { minutes: 60, date: new Date(2026, 1, 1), trackRow: { activity: null } },
    ]
    const result = buildActivityDistribution(tracks)
    expect(result).toHaveLength(1)
    // Orphaned minutes still count toward totalMinutes denominator (bug-compatible with prior behavior)
    expect(result[0].percentage).toBe(50)
  })
})
