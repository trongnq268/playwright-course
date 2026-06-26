import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev8-mtf.opdev.vn/client/qt/');
  await page.locator('select[name="vpc_Merchant"]').selectOption('TESTONEPAY');
  await page.locator('input[name="vpc_Theme"]').click();
  await page.locator('input[name="vpc_Theme"]').fill('general');
  await page.getByRole('button', { name: 'Pay Now!' }).click();
  await page.locator('#domescard-radio').click();
  await page.locator('div:nth-child(3) > .bank-list-item').click();
  await page.getByRole('tab', { name: 'Số tài khoản' }).click();
  await page.locator('#card_number').click();
  await page.locator('#card_number').fill('52000000000');
  await page.locator('#card_number').press('Tab');
  await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('nguyen van A');
  await page.goto('https://dev8.opdev.vn/paygate/general/error?merchant_name=C%C3%B4ng%20ty%20c%E1%BB%95%20ph%E1%BA%A7n%20th%C6%B0%C6%A1ng%20m%E1%BA%A1i%20OP&fail_delay=300&merchant_return=&response_code=7&id=INV-A5DrMiuSTCiI-iiE6FQuaA&currentUrl=https%253A%252F%252Fdev8.opdev.vn%252Fpaygate%252Fgeneral%252F19%253Fid%253DINV-A5DrMiuSTCiI-iiE6FQuaA%2526locale%253Dvi%2526b%253D19%2526type%253D2&locale=vi&t_id=PAY-eH9lS1IFQpu8M9-Vnh04RQ');
  await page.getByText('Về ngay').click();
});