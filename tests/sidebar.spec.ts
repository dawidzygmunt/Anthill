import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"
import exp from "constants"
import { exitCode } from "process"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

// test.afterAll(() => {})
test("Adding week", async ({ page }) => {
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r3\\:-form-item"]').click()
  await page.locator('[id="\\:r3\\:-form-item"]').fill("20")
  await page.waitForTimeout(200)
  await page.locator('[id="\\:r4\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:r4\\:-form-item"]').fill("30")
  await page.waitForTimeout(100)
  await page.locator('[id="\\:r5\\:-form-item"]').click()

  const week = await page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  expect(week).toContainText("10 Jun - 16 Jun 2024")
  expect(week).toContainText("In progress")
  expect(week).toContainText("1:00")
})

test("In progress change", async ({ page }) => {
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r3\\:-form-item"]').click()
  await page.locator('[id="\\:r3\\:-form-item"]').fill("20")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r4\\:-form-item"]').click()
  await page.locator('[id="\\:r4\\:-form-item"]').fill("30")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r5\\:-form-item"]').click()
  await page.locator('[id="\\:r5\\:-form-item"]').fill("40")
  await page.waitForTimeout(100)
  await page.locator('[id="\\:r4\\:-form-item"]').click()

  const week = await page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  const button = await page.getByRole("button", { name: "in progress" })
  await week.click()
  await button.click()
  expect(week).toContainText("Done")

  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 3")
  await page.getByText("Submit").click()
  await page.waitForTimeout(100)
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await page.getByRole("button", { name: ">" }).click()
  await page.waitForTimeout(300)
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page.getByRole("button", { name: "in progress" }).click()

  await page.getByRole("button", { name: "<" }).click()
  await page.waitForTimeout(200)
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
  await page.waitForTimeout(300)
  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()

  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
})

test("Sync closing weeks", async ({ page }) => {
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("http://localhost:3000?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r3\\:-form-item"]').click()
  await page.locator('[id="\\:r3\\:-form-item"]').fill("20")

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r4\\:-form-item"]').click()
  await page.waitForTimeout(100)
  await page.locator('[id="\\:r4\\:-form-item"]').fill("30")
  await page.waitForTimeout(100)

  await page.waitForTimeout(100)
  await page.locator('[id="\\:r5\\:-form-item"]').click()
  await page.locator('[id="\\:r5\\:-form-item"]').fill("40")
  await page.locator('[id="\\:r5\\:-form-item"]').press("Tab")
  await page.waitForTimeout(100)

  const week = await page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  const button = await page.getByRole("button", { name: "in progress" })
  await week.click()
  await button.click()
  await expect(week).toContainText("Done")
  await page.goto("http://localhost:3000?from=2024-06-10")
  await expect(week).toContainText("Done")
  expect(await page.getByRole("button", { name: "Done" })).toBeVisible()

  await page.getByRole("link", { name: "Settings" }).click()
  await page.getByRole("button", { name: "Add new" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 3")
  await page.getByText("Submit").click()
  await page.waitForTimeout(100)
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await page.getByRole("button", { name: ">" }).click()
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
  await page.waitForTimeout(300)
  expect(await page.getByRole("button", { name: "in progress" })).toBeVisible()

  await page.getByRole("button", { name: "in progress" }).click()
  await page.getByRole("button", { name: "<" }).click()
  await page.waitForTimeout(300)
  expect(await page.getByRole("button", { name: "Done" })).toBeVisible()
  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await page.waitForTimeout(300)
  await expect(
    await page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
})
