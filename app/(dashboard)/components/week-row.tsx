import { addDays, format } from "date-fns"
import React from "react"

const WeekRow = ({ from }: { from: Date }) => {
  const dates = Array.from(Array(7).keys()).map((shift) => addDays(from, shift))
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <>
      {dates.map((day, index) => {
        const dayDate = new Date(day)
        dayDate.setHours(0, 0, 0, 0)
        const isToday = dayDate.getTime() === today.getTime()
        const isWeekend = day.getDay() === 0 || day.getDay() === 6

        return (
          <div
            key={index}
            className={`text-center text-[10px] sm:text-sm pb-2 ${
              isToday
                ? "text-brand font-bold"
                : isWeekend
                ? "text-gray-400"
                : ""
            }`}
          >
            <div className="font-semibold uppercase">
              {days[day.getDay()].slice(0, 3)}
            </div>
            <div className="text-xs">{format(day, "d")}</div>
          </div>
        )
      })}
      <div className="text-center text-[10px] sm:text-sm font-semibold text-gray-500 uppercase pb-2">
        Total
      </div>
    </>
  )
}

export default WeekRow
