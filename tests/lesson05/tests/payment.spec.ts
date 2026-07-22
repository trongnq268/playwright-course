//Yêu cầu 2. tests/payment.spec.ts
    import { test, expect } from "@playwright/test";
    // Import tất cả các thành phần cần thiết
    import {
    PaymentData,
    calculateTotalAmount,
    PayGateConnector,
    } from "../helpers/paymentHelper";

    test("Verify PayGate transaction", async () => {
    const connector = new PayGateConnector();

    // ID hợp lệ
    const transaction = await connector.fetchTransaction("TXN_001");
    console.log(transaction);

    const payments: PaymentData[] = [
        transaction,
        {
        transactionId: "TXN_002",
        amount: 100000,
        status: "SUCCESS",
        fee: 5000,
        },
    ];

    const total = calculateTotalAmount(payments);
    console.log("Total:", total);

    expect(transaction.status).toBe("SUCCESS");

    // ID lỗi
        try {
        await connector.fetchTransaction("ERR_404");
    } catch (error) {
        console.log((error as Error).message);
        expect((error as Error).message).toBe("Transaction not found");
    }
    })

    //?Quên await => transaction sẽ là Promise<PaymentData>, không phải dữ liệu thật.
    //Muốn lấy transaction.amount hoặc transaction.status sẽ bị lỗi TypeScript.
    //try/catch chỉ bắt được lỗi bất đồng bộ khi có await hoặc return Promise.
    //Arrow Function trong class giúp this.gatewayName luôn đúng kể cả khi truyền hàm đi nơi khác.