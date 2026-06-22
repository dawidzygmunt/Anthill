"use client"

import { format, isSameDay } from "date-fns"

interface MobileWeekCalendarProps {
  from: Date
  to: Date
  selectedDay: Date
  onDaySelect: (date: Date) => void
  dailyTotals: number[]
}

export default function MobileWeekCalendar({
  from,
  to,
  selectedDay,
  onDaySelect,
  dailyTotals,
}: MobileWeekCalendarProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(from)
    date.setDate(date.getDate() + i)
    return date
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dayNames = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <div className="ah-mobile-week-strip">
      {days.map((day, index) => {
        const isSelected = isSameDay(day, selectedDay)
        const isToday = isSameDay(day, today)
        const hasHours = dailyTotals[index] > 0

        return (
          <button
            key={day.toISOString()}
            onClick={() => onDaySelect(day)}
            className={`ah-mobile-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
          >
            <div className="ah-mobile-day-name">{dayNames[index]}</div>
            <div className="ah-mobile-day-number">{format(day, "d")}</div>
            {hasHours && !isSelected && (
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--brand)",
                  marginTop: "4px",
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
