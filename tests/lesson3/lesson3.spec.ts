import { test, expect } from '@playwright/test';
test('Phần A: Object & Truy cập thuộc tính (Cơ bản)', async () => {
  
// ===========================
// Bài A1. Tạo object giao dịch
// ===========================

const payment = {
  transactionId: "TXN100",
  amount: 250000,
  currency: "VND",
  status: "SUCCESS",
};

console.log("\nA1");
console.log(payment.transactionId);
console.log(payment.amount); 

// ===========================
// Bài A2. Object người dùng
// ===========================

const user = {
  username: "an.nguyen",
  balance: 500000,
  isActive: true,
};

console.log("\nA2");
console.log(user.username);
console.log(user.balance);  
console.log(user.isActive);

// ===========================
// Bài A3. Cập nhật giá trị
// ===========================
payment.status = "FAILED";
console.log("\nA3");
console.log(payment.status);
});

test('Phần B: Type / Interface (Vận dụng)', async () => {

// ===========================
// Bài B1. Định nghĩa PaymentData
// ===========================

type PaymentData = {
  transactionId: string;
  amount: number; 
  currency: string;
  status: string;
  email?: string; // Trường email là optional property
};


const payment1: PaymentData = {
  transactionId: "TXN101",
  amount: 100000,
  currency: "VND",
  status: "SUCCESS",
};

console.log("\nB1");
console.log(payment1.transactionId);
console.log(payment1.amount);


// ===========================
// Bài B2. Đọc và sửa lỗi
// ===========================

const payment2: PaymentData = {
  transactionId: "TXN200",
  amount: 300000,
  currency: "VND",
};

// Giải thích lỗi:
// Định nghĩa type paymentData gồm 4 trường transactionId, amount, currency và status nhưng khi khai báo payment2 thì lại thiếu trường status nên TypeScript báo lỗi.
// Sửa lỗi:
// Cách 1: Thêm trường status vào payment2
const payment2Fixed_01: PaymentData = {
  transactionId: "TXN200",
  amount: 300000,
  currency: "VND",
  status: "SUCCESS", // Thêm trường status để sửa lỗi
};

console.log("\nB2");
console.log(payment2Fixed_01);

//Cách 2: Thêm dấu ? vào trường status trong định nghĩa type PaymentData để biến nó thành optional property => Cách này không được khuyến nghị vì sẽ làm mất tính bắt buộc của trường status trong các object PaymentData.
type PaymentData1 = {
  transactionId: string;
  amount: number; 
  currency: string;
  status?: string;
};

const payment2Fixed_02: PaymentData1 = {
  transactionId: "TXN200",
  amount: 300000,
  currency: "VND",
};

console.log("\nB2");
console.log(payment2Fixed_02);

// ===========================
// Bài B3. Interface thay cho type
// ===========================

interface PaymentInfo {
  transactionId: string;
  amount: number; 
  currency: string;
  status: string;
};


const payment3: PaymentInfo = {
  transactionId: "TXN101",
  amount: 100000,
  currency: "VND",
  status: "SUCCESS",
};

console.log("\nB3");
console.log(payment3.status);

});

test('Phần C: Optional Property (Vận dụng)', async () => {

// ===========================
// Bài C1. Thêm trường optional + Bài C2. In thông tin
// ===========================

const paymentWithEmail: PaymentData = {
  transactionId: "TXN400",
  amount: 500000,
  currency: "VND",
  status: "SUCCESS",
  email: "test@onepay.com",
};

const paymentNoEmail: PaymentData = {
  transactionId: "TXN401",
  amount: 200000,
  currency: "VND",
  status: "FAILED",
};

console.log("\nC1 - C2");
console.log(paymentWithEmail.email);
console.log(paymentNoEmail.transactionId);
console.log(paymentNoEmail.status);

});

test('Phần D: Array (Vận dụng)', async () => {

// ===========================
// Bài D1. Mảng mã giao dịch
// ===========================

const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];

console.log("\nD1");
console.log(transactionIds[0]);
console.log(transactionIds[1]);
console.log(transactionIds.length);

// ===========================
// Bài D2. Thêm phần tử
// ===========================

transactionIds.push("TXN004");

console.log("\nD2");
console.log(transactionIds);
console.log(transactionIds.length);

// ===========================
// Bài D3. Bẫy index
// ===========================

// 1. Dự đoán kết quả: undefined
// 2. Giải thích: Mảng có 4 phần tử nên transactionIds[4] là index không hợp lệ, trả về undefined. Phần tử cuối có index là 3 (length - 1).

console.log("\nD3");
console.log("Kết quả:", transactionIds[4]);

});

test('Phần E: Array of Objects (Thử thách)', async () => {

// ===========================
// Bài E1. Danh sách giao dịch
// ===========================

const payments: PaymentData[] = [
  {
    transactionId: "TXN001",
    amount: 150000,
    currency: "VND",
    status: "SUCCESS",
    email: "a@onepay.com",
  },
  {
    transactionId: "TXN002",
    amount: 200000,
    currency: "VND",
    status: "FAILED",
  },
  {
    transactionId: "TXN003",
    amount: 99000,
    currency: "VND",
    status: "PENDING",
    email: "b@onepay.com",
  },
];

console.log("\nE1");
console.log(payments[1].transactionId);
console.log(payments[2].status);

// ===========================
// Bài E2. Thêm giao dịch và đếm
// ===========================

payments.push({
  transactionId: "TXN004",
  amount: 350000,
  currency: "USD",
  status: "WAITING FOR APPROVAL",
  email: "c@onepay.com"
});

console.log("\nE2");
console.log("Số lượng giao dịch:", payments.length);

// ===========================
// Bài E3. Truy cập dữ liệu lồng nhau
// =================

console.log("\nE3");
console.log(payments[0].amount);
console.log(payments[2].email);
console.log(payments[payments.length - 1].currency);

});

test('Phần F: Bài tập tổng hợp (Thử thách, sát công việc QA)', async () => {

// ===========================
// Bài F1. Bộ test data đơn hàng
// =================

// Định nghĩa kiểu dữ liệu
type OrderData = {
  orderId: string;
  total: number;
  paid: boolean;
  note?: string; 
};

//Danh sách đơn hàng
const orders: OrderData[] = [
  {
    orderId: "ORD001",
    total: 150000,
    paid: true,
    note: "Thanh toán online",
  },
  {
    orderId: "ORD002",
    total: 250000,
    paid: true,
  },
  {
    orderId: "ORD003",
    total: 320000,
    paid: false,
    note: "Giao giờ hành chính",
  },
];

// Thêm đơn hàng mới
orders.push({
  orderId: "ORD004",
  total: 500000,
  paid: false,
  note: "COD",
});

// In tổng số đơn hàng
console.log("\nF1");
console.log("Tổng đơn hàng:", orders.length);

// In orderId và total của đơn hàng đầu tiên
console.log(orders[0].orderId);
console.log(orders[0].total);

// In paid của đơn hàng cuối cùng
console.log(orders[orders.length - 1].paid);

});