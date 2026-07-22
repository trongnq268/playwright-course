// ========== BÀI 8: Dashboard tổng hợp ==========
// Chỉ dùng if / else / for...of / import-export / type
// for...of chỉ xuất hiện 1 lần | không dùng filter/map/reduce/function/any

import { payments } from "../data/paymentData.js";
import { SUCCESS, FAILED, PENDING } from "../config/constant.js";

let totalTransaction = 0;
let countSuccess = 0;
let countFailed = 0;
let countPending = 0;
let totalSuccessAmount = 0;
let totalFailedAmount = 0;

let visaSuccess = 0;
let visaFailed = 0;
let visaPending = 0;

let masterSuccess = 0;
let masterFailed = 0;
let masterPending = 0;

let qrSuccess = 0;
let qrFailed = 0;
let qrPending = 0;

let suspiciousCount = 0;
let largeCount = 0;
let smallCount = 0;

// Duyệt mảng đúng 1 lần duy nhất
for (const payment of payments) {
  totalTransaction = totalTransaction + 1;

  // Thống kê theo status + amount
  if (payment.status === SUCCESS) {
    countSuccess = countSuccess + 1;
    totalSuccessAmount = totalSuccessAmount + payment.amount;

    // Phân loại size cho SUCCESS
    if (payment.amount < 500000) {
      smallCount = smallCount + 1;
    } else if (payment.amount >= 2000000) {
      largeCount = largeCount + 1;
    }

    // Suspicious: amount > 2_000_000 + USD + SUCCESS
    if (payment.amount > 2000000 && payment.currency === "USD") {
      suspiciousCount = suspiciousCount + 1;
    }
  } else if (payment.status === FAILED) {
    countFailed = countFailed + 1;
    totalFailedAmount = totalFailedAmount + payment.amount;
  } else if (payment.status === PENDING) {
    countPending = countPending + 1;
  }

  // Thống kê theo payment method
  if (payment.paymentMethod === "VISA") {
    if (payment.status === SUCCESS) {
      visaSuccess = visaSuccess + 1;
    } else if (payment.status === FAILED) {
      visaFailed = visaFailed + 1;
    } else if (payment.status === PENDING) {
      visaPending = visaPending + 1;
    }
  } else if (payment.paymentMethod === "MASTER") {
    if (payment.status === SUCCESS) {
      masterSuccess = masterSuccess + 1;
    } else if (payment.status === FAILED) {
      masterFailed = masterFailed + 1;
    } else if (payment.status === PENDING) {
      masterPending = masterPending + 1;
    }
  } else if (payment.paymentMethod === "QR") {
    if (payment.status === SUCCESS) {
      qrSuccess = qrSuccess + 1;
    } else if (payment.status === FAILED) {
      qrFailed = qrFailed + 1;
    } else if (payment.status === PENDING) {
      qrPending = qrPending + 1;
    }
  }
}

console.log("=============================");
console.log("PAYMENT DASHBOARD");
console.log("=============================");
console.log("Total Transaction :", totalTransaction);
console.log("SUCCESS :", countSuccess);
console.log("FAILED :", countFailed);
console.log("PENDING :", countPending);
console.log("Total SUCCESS Amount :", totalSuccessAmount);
console.log("Total FAILED Amount :", totalFailedAmount);
console.log("VISA");
console.log("SUCCESS :", visaSuccess);
console.log("FAILED :", visaFailed);
console.log("PENDING :", visaPending);
console.log("MASTER");
console.log("SUCCESS :", masterSuccess);
console.log("FAILED :", masterFailed);
console.log("PENDING :", masterPending);
console.log("QR");
console.log("SUCCESS :", qrSuccess);
console.log("FAILED :", qrFailed);
console.log("PENDING :", qrPending);
console.log("Suspicious Transaction :", suspiciousCount);
console.log("Large Transaction :", largeCount);
console.log("Small Transaction :", smallCount);
console.log("=============================");