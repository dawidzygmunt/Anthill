"use server"

import prisma from "@/lib/db"
import { ERROR_MESSAGES } from "@/lib/error-messages"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

import { editFormSchema } from "@/schemas/edit-form-schema"

export const patchActivity = async (activity: {
  id: string
  color: string
  name: string
}) => {
  try {
    const data = editFormSchema.parse(activity)
    const result = await prisma.activity.findFirst({
      where: { id: data.id },
    })
    if (!result) return { error: "Activity not found" }

    const updatedActivity = await prisma.activity.update({
      where: {
        id: data.id,
      },
      data: activity,
    })
    return updatedActivity
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "Activity with this name already exists." }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG_MESSAGE }
  }
}
