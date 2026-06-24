"use client"
import { addDays, format, isSameWeek, parse, startOfWeek } from "date-fns"
import { timeFormatter } from "@/lib/utils"
import Link from "next/link"
import { SingleWeekProps } from "@/lib/types"
import { useSearchParams, useRouter } from "next/navigation"
import { Lock, LockOpen } from "lucide-react"
import { updateWeekStatus } from "@/actions/weeks/update-week-status"

export const SingleWeek: React.FC<SingleWeekProps> = ({ week }) => {
  const from = startOfWeek(new Date(week.from), { weekStartsOn: 1 })
  const to = addDays(from, 6)
  const searchParams = useSearchParams()
  const search = searchParams.get("from")
  const router = useRouter()

  const handleToggleLock = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await updateWeekStatus({ weekId: week.id, isClosed: !week.isClosed })
    router.refresh()
  }

  const currentYear = new Date().getFullYear()
  const weekYear = from.getFullYear()

  // Format bez roku jeśli bieżący rok
  const formattedDateRange =
    weekYear === currentYear
      ? `${format(from, "dd")} - ${format(to, "dd MMM")}`
      : `${format(from, "dd")} - ${format(to, "dd MMM yyyy")}`

  const weekUrl = new URLSearchParams()
  weekUrl.set("from", addDays(from, 1).toISOString().split("T")[0])

  const parsedDate = parse(week.from.toDateString(), "EEE MMM dd yyyy", new Date())
  const formattedDate = format(parsedDate, "yyyy-MM-dd")

  const isCurrentWeek = isSameWeek(new Date(), from, { weekStartsOn: 1 })
  const isSelected = search == formattedDate

  // Kropka: zielona = zamknięty, pomarańczowa = otwarty
  const dotClass = week.isClosed ? "done" : "progress"

  return (
    <Link
      href={`/?${weekUrl}`}
      className={`ah-week group ${isSelected ? "selected" : ""}`}
    >
      <div className={`ah-week-dot ${dotClass}`} />
      <span className="flex-1">{formattedDateRange}</span>

      {/* Lock button - widoczny tylko na hover */}
      <button
        onClick={handleToggleLock}
        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-[var(--surface-inset)] transition-all"
        title={week.isClosed ? "Unlock week" : "Lock week"}
      >
        {week.isClosed ? (
          <Lock size={12} className="text-[var(--warn)]" />
        ) : (
          <LockOpen size={12} className="text-[var(--good)]" />
        )}
      </button>

      <span className="ah-week-h">{timeFormatter(week.totalMinutes)}h</span>
    </Link>
  )
}
