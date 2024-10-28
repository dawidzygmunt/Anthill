import { getWeeks } from "@/actions/weeks/get-weeks"
import DisplayError from "@/utils/display-error"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"

const SideBar = async () => {
  const today = new Date()
  const from = subDays(today, 180)
  const to = addDays(today, 180)
  const weeks = await getWeeks(from, to)

  if ("error" in weeks) {
    if (typeof DisplayError === "function") {
      DisplayError(weeks.error)
    }
    return
  }

  return (
    <>
      <aside
        className={`w-[250px] hidden bg-[#e6e6e6] lg:flex flex-col sticky top-0 h-screen 
      justify-between`}
      >
        <div className="overflow-auto">
          <div className="py-2 border-b-2 border-[#0d1321] text-[#0d1321]">
            <h1 className="text-center text-xl font-bold">Latest weeks</h1>
          </div>
          <ListWeeks weeks={weeks} />
        </div>

        <div className="p-4 bg-[#0d1321] text-[#8d8d8d] flex">
          <Nav />
        </div>
      </aside>

      <MobileSidebar weeks={weeks} />
    </>
  )
}

export default SideBar
