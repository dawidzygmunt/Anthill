import { getWeeks } from "@/actions/weeks/get-weeks"
import DisplayError from "@/utils/display-error"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"
import { Separator } from "../ui/separator"

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
        className={`min-w-[250px] hidden bg-white lg:flex flex-col sticky top-0 h-full 
      justify-between border-r`}
      >
        <div className="overflow-auto p-2">
          <Separator />
          <ListWeeks weeks={weeks} />
        </div>
      </aside>

      <MobileSidebar weeks={weeks} />
    </>
  )
}

export default SideBar
