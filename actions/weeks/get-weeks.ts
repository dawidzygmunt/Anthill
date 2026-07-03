"use server"
import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { ExtendedWeek } from "@/lib/types"
import { Result, ok } from "@/utils/result"
import { computeTotalMinutes, computeMostActiveActivityId } from "@/lib/aggregations"
import { toUtcMidnight } from "@/lib/utils"

export const getWeeks = async (
  from: Date,
  to: Date
): Promise<Result<ExtendedWeek[]>> => {
  try {
    const weeks = await prisma.week.findMany({
      where: {
        from: {
          gte: toUtcMidnight(from),
          lt: toUtcMidnight(to),
        },
      },
      include: {
        TrackRow: {
          include: {
            Track: true,
            activity: true,
          },
        },
      },
      orderBy: {
        from: "desc",
      },
    })

    const weeksWithDetails = weeks.map((week) => {
      const totalMinutes = computeTotalMinutes(week.TrackRow)
      const maxMinutesActivityId = computeMostActiveActivityId(week.TrackRow)

      const mostActiveTrackRow = week.TrackRow.find(
        (trackRow) => trackRow.activityId === maxMinutesActivityId
      )

      return {
        ...week,
        totalMinutes,
        mostActiveActivities: mostActiveTrackRow?.activity.name ?? "",
      } as ExtendedWeek
    })

    return ok(weeksWithDetails)
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
