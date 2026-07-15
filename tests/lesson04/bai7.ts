/**
 * Bài 7. Kiểm tra dữ liệu đầu vào
 * Invalid nếu: amount <= 0 | transactionId rỗng | customer rỗng
 */
import { payments } from './data/paymentData';
import type { PaymentData } from './types/payment';
import { FAILED, PENDING } from './config/constant';

// Kiểm tra 8 giao dịch gốc
for (const payment of payments) {
    let isInvalid = false;

    if (payment.amount <= 0) {
        isInvalid = true;
    }
    if (payment.transactionId === '') {
        isInvalid = true;
    }
    if (payment.customer === '') {
        isInvalid = true;
    }

    if (isInvalid) {
        console.log('Invalid Data');
        console.log('Transaction :', payment.transactionId);
        console.log('Reason');
        if (payment.amount <= 0) {
            console.log('- Amount <= 0');
        }
        if (payment.transactionId === '') {
            console.log('- Empty TransactionId');
        }
        if (payment.customer === '') {
            console.log('- Empty Customer');
        }
    } else {
        console.log(payment.transactionId, '-> VALID');
    }
}

// Thêm 2 bản ghi mẫu invalid để minh họa format đề bài
const invalid1: PaymentData = {
    transactionId: 'TXN009',
    customer: '',
    amount: -100,
    currency: 'VND',
    paymentMethod: 'QR',
    status: FAILED,
};

const invalid2: PaymentData = {
    transactionId: '',
    customer: 'Empty Id User',
    amount: 1000,
    currency: 'VND',
    paymentMethod: 'VISA',
    status: PENDING,
};

const invalidList: PaymentData[] = [invalid1, invalid2];

for (const payment of invalidList) {
    console.log('Invalid Data');
    console.log('Transaction :', payment.transactionId);
    console.log('Reason');
    if (payment.amount <= 0) {
        console.log('- Amount <= 0');
    }
    if (payment.transactionId === '') {
        console.log('- Empty TransactionId');
    }
    if (payment.customer === '') {
        console.log('- Empty Customer');
    }
}
