import prisma from "../lib/db"

export const clearDb = async () => {
  console.log("Clearing db...")
  try {
    await prisma.track.deleteMany()
    await prisma.trackRow.deleteMany()
    await prisma.activity.deleteMany()
    await prisma.week.deleteMany()
  } catch (err) {
    console.log(err)
  }
}

clearDb()
