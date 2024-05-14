import { Track } from "@prisma/client"
import TrackInput, { EmptyTrack } from "./track-input"

const TracksRow = ({ trackData }: { trackData: (Track | EmptyTrack)[] }) => {
  return (
    <>
      {trackData.map((track, index) => (
        <div key={index} className="text-center py-1 px-2">
          <TrackInput track={track} />
        </div>
      ))}
    </>
  )
}

export default TracksRow
