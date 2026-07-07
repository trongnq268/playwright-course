import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
//      let firstName = 'Tester';
//      console.log(firstName);
//      firstName = 'QA';
//      console.log(firstName);

//     const url = 'google.com.vn';
//     console.log(url);
//  });




 //Phân biệt interface và type, khi nào dùng cái nào, và liên hệ với công việc QA / Automation Testing
 // Với interface: dùng để định nghĩa cấu trúc của một object, class, hoặc function
 // Với type: dùng để định nghĩa kiểu dữ liệu, có thể là primitive types, union types, intersection types, hoặc tuple types
 // Cả 2 đều định nghĩa shape của object, chúng gần như thay thế được cho nhau.

//  interface User {
//   name: string;
//   age: number;
// }
// const u: User =
//   { name: "An", age: 25 };

//  console.log(u.name);

// type User = {
//   name: string;
//   age: number;
// };
// const u: User =
//   { name: "An", age: 25 };
// console.log(u.name);
//  });


//interface -> extends (kế thừa extends)
// interface User {
//   name: string;
// }

// interface Admin
//   extends User {
//   role: string;
// }

//type -> intersection (&)
// type User = {
//   name: string;
// };

// type Admin = User & {
//   role: string;
// };
//Cả 2 cùng có kết quả giống nhau là Admin có đủ 2 field: name (kế thừa từ User) và role (field riêng)
//interface còn cho phép implements và hợp tác tốt với class, hữu ích khi mô hình hóa Page Object tring Playwwright

//Declaration merging(chỉ interface mới có)
// interface User { name: string; }
// interface User { age: number; }
// const u: User = {
//   name: "An", age: 25 };

//mở rộng API, merging rất mạnh.
//Kết quả: User được gộp, có cả nảm và age

//Union/Tuple/Literal (chỉ type mới có)

// type ID = string | number;
// type Status = "pass" | "fail";
// let id: ID = 7;
// let st: Status = "pass";

//Trạng thái test, union literal là lựa chọn tự nhiên


//Nguyên tắc áp dụng interface và type trong QA/Automation
//interface: dùng cho cấu trúc rõ ràng: API response body, Page Object, Test Data, payload
//type: dùng cho union trạng thái test, tuple, alias phức tạp: type Status = "passed" | "failed" | "skipped".
// nguyên tắc: 
//1, Ưu tiên interface cho object
//2, Chuyển sang type khi cần union, tuple, hoặc kiểu phức tạp interface không làm được
//3, Quan trong nhất: nhất quán trong cả team/codebase

// });

//Tiêu chí áp dụng với interface và type
//1, Đối với interface: dùng cho object, declaration merging, class(implement), kế thừa extends và hạn chế với Mapped/Utility types
//2, Đối với type: dùng cho object,union, tuple, literal, alias phức tạp, kế thừa &, và không Declaration merging


BÀI TẬP LESSON 3

//Bài tập A1:

// // Khai báo object payment
// const payment = {
//   transactionCode: "TXN100",
//   amount: 250000,
//   currency: "VND",
//   status: "SUCCESS"

//   //Check mã GD và số tiền bằng cú pháp dấu chấm

//      console.log("TXN100:", payment.transactionCode);
//      console.log("250000:", payment.amount);

// //Bài tập A2:

// //Object người dùng bằng TypeScript:
// //Cách 1:Không dùng interface

// // Khai báo object user
// const user = {
//   username: "an.nguyen",
//   balance: 500000,
//   isActive: true
// };

// // Hiển thị thông tin
// console.log("Username:", user.username);
// console.log("Balance:", user.balance);
// console.log("Is Active:", user.isActive);


// //Cách 2: Dùng interface (chuẩn TypeScript)

// interface User {
//   username: string;
//   balance: number;
//   isActive: boolean;
// }

// const user: User = {
//   username: "an.nguyen",
//   balance: 500000,
//   isActive: true
// };

// console.log("Username:", user.username);
// console.log("Balance:", user.balance);
// console.log("Is Active:", user.isActive);


// //Bài A3: Cập nhật giá trị
// // Khai báo object payment
// const payment = {
//   transactionCode: "TXN100",
//   amount: 250000,
//   currency: "VND",
//   status: "SUCCESS"
// };

