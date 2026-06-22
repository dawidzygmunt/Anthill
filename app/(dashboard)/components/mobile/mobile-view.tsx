"use client"

import { useState } from "react"
import { Activity, Track, TrackRow } from "@prisma/client"
import MobileHeader from "./mobile-header"
import MobileWeekCalendar from "./mobile-week-calendar"
import MobileActivityList from "./mobile-activity-list"
import MobileAddActivityModal from "./mobile-add-activity-modal"
import { Plus } from "lucide-react"

interface ExtendedTrackRow extends TrackRow {
  Track: Track[]
}

interface MobileViewProps {
  from: Date
  to: Date
  trackRows: ExtendedTrackRow[]
  activities: Activity[]
  isWeekClosed: boolean
  dailyTotals: number[]
}

export default function MobileView({
  from,
  to,
  trackRows,
  activities,
  isWeekClosed,
  dailyTotals,
}: MobileViewProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Default to today if within week, otherwise first day
  const defaultDay = today >= from && today <= to ? today : from
  const [selectedDay, setSelectedDay] = useState<Date>(defaultDay)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedDayIndex = Math.floor(
    (selectedDay.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  )
  const selectedDayHours = selectedDayIndex >= 0 && selectedDayIndex < 7
    ? dailyTotals[selectedDayIndex] / 60
    : 0

  return (
    <div className="lg:hidden flex flex-col min-h-screen">
      <MobileHeader
        from={from}
        to={to}
        todayHours={selectedDayHours}
        isWeekClosed={isWeekClosed}
      />
      <MobileWeekCalendar
        from={from}
        to={to}
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
        dailyTotals={dailyTotals}
      />
      <MobileActivityList
        trackRows={trackRows}
        activities={activities}
        selectedDate={selectedDay}
        isWeekClosed={isWeekClosed}
      />

      {/* Floating Action Button */}
      <button
        className="ah-mobile-fab lg:hidden"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add activity"
      >
        <Plus size={24} />
      </button>

      {/* Add Activity Modal */}
      <MobileAddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activities={activities}
        selectedDate={selectedDay}
        from={from}
        to={to}
        existingActivityIds={trackRows.map((tr) => tr.activityId)}
      />
    </div>
  )
}
