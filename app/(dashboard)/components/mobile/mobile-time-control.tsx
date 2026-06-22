"use client"

import { Minus, Plus } from "lucide-react"

interface MobileTimeControlProps {
  hours: number
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
}

export default function MobileTimeControl({
  hours,
  onIncrement,
  onDecrement,
  disabled = false,
}: MobileTimeControlProps) {
  return (
    <div className="ah-mobile-time-control">
      <button
        className="ah-mobile-time-btn"
        onClick={onDecrement}
        disabled={disabled || hours <= 0}
        aria-label="Decrease time"
      >
        <Minus size={18} />
      </button>
      <span className="ah-mobile-time-value">
        {hours > 0 ? `${hours.toFixed(1)}h` : "-"}
      </span>
      <button
        className="ah-mobile-time-btn"
        onClick={onIncrement}
        disabled={disabled}
        aria-label="Increase time"
      >
        <Plus size={18} />
      </button>
    </div>
  )
}
