import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, differenceInDays, startOfWeek, isValid } from "date-fns"
import { Button } from "@/components/ui/button"
import WeekToggler from "./components/week-toggler"
import { Suspense } from "react"

interface HomeProps {
  searchParams: { from: string }
}

export default function Home({ searchParams }: HomeProps) {
  const paramDate = new Date(searchParams.from)
  const from = isValid(paramDate)
    ? paramDate
    : startOfWeek(new Date(), { weekStartsOn: 1 })

  const to = addDays(from, 7)
  // let nextFrom = to

  // let preVFrom = removeda(to, 7)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SideBar /> */}
      <div className="grid grid-cols-9 gap-1">
        <WeekToggler from={from} />

        <WeekRow from={from} />
        <Suspense fallback={<div>Loading...</div>}>
          <TracksGrid from={from} to={to} />
        </Suspense>
      </div>
    </main>
  )
}
