import { CustomError } from "@/utils/error-handler"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeFormatter = (minutes: number) => {
  if (minutes === undefined) return "0:00"
  const roundedMinutes = Math.round(minutes / 30) * 30
  const hours = Math.floor(roundedMinutes / 60)
  const remainingMinutes = roundedMinutes % 60
  // Format as "HH:MM"
  const formattedTime = `${hours}:${remainingMinutes === 0 ? "00" : String(remainingMinutes).padStart(2, "0")}`
  return formattedTime
}

export const parseTime = (input: string) => {
  const result = input.replace(",", ".")

  let commaCount = (result.match(/\,/g) || []).length
  if (commaCount >= 1) {
    return 0
  }
  const hours = parseFloat(result)
  const minutes = hours * 60
  console.log(hours, minutes)

  const integerPart = Math.floor(hours)

  const decimalPart = result.split(".")[1]
    ? parseFloat(`0.${result.split(".")[1]}`)
    : 0
  console.log(integerPart, decimalPart)

  if (decimalPart >= 0.1 && decimalPart <= 0.5) {
    return minutes + 30 - decimalPart * 60
  } else if (decimalPart >= 0.6 && decimalPart <= 0.9) {
    return Math.floor(minutes + 60 - decimalPart * 60)
  } else {
    return minutes - decimalPart * 60
  }
}

export const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
