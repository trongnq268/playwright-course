export interface invoiceInfo {
    merchantId: string;
    amount: string;
    vpc_theme: string;

}

export interface internationalInfo {
    cardNumber: string;
    dateExpireCard: string;
    cardCVV: string;
    cardName: string;
    cardEmail: string;
}

export interface domesticInfo {
    cardNumber: string;
    dateFrom: string;
    cardName: string;
    inputOTP: string;
}
