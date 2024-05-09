import ActivityRow from "./components/activity-row";
import Selector from "./components/selector";

import WeekRow from "./components/week-row";


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
    { time: "act1" },
    { time: "act2" },
    { time: "act3" },
    { time: "act4" },
    { time: "act5" },
    { time: "act6" },
    { time: "act7" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mr-60">
      <div className="grid grid-cols-9 gap-5">
        <div className="col-span-2"></div>
        <WeekRow days={days} />

        <Selector />
        {activities.map((activity) => (
          <div className="border-2 text-center py-1 px-2">{activity.time}</div>
        ))}

        <ActivityRow data={activities} />

      </div>
    </main>
  );
}
