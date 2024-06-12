import { getWeeks } from "@/actions/weeks/get-weeks"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"
import DisplayError from "@/utils/display-error"

const SideBar = async () => {
  const today = new Date()
  const from = subDays(today, 180)
  const to = addDays(today, 180)
  const weeks = await getWeeks(from, to)

  if ("error" in weeks) {
    DisplayError(weeks.error)
    return
  }

  return (
    <>
      <aside
        className={`w-[250px] hidden bg-[#e6e6e6] lg:flex flex-col sticky top-0 h-screen 
      justify-between`}
      >
        <div className="overflow-auto">
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
