import { GetActivities } from "@/actions/get-activities"
import getActivitiesForPeriod from "../utils/getActivitiesForPeriod"
import getTracksForPeriod from "../utils/getTracksForPeriod"

import populateWithNewTracks from "../utils/populateWithNewTracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const activities = await getActivitiesForPeriod(from, to)

  if ("error" in activities) return activities.error

  const allActivities = await GetActivities()

  return (
    <>
      {Promise.all(
        activities.map(async (activity) => {
          const tracks = await getTracksForPeriod(activity.id, from, to)
          if ("error" in tracks) return tracks.error
          return (
            <>
              <Selector
                key={activity.id}
                from={from}
                to={to}
                activityId={activity.id}
                activities={allActivities}
              />
              <TracksRow
                trackData={populateWithNewTracks(tracks, activity.id, from, to)}
              />
            </>
          )
        })
      )}
      <NewTracksRow
        opened={activities.length === 0}
        key={activities.length}
        allActivities={allActivities}
        from={from}
        to={to}
      />
    </>
  )
}

export default TracksGrid
