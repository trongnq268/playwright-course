1. ĐỊnh nghĩa type PaymentData
export type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
  fee?: number;
};

2. Tính tổng số tiền mà KH phải trả trong trường hợp fee không tồn tại:

export const calculateTotalAmount = (
  transactions: PaymentData[]
): number =>
  transactions.reduce(
    (total, transaction) =>
      total +
      transaction.amount +
      (transaction.fee ?? transaction.amount * 0.011),
    0
  );
;


3, Giả lập API gọi Paygate
export class PayGateConnector {
  gatewayName: string = "PayGate_V2";

  // Sử dụng Arrow Function để giữ nguyên ngữ cảnh this
  fetchTransaction = (id: string): Promise<PaymentData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Có thể truy cập this.gatewayName mà không bị undefined
        console.log(`Fetching from ${this.gatewayName}...`);

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
}













