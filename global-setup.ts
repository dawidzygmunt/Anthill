import { clerkSetup } from "@clerk/testing/playwright"
import { Browser, chromium, expect, Page } from "@playwright/test"

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()
  await clerkSetup()

  await await page.goto("http://localhost:3000/sign-in")
  await page.waitForTimeout(1000)
  await page.getByLabel("Email address").click()
  await page.getByLabel("Email address").fill("test1@test.com")
  await page.getByRole("button", { name: "Continue", exact: true }).click()
  await page.waitForTimeout(400)
  await page.getByLabel("Password", { exact: true }).fill("123")
  await page.getByRole("button", { name: "Continue" }).click()
  await expect(
    page.getByRole("button", { name: "Open user button" })
  ).toBeVisible({
    timeout: 5000,
  })

  await page.context().storageState({ path: "./LoginAuth.json" })

  await browser.close()
}

export default globalSetup
