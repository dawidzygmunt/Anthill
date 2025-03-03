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
      <aside className="w-[250px] bg-[#072b2b] p-3 flex flex-col justify-between">
        <div className="">
          <h1 className="text-md text-gray-100 pb-10">Anthill</h1>
          {/* <ListWeeks weeks={weeks} /> */}
          <Nav />
        </div>
      </aside>

      {/* <MobileSidebar weeks={weeks} /> */}
    </>
  )
}

export default SideBar
