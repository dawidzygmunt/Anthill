import { Track } from "@prisma/client"
import TrackInput, { EmptyTrack } from "./track-input"

const TracksRow = ({ trackData }: { trackData: (Track | EmptyTrack)[] }) => {
  return (
    <>
      {trackData.map((track, index) => (
        <div
          key={track.date.toDateString()}
          className="text-center py-1 px-0.5 sm:px-2"
        >
          <TrackInput track={track} />
        </div>
      ))}
    </>
  )
}

export default TracksRow
