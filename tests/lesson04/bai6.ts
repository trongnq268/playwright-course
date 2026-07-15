/**
 * Bài 6. Tổ chức project bằng Import / Export
 *
 * Cấu trúc:
 *   types/payment.ts
 *   data/paymentData.ts
 *   config/constant.ts
 *   bai6.ts  (main)
 *
 * Quy định: không viết trực tiếp "SUCCESS" / "FAILED" / "PENDING"
 *           — phải import từ config/constant.ts
 */
import { payments } from './data/paymentData';
import { SUCCESS, FAILED, PENDING } from './config/constant';

let countSuccess = 0;
let countFailed = 0;
let countPending = 0;

for (const payment of payments) {
    if (payment.status === SUCCESS) {
        countSuccess = countSuccess + 1;
    } else if (payment.status === FAILED) {
        countFailed = countFailed + 1;
    } else if (payment.status === PENDING) {
        countPending = countPending + 1;
    }
}

console.log('========== BÀI 6 - IMPORT / EXPORT ==========');
console.log(SUCCESS, ':', countSuccess);
console.log(FAILED, ':', countFailed);
console.log(PENDING, ':', countPending);
console.log('============================================');
