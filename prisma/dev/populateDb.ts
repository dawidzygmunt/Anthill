import { auth } from "@clerk/nextjs/server"
import prisma from "../../lib/db"
import { faker } from "@faker-js/faker"
import { Activity } from "@prisma/client"
import { addDays, subDays, startOfWeek, setDefaultOptions } from "date-fns"
import { CustomError } from "@/utils/error-handler"

setDefaultOptions({ weekStartsOn: 1 })

const randomActivities = (n = 100) => {
  const names = Array.from(Array(n).keys()).map(() => faker.company.name())
  return Array.from(new Set(names)).map((name) => ({ name }))
}

const randomColors = (n = 100) => {
  const colors = Array.from(Array(n).keys()).map(() => faker.internet.color())
  return Array.from(new Set(colors)).map((color) => ({ color }))
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

  let week = await prisma.week.findFirst({
    where: {
      from: weekStart,
    },
  })
  if (!week) {
    week = await prisma.week.create({
      data: {
        from: weekStart,
      },
    })
  }
  const trackRows = await Promise.all(
    randomActivities.map(async (activity) => {
      return {
        activityId: activity.id,
        weekId: week.id,
        createdAt: faker.date.between({
          from: subDays(weekStart, 5),
          to: weekStart,
        }),
      }
    })
  )

  return await prisma.trackRow.createMany({ data: trackRows })
}

const randomTracks = async () => {
  const numbers = Array.from(Array(5).keys())

  const weeks = await prisma.week.findMany({
    include: {
      TrackRow: true,
    },
  })

  const tracks = weeks.flatMap((week) =>
    week.TrackRow.flatMap((row) => {
      return numbers.map((shift) => ({
        date: addDays(week.from, shift),
        trackRowId: row.id,
        minutes: faker.number.int({ min: 60, max: 60 * 8 }),
      }))
    })
  )
  return tracks
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

  const trackRowsIds = await prisma.trackRow.findMany()

  const tracks = await randomTracks()

  await prisma.track.createMany({ data: tracks })
  trackRowsIds.forEach(async (trackRow) => {})
}

populateDb()
