// ---------- Bài B1. Định nghĩa PaymentData ----------
type PaymentData = {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
};
 

const payment1: PaymentData = {
  transactionId: "TXN101",
  amount: 180000,
  currency: "VND",
  status: "SUCCESS",
};
 
console.log("=== Bài B1 ===");
console.log("transactionId:", payment1.transactionId);
console.log("amount:", payment1.amount);
 
// ---------- Bài B2. Đọc và sửa lỗi ----------

const payment2: PaymentData = {
  transactionId: "TXN200",
  amount: 300000,
  currency: "VND",
  status: "SUCCESS", 
};
 
console.log("\n=== Bài B2 (đã sửa) ===");
console.log("payment2:", payment2);
 
// ---------- Bài B3. Interface thay cho type ----------
interface PaymentDataInterface {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
}
 
const payment3: PaymentDataInterface = {
  transactionId: "TXN300",
  amount: 120000,
  currency: "VND",
  status: "PENDING",
};
 
console.log("\n=== Bài B3 ===");
console.log("status:", payment3.status);
 
export {};
