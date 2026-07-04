import prisma from "@/lib/db"
import { test, expect, Locator } from "@playwright/test"
import { addDays, format, startOfWeek } from "date-fns"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// The sidebar only lists weeks within +-180 days of the real current date
// (see components/sidebar/sidebar.tsx), so a hardcoded historical date will
// silently stop showing up as time passes. Anchor relative to "now" instead,
// away from the current week so isCurrentWeek styling doesn't interfere.
//
// Note: the exact calendar day the app stores as Week.from can shift by one
// day depending on the server's timezone (page.tsx mixes a UTC-parsed date
// with a local-time startOfWeek), so tests must not assume a specific day
// number — they locate the created week by its unique tracked-hours label
// instead, since beforeEach guarantees it's the only week in the DB.
const testFrom = startOfWeek(addDays(new Date(), 60), { weekStartsOn: 1 })
const testFromParam = format(testFrom, "yyyy-MM-dd")

const fillTrackInput = async (input: Locator, value: string, expectedValue: string) => {
  await expect(async () => {
    await input.click()
    await input.fill(value)
    await input.press("Tab")
    await expect(input).toHaveValue(expectedValue, { timeout: 2000 })
  }).toPass({ timeout: 15000 })
}

// WeekStrip fetches isClosed on mount and can overwrite an optimistic toggle
// that landed in the same window; retry the click until the badge settles.
const toggleWeekStatus = async (
  page: import("@playwright/test").Page,
  buttonName: "Close week" | "Reopen week",
  expectedBadge: "Closed" | "Open"
) => {
  await expect(async () => {
    await page.getByRole("button", { name: buttonName }).click()
    await expect(page.locator(".ah-week-strip-badge")).toContainText(expectedBadge, {
      timeout: 2000,
    })
  }).toPass({ timeout: 15000 })
}

const addActivityAndTrackTime = async (page: import("@playwright/test").Page) => {
  await page.goto(`/?from=${testFromParam}`)
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("sidebar activity")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await expect(page.locator("tr").filter({ hasText: "sidebar activity" })).toBeVisible()

  await page.goto(`/?from=${testFromParam}`)
  await page.getByRole("combobox").first().selectOption("sidebar activity")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await fillTrackInput(trackInputs.nth(0), "2", "2.0h")
  await fillTrackInput(trackInputs.nth(1), "4", "4.0h")
}

test("A tracked week appears in the sidebar with its total hours", async ({ page }) => {
  await addActivityAndTrackTime(page)
  await page.reload()

  const weekLink = page.locator(".ah-week", { hasText: "6:00h" })
  await expect(weekLink).toBeVisible()
  await expect(weekLink).toContainText("6:00")
})

test("Closing a week via the WeekStrip disables track editing and persists after reload", async ({ page }) => {
  await addActivityAndTrackTime(page)

  await expect(page.locator(".ah-week-strip-badge")).toContainText("Open")
  await toggleWeekStatus(page, "Close week", "Closed")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await expect(trackInputs.first()).toBeDisabled()

  await page.reload()
  await expect(page.locator(".ah-week-strip-badge")).toContainText("Closed")
  await expect(trackInputs.first()).toBeDisabled()
  await expect(page.getByRole("button", { name: "Reopen week" })).toBeVisible()
})

test("Reopening a closed week makes track editing available again", async ({ page }) => {
  await addActivityAndTrackTime(page)

  await toggleWeekStatus(page, "Close week", "Closed")
  await toggleWeekStatus(page, "Reopen week", "Open")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await expect(trackInputs.first()).toBeEnabled()
})

test("The sidebar lock toggle mirrors the WeekStrip close/reopen state", async ({ page }) => {
  await addActivityAndTrackTime(page)
  await page.reload()

  const weekLink = page.locator(".ah-week", { hasText: "6:00h" })
  await expect(weekLink.locator(".ah-week-dot")).toHaveClass(/progress/)

  await weekLink.hover()
  await weekLink.getByRole("button", { name: "Lock week" }).click()
  await expect(weekLink.locator(".ah-week-dot")).toHaveClass(/done/)

  await page.reload()
  await expect(page.locator(".ah-week-strip-badge")).toContainText("Closed")
})
