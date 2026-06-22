"use client"

import { Activity, Track } from "@prisma/client"
import { useState, useEffect } from "react"
import MobileTimeControl from "./mobile-time-control"
import handleTrackChange from "@/actions/tracks/handle-track-change"
import revalidateTracks from "@/actions/tracks/revalidate"
import toast from "react-hot-toast"
import DisplayError from "@/utils/display-error"

interface MobileActivityCardProps {
  trackRowId: string
  activity: Activity
  track: Track | null
  selectedDate: Date
  isWeekClosed: boolean
}

export default function MobileActivityCard({
  trackRowId,
  activity,
  track,
  selectedDate,
  isWeekClosed,
}: MobileActivityCardProps) {
  const currentHours = track?.minutes ? track.minutes / 60 : 0
  const [optimisticHours, setOptimisticHours] = useState(currentHours)
  const [isUpdating, setIsUpdating] = useState(false)

  // Update optimistic hours when track or selectedDate changes
  useEffect(() => {
    setOptimisticHours(currentHours)
  }, [currentHours, selectedDate])

  const INCREMENT = 0.5 // 30 minutes

  const handleIncrement = async () => {
    if (isWeekClosed || isUpdating) return

    const newHours = optimisticHours + INCREMENT
    setOptimisticHours(newHours)
    setIsUpdating(true)

    const result = await handleTrackChange(
      trackRowId,
      selectedDate,
      Math.round(newHours * 60)
    )

    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      setOptimisticHours(currentHours)
    } else {
      setOptimisticHours(result.minutes / 60)
      revalidateTracks()
    }
    setIsUpdating(false)
  }

  const handleDecrement = async () => {
    if (isWeekClosed || isUpdating || optimisticHours <= 0) return

    const newHours = Math.max(0, optimisticHours - INCREMENT)
    setOptimisticHours(newHours)
    setIsUpdating(true)

    const result = await handleTrackChange(
      trackRowId,
      selectedDate,
      Math.round(newHours * 60)
    )

    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      setOptimisticHours(currentHours)
    } else {
      setOptimisticHours(result.minutes / 60)
      revalidateTracks()
    }
    setIsUpdating(false)
  }

  return (
    <div className="ah-mobile-activity-card">
      <div
        className="ah-mobile-activity-color"
        style={{ backgroundColor: activity.color }}
      />
      <div className="ah-mobile-activity-info">
        <div className="ah-mobile-activity-name">{activity.name}</div>
      </div>
      <MobileTimeControl
        hours={optimisticHours}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        disabled={isWeekClosed || isUpdating}
      />
    </div>
  )
}
