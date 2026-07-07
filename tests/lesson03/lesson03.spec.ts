import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    type PaymentData = {
        transactionId: string; amount: number;
        currency: string; status: string; email?: string;
        orderName?: string;
    };

    const payments: PaymentData[] = [
        { transactionId: "TXN001", amount: 150000, currency: "VND", status: "SUCCESS" },
        { transactionId: "TXN002", amount: 200000, currency: "VND", status: "FAILED" },
    ];

    payments.push({
        transactionId: "TXN003", amount: 99000,
        currency: "VND", status: "PENDING", email: "binh@example.com",
    });

    console.log("Tổng số giao dịch:", payments.length);
    for (const p of payments) {
        if (p.status === "SUCCESS") console.log("Thành công:", p.transactionId);
    }




});