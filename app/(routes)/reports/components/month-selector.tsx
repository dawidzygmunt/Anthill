"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"

export default function MonthSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current month and year from URL params or default to now
  const monthParam = searchParams.get('month')
  const yearParam = searchParams.get('year')

  const currentDate = monthParam && yearParam
    ? new Date(parseInt(yearParam), parseInt(monthParam) - 1, 1)
    : new Date()

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentDate, 1)
    updateUrl(prevMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1)
    updateUrl(nextMonth)
  }

  const updateUrl = (date: Date) => {
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    router.push(`/reports?month=${month}&year=${year}`)
  }

  return (
    <div className="flex items-center gap-2 bg-white border border-[var(--surface-border)] rounded-lg px-3 py-2">
      <Calendar size={16} className="text-[var(--text-soft)]" />

      <button
        onClick={handlePrevMonth}
        className="p-1 hover:bg-[var(--surface-inset)] rounded transition-colors"
      >
        <ChevronLeft size={16} className="text-[var(--text-soft)]" />
      </button>

      <span className="text-sm font-medium text-[var(--text)] min-w-[120px] text-center">
        {format(currentDate, 'MMMM yyyy')}
      </span>

      <button
        onClick={handleNextMonth}
        className="p-1 hover:bg-[var(--surface-inset)] rounded transition-colors"
      >
        <ChevronRight size={16} className="text-[var(--text-soft)]" />
      </button>
    </div>
  )
}
