
// PHẦN F – Bài tập tổng hợp 

 
// ---------- Bài F1. Bộ test data đơn hàng ----------
 
// 1) Định nghĩa type OrderData
type OrderData = {
  orderId: string;
  total: number;
  paid: boolean;
  note?: string; 
};
 
// 2) Mảng orders >= 3 đơn:

const orders: OrderData[] = [
  {
    orderId: "ORD001",
    total: 150000,
    paid: true,
    note: "Giao giờ hành chính",
  },
  {
    orderId: "ORD002",
    total: 320000,
    paid: false, 
    
  },
  {
    orderId: "ORD003",
    total: 89000,
    paid: true,
 
  },
];
 
// 3) Thêm 1 đơn hàng mới
orders.push({
  orderId: "ORD004",
  total: 500000,
  paid: false,
  note: "Khách yêu cầu gọi trước khi giao",
});
 
// 4) Tổng số đơn hàng
console.log("=== Bài F1 ===");
console.log("Tổng số đơn hàng:", orders.length); 
 
// 5) orderId và total của đơn hàng đầu tiên
console.log("Đơn đầu tiên - orderId:", orders[0].orderId); 
console.log("Đơn đầu tiên - total:", orders[0].total);     
 
// 6) paid của đơn hàng cuối cùng
console.log("Đơn cuối cùng - paid:", orders[orders.length - 1].paid); // false
 

console.log("\n--- Các đơn đã thanh toán (paid === true) ---");
for (const order of orders) {
  if (order.paid === true) {
    console.log("Đã thanh toán:", order.orderId);
  }
}
 
export {};