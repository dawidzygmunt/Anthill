import { Moon } from "lucide-react"

export const UserSection = () => {
  return (
    <div className="ah-side-foot">
      <div className="ah-avatar">JD</div>
      <div className="flex-1 min-w-0">
        <div className="ah-user-name">John Doe</div>
        <div className="ah-user-mail">john.doe@example.com</div>
      </div>
      <button className="ah-theme-toggle" aria-label="Toggle dark mode">
        <Moon size={16} />
      </button>
    </div>
  )
}
