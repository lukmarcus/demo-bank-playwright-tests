import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("Desktop", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click()
  });

  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "Zwrot środków";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const transferMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.getByTestId("message-text")).toHaveText(transferMessage);
  });

  test("successfull mobile top-up", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const topupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    //Act
    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.getByTestId("message-text")).toHaveText(topupMessage);
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    //Act
    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });
});
