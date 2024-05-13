"use server"

import prisma from "@/lib/db"

export const DeleteActivity = (id: string) => {
  const activity = prisma.activity.delete({
    where: {
      id: id,
    },
  })
  return activity
}
