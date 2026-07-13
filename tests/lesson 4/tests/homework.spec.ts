import { test } from '@playwright/test';
import { payments } from '../data/paymentData';

test('Lesson 4 - Homework', async () => {

  // ==================================================
  // BÀI 1: THỐNG KÊ GIAO DỊCH
  // ==================================================

  console.log("\n========== BÀI 1 ==========");

  // Tạo các biến đếm, ban đầu đều bằng 0
  let success = 0;
  let failed = 0;
  let pending = 0;

  // Tạo biến để cộng tổng tiền
  let totalSuccessAmount = 0;
  let totalFailedAmount = 0;

  // Duyệt lần lượt từng giao dịch trong payments
  for (const payment of payments) {

    // Nếu giao dịch SUCCESS
    // tăng biến success lên 1
    // và cộng amount vào tổng tiền SUCCESS

    if (payment.status === "SUCCESS") {
      success++;
      totalSuccessAmount += payment.amount;

    // Nếu không phải SUCCESS thì kiểm tra FAILED

    } else if (payment.status === "FAILED") {
      failed++;
      totalFailedAmount += payment.amount;

    // Trường hợp còn lại là PENDING

    } else {
      pending++;
    }
  }

  console.log("========== PAYMENT REPORT ==========");

  // payments.length là tổng số phần tử trong mảng
  console.log("Total Transaction :", payments.length);

  console.log("SUCCESS :", success);
  console.log("FAILED :", failed);
  console.log("PENDING :", pending);

  console.log("Total Success Amount :", totalSuccessAmount);
  console.log("Total Failed Amount :", totalFailedAmount);

  // =====================================================
// BÀI 2: PHÂN LOẠI GIÁ TRỊ GIAO DỊCH
// =====================================================

console.log("\n========== BÀI 2: PHÂN LOẠI GIÁ TRỊ GIAO DỊCH ==========");

// Duyệt toàn bộ giao dịch trong danh sách payments
for (const payment of payments) {

  // Chỉ giao dịch SUCCESS mới được phân loại theo amount
  if (payment.status === "SUCCESS") {

    // amount < 500.000 => SMALL
    if (payment.amount < 500000) {
      console.log(`Transaction ID: ${payment.transactionId} | Amount: ${payment.amount} | Loại giao dịch: SMALL`);

    // amount từ 500.000 đến dưới 2.000.000 => MEDIUM
    } else if (
      payment.amount >= 500000 &&
      payment.amount < 2000000
    ) {
      console.log(`Transaction ID: ${payment.transactionId} | Amount: ${payment.amount} | Loại giao dịch: MEDIUM`);

    // amount từ 2.000.000 trở lên => LARGE
    } else {
      console.log(`Transaction ID: ${payment.transactionId} | Amount: ${payment.amount} | Loại giao dịch: LARGE`);
    }

  // FAILED hoặc PENDING không được phân loại theo amount
  } else {
    console.log(`Transaction ID: ${payment.transactionId} | Status: ${payment.status} | Kết quả: INVALID STATUS` );
  }
}
// =====================================================
// BÀI 3: TÌM GIAO DỊCH CÓ SỐ TIỀN LỚN NHẤT
// =====================================================

console.log("\n========== BÀI 3 ==========");

// Ban đầu lấy giao dịch đầu tiên làm giao dịch lớn nhất
let paymentMax = payments[0];

// Duyệt từng giao dịch
for (const payment of payments) {

  // Nếu amount hiện tại lớn hơn amount đang lưu
  // thì cập nhật lại paymentMax

  if (payment.amount > paymentMax.amount) {
    paymentMax = payment;
  }
}

console.log(`Giao dịch có số tiền lớn nhất: Transaction ID: ${paymentMax.transactionId}, Customer: ${paymentMax.customer}, Amount: ${paymentMax.amount}`);

// =====================================================
// BÀI 4: BÁO CÁO THEO PHƯƠNG THỨC THANH TOÁN
// =====================================================

console.log("\n========== BÀI 4: BÁO CÁO THEO PHƯƠNG THỨC THANH TOÁN ==========");

// Tạo biến đếm trạng thái cho VISA
let visaSuccess = 0;
let visaFailed = 0;
let visaPending = 0;

// Tạo biến đếm trạng thái cho MASTER
let masterSuccess = 0;
let masterFailed = 0;
let masterPending = 0;

// Tạo biến đếm trạng thái cho QR
let qrSuccess = 0;
let qrFailed = 0;
let qrPending = 0;


// Duyệt toàn bộ danh sách giao dịch
for (const payment of payments) {

  // Nếu phương thức thanh toán là VISA
  if (payment.paymentMethod === "VISA") {

    if (payment.status === "SUCCESS") {
      visaSuccess++;

    } else if (payment.status === "FAILED") {
      visaFailed++;

    } else {
      visaPending++;
    }


  // Nếu phương thức thanh toán là MASTER
  } else if (payment.paymentMethod === "MASTER") {

    if (payment.status === "SUCCESS") {
      masterSuccess++;

    } else if (payment.status === "FAILED") {
      masterFailed++;

    } else {
      masterPending++;
    }


  // Trường hợp còn lại là QR
  } else {

    if (payment.status === "SUCCESS") {
      qrSuccess++;

    } else if (payment.status === "FAILED") {
      qrFailed++;

    } else {
      qrPending++;
    }
  }
}

// IN KẾT QUẢ VISA

console.log("\n========== VISA ==========");
console.log("SUCCESS :", visaSuccess);
console.log("FAILED  :", visaFailed);
console.log("PENDING :", visaPending);

// IN KẾT QUẢ MASTER

console.log("\n========== MASTER ==========");
console.log("SUCCESS :", masterSuccess);
console.log("FAILED  :", masterFailed);
console.log("PENDING :", masterPending);

// IN KẾT QUẢ QR

console.log("\n========== QR ==========");
console.log("SUCCESS :", qrSuccess);
console.log("FAILED  :", qrFailed);
console.log("PENDING :", qrPending);

// =====================================================
// BÀI 5: FILTER GIAO DỊCH SUCCESS
// =====================================================

console.log("\n========== BÀI 5 ==========");

// filter dùng để lọc những giao dịch có status SUCCESS
// Kết quả trả về một mảng mới

const paymentSuccess = payments.filter(
  payment => payment.status === "SUCCESS"
);

console.log("Danh sách giao dịch SUCCESS:");
console.log(paymentSuccess);

// =====================================================
// BÀI 6: MAP LẤY TRANSACTION ID
// =====================================================

console.log("\n========== BÀI 6 ==========");

// map duyệt từng giao dịch
// và lấy transactionId của từng giao dịch
// Kết quả trả về một mảng mới chứa transactionId

const transactionIds = payments.map(
  payment => payment.transactionId
);

console.log("Danh sách Transaction ID:");
console.log(transactionIds);


// =====================================================
// BÀI 7: FILTER + MAP
// =====================================================

console.log("\n========== BÀI 7 ==========");

// Bước 1:
// filter lọc các giao dịch SUCCESS

// Bước 2:
// map lấy customer của các giao dịch vừa lọc

const successCustomers = payments
  .filter(payment => payment.status === "SUCCESS")
  .map(payment => payment.customer);

console.log("Khách hàng có giao dịch SUCCESS:", successCustomers);

// =====================================================
// BÀI 8: TẠO DANH SÁCH GIAO DỊCH MỚI
// =====================================================

console.log("\n========== BÀI 8 ==========");

// map dùng để tạo ra một mảng mới
// Mỗi giao dịch mới chỉ lấy: transactionId; customer; amount; status

const paymentReports = payments.map(
  payment => ({
    transactionId: payment.transactionId,
    customer: payment.customer,
    amount: payment.amount,
    status: payment.status
  })
);

console.log("Danh sách Payment Report:");
console.log(paymentReports);
});