// // Đổi giá trị status thành "FAILED"
// payment.status = "FAILED";

// // In lại status để kiểm chứng
// console.log("Status:", payment.status);


// //Bài B1. Định nghĩa PaymentData

// // Định nghĩa type PaymentData
// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
// };

// // Tạo object payment1 có kiểu PaymentData
// const payment1: PaymentData = {
//   transactionId: "TXN101",
//   amount: 500000,
//   currency: "VND",
//   status: "SUCCESS"
// };

// // In ra transactionId và amount
// console.log("Transaction ID:", payment1.transactionId);
// console.log("Amount:", payment1.amount);



// //B2
// //Đoạn code lỗi:

// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
// };

// const payment2: PaymentData = {
//   transactionId: "TXN200",
//   amount: 300000,
//   currency: "VND",

// };

// //Sửa lại để chạy đúng:

// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
// };

// const payment2: PaymentData = {
//   transactionId: "TXN200",
//   amount: 300000,
//   currency: "VND",
//   status: "SUCCESS"
// };

// console.log(payment2);


// //B3: Interface thay cho type
// // Định nghĩa interface PaymentData
// interface PaymentData {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
// }

// // Tạo object payment3
// const payment3: PaymentData = {
//   transactionId: "TXN300",
//   amount: 450000,
//   currency: "VND",
//   status: "SUCCESS"
// };

// // In ra status
// console.log("Status:", payment3.status);







// //Bài C1:

// // Định nghĩa interface PaymentData
// interface PaymentData {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
//   email?: string; // Trường optional
// }

// // Object có email
// const paymentWithEmail: PaymentData = {
//   transactionId: "TXN400",
//   amount: 600000,
//   currency: "VND",
//   status: "SUCCESS",
//   email: "an.nguyen@example.com"
// };

// // Object không có email
// const paymentNoEmail: PaymentData = {
//   transactionId: "TXN401",
//   amount: 350000,
//   currency: "VND",
//   status: "FAILED"
// };

// // In kết quả
// console.log(paymentWithEmail);
// console.log(paymentNoEmail);


// //Bài c2:

// // Định nghĩa interface PaymentData
// interface PaymentData {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
//   email?: string;
// }

// // Object có email
// const paymentWithEmail: PaymentData = {
//   transactionId: "TXN400",
//   amount: 600000,
//   currency: "VND",
//   status: "SUCCESS",
//   email: "an.nguyen@example.com"
// };

// // Object không có email
// const paymentNoEmail: PaymentData = {
//   transactionId: "TXN401",
//   amount: 350000,
//   currency: "VND",
//   status: "FAILED"
// };

// // In email của paymentWithEmail
// console.log("Email:", paymentWithEmail.email);

// // In transactionId và status của paymentNoEmail
// console.log("Transaction ID:", paymentNoEmail.transactionId);
// console.log("Status:", paymentNoEmail.status);

// //Bài D1:

// // Tạo mảng transactionIds
// const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];

// // In phần tử đầu tiên
// console.log("Phần tử đầu tiên:", transactionIds[0]);

// // In phần tử thứ hai
// console.log("Phần tử thứ hai:", transactionIds[1]);

// // In tổng số phần tử
// console.log("Tổng số phần tử:", transactionIds.length);

// Bài D2:

// // Tạo mảng transactionIds
// const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];

// // Thêm phần tử "TXN004"
// transactionIds.push("TXN004");

// // In lại toàn bộ mảng
// console.log("Danh sách mã giao dịch:", transactionIds);

// // In lại số lượng phần tử
// console.log("Tổng số phần tử:", transactionIds.length);

// //Bài D3:
// //Dự đoán kết quả:
// const transactionIds: string[] = [
//   "TXN001",
//   "TXN002",
//   "TXN003",
//   "TXN004"
// ];


// //Chạy code để kiểm tra:
// const transactionIds: string[] = [
//   "TXN001",
//   "TXN002",
//   "TXN003",
//   "TXN004"
// ];

// console.log(transactionIds[4]);


// //Bài E1:

// // Định nghĩa type PaymentData
// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
//   email?: string; // Optional
// };

