import { test } from '@playwright/test';

test('Homework - Lesson 3 Object, Type & Array', async () => {

  // PHẦN A - OBJECT

  console.log("\n========== BÀI A1 ==========");

  const payment = {
    transactionId: "TXN100",
    amount: 250000,
    currency: "VND",
    status: "SUCCESS"
  };

    console.log("Mã GD:", payment.transactionId);
    console.log("Số tiền:", payment.amount);

  console.log("\n========== BÀI A2 ==========");

  const user = {
    username: "an.nguyen",
    balance: 500000,
    isActive: true
  };

  console.log("Username:", user.username);
  console.log("Balance:", user.balance);
  console.log("Active:", user.isActive);

  console.log("\n========== BÀI A3 ==========");

  payment.status = "FAILED";

  console.log("Status new update:", payment.status);

  // PHẦN B - TYPE / INTERFACE

  console.log("\n========== BÀI B1 ==========");

  type PaymentData = {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
    email?: string;
  };

  const payment1: PaymentData = {
    transactionId: "TXN101",
    amount: 300000,
    currency: "VND",
    status: "SUCCESS"
  };

  console.log(payment1.transactionId);
  console.log(payment1.amount);

  console.log("\n========== BÀI B2 ==========");

  console.log("Lỗi: thiếu thuộc tính status.");
  console.log("VSCode báo: Property 'status' is missing.");

  const payment2: PaymentData = {
    transactionId: "TXN200",
    amount: 300000,
    currency: "VND",
    status: "SUCCESS"
  };

  console.log(payment2);

  console.log("\n========== BÀI B3 ==========");

  interface PaymentInterface {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
  }

  const payment3: PaymentInterface = {
    transactionId: "TXN300",
    amount: 450000,
    currency: "USD",
    status: "PENDING"
  };

  console.log(payment3.status);

  // PHẦN C - OPTIONAL PROPERTY

  console.log("\n========== BÀI C1 ==========");

  const paymentWithEmail: PaymentData = {
    transactionId: "TXN400",
    amount: 150000,
    currency: "VND",
    status: "SUCCESS",
    email: "user@gmail.com"
  };

  const paymentNoEmail: PaymentData = {
    transactionId: "TXN401",
    amount: 180000,
    currency: "VND",
    status: "FAILED"
  };

  console.log(paymentWithEmail);
  console.log(paymentNoEmail);

  console.log("\n========== BÀI C2 ==========");

  console.log("Email:", paymentWithEmail.email);

  console.log(
    paymentNoEmail.transactionId,
    paymentNoEmail.status
  );

  // PHẦN D - ARRAY

  console.log("\n========== BÀI D1 ==========");

  const transactionIds: string[] = [
    "TXN001",
    "TXN002",
    "TXN003"
  ];

  console.log(transactionIds[0]);
  console.log(transactionIds[1]);
  console.log(transactionIds.length);

  console.log("\n========== BÀI D2 ==========");

  transactionIds.push("TXN004");

  console.log(transactionIds);
  console.log(transactionIds.length);

  console.log("\n========== BÀI D3 ==========");

  console.log("Dự đoán: undefined");

  console.log(transactionIds[4]);

  console.log(
    "Giải thích: index bắt đầu từ 0 nên mảng chỉ có index từ 0 -> 3."
  );

  // PHẦN E - ARRAY OF OBJECTS

  console.log("\n========== BÀI E1 ==========");

  const payments: PaymentData[] = [

    {
      transactionId: "TXN001",
      amount: 150000,
      currency: "VND",
      status: "SUCCESS",
      email: "a@gmail.com"
    },

    {
      transactionId: "TXN002",
      amount: 200000,
      currency: "VND",
      status: "FAILED"
    },

    {
      transactionId: "TXN003",
      amount: 99000,
      currency: "VND",
      status: "PENDING",
      email: "b@gmail.com"
    }

  ];

  console.log(payments[1].transactionId);

  console.log(payments[2].status);

  console.log("\n========== BÀI E2 ==========");

  payments.push({

    transactionId: "TXN004",
    amount: 500000,
    currency: "USD",
    status: "SUCCESS"

  });

  console.log("Tổng số giao dịch:", payments.length);

  console.log("\n========== BÀI E3 ==========");

  console.log("Amount:", payments[0].amount);

  console.log("Email:", payments[2].email);

  console.log(
    "Currency:",
    payments[payments.length - 1].currency
  );

  // PHẦN F - TỔNG HỢP

  console.log("\n========== BÀI F1 ==========");

  type OrderData = {

    orderId: string;

    total: number;

    paid: boolean;

    note?: string;

  };

  const orders: OrderData[] = [

    {
      orderId: "ORD001",
      total: 500000,
      paid: true,
      note: "Thanh toán Online"
    },

    {
      orderId: "ORD002",
      total: 800000,
      paid: false
    },

    {
      orderId: "ORD003",
      total: 1200000,
      paid: true,
      note: "COD"
    }

  ];

  orders.push({

    orderId: "ORD004",
    total: 350000,
    paid: false

  });

  console.log("Tổng đơn hàng:", orders.length);

  console.log(
    "Đơn đầu:",
    orders[0].orderId,
    orders[0].total
  );

  console.log(
    "Đơn cuối đã thanh toán:",
    orders[orders.length - 1].paid
  );

});