import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    const nhanVien: string[] = ["Hoidt1", "Hoidt2", "Hoidt3"];

    // for (let i = 0; i < nhanVien.length; i++) {
    //     console.log(nhanVien[i])
    // }

    // for (const nv of nhanVien) {
    //     console.log(nv)
    // }

    type PaymentData = {
        transactionId: string; amount: number;
        currency: string; status: string;
        email?: string;
    };

    const payments: PaymentData[] = [
        { transactionId: "TXN001", amount: 150000, currency: "VND", status: "SUCCESS", email: "test1@gmail.com" },
        { transactionId: "TXN002", amount: 200000, currency: "VND", status: "FAILED", email: "test2@gmail.com" },
        { transactionId: "TXN003", amount: 99000, currency: "VND", status: "PENDING", email: "test3@gmail.com" },
    ];


    // for (const payment of payments) {
    //     if (payment.status === 'PENDING') {
    //         console.log(payment);
    //     }
    //     // console.log(payment)
    // }


    // Filter để lọc dữ liệu, chỉ lấy những giá trị thỏa mãn để gán
    // const paymentSucess: PaymentData[] = payments.filter(p => p.status === 'FAILED');
    // console.log(paymentSucess);

    // Map để biến đổi dữ liệu, trả về 1 array mới với giá trị đã thay đổi
    const newPayment: number[] = payments.map((p: PaymentData) => p.amount * 2);
    console.log(newPayment);



});