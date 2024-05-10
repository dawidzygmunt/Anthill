import getActivitiesForPeriod from "../utils/getActivitiesForPeriod"
import getTracksForPeriod from "../utils/getTracksForPeriod"
import getAllActivities from "../utils/getAllActivities"
import populateWithNewTracks from "../utils/populateWithNewTracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const activities = await getActivitiesForPeriod(from, to)
  const allActivities = await getAllActivities()

  return (
    <>
      {Promise.all(
        activities.map(async (activity) => (
          <>
            <Selector activityId={activity.id} activities={allActivities} />
            <TracksRow
              trackData={populateWithNewTracks(
                await getTracksForPeriod(activity.id, from, to),
                activity.id,
                from,
                to
              )}
            />
          </>
        ))
      )}
      <NewTracksRow allActivities={allActivities} from={from} to={to} />
    </>
  )
}

export default TracksGrid
