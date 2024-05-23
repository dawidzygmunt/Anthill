import prisma from "@/lib/db"
import React from "react"

export const CloseWeek = async (weekId: string, isClosed: boolean) => {
  const response = await prisma.week.update({
    where: { id: weekId },
    data: {
      isClosed: isClosed,
    },
  })
}
