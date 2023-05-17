import { test, expect } from "@playwright/test";

test.describe("Desktop", () => {
  test("quick payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("user1234");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("120");
    await page.locator("#widget_1_transfer_title").fill("Zwrot środków");
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 120,00PLN - Zwrot środków"
    );
  });

  test("successfull mobile top-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("user1234");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("50");
    await page.locator("#uniform-widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx"
    );
  });
});
