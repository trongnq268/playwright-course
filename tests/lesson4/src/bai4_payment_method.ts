// ========== BÀI 4: Báo cáo theo phương thức thanh toán ==========
// Chỉ dùng biến đếm, không dùng Object để thống kê

import { payments } from "../data/paymentData.js";
import { SUCCESS, FAILED, PENDING } from "../config/constant.js";

let visaSuccess = 0;
let visaFailed = 0;
let visaPending = 0;

let masterSuccess = 0;
let masterFailed = 0;
let masterPending = 0;

let qrSuccess = 0;
let qrFailed = 0;
let qrPending = 0;

for (const payment of payments) {
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

console.log("========== VISA ==========");
console.log("SUCCESS :", visaSuccess);
console.log("FAILED  :", visaFailed);
console.log("PENDING :", visaPending);

console.log("========== MASTER ==========");
console.log("SUCCESS :", masterSuccess);
console.log("FAILED  :", masterFailed);
console.log("PENDING :", masterPending);

console.log("========== QR ==========");
console.log("SUCCESS :", qrSuccess);
console.log("FAILED  :", qrFailed);
console.log("PENDING :", qrPending);
