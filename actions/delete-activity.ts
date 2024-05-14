"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { error } from "console"
import { Prisma } from "@prisma/client"

const activitySchema = z.object({
  id: z.string().min(1, { message: "activity Id is required" }),
})

export const DeleteActivity = async (id: string) => {
  try {
    const data = activitySchema.parse({ id: id })
    const result = await prisma.activity.findFirst({
      where: {
        id: data.id,
      },
    })

    if (!result) {
      return { error: "no activity found with this Id" }
    }

    const relatedTracks = await prisma.track.findMany({
      where: {
        activityId: data.id,
      },
    })

    if (relatedTracks.length > 0) {
      return {
        error:
          "Cannot delete Activity because it is associated with other tracks.",
      }
    }

    const activity = await prisma.activity.delete({
      where: {
        id: id,
      },
    })
    return activity
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      console.log("XDDD")
      return {
        error:
          "Cannot delete Activity because it is associated with other tracks.",
      }
    }
    console.log(err)

    if ("error" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
