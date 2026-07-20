// =======================================
// 1. Type
// Dùng để lưu thông tin của một giao dịch
// =======================================

export type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
  fee?: number;
};


// =======================================
// 2. Function
// Input -> xử lý -> Output
// =======================================

function getFee(amount: number, fee?: number): number {

  // Nếu đã có fee thì dùng fee đó
  if (fee !== undefined) {
    return fee;
  }

  // Nếu không có thì tính 1.1%
  return amount * 0.011;

}


// =======================================
// 3. Arrow Function
// Gọi lại function ở trên để tính tổng tiền
// =======================================

export const calculateTotalAmount = (
  payments: PaymentData[]
): number => {

  return payments.reduce((total, payment) => {

    const fee = getFee(
      payment.amount,
      payment.fee
    );

    return total + payment.amount + fee;

  }, 0);

};


// =======================================
// 4. Class
// =======================================

export class PayGateConnector {

  gatewayName = "PayGate_V2";


  // Arrow Function
  // Giữ được this

  fetchTransaction = (
    id: string
  ): Promise<PaymentData> => {

    // Promise mô phỏng gọi API

    return new Promise((resolve, reject) => {

      setTimeout(() => {

        console.log("Gateway:", this.gatewayName);

        if (id.startsWith("ERR_")) {

          reject(
            new Error("Transaction not found")
          );

          return;
        }

        resolve({

          transactionId: id,

          amount: 200000,

          status: "SUCCESS"

        });

      }, 800);

    });

  };

}