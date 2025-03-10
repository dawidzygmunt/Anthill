"use client"
import { updateSingleWeek } from "@/actions/weeks/update-single-week"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getSingleWeek } from "@/actions/weeks/get-single-week"
import { format } from "date-fns"
import revalidateTracks from "../actions/tracks/revalidate"
import DisplayError from "@/utils/display-error"

export const TopBar = ({ from, to }: { from: Date; to: Date }) => {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const getWeek = async () => {
      const response = await getSingleWeek(from)
      if (!response) {
        setIsDone(false)
        return
      }
      if ("error" in response) {
        if (typeof DisplayError === "function") {
          DisplayError(response.error)
        }
        return
      }
      setIsDone(response.isClosed)
    }
    getWeek()
  })

  const handleButtonClick = async () => {
    setIsDone(!isDone)
    updateSingleWeek(from, !isDone)
    const result = await updateSingleWeek(from, !isDone)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    !isDone && toast.success("Week closed")
    revalidateTracks("/")
  }

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`

  return (
    <div className="w-full flex justify-between mb-3">
      <div className="text-2xl font-bold text-center">{formattedDateRange}</div>
      <div>
        {isDone ? (
          <Button
            onClick={handleButtonClick}
            className="bg-green-600 w-[140px] hover:bg-green-700"
          >
            Done
          </Button>
        ) : (
          <Button
            onClick={handleButtonClick}
            className="bg-[#fca5a5] w-[140px] hover:bg-[#e29494]"
          >
            in progress
          </Button>
        )}
      </div>
    </div>
  )
}
