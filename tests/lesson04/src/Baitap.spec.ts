import { payments, PaymentData } from "./data/paymentData";
import { test, expect } from '@playwright/test';

//=====================================================================

test('BAI 1: BAO CAO THONG KE GIAO DICH', async () => {
  
let totalTransactions = 0;
let successCount = 0;
let failedCount = 0;
let pendingCount = 0;
let totalSuccessAmount = 0;
let totalFailedAmount = 0;

for (const payment of payments) {
  totalTransactions++;

  if (payment.status === "SUCCESS") {
    successCount++;
    totalSuccessAmount += payment.amount;
  } else if (payment.status === "FAILED") {
    failedCount++;
    totalFailedAmount += payment.amount;
  } else if (payment.status === "PENDING") {
    pendingCount++;
  }
}

console.log("========== PAYMENT REPORT ===========");
console.log("Total Transaction :", totalTransactions);
console.log("");
console.log("SUCCESS :", successCount);
console.log("FAILED  :", failedCount);
console.log("PENDING :", pendingCount);
console.log("");
console.log("Total Success Amount :", totalSuccessAmount);
console.log("Total Failed Amount  :", totalFailedAmount);
console.log("=====================================");

});

//=====================================================================

test('BAI 2: PHAN LOAI GIA TRI GIAO DICH', async () => {

for (const payment of payments) {
  if (payment.status === "SUCCESS") {
    let type: string;

    if (payment.amount < 500000) {
      type = "SMALL";
    } else if (payment.amount >= 500000 && payment.amount < 2000000) {
      type = "MEDIUM";
    } else {
      type = "LARGE";
    }

    console.log(`${payment.transactionId} -> ${type}`);
  } else {
    console.log(`${payment.transactionId} -> INVALID STATUS`);
  }
}

});

//=====================================================================

test('BAI 3: PHAT HIEN GIAO DICH DANG NGO', async () => {

let suspiciousCount = 0;

for (const payment of payments) {
  if (
    payment.amount > 2000000 &&
    payment.currency === "USD" &&
    payment.status === "SUCCESS"
  ) {
    suspiciousCount++;
    console.log("⚠️ Suspicious Transaction");
    console.log("ID :", payment.transactionId);
    console.log("Customer :", payment.customer);
    console.log("Amount :", payment.amount, payment.currency);
    console.log("");
  }
}

console.log("Total Suspicious Transaction :", suspiciousCount);

});

//=====================================================================

test('BAI 4: BAO CAO THEO PHUONG THUC THANH TOAN', async () => {

// Khởi tạo biến đếm cho VISA
let visaSuccess = 0;
let visaFailed = 0;
let visaPending = 0;

// Khởi tạo biến đếm cho MASTER
let masterSuccess = 0;
let masterFailed = 0;
let masterPending = 0;

// Khởi tạo biến đếm cho QR
let qrSuccess = 0;
let qrFailed = 0;
let qrPending = 0;

for (const payment of payments) {
  if (payment.paymentMethod === "VISA") {
    if (payment.status === "SUCCESS") {
      visaSuccess++;
    } else if (payment.status === "FAILED") {
      visaFailed++;
    } else if (payment.status === "PENDING") {
      visaPending++;
    }
  } else if (payment.paymentMethod === "MASTER") {
    if (payment.status === "SUCCESS") {
      masterSuccess++;
    } else if (payment.status === "FAILED") {
      masterFailed++;
    } else if (payment.status === "PENDING") {
      masterPending++;
    }
  } else if (payment.paymentMethod === "QR") {
    if (payment.status === "SUCCESS") {
      qrSuccess++;
    } else if (payment.status === "FAILED") {
      qrFailed++;
    } else if (payment.status === "PENDING") {
      qrPending++;
    }
  }
}

console.log("========== VISA ==========");
console.log("SUCCESS :", visaSuccess);
console.log("FAILED  :", visaFailed);
console.log("PENDING :", visaPending);

console.log("\n========== MASTER ==========");
console.log("SUCCESS :", masterSuccess);
console.log("FAILED  :", masterFailed);
console.log("PENDING :", masterPending);

console.log("\n========== QR ==========");
console.log("SUCCESS :", qrSuccess);
console.log("FAILED  :", qrFailed);
console.log("PENDING :", qrPending);

});

//=====================================================================

test('BAI 5: MO PHONG HE THONG AUTOMATION TEST', async () => {

let passCount = 0;
let failCount = 0;
let skipCount = 0;

for (const payment of payments) {
  if (payment.status === "SUCCESS") {
    console.log(`${payment.transactionId} -> PASS`);
    passCount++;
  } else if (payment.status === "FAILED") {
    console.log(`${payment.transactionId} -> FAIL`);
    failCount++;
  } else if (payment.status === "PENDING") {
    console.log(`${payment.transactionId} -> SKIP`);
    skipCount++;
  }
}

console.log("\n========= TEST SUMMARY =========");
console.log("PASS :", passCount);
console.log("FAIL :", failCount);
console.log("SKIP :", skipCount);

if (failCount === 0) {
  console.log("TEST RESULT : PASSED");
} else {
  console.log("TEST RESULT : FAILED");
}

});

//=====================================================================

test('BAI 7: KIEM TRA DU LIEU DAU VAO', async () => {

for (const payment of payments) {
  const reasons: string[] = [];

  if (payment.amount <= 0) {
    reasons.push("Amount <= 0");
  }
  if (!payment.transactionId) {
    reasons.push("Empty TransactionId");
  }
  if (!payment.customer) {
    reasons.push("Empty Customer");
  }

  if (reasons.length > 0) {
    console.log("Invalid Data");
    console.log("Transaction :", payment.transactionId || "UNKNOWN");
    console.log("Reason");
    for (const reason of reasons) {
      console.log("-", reason);
    }
  } else {
    console.log(`${payment.transactionId} -> VALID`);
  }
}

});