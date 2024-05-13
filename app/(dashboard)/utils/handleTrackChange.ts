"use server"
import prisma from "@/lib/db"
import trackSchema from "./zod-schemas/track-schema"

const handleTrackChange = async (
  activityId: string,
  date: Date,
  minutes: number
) => {
  try {
    const data = trackSchema.parse({ activityId, date, minutes })

    const track = await prisma.track.findFirst({ where: { activityId, date } })
    if (!track) return await prisma.track.create({ data })

    return await prisma.track.update({
      data: { minutes },
      where: { dateActivityPair: { activityId, date } },
    })
  } catch (err: any) {
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default handleTrackChange
