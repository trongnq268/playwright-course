//Yêu cầu 1. helpers/paymentHelper.ts

    //Định nghĩa type PaymentData
        export type PaymentData = {
        transactionId: string;
        amount: number;
        status: string;
        fee?: number;
        };

    //Tính tổng tiền phải trả
    export const calculateTotalAmount = (payments: PaymentData[]): number =>
    payments.reduce(
        (total, payment) =>
        total + payment.amount + (payment.fee ?? payment.amount * 0.011),
        0
    );

    //Class PayGateConnector giả lập gọi API bất đồng bộ
    export class PayGateConnector {
    gatewayName = "PayGate_V2";
    // Dùng Arrow Function để giữ đúng this
    fetchTransaction = (id: string): Promise<PaymentData> => {
        return new Promise((resolve, reject) => {
        
            // Giả lập độ trễ 800ms của API
            setTimeout(() => {
            if (id.startsWith("ERR_")) {
            reject(new Error("Transaction not found"));
            return;
            }

            resolve({
            transactionId: id,
            amount: 200000,
            status: "SUCCESS",
            });
                }, 800);
        });
    };
    };
