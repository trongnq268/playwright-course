/**
 * Bonus Challenge – viết lại Bài 8 bằng filter() và map()
 * (Phần bonus được phép dùng filter / map — không bắt buộc theo quy định bài 1–8)
 */
import { payments } from './data/paymentData';
import { SUCCESS, FAILED, PENDING } from './config/constant';

const totalTransaction = payments.length;

const successList = payments.filter((p) => p.status === SUCCESS);
const failedList = payments.filter((p) => p.status === FAILED);
const pendingList = payments.filter((p) => p.status === PENDING);

// map lấy amount rồi cộng dồn bằng vòng for...of (tránh reduce nếu chưa học)
let totalSuccessAmount = 0;
const successAmounts = successList.map((p) => p.amount);
for (const amount of successAmounts) {
    totalSuccessAmount = totalSuccessAmount + amount;
}

let totalFailedAmount = 0;
const failedAmounts = failedList.map((p) => p.amount);
for (const amount of failedAmounts) {
    totalFailedAmount = totalFailedAmount + amount;
}

const visaList = payments.filter((p) => p.paymentMethod === 'VISA');
const masterList = payments.filter((p) => p.paymentMethod === 'MASTER');
const qrList = payments.filter((p) => p.paymentMethod === 'QR');

const suspiciousCount = payments.filter(
    (p) => p.amount > 2000000 && p.currency === 'USD' && p.status === SUCCESS,
).length;

const largeCount = successList.filter((p) => p.amount >= 2000000).length;
const smallCount = successList.filter((p) => p.amount < 500000).length;

console.log('========== BONUS (filter / map) ==========');
console.log('Total Transaction :', totalTransaction);
console.log('SUCCESS :', successList.length);
console.log('FAILED :', failedList.length);
console.log('PENDING :', pendingList.length);
console.log('Total SUCCESS Amount :', totalSuccessAmount);
console.log('Total FAILED Amount :', totalFailedAmount);
console.log('VISA SUCCESS :', visaList.filter((p) => p.status === SUCCESS).length);
console.log('VISA FAILED  :', visaList.filter((p) => p.status === FAILED).length);
console.log('VISA PENDING :', visaList.filter((p) => p.status === PENDING).length);
console.log('MASTER SUCCESS :', masterList.filter((p) => p.status === SUCCESS).length);
console.log('MASTER FAILED  :', masterList.filter((p) => p.status === FAILED).length);
console.log('MASTER PENDING :', masterList.filter((p) => p.status === PENDING).length);
console.log('QR SUCCESS :', qrList.filter((p) => p.status === SUCCESS).length);
console.log('QR FAILED  :', qrList.filter((p) => p.status === FAILED).length);
console.log('QR PENDING :', qrList.filter((p) => p.status === PENDING).length);
console.log('Suspicious Transaction :', suspiciousCount);
console.log('Large Transaction :', largeCount);
console.log('Small Transaction :', smallCount);
console.log('==========================================');
console.log('So sánh:');
console.log('- for...of : 1 vòng lặp, nhiều biến đếm, dễ kiểm soát, hợp bài học căn bản.');
console.log('- filter()  : tách danh sách theo điều kiện, dễ đọc khi cần nhiều tập con.');
console.log('- map()     : biến đổi từng phần tử (vd. lấy amount).');
