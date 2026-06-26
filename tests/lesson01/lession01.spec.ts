import { test, expect } from '@playwright/test';

test('test10000', async ({ page }) => {
  await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
  await page.locator('input[name="vpc_Amount"]').click();
  await page.locator('input[name="vpc_Amount"]').fill('1000000');
  await page.locator('input[name="vpc_Command"]').click();
  await page.locator('input[name="vpc_Command"]').fill('authorize');
  await page.getByRole('button', { name: 'Pay Now!' }).click();
  await page.getByText('Thẻ tín dụng / Ghi nợ').click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
  await page.getByRole('textbox', { name: '/25' }).fill('05/28');
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen ');
  await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thành công' })).toBeVisible();
  
});

test('test120000', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('1200000');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('4000 0000 0000 0002');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('dfdfdsf');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
await page.getByRole('textbox', { name: 'name@email.com' }).click();
await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmail.com');
await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
await page.getByRole('button', { name: 'Thanh toán' }).click();
await page.goto('https://dev32.opdev.vn/bank-emulator/emulator-mpgs/?url=https%3A%2F%2Fdev32.opdev.vn%2Fpaygate%2Fapi%2Fv1%2Fauthorizations%2FAUT-U27RgIQdTdSfVQQM1Q60CA%3Finvoice_id%3DINV-hSvV-n_ZQGura9n7Q9sy-g%26payment_id%3DPAY-1ygkW4FgRf6XUayyGaHJ0g%26brand_id%3Dvisa%26acq%3DMPGS%26merchant%3DTESTOPTEST%26merchTxnRef%3DPAY-1ygkW4FgRf6XUayyGaHJ0g%26version%3D3DS2&order.id=PAY-1ygkW4FgRf6XUayyGaHJ0g&response.gatewayRecommendation=PROCEED&result=SUCCESS');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByRole('heading', { name: 'Giao dịch thành công' })).toBeVisible();
});

test('test202', async ({ page }) => {
  await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
  await page.locator('input[name="vpc_Amount"]').click();
  await page.locator('input[name="vpc_Amount"]').fill('20200');
  await page.locator('input[name="vpc_Command"]').click();
  await page.locator('input[name="vpc_Command"]').fill('authorize');
  await page.getByRole('button', { name: 'Pay Now!' }).click();
  await page.getByText('Thẻ tín dụng / Ghi nợ').click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
  await page.getByRole('textbox', { name: '/25' }).fill('05/28');
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen ');
  await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test201', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20100');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test203', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20300');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test204', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20400');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test205', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20500');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test206', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20600');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test207', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20700');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test208', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20800');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test209', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('20900');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test210', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21100');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
});


test('test212', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21200');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test213', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21300');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test214', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21400');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test215', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21500');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test216', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21600');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test217', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21700');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test218', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21800');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test219', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('21900');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test220', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22000');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test221', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22100');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test222', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22200');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test223', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22300');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test224', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22400');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test225', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22500');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test226', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22600');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});

test('test227', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22700');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test228', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22800');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
await page.getByRole('button', { name: 'Thanh toán' }).click();
await page.goto('https://dev32.opdev.vn/bank-emulator/emulator-mpgs/?url=https%3A%2F%2Fdev32.opdev.vn%2Fpaygate%2Fapi%2Fv1%2Fauthorizations%2FAUT-kbKG6i2HSs6uJ7k7FvdDsA%3Finvoice_id%3DINV-ZDsRIMjwSGu3syrIAdxLxg%26payment_id%3DPAY-FDp5gA6HSQ2nRd5ZV8ZYHg%26brand_id%3Dmastercard%26acq%3DMPGS%26merchant%3DTESTOPTEST%26merchTxnRef%3DPAY-FDp5gA6HSQ2nRd5ZV8ZYHg%26version%3D3DS2&order.id=PAY-FDp5gA6HSQ2nRd5ZV8ZYHg&response.gatewayRecommendation=PROCEED&result=SUCCESS');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Về ngay').click();
await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
});


test('test229', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('22900');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test230', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23000');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test231', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23100');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test232', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23200');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});



test('test233', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23300');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test234', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23400');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});



test('test235', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23500');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});



test('test236', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23600');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});


test('test237', async ({ page }) => {
await page.goto('https://dev32-mtf.opdev.vn/client/qt/');
await page.locator('input[name="vpc_Amount"]').click();
await page.locator('input[name="vpc_Amount"]').fill('23700');
await page.locator('input[name="vpc_Command"]').click();
await page.locator('input[name="vpc_Command"]').fill('authorize');
await page.getByRole('button', { name: 'Pay Now!' }).click();
await page.getByText('Thẻ tín dụng / Ghi nợ').click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4567 8901 2346');
await page.getByRole('textbox', { name: '/25' }).fill('05/28');
await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmial.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Về ngay').click();
  await expect(page.getByRole('heading', { name: 'Giao dịch thất bại' })).toBeVisible();
  
});
