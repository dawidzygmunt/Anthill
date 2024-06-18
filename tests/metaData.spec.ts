import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("localhost:3000")

  await expect(page).toHaveTitle(/Anthill v2/)
})
