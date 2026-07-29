import { test, expect } from '@playwright/test';

test('lesson06-1', async ({ page }) => {
    // await page.getByRole('button',{name:'Pay Now!'}).click();
    // await page.getByText("Merchant ID")
    await page.goto('https://dev8-mtf.opdev.vn/client/qt/');
    // await page.locator('[name="vpc_MerchTxnRef"]').fill("HoiDT"); // giống ctrl c, ctrl v - xóa data cũ đi và fill data mới vào
    // await page.locator('[name="vpc_MerchTxnRef"]').pressSequentially("20102001", { delay: 500 }); // không xóa data cũ - sử dụng với những field không cho copy paste ví dụ như password
    // await page.getByRole('button', { name: 'Pay Now!' }).click(); // click, dbclick. clickCount
    await page.locator('[name="vpc_Merchant"]').selectOption({ label: "TESTONEPAY" });

    //tobeVisible, hidden, enable, disable, check, uncheck, toContainText, toHaveAttribute, toHaveValue







});