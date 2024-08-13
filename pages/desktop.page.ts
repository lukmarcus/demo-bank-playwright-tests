import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/sideMenu.component";

export class DesktopPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

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

  async makeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.quickTransferReceiver.selectOption(receiverId);
    await this.quickTransferAmount.fill(transferAmount);
    await this.quickTransferTitle.fill(transferTitle);
    await this.quickExecuteButton.click();
    await this.closeButton.click();
  }

  async makeMobileTopup(
    topupReceiver: string,
    topupAmount: string,
  ): Promise<void> {
    await this.topupReceiver.selectOption(topupReceiver);
    await this.topupAmount.fill(topupAmount);
    await this.topupAgreement.check();
    await this.topupExecuteButton.click();
    await this.closeButton.click();
  }
}
