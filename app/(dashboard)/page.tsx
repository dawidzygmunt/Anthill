import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, differenceInDays, startOfWeek, isValid } from "date-fns"
import { Button } from "@/components/ui/button"
import WeekToggler from "./components/week-toggler"

interface HomeProps {
  searchParams: { from: string }
}

export default function Home({ searchParams }: HomeProps) {
  const paramDate = new Date(searchParams.from)
  const from = isValid(paramDate)
    ? paramDate
    : startOfWeek(new Date(), { weekStartsOn: 1 })
  console.log(searchParams)

  const to = addDays(from, 7)
  let nextFrom = to

  // let preVFrom = removeda(to, 7)

  const days = differenceInDays(to, from)
  const dates = Array.from(Array(days).keys()).map((shift) =>
    addDays(from, shift).toString()
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SideBar /> */}
      <div className="grid grid-cols-9 gap-2">
        <WeekToggler from={from} />

        <WeekRow days={dates} />

        <TracksGrid from={from} to={to} />
      </div>
    </main>
  )
}
