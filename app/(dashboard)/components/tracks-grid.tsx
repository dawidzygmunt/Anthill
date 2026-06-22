import { getActivities } from "@/actions/activities/get-activities"
import getTrackRowsForPeriod from "../../../actions/weeks/get-track-rows-for-period"
import populateWithNewTracks from "../../../utils/populate-with-new-tracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import DisplayError from "@/utils/display-error"
import { getSingleWeek } from "@/actions/weeks/get-single-week"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const weeks = await getTrackRowsForPeriod(from)

  // Check if week is closed
  const weekData = await getSingleWeek(from)
  const isWeekClosed = weekData && !("error" in weekData) ? weekData.isClosed : false
  const allActivities = await getActivities()
  if ("error" in allActivities) {
    if (typeof DisplayError === "function") {
      DisplayError(allActivities.error)
    }
    return
  }

  if (!weeks)
    return (
      <NewTracksRow
        opened={true}
        key={from.toDateString()}
        allActivities={allActivities}
        from={from}
        to={to}
      />
    )

  if ("error" in weeks) {
    if (typeof DisplayError === "function") {
      DisplayError(weeks.error)
    }
    return
  }

  // Calculate daily totals
  const dailyTotals = Array.from({ length: 7 }, (_, dayIndex) => {
    const dayDate = new Date(from)
    dayDate.setDate(dayDate.getDate() + dayIndex)

    return weeks.TrackRow.reduce((total, trackRow) => {
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
        {weeks.TrackRow.map((trackRow) => {
          return (
            <>
              <Selector
                key={trackRow.activityId}
                trackRowId={trackRow.id}
                activityId={trackRow.activityId}
                activities={allActivities}
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
          opened={weeks.TrackRow.length === 0}
          key={weeks.TrackRow.length}
          allActivities={allActivities}
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
