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

  it("treats a trackRow with an empty Track array as contributing 0", () => {
    const trackRows = [
      { activityId: "a1", Track: [] },
      { activityId: "a2", Track: [{ minutes: 15 }] },
    ]
    expect(computeTotalMinutes(trackRows)).toBe(15)
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

  it("returns empty string when every track has 0 minutes", () => {
    const trackRows = [
      { activityId: "a1", Track: [{ minutes: 0 }] },
      { activityId: "a2", Track: [{ minutes: 0 }] },
    ]
    expect(computeMostActiveActivityId(trackRows)).toBe("")
  })

  it("ignores trackRows with an empty Track array", () => {
    const trackRows = [
      { activityId: "a1", Track: [] },
      { activityId: "a2", Track: [{ minutes: 10 }] },
    ]
    expect(computeMostActiveActivityId(trackRows)).toBe("a2")
  })

  it("sums minutes for the same activityId across multiple trackRows", () => {
    const trackRows = [
      { activityId: "a1", Track: [{ minutes: 10 }] },
      { activityId: "a2", Track: [{ minutes: 15 }] },
      { activityId: "a1", Track: [{ minutes: 10 }] },
    ]
    // a1 total = 20, a2 total = 15
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

  it("returns an empty map for an empty input", () => {
    expect(aggregateActivityMinutes([]).size).toBe(0)
  })

  it("mixes tracks with and without an activity, only aggregating the valid ones", () => {
    const tracks = [
      { minutes: 30, trackRow: { activity: { id: "act1", name: "Work", color: "#fff" } } },
      { minutes: 999, trackRow: { activity: null } },
    ]
    const result = aggregateActivityMinutes(tracks)
    expect(result.size).toBe(1)
    expect(result.get("act1")?.minutes).toBe(30)
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
