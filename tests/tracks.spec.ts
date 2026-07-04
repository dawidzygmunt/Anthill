import prisma from "@/lib/db"
import { test, expect, Locator } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

const addActivity = async (page: import("@playwright/test").Page, name: string) => {
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill(name)
  await page.getByPlaceholder("Add your activity...").press("Enter")
}

// TrackInput resyncs its value from props on every parent re-render (including
// the remount triggered by a sibling row's save-and-revalidate), which can
// occasionally wipe a fill that landed in the same window. Retry the fill
// until the expected value actually sticks.
const fillTrackInput = async (input: Locator, value: string, expectedValue: string) => {
  await expect(async () => {
    await input.click()
    await input.fill(value)
    await input.press("Tab")
    await expect(input).toHaveValue(expectedValue, { timeout: 2000 })
  }).toPass({ timeout: 15000 })
}

test("Add Tracks", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await addActivity(page, "activity 2")
  await page.getByRole("link", { name: "Time sheet" }).click()

  await page.getByRole("combobox").first().selectOption("activity 1")
  await page.getByText("Add activity", { exact: true }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  await expect(page.getByRole("combobox").first()).toContainText("activity 1")
  await expect(page.getByRole("combobox").nth(1)).toContainText("activity 2")
})

test("Add same activity twice is rejected", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await page.getByRole("link", { name: "Time sheet" }).click()

  await page.getByRole("combobox").first().selectOption("activity 1")
  await page.getByText("Add activity", { exact: true }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 1")

  await expect(page.getByRole("combobox").nth(1)).toContainText(
    "Select your activity"
  )
})

test("Delete a track row with no data", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await addActivity(page, "activity 2")
  await page.getByRole("link", { name: "Time sheet" }).click()

  await page.getByRole("combobox").first().selectOption("activity 1")
  await page.getByText("Add activity", { exact: true }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await expect(page.getByRole("combobox").nth(1)).toContainText("activity 2")

  // The row's activityId can resync from stale props right after creation,
  // same as track inputs; retry the delete until it actually takes effect.
  await expect(async () => {
    await page.getByRole("combobox").nth(1).selectOption("DELETE")
    await expect(page.getByRole("combobox")).toHaveCount(1, { timeout: 2000 })
  }).toPass({ timeout: 15000 })
})

test("Deleting a track row with data is blocked", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await addActivity(page, "activity 2")
  await page.getByRole("link", { name: "Time sheet" }).click()

  await page.getByRole("combobox").first().selectOption("activity 1")
  await page.getByText("Add activity", { exact: true }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await fillTrackInput(trackInputs.nth(7), "3", "3.0h")

  await page.getByRole("combobox").nth(1).selectOption("DELETE")

  await expect(page.getByRole("combobox").nth(1)).toBeVisible()
})

test("Fills in hours across two activities and multiple days", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await addActivity(page, "activity 2")
  await page.getByRole("link", { name: "Time sheet" }).click()

  await page.getByRole("combobox").first().selectOption("activity 1")
  await page.getByText("Add activity", { exact: true }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await fillTrackInput(trackInputs.nth(0), "2", "2.0h")
  await fillTrackInput(trackInputs.nth(1), "4", "4.0h")
  await fillTrackInput(trackInputs.nth(7), "1", "1.0h")
  await fillTrackInput(trackInputs.nth(8), "3", "3.0h")
})

test("Exactly 24h is accepted, more than 24h in a day is rejected", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").first().selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("24")
  await trackInputs.nth(0).press("Tab")
  await expect(trackInputs.nth(0)).toHaveValue("24.0h")

  await trackInputs.nth(1).fill("24.5")
  await trackInputs.nth(1).press("Tab")
  await expect(trackInputs.nth(1)).toHaveValue("")
})

test("Non-numeric and negative input is rejected or cleaned", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").first().selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("abc")
  await trackInputs.nth(0).press("Tab")
  await expect(trackInputs.nth(0)).toHaveValue("")

  await trackInputs.nth(1).fill("-5")
  await trackInputs.nth(1).press("Tab")
  await expect(trackInputs.nth(1)).toHaveValue("")

  await trackInputs.nth(2).fill("12abc")
  await trackInputs.nth(2).press("Tab")
  await expect(trackInputs.nth(2)).toHaveValue("12.0h")
})

test("Clearing an existing track input deletes the track", async ({ page }) => {
  await page.goto("/")
  await addActivity(page, "activity 1")
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").first().selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("5")
  await trackInputs.nth(0).press("Tab")
  await expect(trackInputs.nth(0)).toHaveValue("5.0h")

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("")
  await trackInputs.nth(0).press("Tab")
  await expect(trackInputs.nth(0)).toHaveValue("")
})

test("A fresh week with no activities shows an empty, disabled row", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("combobox")).toHaveCount(1)
  await expect(page.getByRole("combobox")).toContainText("Select your activity")
  // No trackRow exists yet, so the day cells are plain disabled placeholders, not real TrackInputs
  await expect(page.locator('[data-testid^="track-input-"]')).toHaveCount(0)
  await expect(page.getByRole("textbox").first()).toBeDisabled()
})
