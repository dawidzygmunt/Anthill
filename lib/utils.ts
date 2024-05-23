import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeFormatter = (minutes: number) => {
  const roundedMinutes = Math.round(minutes / 30) * 30
  const hours = Math.floor(roundedMinutes / 60)
  const remainingMinutes = roundedMinutes % 60
  // Format as "HH:MM"
  const formattedTime = `${hours}:${remainingMinutes === 0 ? "00" : String(remainingMinutes).padStart(2, "0")}`

  return formattedTime
}
