import z from "zod"
export const idSchema = z.object({
  id: z.string().cuid({ message: "activity Id is required" }),
})
