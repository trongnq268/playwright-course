// tests/payment.spec.ts
import { test, expect } from "@playwright/test";

Yêu cầu 2.1: Import các thành phần cần thiết từ helper

import {
  PaymentData,
  calculateTotalAmount,
  PayGateConnector,
} from "./paymentHelper";




test("PayGate - lấy giao dịch hợp lệ và bắt lỗi bất đồng bộ", async ({ page }) => {
  // Yêu cầu 2.2: Khởi tạo instance của class
  const connector = new PayGateConnector();

  
  const validTransaction: PaymentData = await connector.fetchTransaction("TXN_12345");
  console.log("✅ Giao dịch hợp lệ:", validTransaction);
  expect(validTransaction.status).toBe("SUCCESS");

 
  try {
    const failed = await connector.fetchTransaction("ERR_404");
    console.log("Sẽ KHÔNG bao giờ chạy tới đây:", failed);
  } catch (error) {
   
    console.error("❌ Bắt được lỗi:", (error as Error).message);
    expect((error as Error).message).toBe("Transaction not found");
  }

 
  const total = calculateTotalAmount([
    { transactionId: "T1", amount: 100000, status: "SUCCESS", fee: 5000 }, 
    { transactionId: "T2", amount: 200000, status: "SUCCESS" },            
  ]);
  // 105000 + 202200 = 307200
  console.log("💰 Tổng tiền khách phải trả:", total);
  expect(total).toBe(307200);
});
