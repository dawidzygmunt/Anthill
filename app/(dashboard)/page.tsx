import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, startOfWeek, isValid } from "date-fns"
import WeekToggler from "./components/week-toggler"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"

interface HomeProps {
  searchParams: { from: string }
}

export default function Home({ searchParams }: HomeProps) {
  const paramDate = new Date(searchParams.from)
  const from = isValid(paramDate)
    ? paramDate
    : startOfWeek(new Date(), { weekStartsOn: 1 })

  const to = addDays(from, 7)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-5 lg:p-24 pt-20">
      <div className="grid grid-cols-9 lg:gap-1 px-0 mx-0">
        <WeekToggler from={from} />

        <WeekRow from={from} />
        <Suspense fallback={<SkeletonLoader />}>
          <TracksGrid from={from} to={to} />
        </Suspense>
      </div>
    </main>
  )
}
