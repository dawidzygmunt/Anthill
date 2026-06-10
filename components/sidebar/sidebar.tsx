import { getWeeks } from "@/actions/weeks/get-weeks"
import DisplayError from "@/utils/display-error"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"
import { UserSection } from "./user-section"
import { Clock } from "lucide-react"

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
      <aside className="ah-side hidden lg:flex">
        {/* Header z logo */}
        <div className="ah-brand">
          <div className="ah-brand-mark">
            <Clock size={18} />
          </div>
          <div>
            <div className="ah-brand-name">Anthill</div>
            <div className="ah-brand-sub">Time tracking</div>
          </div>
        </div>

        {/* Nawigacja */}
        <Nav />

        {/* Lista tygodni (scrollable) */}
        <div className="flex-1 overflow-auto">
          <ListWeeks weeks={weeks} />
        </div>

        {/* Sekcja użytkownika */}
        <UserSection />
      </aside>

      <MobileSidebar weeks={weeks} />
    </>
  )
}

export default SideBar
