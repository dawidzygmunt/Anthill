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
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <>
      {dates.map((day, index) => (
        <div
          key={index}
          className={
            day.getDay() === 0 || day.getDay() === 6
              ? "text-gray-400 text-center text-[10px] sm:text-sm"
              : "text-center text-[10px] sm:text-sm"
          }
        >
          {/* <div>{days[day.getDay()]}</div> */}
          <div>{days[day.getDay()].slice(0, 3).toUpperCase()}</div>
          {/* {day.getDate()} {months[day.getMonth()]} */}
          {format(day, "dd MMM")}
        </div>
      ))}
    </>
  )
}

export default WeekRow
