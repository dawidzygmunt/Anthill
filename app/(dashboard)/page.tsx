import WeekRow from "./components/week-row"
import TracksGrid from "./components/tracks-grid"
import { addDays, startOfWeek, isValid } from "date-fns"
import { WeekStrip } from "./components/week-strip"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import { handleError } from "@/utils/error-handler"

interface HomeProps {
  searchParams: { from: string }
}

// export const generateMetadata = ({ searchParams }: HomeProps): Metadata => {
//   return {
//     title: `Anthill v2 - ${searchParams.from}`,
//   }
// }

export default function Home({ searchParams }: HomeProps) {
  try {
    const paramDate = new Date(searchParams.from)
    const from = isValid(paramDate)
      ? startOfWeek(paramDate, { weekStartsOn: 1 })
      : startOfWeek(new Date(), { weekStartsOn: 1 })

    const to = addDays(from, 6)

    return (
      <main className="px-5 lg:p-24 lg:pt-2 ">
        <WeekStrip from={from} to={to} />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <div className="grid grid-cols-10 lg:gap-1 px-0 mx-0">
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider pb-2">
              Activity
            </div>
            <WeekRow from={from} />
            <Suspense fallback={<SkeletonLoader />}>
              <TracksGrid from={from} to={addDays(to, 1)} />
            </Suspense>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    handleError(error)
  }
}
