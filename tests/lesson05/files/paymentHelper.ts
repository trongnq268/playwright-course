// helpers/paymentHelper.ts

/* =========================================================
 * Yêu cầu 1.1: Định nghĩa type PaymentData
 * ======================================================= */
export type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
  fee?: number; 
};

/* =========================================================
 * Yêu cầu 1.2: calculateTotalAmount (Arrow Function + reduce)
 * ======================================================= */
export const calculateTotalAmount = (transactions: PaymentData[]): number =>
  transactions.reduce(
    (total, tx) => total + tx.amount + (tx.fee ?? tx.amount * 0.011),
    0,
  );

/* =========================================================
 * Yêu cầu 1.3: Class PayGateConnector — giả lập gọi API bất đồng bộ
 * ======================================================= */
export class PayGateConnector {
  gatewayName: string = "PayGate_V2";

  fetchTransaction = (id: string): Promise<PaymentData> => {
    return new Promise<PaymentData>((resolve, reject) => {
      setTimeout(() => {
        // 'this' ở đây là instance nhờ arrow function
        console.log(`[${this.gatewayName}] Đang xử lý giao dịch: ${id}`);

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
