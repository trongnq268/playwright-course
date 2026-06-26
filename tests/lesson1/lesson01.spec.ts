import { test, expect } from '@playwright/test';

test('Purchase OnePAY QT', async ({ page }) => {
  // Mở trang thanh toán
  await page.goto('https://dev8-mtf.opdev.vn/client/qt/');

  // Chọn Pay Now
  await page.getByRole('button', { name: 'Pay Now!' }).click();

  // Chọn thanh toán bằng thẻ
  await page.getByText('Thẻ tín dụng / Ghi nợ').click();

  // Nhập thông tin thẻ
  await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4500 0000 0008');
  await page.getByRole('textbox', { name: '25' }).fill('12/26');
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');

  // Nhập thông tin chủ thẻ
  await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('875t');
  await page.getByRole('textbox', { name: 'hatest@email.com' }).fill('2@op.vn');

  // Đồng ý điều khoản
  await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();

  // Thanh toán
  await page.getByRole('button', { name: 'Thanh toán' }).click();

  // Xác nhận giao dịch tại MPGS
  await page.getByRole('button', { name: 'Submit' }).click();

  // Kiểm tra giao dịch thành công
  await expect(
    page.getByRole('heading', { name: 'Giao dịch thành công' })
  ).toBeVisible();
});
