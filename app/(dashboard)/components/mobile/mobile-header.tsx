"use client"

import { format, addDays, subDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface MobileHeaderProps {
  from: Date
  to: Date
  todayHours: number
  isWeekClosed: boolean
}

export default function MobileHeader({
  from,
  to,
  todayHours,
  isWeekClosed,
}: MobileHeaderProps) {
  const formattedDateRange = `${format(from, "d")} - ${format(to, "d MMM")}`

  // Navigation URLs (same logic as WeekStrip)
  const prevWeekParams = new URLSearchParams()
  prevWeekParams.set("from", subDays(from, 7).toISOString().split("T")[0])

  const nextWeekParams = new URLSearchParams()
  nextWeekParams.set("from", addDays(from, 7).toISOString().split("T")[0])

  return (
    <div className="ah-mobile-header">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href={`/?${prevWeekParams}`} style={{ display: "flex", padding: "4px" }}>
              <ChevronLeft size={20} color="var(--text-soft)" />
            </Link>
            <div>
              <div className="ah-mobile-header-title">This week</div>
              <div className="ah-mobile-header-date">
                {formattedDateRange} · {todayHours > 0 ? `${todayHours.toFixed(1)}h today` : "0h today"}
              </div>
            </div>
            <Link href={`/?${nextWeekParams}`} style={{ display: "flex", padding: "4px" }}>
              <ChevronRight size={20} color="var(--text-soft)" />
            </Link>
          </div>
        </div>
        <div
          className={`ah-mobile-status-badge ${isWeekClosed ? "closed" : "open"}`}
        >
          <span className={`ah-week-strip-dot ${isWeekClosed ? "closed" : "open"}`} />
          <span>{isWeekClosed ? "Closed" : "In progress"}</span>
        </div>
      </div>
    </div>
  )
}
