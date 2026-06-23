"use client"

import { Download } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ExportButton() {
  const searchParams = useSearchParams()

  const handleExport = async () => {
    const month = searchParams.get('month') || String(new Date().getMonth() + 1)
    const year = searchParams.get('year') || String(new Date().getFullYear())

    try {
      const response = await fetch(`/api/reports/export?month=${month}&year=${year}`)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `anthill-report-${year}-${month.padStart(2, '0')}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export report')
    }
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition-colors text-sm font-medium"
    >
      <Download size={16} />
      Export
    </button>
  )
}
