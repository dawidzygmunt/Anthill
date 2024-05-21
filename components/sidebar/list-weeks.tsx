import { Track, TrackRow } from "@prisma/client"
import { SingleWeek } from "./single-week"

interface SingleWeekData {
  data: TrackRow[]
}

export const ListWeeks = ({ data }: SingleWeekData) => {
  return (
    <div>
      {data?.map((week: any) => <SingleWeek key={week.id} data={week} />)}
    </div>
  )
}
