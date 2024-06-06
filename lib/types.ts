import { Track, TrackRow, Week } from "@prisma/client"

export interface ActivitiesProps {
  name: string
}

export interface TracksProps {
  id: string
  minutes: number
}

interface ExtendedTrackRow extends TrackRow {
  Track: Track[]
}

export interface ExtendedWeek extends Week {
  TrackRow: ExtendedTrackRow[]
  totalMinutes: number
  mostActiveActivities: string
}

export interface ListWeeksProps {
  weeks: ExtendedWeek[]
}

export interface SingleWeekProps {
  week: ExtendedWeek
}
