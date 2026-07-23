import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto("https://dev8-mtf.opdev.vn/client/qt/")
    // await page.locator('[name="vpc_MerchTxnRef"]').clear();
    // await page.locator('[name="vpc_MerchTxnRef"]').pressSequentially("Lynh", { delay: 500 });

    await page.getByRole('button', { name: 'Pay Now!' }).click({ClickCount: 3});

    //await page.locator('[name="vpc_Merchant"]').selectOption("UPOS_INSTALLMENT")


    
});