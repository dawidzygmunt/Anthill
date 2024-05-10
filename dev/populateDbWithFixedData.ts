import prisma from "../lib/db"
import activities from "./activities"
import tracks from "./tracks"

const populateDb = async (weeks = 52 * 5) => {
  await prisma.activity.createMany({ data: activities })
  await prisma.track.createMany({ data: tracks })
}

populateDb()
