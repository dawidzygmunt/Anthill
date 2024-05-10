import React from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import prisma from "@/lib/db"
import { addDays, differenceInDays, isSameDay, startOfWeek } from "date-fns"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const activitiesIds = (
    await prisma.track.groupBy({
      by: "activityId",
      where: {
        date: {
          gte: from,
          lte: to,
        },
      },
    })
  ).map((element) => element.activityId)

  //todo: trzeba to gdzieś wyrzucić do zewnętrznego pliku
  const getTracksByActivityId = async (
    activityId: string,
    from: Date,
    to: Date
  ) => {
    const days = differenceInDays(to, from)

    const dates = Array.from(Array(days).keys()).map((shift) =>
      addDays(from, shift)
    )

    const tracks = await prisma.track.findMany({
      where: {
        activityId,
        date: {
          gte: from,
          lte: to,
        },
      },
    })

    return dates.map(
      (date) =>
        tracks.find((track) => isSameDay(track.date, date)) || {
          date,
          activityId,
        }
    )
  }

  const activities = await prisma.activity.findMany({
    where: { id: { in: activitiesIds } },
  })

  return (
    <>
      {Promise.all(
        activities.map(async (activity) => (
          <>
            <Selector activity={activity} data={activities} />
            <TracksRow
              trackData={await getTracksByActivityId(activity.id, from, to)}
            />
          </>
        ))
      )}
    </>
  )
}

export default TracksGrid
