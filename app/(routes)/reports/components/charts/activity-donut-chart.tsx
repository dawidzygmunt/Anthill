"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ActivityDistribution } from "@/actions/reports/get-activity-distribution"

interface ActivityDonutChartProps {
  data: ActivityDistribution[]
}

export default function ActivityDonutChart({ data }: ActivityDonutChartProps) {
  const totalHours = data.reduce((sum, item) => sum + item.hours, 0)

  const chartData = data.map(item => ({
    name: item.name,
    value: item.hours,
    color: item.color,
    percentage: item.percentage
  }))

  const renderLegend = () => (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={item.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[var(--text)]">{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text)]">{item.hours.toFixed(1)}h</span>
            <span className="text-[var(--text-soft)] min-w-[3rem] text-right">{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  )


  return (
    <div className="bg-white border border-[var(--surface-border)] rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">Time by activity</h3>
        <p className="text-sm text-[var(--text-soft)]">Share of this month</p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="w-full lg:w-1/2 relative">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-[var(--text)]">
              {totalHours.toFixed(1)}
            </div>
            <div className="text-sm text-[var(--text-soft)]">
              hours
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {renderLegend()}
        </div>
      </div>
    </div>
  )
}
