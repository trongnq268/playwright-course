import { test } from "@playwright/test";
import {
    PaymentData,
    calculateTotalAmount,
    PayGateConnector,
} from "../helpers/paymentHelper";

test("Payment Helper Demo", async () => {
    // Danh sách giao dịch
    const payments: PaymentData[] = [
        {
            transactionId: "TXN001",
            amount: 100000,
            status: "SUCCESS",
        },
        {
            transactionId: "TXN002",
            amount: 200000,
            status: "SUCCESS",
            fee: 5000,
        },
    ];

    // Tính tổng tiền
    const total = calculateTotalAmount(payments);
    console.log("Tổng tiền phải thanh toán:", total);

    // Khởi tạo connector
    const connector = new PayGateConnector();

    // ==========================
    // Gọi API thành công
    // ==========================
    const transaction = await connector.fetchTransaction("TXN100");

    console.log("Thông tin giao dịch:");
    console.log(transaction);

    // Nếu quên await:
    // const transaction = connector.fetchTransaction("TXN100");
    // transaction sẽ là Promise<PaymentData>
    // Không thể truy cập transaction.status hoặc transaction.amount

    // ==========================
    // Gọi API lỗi
    // ==========================
    try {
        const errorTransaction = await connector.fetchTransaction("ERR_404");
        console.log(errorTransaction);
    } catch (error) {
        console.log((error as Error).message);
    }
});