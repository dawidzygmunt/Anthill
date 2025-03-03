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

  const formattedDateRange = `${format(from, "dd MMM")} - ${format(to, "dd MMM")}`

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
        className={`p-3 pt-2 flex flex-col justify-center mb-4 shadow-md bg-white/75 relative cursor-pointer rounded-lg ${
          search == formattedDate ? "!bg-white/90 " : ""
        }`}
      >
        <span className="text-md font-bold">{formattedDateRange}</span>
        <div className="font-bold my-1">
          {week.mostActiveActivities ? (
            <span className="font-normal">{week.mostActiveActivities}</span>
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
          <div className="text-xs bg-emerald-900 text-white px-2 rounded-xl">
            {timeFormatter(week.totalMinutes)}
          </div>
        </div>
      </div>
    </Link>
  )
}
