const payment = {
  transactionId: "TXN100",
  amount: 250000,
  currency: "VND",
  status: "SUCCESS",
};
 
console.log("=== Bài A1 ===");
console.log("Mã giao dịch:", payment.transactionId); 
console.log("Số tiền:", payment.amount);
 
// ---------- Bài A2. Object người dùng ----------
const user = {
  username: "an.nguyen",
  balance: 500000,
  isActive: true,
};
 
console.log("\n=== Bài A2 ===");
console.log("username:", user.username);
console.log("balance:", user.balance);
console.log("isActive:", user.isActive);
 
// ---------- Bài A3. Cập nhật giá trị ----------
payment.status = "FAILED"; 
console.log("\n=== Bài A3 ===");
console.log("status sau khi cập nhật:", payment.status);
 
export {}; 