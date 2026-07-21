import { PaymentData } from "../helpers/paymentHelper";


export class PayGateConnector {
    gatewayName: string = "PayGate_V2";

    //method 'fetchTransaction' không dùng arrow function, lỗi undefined khi gọi this.gatewayName
    fetchTransaction(id: string): Promise<PaymentData> {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // console.log(`[${this.gatewayName}] Fetching transaction ${id}...`);
                if (id.startsWith("ERR_")) {
                    reject(new Error(`Transaction ${id} not found`))
                }
                resolve({
                    transactionId: id,
                    amount: 200000,
                    status: "SUCCESS"
                })
            }, 800);
        });
    }

    //method 'fetchTransaction2' dùng arrow function, không bị lỗi undefined khi gọi this.gatewayName
    fetchTransaction2 = (id: string): Promise<PaymentData> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`[${this.gatewayName}] Fetching transaction ${id}...`);
                if (id.startsWith("ERR_")) {
                    reject(new Error(`Transaction ${id} not found`));//trigger rejection
                } else {
                    resolve({
                        transactionId: id,
                        amount: 200000,
                        status: "SUCCESS"
                    })
                }
            }, 800);
        })
    }
}