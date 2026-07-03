import { describe, it, expect } from "vitest"
import { parseTime, timeFormatter, toUtcMidnight } from "./utils"

describe("parseTime", () => {
  it("returns 0 for empty or whitespace-only input", () => {
    expect(parseTime("")).toBe(0)
    expect(parseTime(" ")).toBe(0)
  })

  it("returns 0 for non-numeric input", () => {
    expect(parseTime("abc")).toBe(0)
  })

  it("returns 0 for input with more than one dot", () => {
    // "12..3" has two literal dots -> rejected
    expect(parseTime("12..3")).toBe(0)
  })

  it("only replaces the first comma, so a second comma becomes an extra dot", () => {
    // "12,12,12" -> "12.12,12" (only first comma replaced) -> still only 1 dot -> parses as 12.12
    expect(parseTime("12,12,12")).toBe(Math.round((12.12 * 60) / 30) * 30)
  })

  it("returns 0 for negative numbers", () => {
    expect(parseTime("-12,3")).toBe(0)
  })

  it("supports comma as decimal separator", () => {
    expect(parseTime("12,3")).toBe(Math.round((12.3 * 60) / 30) * 30)
  })

  it("rounds to the nearest 30 minutes", () => {
    expect(parseTime("12")).toBe(12 * 60)
    expect(parseTime("12,5")).toBe(12.5 * 60)
    expect(parseTime("11,0")).toBe(11 * 60)
    expect(parseTime("11,25")).toBe(11.5 * 60)
  })

  it("parses trailing garbage after a valid number via parseFloat's leading-number behavior", () => {
    // "12,abc" -> normalized "12.abc" -> parseFloat("12.abc") = 12
    expect(parseTime("12,abc")).toBe(12 * 60)
  })

  it("handles dot as decimal separator directly", () => {
    expect(parseTime("12.5")).toBe(12.5 * 60)
  })
})

describe("timeFormatter", () => {
  it("returns 0:00 for zero, negative, or non-finite input", () => {
    expect(timeFormatter(0)).toBe("0:00")
    expect(timeFormatter(-5)).toBe("0:00")
    expect(timeFormatter(Infinity)).toBe("0:00")
    expect(timeFormatter(NaN)).toBe("0:00")
  })

  it("rounds to the nearest 30 minutes", () => {
    expect(timeFormatter(45)).toBe("1:00")
    expect(timeFormatter(15)).toBe("0:30")
    expect(timeFormatter(14)).toBe("0:00")
  })

  it("formats as H:MM", () => {
    expect(timeFormatter(60)).toBe("1:00")
    expect(timeFormatter(90)).toBe("1:30")
    expect(timeFormatter(720)).toBe("12:00")
  })
})

describe("toUtcMidnight", () => {
  it("normalizes a date with a time component to UTC midnight of the same day", () => {
    const input = new Date(Date.UTC(2026, 7, 3, 22, 15, 30))
    const result = toUtcMidnight(input)
    expect(result.toISOString()).toBe("2026-08-03T00:00:00.000Z")
  })

  it("is idempotent", () => {
    const input = new Date(Date.UTC(2026, 7, 3, 22, 15, 30))
    const once = toUtcMidnight(input)
    const twice = toUtcMidnight(once)
    expect(twice.toISOString()).toBe(once.toISOString())
  })
})
