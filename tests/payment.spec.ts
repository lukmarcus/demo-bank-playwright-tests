import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Demobank Payment", () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const desktopPage = new DesktopPage(page);
    await desktopPage.sideMenu.paymentsButton.click();

    paymentPage = new PaymentPage(page);
  });

  test(
    "simple payment",
    {
      tag: ["@payment", "@integration"],
      annotation: {
        type: "Documentation",
        description: "https://jaktestowac.pl/lesson/pw1s04l04/",
      },
    },
    async ({ page }) => {
      //Arrange
      const transferReceiver = "Jan Nowak";
      const transferAccount = "12 3456 7890 1234 5678 9012 34567";
      const transferAmount = "222";
      const transferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

      //Act
      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount
      );

      //Assert
      await page.waitForLoadState("domcontentloaded");
      await expect(paymentPage.messageText).toHaveText(transferMessage);
    }
  );
});
