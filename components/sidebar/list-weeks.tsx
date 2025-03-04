import { Suspense } from "react"
import { SingleWeek } from "./single-week"
import { ListWeeksProps } from "@/lib/types"
import { SkeletonLoader } from "../skeleton-lodaer"

export const ListWeeks = ({ weeks }: ListWeeksProps) => {
  if (!weeks) {
    return <div>No data</div>
  }

  return (
    <div className="">
      {weeks.map((week) => (
        <Suspense key={week.id} fallback={<SkeletonLoader />}>
          <SingleWeek key={week.id} week={week} />
        </Suspense>
      ))}
    </div>
  )
}
