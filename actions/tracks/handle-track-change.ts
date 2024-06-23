"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
import { auth } from "@clerk/nextjs/server"
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
      if (!trackRow) throw new CustomError("Track row not found", "NOT_FOUND")
    }

    return await prisma.track.update({
      data: { minutes },
      where: { rowDatePair: { trackRowId, date } },
    })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default handleTrackChange
