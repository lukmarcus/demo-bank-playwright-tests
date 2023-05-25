import { Page } from "@playwright/test";

export class DesktopPage {
  constructor(private page: Page) {}

  userName = this.page.getByTestId("user-name");

  quickTransferReceiver = this.page.locator("#widget_1_transfer_receiver");
  quickTransferAmount = this.page.locator("#widget_1_transfer_amount");
  quickTransferTitle = this.page.locator("#widget_1_transfer_title");
  quickExecuteButton = this.page.locator("#execute_btn");
  
  closeButton = this.page.getByTestId("close-button");

  topupReceiver = this.page.locator("#widget_1_topup_receiver");
  topupAmount = this.page.locator("#widget_1_topup_amount");
  topupAgreement = this.page.locator("#uniform-widget_1_topup_agreement");
  topupExecuteButton = this.page.locator("#execute_phone_btn");

  messageText = this.page.getByTestId("message-text");

  moneyValue = this.page.locator("#money_value");

  paymentsButton = this.page.locator("#payments_btn");
}
