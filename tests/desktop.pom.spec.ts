import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

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
    const desktopPage = new DesktopPage(page)
    await desktopPage.quickTransferReceiver.selectOption(receiverId);
    await desktopPage.quickTransferAmount.fill(transferAmount);
    await desktopPage.quickTransferTitle.fill(transferTitle);
    await desktopPage.quickExecuteButton.click();
    await desktopPage.closeButton.click();

    //Assert
    await expect(desktopPage.messageText).toHaveText(transferMessage);
  });

  test("successfull mobile top-up", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const topupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    //Act
    const desktopPage = new DesktopPage(page)
    await desktopPage.topupReceiver.selectOption(topupReceiver);
    await desktopPage.topupAmount.fill(topupAmount);
    await desktopPage.topupAgreement.check();
    await desktopPage.topupExecuteButton.click();
    await desktopPage.closeButton.click();

    //Assert
    await expect(desktopPage.messageText).toHaveText(topupMessage);
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    //Arrange
    const desktopPage = new DesktopPage(page)
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const initialBalance = await desktopPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    //Act
    await desktopPage.topupReceiver.selectOption(topupReceiver);
    await desktopPage.topupAmount.fill(topupAmount);
    await desktopPage.topupAgreement.check();
    await desktopPage.topupExecuteButton.click();
    await desktopPage.closeButton.click();

    //Assert
    await expect(desktopPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
