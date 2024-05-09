import { TracksProps } from "@/lib/types"
import TrackInput from "./track-input"

const TracksRow = ({ trackData }: { trackData: TracksProps[] }) => {
  return (
    <>
      {trackData.map((track, index) => (
        <div key={index} className="text-center py-1 px-2">
          <TrackInput value={track.minutes} />
        </div>
      ))}
    </>
  )
}

export default TracksRow
