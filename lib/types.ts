import { Track, TrackRow, Week } from "@prisma/client"

export interface ActivitiesProps {
  name: string
}

export interface TracksProps {
  id: string
  minutes: number
}

export interface WeekProps {
  week: Week & { TrackRow: (TrackRow & { Track: Track[] })[] }
}
