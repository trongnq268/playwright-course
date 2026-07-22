/**
 * Lesson 05 - tests/payment.spec.ts
 * Hệ thống đối soát PayGate: import helper + async/await + try/catch
 *
 * Chạy:
 *   npx playwright test tests/lesson05/payment.spec.ts --project=chromium
 */
import { test, expect } from '@playwright/test';
import {
    PaymentData,
    calculateTotalAmount,
    PayGateConnector,
} from './helpers/paymentHelper';

test.describe('Lesson 05 - PayGate Function / Async Await', () => {
    test('calculateTotalAmount - fee có sẵn và fee mặc định 1.1%', () => {
        const transactions: PaymentData[] = [
            { transactionId: 'TXN001', amount: 100000, status: 'SUCCESS', fee: 5000 },
            { transactionId: 'TXN002', amount: 200000, status: 'SUCCESS' }, // fee = 200000 * 1.1%
        ];

        // 100000 + 5000 + 200000 + 2200 = 307200
        expect(calculateTotalAmount(transactions)).toBe(307200);
    });

    test('PayGateConnector - fetch ID hợp lệ bằng async/await', async () => {
        const connector = new PayGateConnector();
        expect(connector.gatewayName).toBe('PayGate_V2');

        // Phải có await: nếu quên await thì `data` chỉ là Promise (pending),
        // chưa phải PaymentData - console.log sẽ in Promise thay vì object giao dịch,
        // và test có thể kết thúc trước khi setTimeout 800ms resolve xong.
        const data = await connector.fetchTransaction('TXN_OK_001');

        console.log('Transaction hợp lệ:', data);

        expect(data.transactionId).toBe('TXN_OK_001');
        expect(data.amount).toBe(200000);
        expect(data.status).toBe('SUCCESS');
    });

    test('PayGateConnector - bắt lỗi ID ERR_ bằng try/catch', async () => {
        const connector = new PayGateConnector();

        try {
            await connector.fetchTransaction('ERR_404');
            throw new Error('Expected fetchTransaction to reject');
        } catch (error) {
            const message = (error as Error).message;
            console.log('Error message:', message);
            expect(message).toBe('Transaction not found');
        }
    });
});
