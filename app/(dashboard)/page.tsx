import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"

//
export default function Home() {
  const days = [
    "2024-05-09",
    "2024-05-08",
    "2024-05-07",
    "2024-05-06",
    "2024-05-05",
    "2024-05-04",
    "2024-05-03",
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SideBar /> */}
      <div className="grid grid-cols-9 gap-2">
        <div className="col-span-2"></div>
        <WeekRow days={days} />

        <TracksGrid />
      </div>
    </main>
  )
}
