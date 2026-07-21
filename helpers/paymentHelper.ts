export type PaymentData = {
    transactionId: string;
    amount: number;
    status: string;
    fee?: number;
};

export const calculateTotalAmount = (transactions: PaymentData[]): number =>
    transactions.reduce((total, t) => total + t.amount + (t.fee !== undefined ? t.fee : t.amount * 0.011), 0);

export class PayGateConnector {
    gatewayName: string = 'PayGate_V2';

    fetchTransaction = (id: string): Promise<PaymentData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id.startsWith('ERR_')) {
                    reject(new Error('Transaction not found'));
                } else {
                    resolve({ transactionId: id, amount: 200000, status: 'SUCCESS' });
                }
            }, 800);
        });
    };
}
