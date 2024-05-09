import React from 'react'

const WeekRow = ({
  days
}: {
  days: string[]
}) => {
  return (
    <>
      {days.map((day, index) => (
        <div key={index} className='text-center'>{day}</div>
      ))}
    </>
  )
}

export default WeekRow