// // Tạo mảng payments
// const payments: PaymentData[] = [
//   {
//     transactionId: "TXN001",
//     amount: 150000,
//     currency: "VND",
//     status: "SUCCESS",
//     email: "user1@example.com"
//   },
//   {
//     transactionId: "TXN002",
//     amount: 200000,
//     currency: "VND",
//     status: "FAILED"
//   },
//   {
//     transactionId: "TXN003",
//     amount: 99000,
//     currency: "VND",
//     status: "PENDING",
//     email: "user3@example.com"
//   }
// ];

// // In transactionId của phần tử thứ 2
// console.log("Transaction ID của phần tử thứ 2:", payments[1].transactionId);

// // In status của phần tử thứ 3
// console.log("Status của phần tử thứ 3:", payments[2].status);



// //Bài E2:

// // Định nghĩa type PaymentData
// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
//   email?: string;
// };

// // Tạo mảng payments
// const payments: PaymentData[] = [
//   {
//     transactionId: "TXN001",
//     amount: 150000,
//     currency: "VND",
//     status: "SUCCESS",
//     email: "user1@example.com"
//   },
//   {
//     transactionId: "TXN002",
//     amount: 200000,
//     currency: "VND",
//     status: "FAILED"
//   },
//   {
//     transactionId: "TXN003",
//     amount: 99000,
//     currency: "VND",
//     status: "PENDING",
//     email: "user3@example.com"
//   }
// ];

// // Thêm giao dịch TXN004
// payments.push({
//   transactionId: "TXN004",
//   amount: 300000,
//   currency: "VND",
//   status: "SUCCESS",
//   email: "user4@example.com"
// });

// // In tổng số giao dịch
// console.log("Tổng số giao dịch:", payments.length);

// //Bài E3: Truy cập dữ liệu lồng nhau

// // Định nghĩa type PaymentData
// type PaymentData = {
//   transactionId: string;
//   amount: number;
//   currency: string;
//   status: string;
//   email?: string;
// };

// // Tạo mảng payments
// const payments: PaymentData[] = [
//   {
//     transactionId: "TXN001",
//     amount: 150000,
//     currency: "VND",
//     status: "SUCCESS",
//     email: "user1@example.com"
//   },
//   {
//     transactionId: "TXN002",
//     amount: 200000,
//     currency: "VND",
//     status: "FAILED"
//   },
//   {
//     transactionId: "TXN003",
//     amount: 99000,
//     currency: "VND",
//     status: "PENDING",
//     email: "user3@example.com"
//   },
//   {
//     transactionId: "TXN004",
//     amount: 300000,
//     currency: "VND",
//     status: "SUCCESS",
//     email: "user4@example.com"
//   }
// ];

// // In amount của giao dịch đầu tiên
// console.log("Amount giao dịch đầu tiên:", payments[0].amount);

// // In email của giao dịch thứ 3
// console.log("Email giao dịch thứ 3:", payments[2].email);

// // In currency của giao dịch cuối cùng
// console.log("Currency giao dịch cuối cùng:", payments[payments.length - 1].currency);



// //Bài F1:
// // Định nghĩa type OrderData
// type OrderData = {
//   orderId: string;
//   total: number;
//   paid: boolean;
//   note?: string; // Trường optional
// };

// // Tạo mảng orders
// const orders: OrderData[] = [
//   {
//     orderId: "ORD001",
//     total: 150000,
//     paid: true,
//     note: "Giao hàng trong giờ hành chính"
//   },
//   {
//     orderId: "ORD002",
//     total: 250000,
//     paid: false
//   },
//   {
//     orderId: "ORD003",
//     total: 320000,
//     paid: true,
//     note: "Khách hàng VIP"
//   }
// ];

// // Thêm một đơn hàng mới
// orders.push({
//   orderId: "ORD004",
//   total: 180000,
//   paid: false,
//   note: "Thanh toán khi nhận hàng"
// });

// // In tổng số đơn hàng
// console.log("Tổng số đơn hàng:", orders.length);

// // In orderId và total của đơn hàng đầu tiên
// console.log("Order ID đầu tiên:", orders[0].orderId);
// console.log("Tổng tiền đơn đầu tiên:", orders[0].total);

// // In trạng thái paid của đơn hàng cuối cùng
// console.log("Đơn hàng cuối đã thanh toán:", orders[orders.length - 1].paid);

// });
