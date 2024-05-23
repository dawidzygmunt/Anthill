"use server"

import prisma from "@/lib/db"

export const createWeek = async (from: Date, to: Date, TrackRows: any) => {
  try {
    const week = await prisma.week.findFirst({
      where: { from },
    })
    if (!week) {
      const response = await prisma.week.create({
        data: {
          from,
          TrackRow: TrackRows,
        },
      })
    }
  } catch (err) {
    return { error: "Something went wrong" }
  }
}
