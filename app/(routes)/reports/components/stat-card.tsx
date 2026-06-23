import { ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtitle: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatCard({ icon, title, value, subtitle, trend }: StatCardProps) {
  return (
    <div className="ah-stat-card bg-white border border-[var(--surface-border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-medium text-[var(--text-soft)]">{title}</span>
      </div>

      <div className="mb-1">
        <span className="text-2xl font-bold text-[var(--text)]">{value}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend.isPositive ? 'text-[var(--good)]' : 'text-[var(--error)]'}`}>
            {trend.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(trend.value)}%
          </span>
        )}
        <span className="text-xs text-[var(--text-soft)]">{subtitle}</span>
      </div>
    </div>
  )
}
