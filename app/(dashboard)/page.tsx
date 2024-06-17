import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, startOfWeek, isValid } from "date-fns"
import WeekToggler from "./components/week-toggler"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import { TopBar } from "../../components/top-bar"
import { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"

interface HomeProps {
  searchParams: { from: string }
}

export const generateMetadata = ({ searchParams }: HomeProps): Metadata => {
  return {
    title: `Anthill v2 - ${searchParams.from}`,
  }
}

export default function Home({ searchParams }: HomeProps) {
  const paramDate = new Date(searchParams.from)
  const from = isValid(paramDate)
    ? startOfWeek(paramDate, { weekStartsOn: 1 })
    : startOfWeek(new Date(), { weekStartsOn: 1 })

  const to = addDays(from, 6)

  return (
    <main className="px-5 lg:p-24 lg:pt-2 ">
      <TopBar from={from} to={to} />

      <div className="grid grid-cols-9 lg:gap-1 px-0 mx-0">
        <WeekToggler from={addDays(from, 1)} />

        <WeekRow from={from} />
        <Suspense fallback={<SkeletonLoader />}>
          <TracksGrid from={from} to={addDays(to, 1)} />
        </Suspense>
      </div>
    </main>
  )
}
