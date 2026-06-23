"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { DailyBreakdown } from "@/actions/reports/get-daily-breakdown"

interface HoursByDayChartProps {
  data: DailyBreakdown[]
}

export default function HoursByDayChart({ data }: HoursByDayChartProps) {
  // Calculate total hours across all days
  const totalHours = data.reduce((sum, day) => sum + day.total, 0)

  // Get all unique activities across all days
  const allActivities = new Set<string>()
  data.forEach(day => {
    day.activities.forEach(act => allActivities.add(act.id))
  })

  // Transform data for stacked bar chart
  const chartData = data.map(day => {
    const dayData: any = { name: day.day, total: day.total }

    // Add each activity as a property
    day.activities.forEach(act => {
      dayData[act.id] = act.hours
    })

    return dayData
  })

  // Get activity colors mapping
  const activityColors: Record<string, string> = {}
  const activityNames: Record<string, string> = {}
  data.forEach(day => {
    day.activities.forEach(act => {
      activityColors[act.id] = act.color
      activityNames[act.id] = act.name
    })
  })

  const activities = Array.from(allActivities)

  return (
    <div className="bg-white border border-[var(--surface-border)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">Hours by day</h3>
          <p className="text-sm text-[var(--text-soft)]">This week · stacked by activity</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#d1fae5] rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#059669]"></div>
          <span className="text-sm font-semibold text-[#059669]">
            {totalHours.toFixed(1)}h total
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
            formatter={(value: any, name: any) => {
              const nameStr = String(name)
              return [`${Number(value).toFixed(1)}h`, activityNames[nameStr] || nameStr]
            }}
          />
          {activities.map(activityId => (
            <Bar
              key={activityId}
              dataKey={activityId}
              stackId="a"
              fill={activityColors[activityId] || '#bd5629'}
              radius={[0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-around mt-4 pt-4 border-t border-[var(--surface-border)]">
        {data.map(day => (
          <div key={day.day} className="text-center">
            <div className="text-xs text-[var(--text-muted)] mb-1">{day.day}</div>
            <div className="text-sm font-semibold text-[var(--text)]">
              {day.total > 0 ? day.total.toFixed(1) : '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
