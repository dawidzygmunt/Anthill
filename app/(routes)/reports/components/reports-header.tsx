import { format } from "date-fns"
import MonthSelector from "./month-selector"
import ExportButton from "./export-button"

interface ReportsHeaderProps {
  currentDate: Date
}

export default function ReportsHeader({ currentDate }: ReportsHeaderProps) {
  const subtitle = `${format(currentDate, 'MMMM yyyy')} · your tracked time at a glance`

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)] mb-1">Reports</h1>
        <p className="text-sm text-[var(--text-soft)]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <MonthSelector />
        <ExportButton />
      </div>
    </div>
  )
}
