import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

test("Add Tracks", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  await expect(page.getByRole("combobox").first()).toContainText("activity 1")
  await expect(page.getByRole("combobox").nth(1)).toContainText("activity 2")
})

test("Add same tracks", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 1")

  await expect(page.getByRole("combobox").nth(1)).toContainText(
    "Select your activity"
  )
})

test("Delete Tracks", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")

  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await page.getByRole("combobox").nth(1).selectOption("DELETE")

  await expect(page.getByRole("combobox").nth(1)).not.toBeVisible()
})

test("Delete tracks validation", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("20")

  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("20")

  await trackInputs.nth(7).click()
  await trackInputs.nth(7).fill("30")
  await trackInputs.nth(1).click()

  await page.getByRole("combobox").nth(1).selectOption("DELETE")

  await expect(page.getByRole("combobox").nth(1)).toBeVisible()
})

test("Add new week & trackRow & track", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("20")

  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("20")

  await trackInputs.nth(6).click()
  await trackInputs.nth(6).fill("30")

  await trackInputs.nth(7).click()
  await trackInputs.nth(7).fill("30")

  await expect(trackInputs.nth(0)).toHaveValue("20")
  await expect(trackInputs.nth(1)).toHaveValue("20")
  await expect(trackInputs.nth(6)).toHaveValue("30")
  await expect(trackInputs.nth(7)).toHaveValue("30")
})

test("Add more than 24h", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("1440")

  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("1441")

  await trackInputs.nth(6).click()
  await trackInputs.nth(6).fill("30")

  await trackInputs.nth(7).click()
  await trackInputs.nth(7).fill("30")

  await expect(trackInputs.nth(0)).toHaveValue("1440")
  await expect(trackInputs.nth(1)).toHaveValue("")
  await expect(trackInputs.nth(6)).toHaveValue("30")
  await expect(trackInputs.nth(7)).toHaveValue("30")
})

test("Input validation", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Time sheet" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  const trackInputs = page.locator('[data-testid^="track-input-"]')

  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("test")

  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("149fd")

  await trackInputs.nth(6).click()
  await trackInputs.nth(6).fill(".12,")

  await trackInputs.nth(7).click()
  await trackInputs.nth(7).fill("92!9")
  await trackInputs.nth(1).press("Tab")

  await expect(trackInputs.nth(0)).toHaveValue("")
  await expect(trackInputs.nth(1)).toHaveValue("149")
  await expect(trackInputs.nth(6)).toHaveValue("")
  await expect(trackInputs.nth(7)).toHaveValue("92")
})

test("Show deleted activities", async ({ page }) => {
  const activities = [
    "v3activity1",
    "v3activity2",
    "v3activity3",
    "v3activity4",
  ]

  for (const activity of activities) {
    await page.goto("/settings")
    await page.getByRole("button", { name: "New activity" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await expect(page.locator("tr").filter({ hasText: activity })).toBeVisible()

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Delete" }).click()
    await expect(
      page.locator("tr").filter({ hasText: activity })
    ).toHaveCount(0)
    await page.getByRole("link", { name: "Archived" }).click()

    const result = page.locator("tr").filter({ hasText: activity })
    await expect(result).toHaveCount(1)
  }
})

test("Restore deleted activities", async ({ page }) => {
  const activities = [
    "v3activity1",
    "v3activity2",
    "v3activity3",
    "v3activity4",
  ]

  for (const activity of activities) {
    await page.goto("/settings")
    await page.getByRole("button", { name: "New activity" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await expect(page.locator("tr").filter({ hasText: activity })).toBeVisible()

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Delete" }).click()
    await expect(
      page.locator("tr").filter({ hasText: activity })
    ).toHaveCount(0)
    await page.getByRole("link", { name: "Archived" }).click()

    const result = page.locator("tr").filter({ hasText: activity })
    await expect(result).toHaveCount(1)

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Restore" }).click()

    await page.getByRole("link", { name: "Active" }).click()
    await expect(result).toHaveCount(1)
  }
})
