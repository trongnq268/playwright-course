// ========== BÀI 5: Mô phỏng hệ thống Automation Test ==========
// SUCCESS -> PASS | FAILED -> FAIL | PENDING -> SKIP

import { payments } from "../data/paymentData.js";
import { SUCCESS, FAILED, PENDING } from "../config/constant.js";

let passCount = 0;
let failCount = 0;
let skipCount = 0;

for (const payment of payments) {
  if (payment.status === SUCCESS) {
    console.log(payment.transactionId, "->", "PASS");
    passCount = passCount + 1;
  } else if (payment.status === FAILED) {
    console.log(payment.transactionId, "->", "FAIL");
    failCount = failCount + 1;
  } else if (payment.status === PENDING) {
    console.log(payment.transactionId, "->", "SKIP");
    skipCount = skipCount + 1;
  }
}

console.log("========== TEST SUMMARY ==========");
console.log("PASS :", passCount);
console.log("FAIL :", failCount);
console.log("SKIP :", skipCount);

if (failCount === 0) {
  console.log("TEST RESULT : PASSED");
} else {
  console.log("TEST RESULT : FAILED");
}
