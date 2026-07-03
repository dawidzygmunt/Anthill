import prisma from "@/lib/db"
import { test, expect } from "@playwright/test"

test.beforeEach(async ({}) => {
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.week.deleteMany()
})

test("typed time value is parsed, rounded, and displayed formatted in the UI", async ({
  page,
}) => {
  await page.goto("/settings")
  await page.getByRole("link", { name: "Projects" }).click()
  await page.getByRole("button", { name: "New activity" }).click()
  await page.getByPlaceholder("Add your activity...").fill("activity 1")
  await page.getByPlaceholder("Add your activity...").press("Enter")

  await page.goto("/")
  await page.getByRole("combobox").selectOption("activity 1")

  const trackInput = page.locator('[data-testid^="track-input-"]').first()
  await trackInput.click()
  await trackInput.fill("12,3")
  await trackInput.press("Tab")

  await expect(trackInput).toHaveValue("12.5h")
})
