import { Suspense } from "react"
import { SingleWeek } from "./single-week"
import { ListWeeksProps } from "@/lib/types"
import { SkeletonLoader } from "../skeleton-lodaer"

export const ListWeeks = ({ weeks }: ListWeeksProps) => {
  if (!weeks) {
    return <div>No data</div>
  }

  // Sortuj tygodnie od najnowszego do najstarszego
  const sortedWeeks = [...weeks].sort((a, b) => {
    return new Date(b.from).getTime() - new Date(a.from).getTime()
  })

  return (
    <div className="ah-weeks">
      <div className="ah-side-label">RECENT WEEKS</div>
      {sortedWeeks.map((week) => (
        <Suspense key={week.id} fallback={<SkeletonLoader />}>
          <SingleWeek week={week} />
        </Suspense>
      ))}
    </div>
  )
}
