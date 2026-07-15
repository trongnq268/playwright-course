/**
 * Bài 1. Báo cáo thống kê giao dịch
 * Chỉ dùng for...of + if | Không dùng filter/map
 */
import { payments } from './data/paymentData';
import { SUCCESS, FAILED, PENDING } from './config/constant';

let totalTransaction = 0;
let countSuccess = 0;
let countFailed = 0;
let countPending = 0;
let totalSuccessAmount = 0;
let totalFailedAmount = 0;

// Duyệt từng giao dịch để thống kê
for (const payment of payments) {
    totalTransaction = totalTransaction + 1;

    if (payment.status === SUCCESS) {
        countSuccess = countSuccess + 1;
        totalSuccessAmount = totalSuccessAmount + payment.amount;
    } else if (payment.status === FAILED) {
        countFailed = countFailed + 1;
        totalFailedAmount = totalFailedAmount + payment.amount;
    } else if (payment.status === PENDING) {
        countPending = countPending + 1;
    }
}

console.log('========== PAYMENT REPORT ==========');
console.log('Total Transaction :', totalTransaction);
console.log('SUCCESS :', countSuccess);
console.log('FAILED  :', countFailed);
console.log('PENDING :', countPending);
console.log('Total Success Amount :', totalSuccessAmount);
console.log('Total Failed Amount  :', totalFailedAmount);
console.log('====================================');
