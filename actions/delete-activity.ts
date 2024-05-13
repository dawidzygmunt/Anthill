"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { error } from "console"

const activitySchema = z.object({
  id: z.string({ message: "activity Id is required" }),
})

export const DeleteActivity = (id: string) => {
  const result = activitySchema.safeParse(id)
  if (!result.success) {
    return { message: result.error }
  }
  const validate = prisma.activity.findFirst({
    where: {
      id: id,
    },
  })

  if (!validate) {
    return { error: "no activity found with this Id" }
  }

  const activity = prisma.activity.delete({
    where: {
      id: id,
    },
  })

  return activity
}
