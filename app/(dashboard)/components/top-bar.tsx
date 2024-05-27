"use client"
import { updateSingleWeek } from "@/actions/weeks/update-single-week"
import { Button } from "@/components/ui/button"
import { error } from "console"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getSingleWeek } from "@/actions/weeks/get-single-week"
import { format } from "date-fns"
import revalidateTracks from "../../../actions/tracks/revalidate"

export const TopBar = ({ from, to }: { from: Date; to: Date }) => {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const getWeek = async () => {
      const response = await getSingleWeek(from)
      if (!response) {
        // toast.error("Week not found!")
        setIsDone(false)
        return
      }
      if ("error" in response) {
        toast.error(response.error)
        return
      }
      setIsDone(response.isClosed)
    }
    getWeek()
  })

  const handleButtonClick = async () => {
    setIsDone(!isDone)
    updateSingleWeek(from, !isDone)
    const response = await updateSingleWeek(from, !isDone)
    if ("error" in response) {
      toast.error(response.error)
      return
    }
    !isDone && toast.success("Week closed")
    revalidateTracks("/")
  }

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`

  return (
    <div className="w-full flex justify-between items-center m-10 mr-20 mt-0">
      <div className="text-2xl font-bold">{formattedDateRange}</div>
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
            className="bg-purple-600 w-[140px] hover:bg-purple-700"
          >
            in progress
          </Button>
        )}
      </div>
    </div>
  )
}
