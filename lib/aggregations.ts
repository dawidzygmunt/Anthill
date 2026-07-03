type TrackWithMinutes = { minutes: number }

type TrackRowWithTracks = {
  activityId: string
  Track: TrackWithMinutes[]
}

export const computeTotalMinutes = (trackRows: TrackRowWithTracks[]): number => {
  return trackRows.reduce((sum, trackRow) => {
    return sum + trackRow.Track.reduce((rowSum, track) => rowSum + track.minutes, 0)
  }, 0)
}

export const computeMostActiveActivityId = (trackRows: TrackRowWithTracks[]): string => {
  const activityMinutesMap = new Map<string, number>()

  trackRows.forEach((trackRow) => {
    trackRow.Track.forEach((track) => {
      const activityId = trackRow.activityId
      const minutes = track.minutes

      if (activityMinutesMap.has(activityId)) {
        activityMinutesMap.set(activityId, activityMinutesMap.get(activityId)! + minutes)
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

  return maxMinutesActivityId
}

type TrackWithActivity = {
  minutes: number
  trackRow: {
    activity: { id: string; name: string; color: string } | null
  }
}

export const aggregateActivityMinutes = (
  tracks: TrackWithActivity[]
): Map<string, { minutes: number; name: string; color: string }> => {
  const activityMinutes = new Map<string, { minutes: number; name: string; color: string }>()

  tracks.forEach((track) => {
    const activity = track.trackRow.activity
    if (activity) {
      const current = activityMinutes.get(activity.id) || {
        minutes: 0,
        name: activity.name,
        color: activity.color,
      }
      activityMinutes.set(activity.id, {
        ...current,
        minutes: current.minutes + track.minutes,
      })
    }
  })

  return activityMinutes
}

export const computePercentageChange = (current: number, previous: number): number => {
  return previous > 0 ? ((current - previous) / previous) * 100 : 0
}
