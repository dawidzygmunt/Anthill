import { getActivities } from "@/actions/get-activities"
import getTrackRowsForPeriod from "../server-actions/get-track-rows-for-period"
import populateWithNewTracks from "../utils/populate-with-new-tracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const trackRows = await getTrackRowsForPeriod(from)

  if ("error" in trackRows) return trackRows.error

  const allActivities = await getActivities()
  if ("error" in allActivities) return "Something went wrong"!

  return (
    <>
      <Suspense fallback={<SkeletonLoader />}>
        {trackRows.map((trackRow) => {
          return (
            <>
              <Suspense fallback={<SkeletonLoader />}>
                <Selector
                  key={trackRow.activityId}
                  trackRowId={trackRow.id}
                  activityId={trackRow.activityId}
                  activities={allActivities}
                />
              </Suspense>
              <TracksRow
                trackData={populateWithNewTracks(
                  trackRow.Track,
                  trackRow.id,
                  from,
                  to
                )}
              />
            </>
          )
        })}
        <NewTracksRow
          opened={trackRows.length === 0}
          key={trackRows.length}
          allActivities={allActivities}
          from={from}
          to={to}
        />
      </Suspense>
    </>
  )
}

export default TracksGrid
