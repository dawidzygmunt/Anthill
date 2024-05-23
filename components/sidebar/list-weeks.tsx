import { Track, TrackRow, Week } from "@prisma/client"
import { SingleWeek } from "./single-week"
import { da } from "@faker-js/faker"

interface ListWeeksProps {
  weeks: (Week[] & { TrackRow: TrackRow[] }) | null
}

export const ListWeeks = ({ weeks }: ListWeeksProps) => {
  if (!weeks) {
    return <div>No data</div>
  }

  return (
    <div>
      {weeks.map((week) => (
        <SingleWeek key={week.id} week={week} />
      ))}
    </div>
  )
}
