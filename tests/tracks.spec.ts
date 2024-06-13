import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// test.afterAll(() => {})
test("Add Tracks", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  expect(page.getByRole("combobox").first()).toContainText("activity 1")
  expect(page.getByRole("combobox").nth(1)).toContainText("activity 2")
})

test("Add same tracks", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 1")
  await page.waitForTimeout(400)

  expect(page.getByRole("combobox").nth(1)).toContainText(
    "Select your activity"
  )
})

test("Delete Tracks", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.waitForTimeout(100)

  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await page.waitForTimeout(100)
  await page.getByRole("combobox").nth(1).selectOption("DELETE")
  await page.waitForTimeout(100)
  const selector = await page.getByRole("combobox").nth(1)
  expect(selector).not.toBeVisible()
})

test("Delete tracks validation", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.waitForTimeout(100)
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await page.waitForTimeout(100)

  await page.locator('[id="\\:rb\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rb\\:-form-item"]').fill("20")

  await page.locator('[id="\\:rc\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').fill("20")

  await page.locator('[id="\\:rj\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rj\\:-form-item"]').fill("30")
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').click()

  await page.getByRole("combobox").nth(1).selectOption("DELETE")
  await page.waitForTimeout(100)
  const selector = await page.getByRole("combobox").nth(1)
  expect(selector).toBeVisible()
})

test("Add new week & trackRow & track", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  await page.locator('[id="\\:rb\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rb\\:-form-item"]').fill("20")

  await page.locator('[id="\\:rc\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').fill("20")

  await page.locator('[id="\\:ri\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:ri\\:-form-item"]').fill("30")

  await page.locator('[id="\\:rj\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rj\\:-form-item"]').fill("30")

  expect(await page.locator('[id="\\:rb\\:-form-item"]')).toHaveValue("20")
  expect(await page.locator('[id="\\:rc\\:-form-item"]')).toHaveValue("20")
  expect(await page.locator('[id="\\:ri\\:-form-item"]')).toHaveValue("30")
  expect(await page.locator('[id="\\:rj\\:-form-item"]')).toHaveValue("30")
})

test("Add more than 24h", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  await page.locator('[id="\\:rb\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rb\\:-form-item"]').fill("1440")

  await page.locator('[id="\\:rc\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').fill("1441")

  await page.locator('[id="\\:ri\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:ri\\:-form-item"]').fill("30")

  await page.locator('[id="\\:rj\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rj\\:-form-item"]').fill("30")

  expect(await page.locator('[id="\\:rb\\:-form-item"]')).toHaveValue("1440")
  expect(await page.locator('[id="\\:rc\\:-form-item"]')).toHaveValue("")
  expect(await page.locator('[id="\\:ri\\:-form-item"]')).toHaveValue("30")
  expect(await page.locator('[id="\\:rj\\:-form-item"]')).toHaveValue("30")
})

test("Input validation", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()
  await page.getByRole("link", { name: "Home" }).click()
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")

  await page.locator('[id="\\:rb\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rb\\:-form-item"]').fill("test")

  await page.locator('[id="\\:rc\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').fill("149fd")

  await page.locator('[id="\\:ri\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:ri\\:-form-item"]').fill(".12,")

  await page.locator('[id="\\:rj\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rj\\:-form-item"]').fill("92!9")
  await page.waitForTimeout(100)
  await page.locator('[id="\\:rc\\:-form-item"]').press("Tab")
  await page.waitForTimeout(100)

  expect(await page.locator('[id="\\:rb\\:-form-item"]')).toHaveValue("")
  expect(await page.locator('[id="\\:rc\\:-form-item"]')).toHaveValue("149")
  expect(await page.locator('[id="\\:ri\\:-form-item"]')).toHaveValue("")
  expect(await page.locator('[id="\\:rj\\:-form-item"]')).toHaveValue("92")
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
