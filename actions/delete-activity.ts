"use server"

import prismaCodesMap from "@/app/(routes)/settings/utils/prismaCodes"
import prisma from "@/lib/db"
import { z } from "zod"

const activitySchema = z.object({
  id: z.string().cuid({ message: "activity Id is required" }),
})

export const DeleteActivity = async (id: string) => {
  try {
    const data = activitySchema.parse({ id: id })

    const activity = await prisma.activity.delete({
      where: {
        id: id,
      },
    })
    return activity
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
