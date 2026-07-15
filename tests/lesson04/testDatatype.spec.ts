import { test, expect } from '@playwright/test';
import { PaymentData } from '../data/datatype';

test('has title', async ({ page }) => {
    const user01: PaymentData = {
        transactionId: "TX111",
        amount: 250000,
        currency: "VND",
        status: "SUCCESS",
    }
    console.log(user01);





});