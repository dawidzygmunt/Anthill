import { z } from "zod"

const trackSchema = z.object({
  activityId: z.string().cuid(),
  date: z.date(),
  minutes: z
    .number()
    .int()
    .min(1)
    .max(60 * 24),
})

export default trackSchema
