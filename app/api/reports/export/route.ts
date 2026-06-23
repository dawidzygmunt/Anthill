import { NextRequest, NextResponse } from "next/server"
import { getActivityDistribution } from "@/actions/reports/get-activity-distribution"
import { getDailyBreakdown } from "@/actions/reports/get-daily-breakdown"
import { getMonthlyStats } from "@/actions/reports/get-monthly-stats"
import { format } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()))

    // Fetch data
    const [monthlyStats, activityDistribution, dailyBreakdown] = await Promise.all([
      getMonthlyStats(year, month),
      getActivityDistribution(year, month),
      getDailyBreakdown(year, month)
    ])

    if ("error" in monthlyStats || "error" in activityDistribution || "error" in dailyBreakdown) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }

    // Generate CSV content
    const csvLines: string[] = []

    // Header
    csvLines.push(`Anthill Report - ${format(new Date(year, month - 1), 'MMMM yyyy')}`)
    csvLines.push('')

    // Monthly Summary
    csvLines.push('MONTHLY SUMMARY')
    csvLines.push('Metric,Value')
    csvLines.push(`Total Hours,${monthlyStats.totalHours.toFixed(1)}h`)
    csvLines.push(`Daily Average,${monthlyStats.dailyAverage}h`)
    csvLines.push(`Days Logged,${monthlyStats.daysLogged}/${monthlyStats.workdaysInMonth}`)
    if (monthlyStats.mostTracked) {
      csvLines.push(`Most Tracked,${monthlyStats.mostTracked.name} (${monthlyStats.mostTracked.hours.toFixed(1)}h)`)
    }
    csvLines.push('')

    // Activity Distribution
    csvLines.push('ACTIVITY DISTRIBUTION')
    csvLines.push('Activity,Hours,Percentage')
    activityDistribution.forEach(activity => {
      csvLines.push(`${activity.name},${activity.hours.toFixed(1)},${activity.percentage}%`)
    })
    csvLines.push('')

    // Daily Breakdown
    csvLines.push('DAILY BREAKDOWN')
    csvLines.push('Day,Total Hours,Activities')
    dailyBreakdown.forEach(day => {
      const activities = day.activities.map(a => `${a.name}: ${a.hours.toFixed(1)}h`).join('; ')
      csvLines.push(`${day.day},${day.total.toFixed(1)},${activities}`)
    })

    const csvContent = csvLines.join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="anthill-report-${year}-${String(month).padStart(2, '0')}.csv"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
