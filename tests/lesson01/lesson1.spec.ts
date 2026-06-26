import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://dev8-mtf.opdev.vn/client/qt/');
    await page.locator('input[name="vpc_OrderInfo"]').click();
    await page.locator('input[name="vpc_OrderInfo"]').click();
    await page.getByRole('cell', { name: 'Transaction OrderInfo' }).click();
    await page.getByRole('cell', { name: 'Transaction OrderInfo' }).click();
    await page.locator('input[name="vpc_Amount"]').click();
    await page.locator('input[name="vpc_Amount"]').fill('1000000');
    await page.getByRole('cell').filter({ hasText: 'true false' }).click();
    await page.getByRole('button', { name: 'Pay Now!' }).click();
    await page.locator('intercard-form span').click();
    await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
    await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4500 0000 0008');
    await page.getByRole('textbox', { name: '/25' }).fill('05/27');
    await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
    await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
    await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).press('Tab');
    await page.getByRole('textbox', { name: 'name@email.com' }).fill('test@gmail.com');
    await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
    await page.getByRole('button', { name: 'Thanh toán' }).click();
    await page.goto('https://dev8.opdev.vn/bank-emulator/emulator-mpgs/?url=https%3A%2F%2Fdev8.opdev.vn%2Fpaygate%2Fapi%2Fv1%2Fauthorizations%2FAUT-IZjR1AQEQwGqntB6qv15EA%3Finvoice_id%3DINV-y5SqhGiOQdO1HK6tNol6zQ%26payment_id%3DPAY-nhvl4EFDQeqD7ZtWq5v2Vg%26brand_id%3Dmastercard%26acq%3DMPGS%26merchant%3DTESTOPTEST%26merchTxnRef%3DPAY-nhvl4EFDQeqD7ZtWq5v2Vg%26version%3D3DS2&order.id=PAY-nhvl4EFDQeqD7ZtWq5v2Vg&response.gatewayRecommendation=PROCEED&result=SUCCESS');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'Giao dịch thành công' })).toBeVisible();
    await page.getByRole('cell', { name: 'TEST_1782446870136-' }).click();
    await page.getByRole('cell', { name: '1000000' }).click();
});