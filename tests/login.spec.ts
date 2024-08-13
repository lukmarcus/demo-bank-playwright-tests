import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { loginData } from "../test-data/login.data";
import { DesktopPage } from "../pages/desktop.page";

test.describe("Demobank Login Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test("successful login with correct credentials", async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";

    //Act
    await loginPage.login(userId, userPassword);

    //Assert
    const desktopPage = new DesktopPage(page);
    await expect(desktopPage.userName).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    //Arrange
    const tooShortId = "user";
    const expectedTooShortUserIdMessage = "identyfikator ma min. 8 znaków";

    //Act
    await loginPage.loginInput.fill(tooShortId);
    await loginPage.loginInput.blur();

    //Assert
    await expect(loginPage.loginError).toHaveText(
      expectedTooShortUserIdMessage,
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    //Arrange
    const tooShortPassword = "pass";
    const expectedTooShortPasswordMessage = "hasło ma min. 8 znaków";

    //Act
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedTooShortPasswordMessage,
    );
  });
});
