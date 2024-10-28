"use client"
import { DoneIndicator } from "./done-indicator"
import { addDays, format, parse, startOfWeek } from "date-fns"
import { timeFormatter } from "@/lib/utils"
import Link from "next/link"
import { SingleWeekProps } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { TriangleAlert } from "lucide-react"

export const SingleWeek: React.FC<SingleWeekProps> = ({ week }) => {
  const from = startOfWeek(new Date(week.from), { weekStartsOn: 1 })
  const to = addDays(from, 6)
  const searchParams = useSearchParams()
  const search = searchParams.get("from")

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`

  const weekUrl = new URLSearchParams()
  weekUrl.set("from", addDays(from, 1).toISOString().split("T")[0])

  const parsedDate = parse(
    week.from.toDateString(),
    "EEE MMM dd yyyy",
    new Date()
  )

  const formattedDate = format(parsedDate, "yyyy-MM-dd")

  return (
    <Link href={`/?${weekUrl}`}>
      <div
        className={`px-5 py-5 flex flex-col justify-center mb-4 shadow-md bg-[#f1f0f0] relative cursor-pointer
        hover:bg-slate-200 transition-all ${search == formattedDate ? "border-2 border-gray-600 shadow-xl" : ""}`}
      >
        <span className="text-md">{formattedDateRange}</span>
        <div className="font-bold my-1">
          {week.mostActiveActivities ? (
            week.mostActiveActivities
          ) : (
            <p className="text-[#305aaa] flex">
              {"Fill your hours"}
              <TriangleAlert
                className="absolute top-3 right-3 text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <DoneIndicator isDone={week.isClosed} />
          <div className="text-sm bg-slate-300 px-2 rounded-xl mr-3">
            {timeFormatter(week.totalMinutes)}
          </div>
        </div>
      </div>
    </Link>
  )
}
