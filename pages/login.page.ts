import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId("login-input");
  //   await page.getByTestId("login-input").fill(userId);
}
