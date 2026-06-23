import ReportsHeader from "./components/reports-header"
import StatCards from "./components/stat-cards"
import HoursByDayChart from "./components/charts/hours-by-day-chart"
import ActivityDonutChart from "./components/charts/activity-donut-chart"
import WeeklyTotalsChart from "./components/charts/weekly-totals-chart"
import { getMonthlyStats } from "@/actions/reports/get-monthly-stats"
import { getDailyBreakdown } from "@/actions/reports/get-daily-breakdown"
import { getActivityDistribution } from "@/actions/reports/get-activity-distribution"
import { getWeeklyTotals } from "@/actions/reports/get-weekly-totals"

interface ReportsPageProps {
  searchParams: {
    month?: string
    year?: string
  }
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  // Get current month and year from URL params or default to now
  const now = new Date()
  const month = searchParams.month ? parseInt(searchParams.month) : now.getMonth() + 1
  const year = searchParams.year ? parseInt(searchParams.year) : now.getFullYear()

  const currentDate = new Date(year, month - 1, 1)

  // Fetch all data in parallel
  const [monthlyStats, dailyBreakdown, activityDistribution, weeklyData] = await Promise.all([
    getMonthlyStats(year, month),
    getDailyBreakdown(year, month),
    getActivityDistribution(year, month),
    getWeeklyTotals(year, month)
  ])

  // Handle errors
  if ("error" in monthlyStats) {
    const errorMsg = 'code' in monthlyStats.error ? `Error code: ${monthlyStats.error.code}` : monthlyStats.error.message
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--error)]">Failed to load monthly stats: {errorMsg}</p>
      </div>
    )
  }

  if ("error" in dailyBreakdown) {
    const errorMsg = 'code' in dailyBreakdown.error ? `Error code: ${dailyBreakdown.error.code}` : dailyBreakdown.error.message
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--error)]">Failed to load daily breakdown: {errorMsg}</p>
      </div>
    )
  }

  if ("error" in activityDistribution) {
    const errorMsg = 'code' in activityDistribution.error ? `Error code: ${activityDistribution.error.code}` : activityDistribution.error.message
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--error)]">Failed to load activity distribution: {errorMsg}</p>
      </div>
    )
  }

  if ("error" in weeklyData) {
    const errorMsg = 'code' in weeklyData.error ? `Error code: ${weeklyData.error.code}` : weeklyData.error.message
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--error)]">Failed to load weekly data: {errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      <ReportsHeader currentDate={currentDate} />

      <StatCards stats={monthlyStats} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <HoursByDayChart data={dailyBreakdown} />
        </div>
        <div className="lg:col-span-2">
          <ActivityDonutChart data={activityDistribution} />
        </div>
      </div>

      <WeeklyTotalsChart weeks={weeklyData.weeks} average={weeklyData.average} />
    </div>
  )
}
