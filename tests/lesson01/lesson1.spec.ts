import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev8-mtf.opdev.vn/client/qt/');
  await page.locator('select[name="vpc_Merchant"]').selectOption('AUTO2B00');
  await page.getByRole('button', { name: 'Pay Now!' }).click();
  await page.getByText('Thẻ tín dụng / Ghi nợ').click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4500 0000 0008');
  await page.getByRole('textbox', { name: '/25' }).fill('12/27');
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van a');
  await page.getByRole('textbox', { name: 'name@email.com' }).click();
  await page.getByRole('textbox', { name: 'name@email.com' }).fill('a@gmail.com');
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng ý' }).check();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await page.getByRole('heading', { name: 'INVALID HASH' }).click();
});