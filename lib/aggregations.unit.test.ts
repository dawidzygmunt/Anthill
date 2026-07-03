import { describe, it, expect } from "vitest"
import {
  computeTotalMinutes,
  computeMostActiveActivityId,
  aggregateActivityMinutes,
  computePercentageChange,
} from "./aggregations"

describe("computeTotalMinutes", () => {
  it("returns 0 for an empty array", () => {
    expect(computeTotalMinutes([])).toBe(0)
  })

  it("sums minutes across multiple trackRows and tracks", () => {
    const trackRows = [
      { activityId: "a1", Track: [{ minutes: 30 }, { minutes: 60 }] },
      { activityId: "a2", Track: [{ minutes: 15 }] },
    ]
    expect(computeTotalMinutes(trackRows)).toBe(105)
  })
})

describe("computeMostActiveActivityId", () => {
  it("returns empty string when there is no data", () => {
    expect(computeMostActiveActivityId([])).toBe("")
  })

  it("picks the activity with the most total minutes", () => {
    const trackRows = [
      { activityId: "a1", Track: [{ minutes: 30 }] },
      { activityId: "a2", Track: [{ minutes: 90 }] },
      { activityId: "a1", Track: [{ minutes: 20 }] },
    ]
    // a1 total = 50, a2 total = 90
    expect(computeMostActiveActivityId(trackRows)).toBe("a2")
  })

  it("is deterministic on ties (first encountered max wins)", () => {
    const trackRows = [
      { activityId: "a1", Track: [{ minutes: 60 }] },
      { activityId: "a2", Track: [{ minutes: 60 }] },
    ]
    expect(computeMostActiveActivityId(trackRows)).toBe("a1")
  })
})

describe("aggregateActivityMinutes", () => {
  it("builds a map of activityId to minutes/name/color", () => {
    const tracks = [
      { minutes: 30, trackRow: { activity: { id: "act1", name: "Work", color: "#fff" } } },
      { minutes: 45, trackRow: { activity: { id: "act1", name: "Work", color: "#fff" } } },
      { minutes: 10, trackRow: { activity: { id: "act2", name: "Rest", color: "#000" } } },
    ]

    const result = aggregateActivityMinutes(tracks)

    expect(result.get("act1")).toEqual({ minutes: 75, name: "Work", color: "#fff" })
    expect(result.get("act2")).toEqual({ minutes: 10, name: "Rest", color: "#000" })
  })

  it("skips tracks with no associated activity", () => {
    const tracks = [{ minutes: 30, trackRow: { activity: null } }]
    const result = aggregateActivityMinutes(tracks)
    expect(result.size).toBe(0)
  })
})

describe("computePercentageChange", () => {
  it("returns 0 when previous is 0", () => {
    expect(computePercentageChange(100, 0)).toBe(0)
  })

  it("computes a positive percentage increase", () => {
    expect(computePercentageChange(150, 100)).toBe(50)
  })

  it("computes a negative percentage decrease", () => {
    expect(computePercentageChange(50, 100)).toBe(-50)
  })
})
