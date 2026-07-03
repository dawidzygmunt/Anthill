import prisma from "@/lib/db"
import { expect, test } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

test("Adding week", async ({ page }) => {
  await page.goto("/?from=2024-06-10")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("/?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("2")
  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("4")
  await trackInputs.nth(2).click()

  const week = page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  await expect(week).toContainText("10 Jun - 16 Jun 2024")
  await expect(week).toContainText("In progress")
  await expect(week).toContainText("6:00")
})

test("In progress change", async ({ page }) => {
  await page.goto("/?from=2024-06-10")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("/?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("1")
  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("2")
  await trackInputs.nth(2).click()
  await trackInputs.nth(2).fill("4")
  await trackInputs.nth(1).click()

  const week = page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  const button = page.getByRole("button", { name: "in progress" })
  await week.click()
  await button.click()
  await expect(week).toContainText("Done")

  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 3")
  await page.getByText("Submit").click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await page.getByRole("button", { name: ">" }).click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page.getByRole("button", { name: "in progress" }).click()

  await page.getByRole("button", { name: "<" }).click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()

  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
})

test("Sync closing weeks", async ({ page }) => {
  await page.goto("/?from=2024-06-10")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 2")
  await page.getByPlaceholder("Add your activity...").press("Enter")
  await page.goto("/?from=2024-06-10")
  await page.getByRole("combobox").selectOption("activity 1")

  const trackInputs = page.locator('[data-testid^="track-input-"]')
  await trackInputs.nth(0).click()
  await trackInputs.nth(0).fill("1")
  await trackInputs.nth(1).click()
  await trackInputs.nth(1).fill("2")
  await trackInputs.nth(2).click()
  await trackInputs.nth(2).fill("3")
  await trackInputs.nth(2).press("Tab")

  const week = page.getByRole("link", {
    name: "10 Jun - 16 Jun 2024 activity",
  })
  const button = page.getByRole("button", { name: "in progress" })
  await week.click()
  await button.click()
  await expect(week).toContainText("Done")
  await page.goto("/?from=2024-06-10")
  await expect(week).toContainText("Done")
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible()

  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 3")
  await page.getByText("Submit").click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")

  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await page.getByRole("button", { name: ">" }).click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
  await expect(
    page.getByRole("button", { name: "in progress" })
  ).toBeVisible()

  await page.getByRole("button", { name: "in progress" }).click()
  await page.getByRole("button", { name: "<" }).click()
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible()
  await page
    .getByRole("link", { name: "10 Jun - 16 Jun 2024 activity" })
    .click()
  await expect(
    page.getByRole("link", {
      name: "10 Jun - 16 Jun 2024 activity",
    })
  ).toContainText("Done")
})
