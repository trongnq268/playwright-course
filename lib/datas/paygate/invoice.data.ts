import { domesticInfo, invoiceInfo } from "../../types/paygate/paygate.interface";
import { internationalInfo } from "../../types/paygate/paygate.interface";

export const invoiceData: invoiceInfo[] = [
    { merchantId: 'AUTO2B01', amount: '9000000', vpc_theme: 'general' },
    { merchantId: 'TESTPCI', amount: '1000000', vpc_theme: 'general' }
    // 1:03:30 
]

export const internationalData: internationalInfo[] = [
    //MC
    { cardNumber: '5123 4500 0000 0008', dateExpireCard: '12/30', cardCVV: '123', cardName: 'NGUYEN VAN A', cardEmail: 'duonghoi210@gmail.com' },
    ///Visa
    { cardNumber: '4300 0000 0000 0009', dateExpireCard: '12/30', cardCVV: '123', cardName: 'NGUYEN VAN A', cardEmail: 'duonghoi210@gmail.com' },
    //JCB
    { cardNumber: '3500 0000 0000 1122', dateExpireCard: '12/30', cardCVV: '123', cardName: 'NGUYEN VAN A', cardEmail: 'duonghoi210@gmail.com' },
    //Amex
    { cardNumber: '340000000001007', dateExpireCard: '12/30', cardCVV: '1234', cardName: 'NGUYEN VAN A', cardEmail: 'duonghoi210@gmail.com' },
    //CUP
    { cardNumber: '6250 9470 0000 0014', dateExpireCard: '12/30', cardCVV: '123', cardName: 'NGUYEN VAN A', cardEmail: 'duonghoi210@gmail.com' },]


export const domesticData: domesticInfo[] = [
    //VCB
    { cardNumber: '9704360000000000002', dateFrom: '10/22', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //bidv
    { cardNumber: '9704 1800 0000 0000', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //AGR
    { cardNumber: '9704050000000005', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //Vietin
    { cardNumber: '9704150000000003', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    // TCB - Tháng/Năm hết hạn
    { cardNumber: '9704070000000003', dateFrom: '10/29', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //VP Bank
    { cardNumber: '9704320000000002', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //Sacombank
    { cardNumber: '9704030000000007', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //Tp Bank
    { cardNumber: '9704230000000003', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //MB Bank
    { cardNumber: '9704220000000004', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //VIB
    { cardNumber: '9704410000000001', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //Eximbank - Tháng/Năm hết hạn
    { cardNumber: '9704310000000003', dateFrom: '10/29', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //SHB
    { cardNumber: '9704430000000009', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //MSB
    { cardNumber: '9704260000000000', dateFrom: '10/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //HDBANK
    { cardNumber: '9704370000000007', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //SEABANK - Tháng/Năm hết hạn
    { cardNumber: '9704400000000000004', dateFrom: '12/29', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //ABBANK
    { cardNumber: '9704250000000001', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //BACABANK
    { cardNumber: '9704090000000001', dateFrom: '01/13', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //NAMABANK
    { cardNumber: '9704280000000008', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //NCB
    { cardNumber: '9704190000000009', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //MBV (OceanBank)
    { cardNumber: '9704140000000004', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //PVCOMBANK
    { cardNumber: '9704120000000006', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //SCB
    { cardNumber: '9704290000000007', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //BVBANK
    { cardNumber: '9704540000000005', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //VIETABANK
    { cardNumber: '9704270000000009', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //ACB
    { cardNumber: '9704160000000002', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //SHINHAN BANK
    { cardNumber: '9704240000000002', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //OCB
    { cardNumber: '9704480000000004', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //LPBANK
    { cardNumber: '9704490000000003', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //KIENLONGBANK
    { cardNumber: '9704520000000007', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //PGBANK
    { cardNumber: '9704300000000004', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //WOORI BANK
    { cardNumber: '9704570000000002', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //BAOVIET BANK
    { cardNumber: '9704380000000006', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //IVB (INDOVINA)
    { cardNumber: '9704340000000018', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //OUB (UOB)
    { cardNumber: '9704580000000001', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //VRB
    { cardNumber: '9704210000000005', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //GPBANK
    { cardNumber: '9704080000000002', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //PUBLIC BANK
    { cardNumber: '9704390000000005', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //VIETBANK
    { cardNumber: '9704330000000001', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //K HANA BANK
    { cardNumber: '9704660000000001', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },

    //MIRAE ASSET
    { cardNumber: '9704680000000801', dateFrom: '12/23', cardName: 'NGUYEN VAN A', inputOTP: '123456' },
]