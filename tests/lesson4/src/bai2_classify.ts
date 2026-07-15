// ========== BÀI 2: Phân loại giá trị giao dịch ==========
// SUCCESS: SMALL / MEDIUM / LARGE | FAILED|PENDING: INVALID STATUS

import { payments } from "../data/paymentData.js";
import { SUCCESS } from "../config/constant.js";

for (const payment of payments) {
  if (payment.status === SUCCESS) {
    if (payment.amount < 500000) {
      console.log(payment.transactionId, "->", "SMALL");
    } else if (payment.amount < 2000000) {
      console.log(payment.transactionId, "->", "MEDIUM");
    } else {
      console.log(payment.transactionId, "->", "LARGE");
    }
  } else {
    // FAILED hoặc PENDING
    console.log(payment.transactionId, "->", "INVALID STATUS");
  }
}
