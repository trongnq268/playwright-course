// 1. Định nghĩa type PaymentData
export type PaymentData = {
    transactionId: string;
    amount: number;
    status: string;
    fee?: number;
};

// 2. Tính tổng số tiền khách hàng phải trả
export const calculateTotalAmount = (payments: PaymentData[]): number =>
    payments.reduce(
        (total, payment) =>
            total +
            payment.amount +
            (payment.fee ?? payment.amount * 0.011),
        0
    );

// 3. Class giả lập kết nối PayGate
export class PayGateConnector {
    gatewayName: string = "PayGate_V2";

    // Arrow Function để giữ nguyên "this"
    fetchTransaction = (id: string): Promise<PaymentData> => {
        return new Promise((resolve, reject) => {
            console.log(`Calling ${this.gatewayName}...`);

            setTimeout(() => {
                if (id.startsWith("ERR_")) {
                    reject(new Error("Transaction not found"));
                } else {
                    resolve({
                        transactionId: id,
                        amount: 200000,
                        status: "SUCCESS",
                    });
                }
            }, 800);
        });
    };
}