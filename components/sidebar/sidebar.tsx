import { getWeeks } from "@/actions/weeks/get-weeks"
import { frontErrorCodes } from "@/utils/front-error-codes"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { Nav } from "./nav"
import { UserSection } from "./user-section"
import { Clock } from "lucide-react"

const SideBar = async () => {
  const today = new Date()
  const from = subDays(today, 180)
  const to = addDays(today, 180)
  const weeks = await getWeeks(from, to)

  // The sidebar lives in the root layout, so a failure here must not take the
  // whole app down. Keep the shell (brand, nav, user section) usable and show
  // the error inline in place of the week list.
  if (!weeks.ok) {
    const message =
      "message" in weeks.error
        ? weeks.error.message
        : (frontErrorCodes[weeks.error.code] ?? frontErrorCodes[9000])

    return (
      <aside className="ah-side hidden lg:flex">
        <div className="ah-brand">
          <div className="ah-brand-mark">
            <Clock size={18} />
          </div>
          <div>
            <div className="ah-brand-name">Anthill</div>
            <div className="ah-brand-sub">Time tracking</div>
          </div>
        </div>

        <Nav />

        <div className="flex-1 overflow-auto">
          <div className="ah-side-label">RECENT WEEKS</div>
          <p className="px-3 py-2 text-sm text-red-600">{message}</p>
        </div>

        <UserSection />
      </aside>
    )
  }

  return (
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
        <ListWeeks weeks={weeks.data} />
      </div>

      {/* Sekcja użytkownika */}
      <UserSection />
    </aside>
  )
}

export default SideBar
