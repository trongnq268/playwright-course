// ========== BÀI 6: Tổ chức project bằng Import / Export ==========
// Không hard-code "SUCCESS" | "FAILED" | "PENDING" — bắt buộc import từ constant.ts

import { payments } from "../data/paymentData.js";
import { SUCCESS, FAILED, PENDING } from "../config/constant.js";

console.log("========== BÀI 6: DEMO IMPORT / EXPORT ==========");
console.log("Đã import payments từ data/paymentData.ts");
console.log("Đã import hằng số từ config/constant.ts");
console.log("");

let total = 0;
let successCount = 0;
let failedCount = 0;
let pendingCount = 0;

for (const payment of payments) {
  total = total + 1;

  if (payment.status === SUCCESS) {
    successCount = successCount + 1;
  } else if (payment.status === FAILED) {
    failedCount = failedCount + 1;
  } else if (payment.status === PENDING) {
    pendingCount = pendingCount + 1;
  }
}

console.log("Total Transaction :", total);
console.log(SUCCESS, ":", successCount);
console.log(FAILED, ":", failedCount);
console.log(PENDING, ":", pendingCount);
console.log("===============================================");
