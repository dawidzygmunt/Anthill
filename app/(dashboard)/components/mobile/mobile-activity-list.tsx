import { Activity, Track, TrackRow } from "@prisma/client"
import MobileActivityCard from "./mobile-activity-card"
import { isSameDay } from "date-fns"

interface ExtendedTrackRow extends TrackRow {
  Track: Track[]
}

interface MobileActivityListProps {
  trackRows: ExtendedTrackRow[]
  activities: Activity[]
  selectedDate: Date
  isWeekClosed: boolean
}

export default function MobileActivityList({
  trackRows,
  activities,
  selectedDate,
  isWeekClosed,
}: MobileActivityListProps) {
  return (
    <div className="ah-mobile-activity-list">
      {trackRows.map((trackRow) => {
        const activity = activities.find((a) => a.id === trackRow.activityId)
        if (!activity) return null

        // Find track for selected date
        const track = trackRow.Track.find((t) =>
          isSameDay(new Date(t.date), selectedDate)
        )

        return (
          <MobileActivityCard
            key={trackRow.id}
            trackRowId={trackRow.id}
            activity={activity}
            track={track || null}
            selectedDate={selectedDate}
            isWeekClosed={isWeekClosed}
          />
        )
      })}
      {trackRows.length === 0 && (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          No activities for this week
        </div>
      )}
    </div>
  )
}
