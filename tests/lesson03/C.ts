
// PHẦN C – Optional Property

type PaymentData = {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  email?: string; 
};
 
// ---------- Bài C1. Thêm trường optional ----------
const paymentWithEmail: PaymentData = {
  transactionId: "TXN401",
  amount: 250000,
  currency: "VND",
  status: "SUCCESS",
  email: "an.nguyen@example.com", 
};
 
const paymentNoEmail: PaymentData = {
  transactionId: "TXN402",
  amount: 99000,
  currency: "VND",
  status: "PENDING",
  
};
 
// ---------- Bài C2. In thông tin ----------
console.log("=== Bài C2 ===");
console.log("Email của paymentWithEmail:", paymentWithEmail.email);
console.log("transactionId của paymentNoEmail:", paymentNoEmail.transactionId);
console.log("status của paymentNoEmail:", paymentNoEmail.status);
 
export {};
 



