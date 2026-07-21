import { test } from '@playwright/test';
import { PayGateConnector } from '../helpers/paymentHelper';

test('Test PayGateConnector API mock', async () => {
    const connector = new PayGateConnector();

    // Lấy dữ liệu với ID hợp lệ
    const validTransaction = await connector.fetchTransaction('TX_9999');
    console.log('Transaction Data:', validTransaction);
    // Điều gì xảy ra nếu quên từ khóa await ở đây?
    // Nếu quên từ khóa await, biến validTransaction sẽ nhận được một đối tượng Promise pending thay vì kết quả trả về thực sự (PaymentData).
    // Lúc này, console.log sẽ in ra một object Promise, và nếu các bước sau đó cố thao tác với validTransaction.amount thì sẽ gặp lỗi undefined.

    // Bắt lỗi bất đồng bộ với ID lỗi
    try {
        await connector.fetchTransaction('ERR_404');
    } catch (error: any) {
        console.log('Error caught:', error.message);
    }
});
