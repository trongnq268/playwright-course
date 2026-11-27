import { Page } from "@playwright/test";
import { invoiceInfo } from "../../../types/paygate/paygate.interface";

export class simulatorPage {
    constructor(private readonly page: Page) {

    }

    get inputMerchantID() {
        // return this.page.getByRole('textbox', { name: 'MERCHANT ID' })
        return this.page.getByRole('textbox', { name: 'MERCHANT ID' })
    }

    get inputAmount() {
        // return this.page.locator('#vpc_Amount')
        return this.page.locator('input[name="vpc_Amount"]')
    }

    get inputVpcTheme() {
        // return this.page.locator('input[name="vpc_Theme"]')
        return this.page.locator('input[name="vpc_Theme"]')
    }

    get btnPayNow() {
        return this.page.getByRole('button', { name: 'Pay Now!' })
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url)
    }

    // async createInvoice(merchantId: String, amount: number, vpcTheme: string): Promise<void> {}
    // tương đươn
    async createInvoice(invoiceInfo: invoiceInfo): Promise<void> {
        await this.inputMerchantID.fill(invoiceInfo.merchantId);
        await this.inputAmount.fill(invoiceInfo.amount);
        await this.inputVpcTheme.fill(invoiceInfo.vpc_theme);

        await this.btnPayNow.click();
    }

}