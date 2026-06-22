import { Track } from "@prisma/client"
import TrackInput, { EmptyTrack } from "./track-input"

interface TracksRowProps {
  trackData: (Track | EmptyTrack)[]
  isWeekClosed?: boolean
}

const TracksRow = ({ trackData, isWeekClosed = false }: TracksRowProps) => {
  const totalMinutes = trackData.reduce((sum, track) => {
    return sum + (track.minutes || 0)
  }, 0)
  const totalHours = totalMinutes / 60

  return (
    <>
      {trackData.map((track, index) => (
        <div key={index} className="text-center py-1 px-0.5 sm:px-2">
          <TrackInput track={track} disabled={isWeekClosed} />
        </div>
      ))}
      <div className="text-center py-1 px-0.5 sm:px-2 font-semibold">
        {totalHours > 0 ? `${totalHours.toFixed(1)}h` : ""}
      </div>
    </>
  )
}

export default TracksRow
