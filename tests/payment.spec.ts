import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Demobank Payment", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#payments_btn").click();
  });

  test("simple payment", async ({ page }) => {
    //Arrange
    const transferReceiver = "Jan Nowak";
    const transferAccount = "12 3456 7890 1234 5678 9012 34567";
    const transferAmount = "222";
    const transferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferAccount);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.getByTestId("message-text")).toHaveText(transferMessage);
  });
});
