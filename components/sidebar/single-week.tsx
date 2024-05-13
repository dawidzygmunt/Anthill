import React from "react"
import { DoneIndicator } from "./done-indicator"
import { format } from "date-fns"

interface SingleWeekProps {
  data: {
    from: Date
    to: Date
    ActivityName: string
    isDone: boolean
    workTime: number
  }
}

export const SingleWeek: React.FC<SingleWeekProps> = ({
  data: { from, to, ActivityName, isDone, workTime },
}) => {
  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`

  return (
    <div className="px-10 py-5 flex flex-col justify-center my-4 shadow-md bg-[#f1f0f0]">
      <h1>{formattedDateRange}</h1>
      <span>{ActivityName}</span>
      <div className="flex items-center">
        <DoneIndicator isDone={isDone} />
        {workTime}
      </div>
    </div>
  )
}
