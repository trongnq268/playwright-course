import { test, expect } from '@playwright/test';

// --- Phần B/C/E/F dùng chung ---
type PaymentData = {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
    email?: string;
};

// --- Phần A – Object & Truy cập thuộc tính ---
test.describe('Phần A – Object & Truy cập thuộc tính', () => {
    test('A1. Tạo object giao dịch', () => {
        const payment = {
            transactionId: 'TXN100',
            amount: 250000,
            currency: 'VND',
            status: 'SUCCESS',
        };

        expect(payment.transactionId).toBe('TXN100');
        expect(payment.amount).toBe(250000);
    });

    test('A2. Object người dùng', () => {
        const user = {
            username: 'an.nguyen',
            balance: 500000,
            isActive: true,
        };

        expect(user.username).toBe('an.nguyen');
        expect(user.balance).toBe(500000);
        expect(user.isActive).toBe(true);
    });

    test('A3. Cập nhật giá trị', () => {
        const payment = {
            transactionId: 'TXN100',
            amount: 250000,
            currency: 'VND',
            status: 'SUCCESS',
        };

        payment.status = 'FAILED';
        expect(payment.status).toBe('FAILED');
    });
});

// --- Phần B – Type / Interface ---
test.describe('Phần B – Type / Interface', () => {
    test('B1. Định nghĩa PaymentData', () => {
        const payment1: PaymentData = {
            transactionId: 'TXN101',
            amount: 180000,
            currency: 'VND',
            status: 'SUCCESS',
        };

        expect(payment1.transactionId).toBe('TXN101');
        expect(payment1.amount).toBe(180000);
    });

    test('B2. Đọc và sửa lỗi – thiếu trường status', () => {
        // Lỗi gốc: thiếu property bắt buộc `status` trong PaymentData
        const payment2: PaymentData = {
            transactionId: 'TXN200',
            amount: 300000,
            currency: 'VND',
            status: 'PENDING', // bổ sung để hết gạch đỏ
        };

        expect(payment2.status).toBe('PENDING');
    });

    test('B3. Interface thay cho type', () => {
        interface PaymentDataInterface {
            transactionId: string;
            amount: number;
            currency: string;
            status: string;
        }

        const payment3: PaymentDataInterface = {
            transactionId: 'TXN300',
            amount: 450000,
            currency: 'VND',
            status: 'SUCCESS',
        };

        expect(payment3.status).toBe('SUCCESS');
    });
});

// --- Phần C – Optional Property ---
test.describe('Phần C – Optional Property', () => {
    test('C1. Thêm trường optional email', () => {
        const paymentWithEmail: PaymentData = {
            transactionId: 'TXN400',
            amount: 100000,
            currency: 'VND',
            status: 'SUCCESS',
            email: 'user@example.com',
        };

        const paymentNoEmail: PaymentData = {
            transactionId: 'TXN401',
            amount: 200000,
            currency: 'VND',
            status: 'FAILED',
        };

        expect(paymentWithEmail.email).toBe('user@example.com');
        expect(paymentNoEmail.email).toBeUndefined();
    });

    test('C2. In thông tin optional', () => {
        const paymentWithEmail: PaymentData = {
            transactionId: 'TXN400',
            amount: 100000,
            currency: 'VND',
            status: 'SUCCESS',
            email: 'user@example.com',
        };

        const paymentNoEmail: PaymentData = {
            transactionId: 'TXN401',
            amount: 200000,
            currency: 'VND',
            status: 'FAILED',
        };

        expect(paymentWithEmail.email).toBe('user@example.com');
        expect(paymentNoEmail.transactionId).toBe('TXN401');
        expect(paymentNoEmail.status).toBe('FAILED');
    });
});

