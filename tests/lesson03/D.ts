
// PHẦN D – Array

// ---------- Bài D1. Mảng mã giao dịch ----------
const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];
 
console.log("=== Bài D1 ===");
console.log("Phần tử đầu tiên:", transactionIds[0]);      
console.log("Phần tử thứ hai:", transactionIds[1]);       
console.log("Tổng số phần tử:", transactionIds.length);  
 
// ---------- Bài D2. Thêm phần tử ----------
transactionIds.push("TXN004"); 
 
console.log("\n=== Bài D2 ===");
console.log("Toàn bộ mảng:", transactionIds);
console.log("Số lượng phần tử:", transactionIds.length);  
 
// ---------- Bài D3. Bẫy index ----------

console.log("\n=== Bài D3 ===");
console.log("transactionIds[4]:", transactionIds[4]); 
 
export {};