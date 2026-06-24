"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import tracksPrismaCodesMap from "@/utils/prisma-codes/tracks-prisma-codes"
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

    return await prisma.$transaction(async (tx) => {
      // Validate trackRow exists BEFORE modification
      const trackRow = await tx.trackRow.findUnique({
        where: { id: data.trackRowId },
      })
      if (!trackRow) {
        throw new CustomError("Track row not found", "NOT_FOUND")
      }

      // Use upsert for atomic create-or-update
      return await tx.track.upsert({
        where: {
          rowDatePair: { trackRowId: data.trackRowId, date: data.date },
        },
        update: { minutes: data.minutes },
        create: {
          trackRowId: data.trackRowId,
          date: data.date,
          minutes: data.minutes,
        },
      })
    })
  } catch (error) {
    return handleError(error, tracksPrismaCodesMap)
  }
}

export default handleTrackChange
