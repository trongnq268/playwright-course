// ========== BÀI 3: Phát hiện giao dịch đáng ngờ ==========
// Suspicious khi: amount > 2000000 AND currency = USD AND status = SUCCESS

import { payments } from "../data/paymentData.js";
import { SUCCESS } from "../config/constant.js";

let totalSuspicious = 0;

for (const payment of payments) {
  if (
    payment.amount > 2000000 &&
    payment.currency === "USD" &&
    payment.status === SUCCESS
  ) {
    totalSuspicious = totalSuspicious + 1;
    console.log("⚠ Suspicious Transaction");
    console.log("ID :", payment.transactionId);
    console.log("Customer :", payment.customer);
    console.log("Amount :", payment.amount, payment.currency);
    console.log("");
  }
}

console.log("Total Suspicious Transaction :", totalSuspicious);
