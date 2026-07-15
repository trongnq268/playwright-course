// ========== BÀI 7: Kiểm tra dữ liệu đầu vào ==========
// Invalid nếu: amount <= 0 | transactionId rỗng | customer rỗng

import { payments } from "../data/paymentData.js";

for (const payment of payments) {
  let isInvalid = false;
  let hasAmountError = false;
  let hasIdError = false;
  let hasCustomerError = false;

  if (payment.amount <= 0) {
    isInvalid = true;
    hasAmountError = true;
  }

  if (payment.transactionId === "") {
    isInvalid = true;
    hasIdError = true;
  }

  if (payment.customer === "") {
    isInvalid = true;
    hasCustomerError = true;
  }

  if (isInvalid) {
    console.log("Invalid Data");
    console.log("Transaction :", payment.transactionId);
    console.log("Reason");
    if (hasAmountError) {
      console.log("- Amount <= 0");
    }
    if (hasIdError) {
      console.log("- Empty TransactionId");
    }
    if (hasCustomerError) {
      console.log("- Empty Customer");
    }
  } else {
    console.log(payment.transactionId, "->", "VALID");
  }
}
