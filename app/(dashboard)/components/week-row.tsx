import React from 'react'

const WeekRow = ({
  days
}: {
  days: string[]
}) => {
  return (
    <>
      {days.map((day) => (
        <div>{day}</div>
      ))}
    </>
  )
}

export default WeekRow