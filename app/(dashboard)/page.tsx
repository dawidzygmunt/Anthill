import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, differenceInDays, startOfWeek } from "date-fns"

//
export default function Home() {
  const from = startOfWeek(new Date(), { weekStartsOn: 1 })
  const to = addDays(from, 7)

  const days = differenceInDays(to, from)
  const dates = Array.from(Array(days).keys()).map((shift) =>
    addDays(from, shift).toString()
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SideBar /> */}
      <div className="grid grid-cols-9 gap-2">
        <div className="col-span-2"></div>
        <WeekRow days={dates} />

        <TracksGrid from={from} to={to} />
      </div>
    </main>
  )
}
