import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/sideMenu.component";

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page)

  transferReceiver = this.page.getByTestId("transfer_receiver");
  transferAccount = this.page.getByTestId("form_account_to");
  transferAmount = this.page.getByTestId("form_amount");
  executeButton = this.page.locator("#execute_btn");
}
