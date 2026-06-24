import { CustomError } from "@/utils/error-handler"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeFormatter = (minutes: number): string => {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "0:00"
  }
  const roundedMinutes = Math.round(minutes / 30) * 30
  const hours = Math.floor(roundedMinutes / 60)
  const remainingMinutes = roundedMinutes % 60
  // Format as "HH:MM"
  const formattedTime = `${hours}:${remainingMinutes === 0 ? "00" : String(remainingMinutes).padStart(2, "0")}`
  return formattedTime
}

export const parseTime = (input: string): number => {
  if (!input || !input.trim()) {
    return 0
  }

  const normalized = input.trim().replace(",", ".")
  const dotCount = (normalized.match(/\./g) || []).length
  if (dotCount > 1) {
    return 0
  }

  const hours = parseFloat(normalized)
  if (!Number.isFinite(hours) || hours < 0) {
    return 0
  }

  // Round to nearest 30 minutes
  return Math.round((hours * 60) / 30) * 30
}

export const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
