import { TracksProps } from "@/lib/types"
import TrackInput from "./track-input"
import { Track } from "@prisma/client"

const TracksRow = ({ trackData }: { trackData: (Track | null)[] }) => {
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
