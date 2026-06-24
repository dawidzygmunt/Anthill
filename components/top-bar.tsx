"use client"
import { updateWeekStatus } from "@/actions/weeks/update-week-status"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getSingleWeek } from "@/actions/weeks/get-single-week"
import { format } from "date-fns"
import revalidateTracks from "../actions/tracks/revalidate"
import DisplayError from "@/utils/display-error"
import getWeekTotalHours from "@/actions/weeks/get-week-total-hours"

export const TopBar = ({ from, to }: { from: Date; to: Date }) => {
  const [isDone, setIsDone] = useState(false)
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    const fetchWeekData = async () => {
      const response = await getSingleWeek(from)
      if (!response) {
        setIsDone(false)
      } else if ("error" in response) {
        DisplayError(response.error)
      } else {
        setIsDone(response.isClosed)
      }

      const hoursResponse = await getWeekTotalHours(from)
      if (hoursResponse && "totalMinutes" in hoursResponse) {
        setTotalHours(hoursResponse.totalMinutes / 60)
      }
    }
    fetchWeekData()
  }, [from])

  const handleButtonClick = async () => {
    setIsDone(!isDone)
    const result = await updateWeekStatus({ from, isClosed: !isDone })
    if ("error" in result) {
      DisplayError(result.error)
      return
    }
    !isDone && toast.success("Week closed")
    revalidateTracks("/")
  }

  const formattedDateRange = `${format(from, "dd")} - ${format(to, "dd MMM yyyy")}`
  const targetHours = 40
  const progressPercentage = Math.min((totalHours / targetHours) * 100, 100)

  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-2xl font-bold">{formattedDateRange}</div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-gray-500">
            <span className="font-bold text-black">{totalHours.toFixed(1)}h</span> of {targetHours}h target
          </span>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-orange-300 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isDone
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isDone ? "Done" : "In progress"}
        </span>
        <Button
          onClick={handleButtonClick}
          className="bg-brand w-[140px] hover:bg-brand-dark"
        >
          {isDone ? "Reopen week" : "Submit week"}
        </Button>
      </div>
    </div>
  )
}
