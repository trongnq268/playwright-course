/**
 * Bài 2. Phân loại giá trị giao dịch
 * SUCCESS: SMALL / MEDIUM / LARGE
 * FAILED hoặc PENDING: INVALID STATUS
 */
import { payments } from './data/paymentData';
import { SUCCESS } from './config/constant';

for (const payment of payments) {
    if (payment.status === SUCCESS) {
        // Phân loại theo amount
        if (payment.amount < 500000) {
            console.log(payment.transactionId, '-> SMALL');
        } else if (payment.amount < 2000000) {
            console.log(payment.transactionId, '-> MEDIUM');
        } else {
            console.log(payment.transactionId, '-> LARGE');
        }
    } else {
        // FAILED hoặc PENDING
        console.log(payment.transactionId, '-> INVALID STATUS');
    }
}
