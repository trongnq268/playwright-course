import { test } from "@playwright/test";

import {
  PaymentData,
  calculateTotalAmount,
  PayGateConnector
} from "../helpers/paymentHelper";

test("PayGate Demo", async () => {

  const payments: PaymentData[] = [

    {
      transactionId: "TXN001",
      amount: 100000,
      status: "SUCCESS",
      fee: 3000
    },

    {
      transactionId: "TXN002",
      amount: 200000,
      status: "SUCCESS"
    }

  ];


  const total = calculateTotalAmount(payments);

  console.log("Tổng tiền:", total);

  const connector = new PayGateConnector();


  console.log("============Giao dịch thành công============");

  const data = await connector.fetchTransaction("TXN001");

  console.log(data);


  console.log("============Giao dịch lỗi============");

  try {

    const errorData = await connector.fetchTransaction("ERR_404");

    console.log(errorData);

  } catch (error: any) {

    console.log(error.message);

  }

});