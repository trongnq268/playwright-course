import { Page } from "@playwright/test";
import { internationalInfo } from "../../../types/paygate/paygate.interface";

export class internationalPaygatePage {

    constructor(private readonly page: Page) { }
    get pickInterMethod() {
        return this.page.locator('label').filter({ hasText: 'Thẻ tín dụng / Ghi nợ' });
    }
    get inputCardNumber() {
        return this.page.getByRole('textbox', { name: '5678 9101 1234' });
    }
    get inputCardExpireDate() {
        return this.page.getByRole('textbox', { name: '/25' })
    }

    get inputCardCVV123() {
        return this.page.getByRole('textbox', { name: '123', exact: true })
    }

    get inputCardCVV_Amex() {
        return this.page.getByRole('textbox', { name: '1234', exact: true })
    }

    get inputCardName() {
        return this.page.getByRole('textbox', { name: 'NGUYEN VAN A' })
    }
    get inputEmail() {
        return this.page.getByRole('textbox', { name: 'name@email.com' })
    }
    get agreeCheckBox() {
        return this.page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' })
    }

    get payBtn() {
        return this.page.getByRole('button', { name: 'Thanh toán' })
    }

    get btnSubmit() {
        return this.page.getByRole('button', { name: 'Submit' })
    }

    async selectInternationalMethod(): Promise<void> {
        await this.pickInterMethod.click();
    }

    async inputInternationalInfo(interInfo: internationalInfo): Promise<void> {
        await this.inputCardNumber.fill(interInfo.cardNumber);
        await this.inputCardExpireDate.fill(interInfo.dateExpireCard);
        await this.inputCardCVV123.fill(interInfo.cardCVV);
        await this.inputCardName.fill(interInfo.cardName);
        await this.inputEmail.fill(interInfo.cardEmail);

        await this.agreeCheckBox.check();
        await this.payBtn.click();
    }

    async inputInternationalInfo_Amex(interInfo: internationalInfo): Promise<void> {
        await this.inputCardNumber.fill(interInfo.cardNumber);
        await this.inputCardExpireDate.fill(interInfo.dateExpireCard);
        await this.inputCardCVV_Amex.fill(interInfo.cardCVV);
        await this.inputCardName.fill(interInfo.cardName);
        await this.inputEmail.fill(interInfo.cardEmail);

        await this.agreeCheckBox.check();
        await this.payBtn.click();
    }
    async SubmitAuthen(): Promise<void> {
        await this.btnSubmit.click();
    }

}