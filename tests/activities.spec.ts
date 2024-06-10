import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeAll(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// test.afterAll(() => {})

const activities = [
  "activity 1",
  "activity 2",
  "activity 3",
  "activity 4",
  "activity 5",
  "activity 6",
  "activity 7",
  "activity 8",
  "activity 9",
  "activity 10",
]

test("Add activity", async ({ page }) => {
  for (const activity of activities) {
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(100)
    const result = await page.locator("tr").filter({ hasText: activity })
    expect(result).toHaveCount(1)
  }
})

test("Delete activity", async ({ page }) => {
  for (const activity of activities) {
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(100)

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Delete" }).click()
    const result = await page.locator("tr").filter({ hasText: activity })
    expect(result).toHaveCount(0)
  }
})

test("Edit activity", async ({ page }) => {
  for (const activity of activities) {
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(100)

    await page
      .getByRole("row", { name: "activity 2" })
      .getByRole("button")
      .click()
    await page.getByRole("link", { name: "Edit" }).click()
    await page.getByLabel("Activity Name").click()
    await page.getByLabel("Activity Name").fill("")
    await page.getByLabel("Activity Name").fill(activity + " edited")
    await page.getByLabel("Color").click()
    await page.getByLabel("Color").fill("#b8c4ab")
    await page
      .locator("div")
      .filter({ hasText: /^Color$/ })
      .click()
    await page.getByRole("button", { name: "Submit" }).click()
    await page.getByRole("cell", { name: activity + " edited" }).click()
  }
})
