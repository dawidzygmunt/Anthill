import TracksRow from "./components/tracks-row";
import Selector from "./components/selector";

import WeekRow from "./components/week-row";
import { tracks } from "@/data/mocking data";
import SideBar from "@/components/sidebar";


export default function Home() {
  const days = [
    "2024-05-09",
    "2024-05-08",
    "2024-05-07",
    "2024-05-06",
    "2024-05-05",
    "2024-05-04",
    "2024-05-03"
  ]

  const activities = [
    { name: "act1" },
    { name: "act2" },
    { name: "act3" },
    { name: "act4" },
    { name: "act5" },
    { name: "act6" },
    { name: "act7" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SideBar /> */}
      <div className="grid grid-cols-9 gap-2">
        <div className="col-span-2"></div>
        <WeekRow days={days} />

        <Selector data={activities} />
        <TracksRow trackData={tracks} />
      </div>
    </main>

  );
}
