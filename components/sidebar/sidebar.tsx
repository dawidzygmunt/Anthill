import React from "react"
import { SingleWeek } from "./single-week"
import { addDays } from "date-fns"

const SideBar = () => {
  const today = new Date()
  const to = addDays(today, 7)
  const data = {
    from: today,
    to: to,
    ActivityName: "abc",
    isDone: true,
    workTime: 40,
  }
  return (
    <div className="w-[250px]  bg-[#e6e6e6] flex flex-col min-h-screen">
      <SingleWeek data={data} />
    </div>
  )
}

export default SideBar
