import React from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import prisma from "@/lib/db"
import { addDays, differenceInDays, isSameDay, startOfWeek } from "date-fns"
import getAllActivities from "../utils/getAllActivities"
import getActivitiesForPeriod from "../utils/getActivitiesForPeriod"
import getTracksForPeriod from "../utils/getTracksForPeriod"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const activities = await getActivitiesForPeriod(from, to)
  const allActivities = await getAllActivities()

  return (
    <>
      {Promise.all(
        activities.map(async (activity) => (
          <>
            <Selector activity={activity} data={allActivities} />
            <TracksRow
              trackData={await getTracksForPeriod(activity.id, from, to)}
            />
          </>
        ))
      )}
    </>
  )
}

export default TracksGrid
