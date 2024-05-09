import React from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import prisma from "@/lib/db"

const activities = [
  { name: "act1" },
  { name: "act2" },
  { name: "act3" },
  { name: "act4" },
  { name: "act5" },
  { name: "act6" },
  { name: "act7" },
]

const from = new Date("2024-05-05")
const to = new Date("2024-05-12")

async function TracksGrid() {
  const where = {
    date: {
      gte: from,
      lte: to,
    },
  }
  const activitiesIds = (
    await prisma.track.groupBy({
      by: "activityId",
      where,
    })
  ).map((element) => element.activityId)

  console.log(activitiesIds)

  const tracks = await prisma.track.findMany({ where })

  const activities = await prisma.activity.findMany({
    where: { id: { in: activitiesIds } },
  })

  return (
    <>
      {activities.map((activity) => (
        <>
          <Selector data={activities} />
          <TracksRow
            trackData={tracks.filter(
              (track) => track.activityId === activity.id
            )}
          />
        </>
      ))}
    </>
  )
}

export default TracksGrid