// --- Phần D – Array ---
test.describe('Phần D – Array', () => {
    test('D1. Mảng mã giao dịch', () => {
        const transactionIds: string[] = ['TXN001', 'TXN002', 'TXN003'];

        expect(transactionIds[0]).toBe('TXN001');
        expect(transactionIds[1]).toBe('TXN002');
        expect(transactionIds.length).toBe(3);
    });

    test('D2. Thêm phần tử', () => {
        const transactionIds: string[] = ['TXN001', 'TXN002', 'TXN003'];
        transactionIds.push('TXN004');

        expect(transactionIds).toEqual(['TXN001', 'TXN002', 'TXN003', 'TXN004']);
        expect(transactionIds.length).toBe(4);
    });

    test('D3. Bẫy index – index 4 vượt quá mảng', () => {
        const transactionIds: string[] = ['TXN001', 'TXN002', 'TXN003', 'TXN004'];

        // Dự đoán: transactionIds[4] = undefined (index hợp lệ là 0..3)
        expect(transactionIds[4]).toBeUndefined();
    });
});

// --- Phần E – Array of Objects ---
test.describe('Phần E – Array of Objects', () => {
    test('E1. Danh sách giao dịch', () => {
        const payments: PaymentData[] = [
            {
                transactionId: 'TXN001',
                amount: 150000,
                currency: 'VND',
                status: 'SUCCESS',
                email: 'a@example.com',
            },
            {
                transactionId: 'TXN002',
                amount: 200000,
                currency: 'VND',
                status: 'FAILED',
            },
            {
                transactionId: 'TXN003',
                amount: 99000,
                currency: 'VND',
                status: 'PENDING',
                email: 'b@example.com',
            },
        ];

        expect(payments[1].transactionId).toBe('TXN002');
        expect(payments[2].status).toBe('PENDING');
    });

    test('E2. Thêm giao dịch và đếm', () => {
        const payments: PaymentData[] = [
            {
                transactionId: 'TXN001',
                amount: 150000,
                currency: 'VND',
                status: 'SUCCESS',
                email: 'a@example.com',
            },
            {
                transactionId: 'TXN002',
                amount: 200000,
                currency: 'VND',
                status: 'FAILED',
            },
            {
                transactionId: 'TXN003',
                amount: 99000,
                currency: 'VND',
                status: 'PENDING',
                email: 'b@example.com',
            },
        ];

        payments.push({
            transactionId: 'TXN004',
            amount: 50000,
            currency: 'VND',
            status: 'SUCCESS',
        });

        expect(payments.length).toBe(4);
    });

    test('E3. Truy cập dữ liệu lồng nhau', () => {
        const payments: PaymentData[] = [
            {
                transactionId: 'TXN001',
                amount: 150000,
                currency: 'VND',
                status: 'SUCCESS',
                email: 'a@example.com',
            },
            {
                transactionId: 'TXN002',
                amount: 200000,
                currency: 'VND',
                status: 'FAILED',
            },
            {
                transactionId: 'TXN003',
                amount: 99000,
                currency: 'VND',
                status: 'PENDING',
                email: 'b@example.com',
            },
            {
                transactionId: 'TXN004',
                amount: 50000,
                currency: 'VND',
                status: 'SUCCESS',
            },
        ];

        expect(payments[0].amount).toBe(150000);
        expect(payments[2].email).toBe('b@example.com');
        expect(payments[payments.length - 1].currency).toBe('VND');
    });
});

// --- Phần F – Bài tập tổng hợp ---
test.describe('Phần F – Bài tập tổng hợp', () => {
    test('F1. Bộ test data đơn hàng', () => {
        type OrderData = {
            orderId: string;
            total: number;
            paid: boolean;
            note?: string;
        };

        const orders: OrderData[] = [
            { orderId: 'ORD001', total: 320000, paid: true, note: 'Giao nhanh' },
            { orderId: 'ORD002', total: 150000, paid: false },
            { orderId: 'ORD003', total: 89000, paid: true },
        ];

        orders.push({ orderId: 'ORD004', total: 210000, paid: false, note: 'COD' });

        expect(orders.length).toBe(4);
        expect(orders[0].orderId).toBe('ORD001');
        expect(orders[0].total).toBe(320000);
        expect(orders[orders.length - 1].paid).toBe(false);
    });
});
