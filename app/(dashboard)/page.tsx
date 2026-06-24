import WeekRow from "./components/week-row"
import TracksGrid from "./components/tracks-grid"
import { addDays, startOfWeek, isValid } from "date-fns"
import { WeekStrip } from "./components/week-strip"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import { handleError } from "@/utils/error-handler"
import MobileView from "./components/mobile/mobile-view"
import getTrackRowsForPeriod from "@/actions/weeks/get-track-rows-for-period"
import { getActivities } from "@/actions/activities/get-activities"
import { getSingleWeek } from "@/actions/weeks/get-single-week"

interface HomeProps {
  searchParams: { from: string }
}

// export const generateMetadata = ({ searchParams }: HomeProps): Metadata => {
//   return {
//     title: `Anthill v2 - ${searchParams.from}`,
//   }
// }

export default async function Home({ searchParams }: HomeProps) {
  try {
    const paramDate = new Date(searchParams.from)
    const from = isValid(paramDate)
      ? startOfWeek(paramDate, { weekStartsOn: 1 })
      : startOfWeek(new Date(), { weekStartsOn: 1 })

    const to = addDays(from, 6)

    // Fetch data for mobile view
    const weeks = await getTrackRowsForPeriod(from)
    const allActivities = await getActivities()
    const weekData = await getSingleWeek(from)
    const isWeekClosed = weekData && !("error" in weekData) ? weekData.isClosed : false

    if ("error" in allActivities) {
      const errorMessage = "code" in allActivities.error
        ? `Failed to load activities: ${allActivities.error.code}`
        : `Failed to load activities: ${allActivities.error.message}`
      throw new Error(errorMessage)
    }

    const trackRows = weeks && !("error" in weeks) ? weeks.TrackRow : []

    // Calculate daily totals for mobile calendar
    const dailyTotals = Array.from({ length: 7 }, (_, dayIndex) => {
      const dayDate = new Date(from)
      dayDate.setDate(dayDate.getDate() + dayIndex)

      return trackRows.reduce((total, trackRow) => {
        const dayTrack = trackRow.Track.find((track) => {
          const trackDate = new Date(track.date)
          return trackDate.toDateString() === dayDate.toDateString()
        })
        return total + (dayTrack?.minutes || 0)
      }, 0)
    })

    return (
      <>
        {/* Desktop View */}
        <main className="hidden lg:block px-4 lg:px-12 xl:px-24 pt-2">
          <WeekStrip from={from} to={to} />

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 overflow-x-auto">
            <div className="grid grid-cols-10 lg:gap-1 px-0 mx-0 min-w-[800px]">
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

        {/* Mobile View */}
        <MobileView
          from={from}
          to={to}
          trackRows={trackRows}
          activities={allActivities}
          isWeekClosed={isWeekClosed}
          dailyTotals={dailyTotals}
        />
      </>
    )
  } catch (error) {
    handleError(error)
  }
}
