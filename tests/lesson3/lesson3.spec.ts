import { test } from '@playwright/test';

test('Lesson 3 - Object, Type & Array', async () => {

  // =====================================================
  // 1. OBJECT
  // =====================================================

  console.log("\n========== 1. OBJECT ==========");

  // Object là một nhóm dữ liệu gồm nhiều cặp key : value

  const payment = {
    transactionId: "TXN001",
    amount: 150000,
    currency: "VND",
    status: "SUCCESS"
  };

  console.log(payment);

  // =====================================================
  // 2. TRUY CẬP THUỘC TÍNH
  // =====================================================

  console.log("\n========== 2. TRUY CẬP THUỘC TÍNH ==========");

  // Dùng dấu chấm (.) để lấy giá trị

  console.log(payment.transactionId);
  console.log(payment.amount);
  console.log(payment.status);

  if (payment.status === "SUCCESS") {
    console.log("=> Giao dịch thành công");
  }

  // =====================================================
  // 3. TYPE & INTERFACE
  // =====================================================

  console.log("\n========== 3. TYPE & INTERFACE ==========");

  // type dùng để định nghĩa cấu trúc dữ liệu

  type PaymentType = {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
  };

  const paymentByType: PaymentType = {
    transactionId: "TXN002",
    amount: 200000,
    currency: "VND",
    status: "FAILED"
  };

  console.log("Object tạo từ type:");
  console.log(paymentByType);

  // interface cũng định nghĩa cấu trúc Object giống type

  interface PaymentInterface {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
  }

  const paymentByInterface: PaymentInterface = {
    transactionId: "TXN003",
    amount: 300000,
    currency: "USD",
    status: "SUCCESS"
  };

  console.log("\nObject tạo từ interface:");
  console.log(paymentByInterface);

  // So sánh

  console.log("\nSo sánh");
  console.log("type   -> dùng cho Object, Primitive, Array, Union...");
  console.log("interface -> chủ yếu dùng để định nghĩa Object.");

  // Khác biệt lớn nhất

  interface Employee {
    id: number;
  }

  interface Employee {
    name: string;
  }

  const employee: Employee = {
    id: 1,
    name: "Huong"
  };

  console.log("\nInterface Declaration Merging:");
  console.log(employee);


  /*
    interface có thể khai báo nhiều lần.

    interface Employee {
        id: number;
    }

    interface Employee {
        name: string;
    }

    => Employee sẽ có cả id và name.

    Nếu dùng type sẽ báo lỗi:

    type Employee = { id: number }

    type Employee = { name: string }

    => Duplicate identifier 'Employee'
  */

  // =====================================================
  // 4. OPTIONAL PROPERTY
  // =====================================================

  console.log("\n========== 4. OPTIONAL PROPERTY ==========");

  // Dấu ? nghĩa là thuộc tính không bắt buộc

  type Customer = {
    name: string;
    phone: string;
    email?: string;
  };

  const customer1: Customer = {
    name: "Huong",
    phone: "0987654321",
    email: "huong@gmail.com"
  };

  const customer2: Customer = {
    name: "Lan",
    phone: "0912345678"
  };

  console.log(customer1);
  console.log(customer2);

  // =====================================================
  // 5. ARRAY
  // =====================================================

  console.log("\n========== 5. ARRAY ==========");

  // Array là danh sách nhiều phần tử cùng kiểu

  const transactionIds: string[] = [
    "TXN001",
    "TXN002",
    "TXN003"
  ];

  console.log("Phần tử đầu:", transactionIds[0]);
  console.log("Số phần tử:", transactionIds.length);

  // push() thêm phần tử vào cuối mảng

  transactionIds.push("TXN004");

  console.log(transactionIds);

  // =====================================================
  // 6. ARRAY OF OBJECTS
  // =====================================================

  console.log("\n========== 6. ARRAY OF OBJECTS ==========");

  // Mỗi phần tử của mảng là một Object

  const payments: PaymentType[] = [
    {
      transactionId: "TXN001",
      amount: 100000,
      currency: "VND",
      status: "SUCCESS"
    },
    {
      transactionId: "TXN002",
      amount: 200000,
      currency: "VND",
      status: "FAILED"
    }
  ];

  console.log(payments);

  // Lấy trạng thái của giao dịch thứ 2

  console.log(payments[1].status);

  // =====================================================
  // 7. PUSH OBJECT
  // =====================================================

  console.log("\n========== 7. PUSH OBJECT ==========");

  // Thêm Object mới vào mảng

  payments.push({
    transactionId: "TXN003",
    amount: 300000,
    currency: "VND",
    status: "PENDING"
  });

  console.log(payments);

  // =====================================================
  // 8. FOR...OF
  // =====================================================

  console.log("\n========== 8. FOR...OF ==========");

  // Duyệt từng Object trong mảng

  for (const payment of payments) {
    console.log(payment.transactionId);
  }

  // =====================================================
  // 9. IF + ARRAY OF OBJECTS
  // =====================================================

  console.log("\n========== 9. IF + ARRAY OF OBJECTS ==========");

  // Chỉ in giao dịch SUCCESS

  for (const payment of payments) {

    if (payment.status === "SUCCESS") {
      console.log("Giao dịch thành công:", payment.transactionId);
    }

  }

});