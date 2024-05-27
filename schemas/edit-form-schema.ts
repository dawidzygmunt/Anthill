import z from "zod"

export const editFormSchema = z.object({
  id: z.string().min(1, { message: "Id is required." }),
  name: z
    .string({
      message: "Name must be at least 2 characters." || "",
    })
    .min(2),
  color: z.string({
    message: "Color must be a valid hex code." || "",
  }),
})

export type User = z.infer<typeof editFormSchema>
