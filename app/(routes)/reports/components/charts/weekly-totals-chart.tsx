"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { WeeklyTotal } from "@/actions/reports/get-weekly-totals"

interface WeeklyTotalsChartProps {
  weeks: WeeklyTotal[]
  average: number
}

export default function WeeklyTotalsChart({ weeks, average }: WeeklyTotalsChartProps) {
  const chartData = weeks.map(week => ({
    name: week.weekLabel,
    hours: week.hours
  }))

  return (
    <div className="bg-white border border-[var(--surface-border)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">Weekly totals</h3>
          <p className="text-sm text-[var(--text-soft)]">Last {weeks.length} weeks · hours per week</p>
        </div>
        <div className="text-sm text-[var(--text-soft)]">
          Avg <span className="font-semibold text-[var(--text)]">{average.toFixed(1)}h</span> / week
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bd5629" stopOpacity={1} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: any) => [`${Number(value).toFixed(1)}h`, 'Hours']}
          />
          <ReferenceLine
            y={average}
            stroke="#94a3b8"
            strokeDasharray="3 3"
            label={{
              value: `Avg ${average.toFixed(1)}h`,
              position: 'right',
              fill: '#64748b',
              fontSize: 11
            }}
          />
          <Bar
            dataKey="hours"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
