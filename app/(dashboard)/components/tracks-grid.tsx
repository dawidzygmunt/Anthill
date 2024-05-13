import { GetActivities } from "@/actions/get-activities"
import getTrackRowsForPeriod from "../server-actions/getActivitiesForPeriod"
import getTracksForPeriod from "../server-actions/getTracksForPeriod"

import populateWithNewTracks from "../utils/populateWithNewTracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const trackRows = await getTrackRowsForPeriod(from)

  if ("error" in trackRows) return trackRows.error

  const allActivities = await GetActivities()

  return (
    <>
      {Promise.all(
        trackRows.map(async (trackRow) => {
          const tracks = await getTracksForPeriod(trackRow.id)
          if ("error" in tracks) return tracks.error
          return (
            <>
              <Selector
                key={trackRow.activityId}
                from={from}
                to={to}
                activityId={trackRow.activityId}
                activities={allActivities}
              />
              <TracksRow
                trackData={populateWithNewTracks(tracks, trackRow.id, from, to)}
              />
            </>
          )
        })
      )}
      {/* <NewTracksRow
        opened={activities.length === 0}
        key={activities.length}
        allActivities={allActivities}
        from={from}
        to={to}
      /> */}
    </>
  )
}

export default TracksGrid
