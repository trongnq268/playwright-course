
// PHẦN E – Array of Objects (Thử thách)

type PaymentData = {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  email?: string; 
};
 
// ---------- Bài E1. Danh sách giao dịch ----------
const payments: PaymentData[] = [
  {
    transactionId: "TXN001",
    amount: 150000,
    currency: "VND",
    status: "SUCCESS",
    email: "user1@example.com", 
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
    email: "user3@example.com", 
  },
];
 
console.log("=== Bài E1 ===");
console.log("transactionId phần tử thứ 2:", payments[1].transactionId); 
console.log("status phần tử thứ 3:", payments[2].status);               
 
// ---------- Bài E2. Thêm giao dịch và đếm ----------
payments.push({
  transactionId: "TXN004",
  amount: 500000,
  currency: "VND",
  status: "SUCCESS",
  email: "user4@example.com",
});
 
console.log("\n=== Bài E2 ===");
console.log("Tổng số giao dịch:", payments.length); // 4
 
// ---------- Bài E3. Truy cập dữ liệu lồng nhau ----------
console.log("\n=== Bài E3 ===");
console.log("amount của giao dịch đầu tiên:", payments[0].amount);              
console.log("email của giao dịch thứ 3:", payments[2].email);                   
console.log("currency của giao dịch cuối cùng:", payments[payments.length - 1].currency); 
 
export {};