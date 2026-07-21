import { test, expect } from '@playwright/test';
import { calculateTotalAmount, calculateTotalAmount2, calculateTotalAmount3, PaymentData } from "../helpers/paymentHelper";
import { PayGateConnector } from '../connectors/PayGateConnector';
import paymentDatas from '../data/paymentDatas.json';


const data = paymentDatas as PaymentData[];

//Yêu cầu 2: Viết kịch bản kiểm thử trong tests/payment.spec.ts
test('test payment calculation', async () => {
    const testData = calculateTotalAmount(data);
    console.log("testData:", testData);

    const testData2 = calculateTotalAmount2(data);
    console.log("testData2:", testData2);

    const testData3 = calculateTotalAmount3(data);
    console.log("testData3:", testData3);

    const payGateConnector = new PayGateConnector();
    try {
        const response = await payGateConnector.fetchTransaction2("123");
        console.log(response);
    } catch (error) {
        console.log(`error: ${error}`);
    }

})
