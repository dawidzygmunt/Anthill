import { Clock, TrendingUp, Target, CheckSquare } from "lucide-react"
import StatCard from "./stat-card"
import { MonthlyStats } from "@/actions/reports/get-monthly-stats"

interface StatCardsProps {
  stats: MonthlyStats
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<Clock size={20} />}
        title="Tracked this month"
        value={`${stats.totalHours.toFixed(1)}h`}
        subtitle={`vs ${stats.previousMonthHours.toFixed(1)}h last month`}
        trend={stats.percentageChange !== 0 ? {
          value: Math.abs(stats.percentageChange),
          isPositive: stats.percentageChange > 0
        } : undefined}
      />

      <StatCard
        icon={<TrendingUp size={20} />}
        title="Daily average"
        value={`${stats.dailyAverage}h`}
        subtitle={`Target ${stats.targetDaily}h`}
      />

      <StatCard
        icon={<Target size={20} />}
        title="Most tracked"
        value={stats.mostTracked?.name || "—"}
        subtitle={stats.mostTracked
          ? `${stats.mostTracked.hours.toFixed(1)}h · ${stats.mostTracked.percentage}%`
          : "No data"
        }
      />

      <StatCard
        icon={<CheckSquare size={20} />}
        title="Days logged"
        value={`${stats.daysLogged}/${stats.workdaysInMonth}`}
        subtitle={`${Math.round((stats.daysLogged / stats.workdaysInMonth) * 100)}% of workdays`}
      />
    </div>
  )
}
