import { getWeeks } from "@/actions/weeks/get-weeks"
import { addDays, subDays } from "date-fns"
import { ListWeeks } from "./list-weeks"
import { MobileSidebar } from "./mobile-sidebar"
import { Nav } from "./nav"
import toast from "react-hot-toast"

const SideBar = async () => {
  const today = new Date()
  const from = subDays(today, 21)
  const to = addDays(today, 21)
  const data = await getWeeks(from, to)
  if ("error" in data) {
    toast.error(data.error)
    return
  }

  return (
    <>
      <aside
        className={`w-[250px] hidden bg-[#e6e6e6] lg:flex flex-col h-screen 
      justify-between`}
      >
        <div className="overflow-auto">
          <ListWeeks data={data} />
        </div>

        <div className="p-4 bg-[#0d1321] text-[#8d8d8d] flex">
          <Nav />
        </div>
      </aside>

      <MobileSidebar />
    </>
  )
}

export default SideBar
