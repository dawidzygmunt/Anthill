import prisma from "@/lib/db"
import { get } from "http"
import React from "react"

export const WeekSumary = async (from, to) => {
  const weekSummary = await prisma.track.aggregate({
    where: {
      date: {
        gte: from,
        lte: to,
      },
    },
    sum: {
      minutes: true,
    },
    groupBy: ["trackRowId"],
  })

  return weekSummary
}
