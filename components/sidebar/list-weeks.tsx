import { Track, TrackRow, Week } from "@prisma/client"
import { SingleWeek } from "./single-week"
import { da } from "@faker-js/faker"
import { WeekProps } from "@/lib/types"

interface ListWeeksProps {
  weeks: WeekProps[]
}

export const ListWeeks = ({ weeks }: ListWeeksProps) => {
  if (!weeks) {
    return <div>No data</div>
  }

  return (
    <div>
      {weeks.map((week) => (
        <SingleWeek key={week.week.id} week={week.week} />
      ))}
    </div>
  )
}
