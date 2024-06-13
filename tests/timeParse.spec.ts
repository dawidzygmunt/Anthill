import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// test.afterAll(() => {})

test("Multiple scenario", async ({ page }) => {
  const tracks = [
    { test: "12", result: "12" },
    { test: "12,1", result: "12.5" },
    { test: "12,2", result: "12.5" },
    { test: "12,3", result: "12.5" },
    { test: "12,4", result: "12.5" },
    { test: "12,5", result: "12.5" },
    { test: "12,6", result: "13" },
    { test: "12,7", result: "13" },
    { test: "12,8", result: "13" },
    { test: "12,9", result: "13" },
    { test: "11,0", result: "11" },
    { test: "11,1", result: "11.5" },
    { test: "11,5", result: "11.5" },
    { test: "11,6", result: "12" },
    { test: "10,0", result: "10" },
    { test: "10,5", result: "10.5" },
    { test: "10,6", result: "11" },
    { test: "1,1", result: "1.5" },
    { test: "1,5", result: "1.5" },
    { test: "1,6", result: "2" },
    { test: "0,1", result: "0.5" },
    { test: "0,5", result: "0.5" },
    { test: "0,6", result: "1" },
  ]

  await page.goto("http://localhost:3000/settings")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()

  await page.goto("http://localhost:3000/")
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await page.locator('[id="\\:r7\\:-form-item"]').click()
  for (const track of tracks) {
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r7\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r7\\:-form-item"]').press("Tab")
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r8\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r8\\:-form-item"]').press("Tab")
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r9\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(100)
    await page.locator('[id="\\:r9\\:-form-item"]').press("Tab")
    await page.waitForTimeout(300)

    expect(await page.locator('[id="\\:r7\\:-form-item"]').inputValue()).toBe(
      track.result
    )
    expect(await page.locator('[id="\\:r8\\:-form-item"]').inputValue()).toBe(
      track.result
    )
    expect(await page.locator('[id="\\:r9\\:-form-item"]').inputValue()).toBe(
      track.result
    )
  }
})
test("edge Case scenario", async ({ page }) => {
  const tracks = [
    { test: "", result: "" },
    { test: " ", result: "" },
    { test: "abc", result: "" },
    { test: "12,abc", result: "12" },
    { test: "12,12,12", result: "" },
    { test: "12..3", result: "12" },
    { test: "-12,3", result: "" },
    { test: "12.34", result: "12.5" },
  ]

  await page.goto("http://localhost:3000/settings")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByText("Submit").click()

  await page.goto("http://localhost:3000/")
  await page.getByRole("combobox").selectOption("activity 1")
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByRole("combobox").nth(1).selectOption("activity 2")
  await page.locator('[id="\\:r7\\:-form-item"]').click()
  for (const track of tracks) {
    await page.waitForTimeout(200)
    await page.locator('[id="\\:r7\\:-form-item"]').click()
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r7\\:-form-item"]').clear()
    await page.waitForTimeout(200)
    await page.locator('[id="\\:r8\\:-form-item"]').click()
    await page.waitForTimeout(200)
    await page.locator('[id="\\:r8\\:-form-item"]').clear()
    await page.waitForTimeout(200)
    await page.locator('[id="\\:r9\\:-form-item"]').click()
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r9\\:-form-item"]').clear()
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r9\\:-form-item"]').press("Tab")
    await page.waitForTimeout(200)
    await page.locator('[id="\\:r7\\:-form-item"]').click()
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r7\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r7\\:-form-item"]').press("Tab")
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r8\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r8\\:-form-item"]').press("Tab")
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r9\\:-form-item"]').fill(track.test)
    await page.waitForTimeout(150)
    await page.locator('[id="\\:r9\\:-form-item"]').press("Tab")
    await page.waitForTimeout(300)

    expect(await page.locator('[id="\\:r7\\:-form-item"]').inputValue()).toBe(
      track.result
    )
    expect(await page.locator('[id="\\:r8\\:-form-item"]').inputValue()).toBe(
      track.result
    )
    expect(await page.locator('[id="\\:r9\\:-form-item"]').inputValue()).toBe(
      track.result
    )
  }
})
