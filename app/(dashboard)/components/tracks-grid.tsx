import { getActivities } from "@/actions/activities/get-activities"
import getTrackRowsForPeriod from "../../../actions/weeks/get-track-rows-for-period"
import populateWithNewTracks from "../../../utils/populate-with-new-tracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import { getSingleWeek } from "@/actions/weeks/get-single-week"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const weeks = await getTrackRowsForPeriod(from)

  // Check if week is closed
  const weekData = await getSingleWeek(from)
  const isWeekClosed = weekData.ok && weekData.data ? weekData.data.isClosed : false
  const allActivities = await getActivities()
  if (!allActivities.ok) {
    const errorMessage = "code" in allActivities.error
      ? `Failed to load activities: ${allActivities.error.code}`
      : `Failed to load activities: ${allActivities.error.message}`
    throw new Error(errorMessage)
  }

  if (!weeks.ok) {
    const errorMessage = "code" in weeks.error
      ? `Failed to load weeks: ${weeks.error.code}`
      : `Failed to load weeks: ${weeks.error.message}`
    throw new Error(errorMessage)
  }

  if (!weeks.data)
    return (
      <NewTracksRow
        opened={true}
        key={from.toDateString()}
        allActivities={allActivities.data}
        from={from}
        to={to}
      />
    )

  const week = weeks.data

  // Calculate daily totals
  const dailyTotals = Array.from({ length: 7 }, (_, dayIndex) => {
    const dayDate = new Date(from)
    dayDate.setDate(dayDate.getDate() + dayIndex)

    return week.TrackRow.reduce((total, trackRow) => {
      const dayTrack = trackRow.Track.find((track) => {
        const trackDate = new Date(track.date)
        return trackDate.toDateString() === dayDate.toDateString()
      })
      return total + (dayTrack?.minutes || 0)
    }, 0)
  })

  const weekTotal = dailyTotals.reduce((sum, minutes) => sum + minutes, 0)

  return (
    <>
      <Suspense fallback={<SkeletonLoader />}>
        {week.TrackRow.map((trackRow) => {
          return (
            <>
              <Selector
                key={trackRow.activityId}
                trackRowId={trackRow.id}
                activityId={trackRow.activityId}
                activities={allActivities.data}
              />

              <TracksRow
                trackData={populateWithNewTracks(
                  trackRow.Track,
                  trackRow.id,
                  from,
                  to
                )}
                key={trackRow.id}
                isWeekClosed={isWeekClosed}
              />
            </>
          )
        })}
        <NewTracksRow
          opened={week.TrackRow.length === 0}
          key={week.TrackRow.length}
          allActivities={allActivities.data}
          from={from}
          to={to}
        />

        <div className="col-span-2 text-xs font-bold text-gray-700 uppercase pt-4 border-t">
          Daily Total
        </div>
        {dailyTotals.map((minutes, index) => (
          <div key={index} className="text-center py-1 px-0.5 sm:px-2 pt-4 border-t font-bold">
            {minutes > 0 ? `${(minutes / 60).toFixed(1)}` : ""}
          </div>
        ))}
        <div className="text-center py-1 px-0.5 sm:px-2 pt-4 border-t font-bold">
          {weekTotal > 0 ? `${(weekTotal / 60).toFixed(1)}` : ""}
        </div>
      </Suspense>
    </>
  )
}

export default TracksGrid
