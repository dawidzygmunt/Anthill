"use server"
import prisma from "@/lib/db"
import { z } from "zod"

const trackSchema = z.object({
  trackRowId: z.string().cuid(),
  date: z.date(),
  minutes: z
    .number({ message: "Only numbers are valid" })
    .int()
    .min(1, { message: "Time is required" })
    .max(60 * 24, { message: "A day has only 24 hours" }),
})

const handleTrackChange = async (
  trackRowId: string,
  date: Date,
  minutes: number
) => {
  try {
    const data = trackSchema.parse({ trackRowId, date, minutes })

    const track = await prisma.track.findFirst({ where: { trackRowId, date } })
    if (!track) {
      await prisma.track.create({ data })
      const trackRow = await prisma.trackRow.findFirst({
        where: { id: trackRowId },
      })
      if (!trackRow) return { error: "Track row not found" }
    }

    return await prisma.track.update({
      data: { minutes },
      where: { rowDatePair: { trackRowId, date } },
    })
  } catch (err: any) {
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default handleTrackChange
