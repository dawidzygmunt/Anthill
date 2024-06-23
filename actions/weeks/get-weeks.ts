"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { getSingleActivity } from "../activities/get-single-activity"
import { ExtendedWeek } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"

export const getWeeks = async (from: Date, to: Date) => {
  try {
    const weeks = await prisma.week.findMany({
      where: {
        from: {
          gte: from,
          lt: to,
        },
      },
      include: {
        TrackRow: {
          include: {
            Track: true,
          },
        },
      },
      orderBy: {
        from: "desc",
      },
    })

    const weeksWithDetails = await Promise.all(
      weeks.map(async (week) => {
        const activityMinutesMap = new Map<string, number>()

        const totalMinutes = week.TrackRow.reduce((sum, trackRow) => {
          return (
            sum + trackRow.Track.reduce((sum, track) => sum + track.minutes, 0)
          )
        }, 0)

        week.TrackRow.forEach((trackRow) => {
          trackRow.Track.forEach((track) => {
            const activityId = trackRow.activityId
            const minutes = track.minutes

            if (activityMinutesMap.has(activityId)) {
              activityMinutesMap.set(
                activityId,
                activityMinutesMap.get(activityId)! + minutes
              )
            } else {
              activityMinutesMap.set(activityId, minutes)
            }
          })
        })

        let maxMinutesActivityId = ""
        let maxMinutes = 0
        activityMinutesMap.forEach((minutes, activityId) => {
          if (minutes > maxMinutes) {
            maxMinutes = minutes
            maxMinutesActivityId = activityId
          }
        })
        if (!maxMinutesActivityId) return week
        const mostActivity = await getSingleActivity(maxMinutesActivityId)
        if ("error" in mostActivity) {
          return
        }

        return {
          ...week,
          totalMinutes,
          mostActiveActivities: mostActivity.name,
        } as ExtendedWeek
      })
    )

    return weeksWithDetails.filter(
      (week): week is ExtendedWeek => week !== undefined
    )
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
