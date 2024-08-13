import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}

  paymentsButton = this.page.locator("#payments_btn");
}
