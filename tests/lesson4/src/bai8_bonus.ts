// ========== BONUS: Viết lại Bài 8 bằng filter() và map() ==========
// So sánh: số dòng / độ dễ đọc / khi nào dùng for...of | filter | map

import { payments } from "../data/paymentData.js";
import { SUCCESS, FAILED, PENDING } from "../config/constant.js";

const successList = payments.filter((p) => p.status === SUCCESS);
const failedList = payments.filter((p) => p.status === FAILED);
const pendingList = payments.filter((p) => p.status === PENDING);

const totalSuccessAmount = successList
  .map((p) => p.amount)
  .reduce((sum, amount) => sum + amount, 0);

const totalFailedAmount = failedList
  .map((p) => p.amount)
  .reduce((sum, amount) => sum + amount, 0);

const visaList = payments.filter((p) => p.paymentMethod === "VISA");
const masterList = payments.filter((p) => p.paymentMethod === "MASTER");
const qrList = payments.filter((p) => p.paymentMethod === "QR");

const suspiciousCount = payments.filter(
  (p) => p.status === SUCCESS && p.currency === "USD" && p.amount > 2000000
).length;

const largeCount = successList.filter((p) => p.amount >= 2000000).length;
const smallCount = successList.filter((p) => p.amount < 500000).length;

console.log("=============================");
console.log("PAYMENT DASHBOARD (BONUS - filter/map)");
console.log("=============================");
console.log("Total Transaction :", payments.length);
console.log("SUCCESS :", successList.length);
console.log("FAILED :", failedList.length);
console.log("PENDING :", pendingList.length);
console.log("Total SUCCESS Amount :", totalSuccessAmount);
console.log("Total FAILED Amount :", totalFailedAmount);
console.log("VISA");
console.log("SUCCESS :", visaList.filter((p) => p.status === SUCCESS).length);
console.log("FAILED :", visaList.filter((p) => p.status === FAILED).length);
console.log("PENDING :", visaList.filter((p) => p.status === PENDING).length);
console.log("MASTER");
console.log("SUCCESS :", masterList.filter((p) => p.status === SUCCESS).length);
console.log("FAILED :", masterList.filter((p) => p.status === FAILED).length);
console.log("PENDING :", masterList.filter((p) => p.status === PENDING).length);
console.log("QR");
console.log("SUCCESS :", qrList.filter((p) => p.status === SUCCESS).length);
console.log("FAILED :", qrList.filter((p) => p.status === FAILED).length);
console.log("PENDING :", qrList.filter((p) => p.status === PENDING).length);
console.log("Suspicious Transaction :", suspiciousCount);
console.log("Large Transaction :", largeCount);
console.log("Small Transaction :", smallCount);
console.log("=============================");

console.log("");
console.log("========== SO SÁNH ==========");
console.log("- Bài 8 (for...of): duyệt 1 lần, nhiều biến đếm, hơi dài nhưng hiệu quả.");
console.log("- Bonus (filter/map): ngắn hơn, dễ đọc hơn theo từng ý nghiệp vụ.");
console.log("- Nên dùng for...of khi cần nhiều thống kê trong 1 vòng lặp (performance).");
console.log("- Nên dùng filter() khi muốn lọc danh sách theo điều kiện rõ ràng.");
console.log("- Nên dùng map() khi muốn biến đổi từng phần tử sang dạng khác (vd: lấy amount).");
