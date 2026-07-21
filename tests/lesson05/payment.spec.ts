import { test } from "@playwright/test";
import {
  PaymentData,
  calculateTotalAmount,
  PayGateConnector,
} from "../helpers/paymentHelper";

test("Kiểm thử PayGate Connector", async () => {
  // Khởi tạo instance
  const connector = new PayGateConnector();

  // =============================
  // 1. Lấy dữ liệu với ID hợp lệ
  // =============================
  try {
    const transaction: PaymentData = await connector.fetchTransaction(
      "TXN_001"
    );

    console.log("Transaction Success:");
    console.log(transaction);
  } catch (error) {
    console.error((error as Error).message);
  }

  // ==========================================
  // 2. Kiểm tra hàm calculateTotalAmount()
  // ==========================================
  const transactions: PaymentData[] = [
    {
      transactionId: "TX001",
      amount: 100000,
      status: "SUCCESS",
      fee: 5000,
    },
    {
      transactionId: "TX002",
      amount: 200000,
      status: "SUCCESS",
    },
  ];

  const totalAmount = calculateTotalAmount(transactions);

  console.log("Total Amount:", totalAmount);

  // ==========================================
  // 3. Kiểm tra trường hợp trả về lỗi
  // ==========================================
  try {
    const transaction = await connector.fetchTransaction("ERR_404");

    console.log(transaction);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
});
