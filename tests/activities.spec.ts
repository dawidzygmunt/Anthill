import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// test.afterAll(() => {})

test("Add activity", async ({ page }) => {
  const activities = [
    "activity1",
    "activity2",
    "orange in office",
    "activity 4",
    "activity 5",
  ]

  await page.goto("http://localhost:3000/settings")
  for (const activity of activities) {
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(300)
    const result = await page.locator("tr").filter({ hasText: activity })
    await page.waitForTimeout(100)
    expect(result).toContainText(activity)
  }
})

test("Delete activity", async ({ page }) => {
  const activities = [
    "v2 activity 1",
    "v2 122 12",
    "v2 ac cc3",
    "v2 activity 4",
  ]

  await page.goto("http://localhost:3000/settings")
  for (const activity of activities) {
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
  const activities = [
    "v4activity 1",
    "v4122 12",
    "v4 ac cc3",
    "153123",
    "v4activity 5",
  ]
  for (const activity of activities) {
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(400)

    await page.getByRole("row", { name: activity }).getByRole("button").click()
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
    const result = await page.getByRole("cell", { name: activity + " edited" })
    expect(result).toContainText(activity + " edited")
  }
})

test("Show deleted activities", async ({ page }) => {
  const activities = [
    "v3activity1",
    "v3activity2",
    "v3activity3",
    "v3activity4",
  ]

  for (const activity of activities) {
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(100)

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Delete" }).click()
    await page.waitForTimeout(100)
    await page.getByRole("switch").click()
    await page.waitForTimeout(500)

    const result = await page.locator("tr").filter({ hasText: activity })
    expect(result).toHaveCount(1)
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
    await page.goto("http://localhost:3000/settings")
    await page.getByRole("button", { name: "Add new" }).click()
    await page.getByPlaceholder("Add your activity...").click()
    await page.getByPlaceholder("Add your activity...").fill(activity)
    await page.getByText("Submit").click()
    await page.waitForTimeout(100)

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Delete" }).click()
    await page.waitForTimeout(100)
    await page.getByRole("switch").click()
    await page.waitForTimeout(500)

    const result = await page.locator("tr").filter({ hasText: activity })

    await page.getByRole("row", { name: activity }).getByRole("button").click()
    await page.getByRole("menuitem", { name: "Restore" }).click()

    await page.getByRole("switch").click()
    await page.waitForTimeout(500)
    expect(result).toHaveCount(1)
  }
})
