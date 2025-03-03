import { Bell, Search, Settings } from "lucide-react"
import { Avatar } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const TopBar = () => {
  return (
    <div className="bg-white p-2 drop-shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Avatar />
        John Doe
      </div>
      <div className="flex items-center space-x-3 sm:mr-5 text-gray-400">
        <Input className="max-w-40 h-8 bg-gray-50 " placeholder={"Search"} />
        <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent">
          <Settings size={21} />
        </Button>
      </div>
    </div>
  )
}

export default TopBar
