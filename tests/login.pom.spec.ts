import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { loginData } from "../test-data/login.data";

test.describe("Demobank user login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("successful login with correct credentials", async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click()

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    //Arrange
    const tooShortId = "user";
    const expectedTooShortUserIdMessage = "identyfikator ma min. 8 znaków";

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(tooShortId);
    await loginPage.loginInput.blur();

    //Assert
    await expect(loginPage.loginError).toHaveText(
      expectedTooShortUserIdMessage
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    //Arrange
    const tooShortPassword = "pass";
    const expectedTooShortPasswordMessage = "hasło ma min. 8 znaków";

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedTooShortPasswordMessage
    );
  });
});
