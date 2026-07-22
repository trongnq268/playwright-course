/**
 * Lesson 05 - helpers/paymentHelper.ts
 * Function, Arrow Function, Promise, Class (PayGate)
 */

export type PaymentData = {
    transactionId: string;
    amount: number;
    status: string;
    fee?: number;
};

/**
 * Tổng tiền thực tế khách trả = sum(amount + fee).
 * Nếu không có fee -> phí mặc định 1.1% của amount.
 * Arrow Function rút gọn + .reduce()
 */
export const calculateTotalAmount = (transactions: PaymentData[]): number =>
    transactions.reduce(
        (total, { amount, fee }) => total + amount + (fee ?? amount * 0.011),
        0,
    );

/**
 * Giả lập connector gọi API bất đồng bộ.
 * fetchTransaction dùng Arrow Function để giữ `this` (truy cập this.gatewayName).
 */
export class PayGateConnector {
    gatewayName: string = 'PayGate_V2';

    fetchTransaction = (id: string): Promise<PaymentData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Arrow method -> `this` vẫn trỏ tới instance PayGateConnector
                console.log(`[${this.gatewayName}] fetching transaction: ${id}`);

                if (id.startsWith('ERR_')) {
                    reject(new Error('Transaction not found'));
                    return;
                }

                resolve({
                    transactionId: id,
                    amount: 200000,
                    status: 'SUCCESS',
                });
            }, 800);
        });
    };
}
