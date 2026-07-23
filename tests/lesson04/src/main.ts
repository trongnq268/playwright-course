import { payments, PaymentData } from "./data/paymentData";
import { SUCCESS, FAILED, PENDING } from "./config/constant";

// Bài 6: Tổ chức project bằng Import / Export
let successCount_1 = 0;
let failedCount_1 = 0;
let pendingCount_1 = 0;

for (const payment of payments) {
  if (payment.status === SUCCESS) {
    successCount_1++;
  } else if (payment.status === FAILED) {
    failedCount_1++;
  } else if (payment.status === PENDING) {
    pendingCount_1++;
  }
}

console.log("========== PAYMENT REPORT ==========");
console.log("SUCCESS :", successCount_1);
console.log("FAILED  :", failedCount_1);
console.log("PENDING :", pendingCount_1);
console.log("====================================");

//==========================================================================================
//Bài 8: Dashboard tổng hợp

let totalTransactions = 0;
let successCount = 0;
let failedCount = 0;
let pendingCount = 0;
let totalSuccessAmount = 0;
let totalFailedAmount = 0;

// thống kê theo phương thức
let visaSuccess = 0, visaFailed = 0, visaPending = 0;
let masterSuccess = 0, masterFailed = 0, masterPending = 0;
let qrSuccess = 0, qrFailed = 0, qrPending = 0;

// thống kê đặc biệt
let suspiciousCount = 0; // amount > 2000000 && currency === "USD"
let largeCount = 0;      // amount > 1000000
let smallCount = 0;      // amount < 500000

for (const payment of payments) {
  totalTransactions++;

  if (payment.status === SUCCESS) {
    successCount++;
    totalSuccessAmount += payment.amount;
  } else if (payment.status === FAILED) {
    failedCount++;
    totalFailedAmount += payment.amount;
  } else if (payment.status === PENDING) {
    pendingCount++;
  }

  // theo phương thức
  if (payment.paymentMethod === "VISA") {
    if (payment.status === SUCCESS) visaSuccess++;
    else if (payment.status === FAILED) visaFailed++;
    else if (payment.status === PENDING) visaPending++;
  } else if (payment.paymentMethod === "MASTER") {
    if (payment.status === SUCCESS) masterSuccess++;
    else if (payment.status === FAILED) masterFailed++;
    else if (payment.status === PENDING) masterPending++;
  } else if (payment.paymentMethod === "QR") {
    if (payment.status === SUCCESS) qrSuccess++;
    else if (payment.status === FAILED) qrFailed++;
    else if (payment.status === PENDING) qrPending++;
  }

  // suspicious
  if (payment.amount > 2000000 && payment.currency === "USD") {
    suspiciousCount++;
  }

  // large / small
  if (payment.amount > 1000000) {
    largeCount++;
  } else if (payment.amount < 500000) {
    smallCount++;
  }
}

console.log("===========================");
console.log("PAYMENT DASHBOARD");
console.log("===========================");
console.log("Total Transaction :", totalTransactions);
console.log("SUCCESS :", successCount);
console.log("FAILED  :", failedCount);
console.log("PENDING :", pendingCount);
console.log("Total SUCCESS Amount :", totalSuccessAmount);
console.log("Total FAILED Amount  :", totalFailedAmount);
console.log("VISA -> SUCCESS:", visaSuccess, "FAILED:", visaFailed, "PENDING:", visaPending);
console.log("MASTER -> SUCCESS:", masterSuccess, "FAILED:", masterFailed, "PENDING:", masterPending);
console.log("QR -> SUCCESS:", qrSuccess, "FAILED:", qrFailed, "PENDING:", qrPending);
console.log("Suspicious Transaction :", suspiciousCount);
console.log("Large Transaction :", largeCount);
console.log("Small Transaction :", smallCount);
console.log("===========================");

//Bonus Chanllenge
// Functional Dashboard (filter/map version)
// Tổng số giao dịch
const totalTransactionsFilter = payments.length;

// Đếm theo trạng thái
const successCountFilter = payments.filter(p => p.status === SUCCESS).length;
const failedCountFilter = payments.filter(p => p.status === FAILED).length;
const pendingCountFilter = payments.filter(p => p.status === PENDING).length;

// Tổng số tiền theo trạng thái
const totalSuccessAmountFilter = payments
  .filter(p => p.status === SUCCESS)
  .map(p => p.amount)
  .reduce((sum, amt) => sum + amt, 0);

const totalFailedAmountFilter = payments
  .filter(p => p.status === FAILED)
  .map(p => p.amount)
  .reduce((sum, amt) => sum + amt, 0);

// Suspicious Transaction
const suspiciousCountFilter = payments.filter(p => p.amount > 2000000 && p.currency === "USD").length;

// Large / Small
const largeCountFilter = payments.filter(p => p.amount > 1000000).length;
const smallCountFilter = payments.filter(p => p.amount < 500000).length;

console.log("===========================");
console.log("PAYMENT DASHBOARD (filter/map)");
console.log("===========================");
console.log("Total Transaction :", totalTransactionsFilter);
console.log("SUCCESS :", successCountFilter);
console.log("FAILED  :", failedCountFilter);
console.log("PENDING :", pendingCountFilter);
console.log("Total SUCCESS Amount :", totalSuccessAmountFilter);
console.log("Total FAILED Amount  :", totalFailedAmountFilter);
console.log("Suspicious Transaction :", suspiciousCountFilter);
console.log("Large Transaction :", largeCountFilter);
console.log("Small Transaction :", smallCountFilter);
console.log("===========================");