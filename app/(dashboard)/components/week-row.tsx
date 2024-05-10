import { addDays } from "date-fns"
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
        <div key={index} className="t">
          <div>{days[day.getDay()]}</div>
          {day.getDate()} {months[day.getMonth()]}
        </div>
      ))}
    </>
  )
}

export default WeekRow
