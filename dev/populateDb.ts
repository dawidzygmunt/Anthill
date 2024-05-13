import prisma from "../lib/db"
import { faker } from "@faker-js/faker"
import { Activity } from "@prisma/client"
import { addDays, subDays, startOfWeek, setDefaultOptions } from "date-fns"

setDefaultOptions({ weekStartsOn: 1 })

const randomActivities = (n = 100) => {
  const names = Array.from(Array(n).keys()).map(() => faker.company.name())
  return Array.from(new Set(names)).map((name) => ({ name }))
}

const randomTrackRowsForWeek = async (
  weekStart: Date,
  avgActivitiesPerWeek = 10
) => {
  const randomActivities = await prisma.$queryRawUnsafe<Activity[]>(`
    SELECT * FROM public."Activity"
    ORDER BY RANDOM()
    LIMIT ${avgActivitiesPerWeek + Math.round(Math.random() * 10 - 0.5)};
  `)

  return randomActivities.map((activity) => ({
    activityId: activity.id,
    from: weekStart,
  }))
}

const randomTracks = async () => {
  const numbers = Array.from(Array(5).keys())

  const trackRows = await prisma.trackRow.findMany()
  return trackRows
    .map((trackRow) =>
      numbers.map((shift) => ({
        date: addDays(trackRow.from, shift),
        trackRowId: trackRow.id,
        minutes: faker.number.int({ min: 60, max: 60 * 8 }),
      }))
    )
    .flat()
}

//52 weeks in year
const populateDb = async (weeks = 52 * 5) => {
  console.log("Populating db...")
  const activities = randomActivities()
  await prisma.activity.createMany({ data: activities })

  const weekStart = startOfWeek(new Date())
  const trackRows = (
    await Promise.all(
      Array.from(Array(weeks).keys()).map(
        async (shift) =>
          await randomTrackRowsForWeek(subDays(weekStart, shift * 7))
      )
    )
  ).flat()

  await prisma.trackRow.createMany({ data: trackRows })

  const tracks = await randomTracks()

  await prisma.track.createMany({ data: tracks })
}

populateDb()
