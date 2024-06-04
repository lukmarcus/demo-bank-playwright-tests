import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("Demobank Desktop", () => {
  let desktopPage: DesktopPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    desktopPage = new DesktopPage(page);
  });

  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "Zwrot środków";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const transferMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await desktopPage.makeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle
    );

    //Assert
    await page.waitForLoadState("domcontentloaded");
    await expect(desktopPage.messageText).toHaveText(transferMessage);
  });

  test("successful mobile top-up", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const topupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    //Act
    await desktopPage.makeTopup(topupReceiver, topupAmount);

    //Assert
    await expect(desktopPage.messageText).toHaveText(topupMessage);
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const initialBalance = await desktopPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    //Act
    await desktopPage.makeTopup(topupReceiver, topupAmount);

    //Assert
    await expect(desktopPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
