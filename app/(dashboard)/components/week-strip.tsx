"use client"
import { updateSingleWeek } from "@/actions/weeks/update-single-week"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getSingleWeek } from "@/actions/weeks/get-single-week"
import { format, addDays, subDays } from "date-fns"
import revalidateTracks from "@/actions/tracks/revalidate"
import DisplayError from "@/utils/display-error"
import getWeekTotalHours from "@/actions/weeks/get-week-total-hours"
import Link from "next/link"
import { Lock, ChevronLeft, ChevronRight } from "lucide-react"

interface WeekStripProps {
  from: Date
  to: Date
}

export const WeekStrip = ({ from, to }: WeekStripProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const [totalHours, setTotalHours] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeekData = async () => {
      setIsLoading(true)
      const response = await getSingleWeek(from)
      if (!response) {
        setIsClosed(false)
      } else if ("error" in response) {
        if (typeof DisplayError === "function") {
          DisplayError(response.error)
        }
      } else {
        setIsClosed(response.isClosed)
      }

      const hoursResponse = await getWeekTotalHours(from)
      if (hoursResponse && "totalMinutes" in hoursResponse) {
        setTotalHours(hoursResponse.totalMinutes / 60)
      }
      setIsLoading(false)
    }
    fetchWeekData()
  }, [from])

  const handleToggleClose = async () => {
    const newState = !isClosed
    setIsClosed(newState)
    const result = await updateSingleWeek(from, newState)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      setIsClosed(!newState)
      return
    }
    toast.success(newState ? "Week closed" : "Week reopened")
    revalidateTracks("/")
  }

  const formattedDateRange = `${format(from, "d")} - ${format(to, "d MMM yyyy")}`
  const targetHours = 40
  const progressPercentage = Math.min((totalHours / targetHours) * 100, 100)

  // Navigation URLs
  const prevWeekParams = new URLSearchParams()
  prevWeekParams.set("from", subDays(from, 6).toISOString().split("T")[0])

  const nextWeekParams = new URLSearchParams()
  nextWeekParams.set("from", addDays(from, 8).toISOString().split("T")[0])

  return (
    <div className={`ah-week-strip ${isClosed ? "closed" : "open"}`}>
      {/* Top info line */}
      <div className="ah-week-strip-header">
        <div className="ah-week-strip-status-label">
          <span className={`ah-week-strip-dot ${isClosed ? "closed" : "open"}`} />
          <span>{isClosed ? "Week closed" : "Week open"}</span>
        </div>
        <div className="ah-week-strip-hint">
          {isClosed
            ? "locked · read only"
            : "hours editable · awaiting close"}
        </div>
      </div>

      {/* Main content line */}
      <div className="ah-week-strip-main">
        {/* Navigation */}
        <div className="ah-week-strip-nav">
          <Link href={`/?${prevWeekParams}`} className="ah-week-strip-nav-btn">
            <ChevronLeft size={18} />
          </Link>
          <Link href={`/?${nextWeekParams}`} className="ah-week-strip-nav-btn">
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Date range */}
        <div className="ah-week-strip-date">{formattedDateRange}</div>

        {/* Progress section */}
        <div className="ah-week-strip-progress">
          <div className="ah-week-strip-progress-text">
            <span className="ah-week-strip-hours">{totalHours.toFixed(1)}h</span>
            <span className="ah-week-strip-target">of {targetHours}h target</span>
          </div>
          <div className="ah-week-strip-progress-bar">
            <div
              className="ah-week-strip-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Status badge */}
        <div className={`ah-week-strip-badge ${isClosed ? "closed" : "open"}`}>
          {isClosed && <Lock size={12} />}
          <span>{isClosed ? "Closed" : "Open"}</span>
        </div>

        {/* Action button */}
        <button
          onClick={handleToggleClose}
          className={`ah-week-strip-action ${isClosed ? "reopen" : "close"}`}
          disabled={isLoading}
        >
          <Lock size={14} />
          <span>{isClosed ? "Reopen week" : "Close week"}</span>
        </button>
      </div>
    </div>
  )
}