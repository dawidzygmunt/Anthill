import { SingleWeek } from "./single-week"
import { ListWeeksProps } from "@/lib/types"

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
