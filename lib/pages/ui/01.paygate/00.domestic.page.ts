import { Page } from "@playwright/test";
import { domesticInfo } from "../../../types/paygate/paygate.interface";

export class domesticPaygatePage {
    constructor(private readonly page: Page) {
    }
    get pickDomesticMethod() {
        return this.page.getByRole('radio', { name: 'Thẻ ATM / Tài khoản ngân hàng' })
    }

    get inputCardNumber() {
        // return this.page.getByRole('textbox', { name: '1234 5678 9123 012' })
        return this.page.getByRole('textbox', { name: '1234 5678 9123' })
    }

    get inputDateFrom() {
        // return this.page.getByRole('textbox', { name: '/18' })
        return this.page.getByRole('textbox', { name: '/' })
    }


    get inputCardName() {
        return this.page.getByRole('textbox', { name: 'NGUYEN VAN A' })
    }

    get radioAgree() {
        return this.page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' })
    }
    get btnThanhToan() {
        return this.page.getByRole('button', { name: 'Thanh toán' })
    }


    get inputOTP_OP() {
        return this.page.locator('[name="otp"]');
    }
    get btnThanhToanOTP_OP() {
        return this.page.getByRole('button', { name: 'Thanh toán' })
    }

    get inputOTP_NP() {
        return this.page.getByRole('textbox', { name: 'Mã xác thực (OTP)' })
    }
    get btnTiepTuc_NP() {
        return this.page.getByRole('button', { name: 'Tiếp tục' })
    }


    get btnSubmitAuthen() {
        return this.page.getByRole('button', { name: 'Submit' })
    }

    async selectDomesticMethod(): Promise<void> {
        return this.pickDomesticMethod.click()
    }

    async inputDomesticInfo(domesticInfo: domesticInfo): Promise<void> {
        await this.inputCardNumber.fill(domesticInfo.cardNumber);
        await this.inputDateFrom.fill(domesticInfo.dateFrom);
        await this.inputCardName.fill(domesticInfo.cardName);

        await this.radioAgree.check();
        await this.btnThanhToan.click();
    }


    async inputDomesticInfo_NoDate(domesticInfo: domesticInfo): Promise<void> {
        await this.inputCardNumber.fill(domesticInfo.cardNumber);
        await this.inputCardName.fill(domesticInfo.cardName);

        await this.radioAgree.check();
        await this.btnThanhToan.click();
    }

    async submitOTPdomesticInfo_OP(domesticInfo: domesticInfo): Promise<void> {
        await this.inputOTP_OP.fill(domesticInfo.inputOTP);
        await this.btnThanhToanOTP_OP.click();
    }
    async submitOTPdomesticInfo_NP(domesticInfo: domesticInfo): Promise<void> {
        await this.inputOTP_NP.fill(domesticInfo.inputOTP);
        await this.btnTiepTuc_NP.click();
    }
    async SubmitAuthen(): Promise<void> {
        await this.btnSubmitAuthen.click();
    }

}