import { TracksProps } from "@/lib/types"
import TrackInput from "./trackInput"

const TracksRow = ({ trackData }: { trackData: TracksProps[] }) => {
  return (
    <>
      {trackData.map((track, index) => (
        <div key={index} className="text-center py-1 px-2">
          <TrackInput />
        </div>
      ))}
    </>
  )
}

export default TracksRow
