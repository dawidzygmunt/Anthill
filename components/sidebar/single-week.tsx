"use client"
import { DoneIndicator } from "./done-indicator"
import { addDays, format, isSameWeek, parse, startOfWeek } from "date-fns"
import { timeFormatter } from "@/lib/utils"
import Link from "next/link"
import { SingleWeekProps } from "@/lib/types"
import { useSearchParams, useRouter } from "next/navigation"
import { Lock, LockOpen } from "lucide-react"
import { CloseWeek } from "@/actions/weeks/close-week"

export const SingleWeek: React.FC<SingleWeekProps> = ({ week }) => {
  const from = startOfWeek(new Date(week.from), { weekStartsOn: 1 })
  const to = addDays(from, 6)
  const searchParams = useSearchParams()
  const search = searchParams.get("from")
  const router = useRouter()

  const handleToggleLock = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await CloseWeek(week.id, !week.isClosed)
    router.refresh()
  }

  const formattedDateRange = `${format(from, "dd")} - ${format(to, "dd MMM yyyy")}`

  const weekUrl = new URLSearchParams()
  weekUrl.set("from", addDays(from, 1).toISOString().split("T")[0])

  const parsedDate = parse(
    week.from.toDateString(),
    "EEE MMM dd yyyy",
    new Date()
  )

  const formattedDate = format(parsedDate, "yyyy-MM-dd")

  const isCurrentWeek = isSameWeek(new Date(), from, { weekStartsOn: 1 })
  const isSelected = search == formattedDate

  return (
    <Link href={`/?${weekUrl}`}>
      <div className="relative mb-4">
        <div
          className={`px-5 py-2 flex flex-col justify-center shadow-sm bg-[#f9fafb] relative cursor-pointer border-2
           transition-all rounded-xl
          ${isCurrentWeek ? `outline outline-2 outline-green-500 ${isSelected ? "outline-offset-2" : "outline-offset-0"}` : ""}
          ${
            isSelected
              ? `border-blue-600 ${isCurrentWeek ? "" : "bg-blue-600/10"}`
              : "hover:bg-slate-100 border-[#f9fafb]"
          }`}
        >
          <button
            onClick={handleToggleLock}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            title={week.isClosed ? "Unlock week" : "Lock week"}
          >
            {week.isClosed ? (
              <Lock size={16} className="text-red-500" />
            ) : (
              <LockOpen size={16} className="text-green-500" />
            )}
          </button>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">{formattedDateRange}</p>
          </div>
          {isCurrentWeek && (
            <span className="text-xs font-medium text-green-600">
              Current week
            </span>
          )}
          <div className="flex justify-between items-center text-sm my-1">
            <p className="text-gray-700">Total hours: </p>
            <span className="font-semibold text-sm">
              {timeFormatter(week.totalMinutes)} h
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <DoneIndicator isDone={week.isClosed} />
          </div>
        </div>
      </div>
    </Link>
  )
}
