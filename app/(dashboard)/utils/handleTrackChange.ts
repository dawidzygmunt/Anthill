"use server"
import prisma from "@/lib/db"
import { isValid } from "date-fns"

const handleTrackChange = async (
  activityId: string,
  date: Date,
  minutes: number
) => {
  if (!activityId || !isValid(date)) return { error: "Invalid data" }
  try {
    const track = await prisma.track.findFirst({ where: { activityId, date } })
    if (!track)
      return await prisma.track.create({ data: { activityId, date, minutes } })
    return await prisma.track.update({
      data: { minutes },
      where: { dateActivityPair: { activityId, date } },
    })
  } catch (err) {
    return { error: "Something went wrong!" }
  }
}

export default handleTrackChange
