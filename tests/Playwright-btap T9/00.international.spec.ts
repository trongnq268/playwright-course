import { test, expect } from '@playwright/test';
import { simulatorPage } from '../../lib/pages/ui/00.simulator/00.simulator.page';
import { internationalPaygatePage } from '../../lib/pages/ui/01.paygate/00.international.page';
import { invoiceData } from '../../lib/datas/paygate/invoice.data';
import { internationalData } from '../../lib/datas/paygate/invoice.data';

test('Test thanh toan quoc te - Mastercard', async ({ page }) => {
    // 58:30
    const international = new internationalPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[0]);

    await international.selectInternationalMethod();
    await international.inputInternationalInfo(internationalData[0]);

    // await international.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan quoc te - Visa', async ({ page }) => {
    const international = new internationalPaygatePage(page);
    const simulator = new simulatorPage(page);

    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[0]);

    await international.selectInternationalMethod();
    await international.inputInternationalInfo(internationalData[1]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan quoc te - JCB', async ({ page }) => {
    const international = new internationalPaygatePage(page);
    const simulator = new simulatorPage(page);

    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[0]);

    await international.selectInternationalMethod();
    await international.inputInternationalInfo(internationalData[2]);
    // await international.SubmitAuthen();
    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan quoc te - Amex', async ({ page }) => {
    const international = new internationalPaygatePage(page);
    const simulator = new simulatorPage(page);

    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[0]);

    await international.selectInternationalMethod();
    await international.inputInternationalInfo_Amex(internationalData[3]);
    // await international.SubmitAuthen();
    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan quoc te - CUP', async ({ page }) => {
    const international = new internationalPaygatePage(page);
    const simulator = new simulatorPage(page);

    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[0]);

    await international.selectInternationalMethod();
    await international.inputInternationalInfo(internationalData[4]);
    // await international.SubmitAuthen();
    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan quoc te -demo', async ({ page }) => {
    await page.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await page.locator('input[name="vpc_MerchTxnRef"]').click();
    await page.locator('input[name="vpc_MerchTxnRef"]').press('Enter');
    await page.getByRole('textbox', { name: 'MERCHANT ID' }).click();
    await page.getByRole('textbox', { name: 'MERCHANT ID' }).fill('onepay');
    await page.getByRole('cell', { name: 'Ma Don Hang' }).click();
    await page.locator('input[name="vpc_MerchTxnRef"]').click();
    await page.locator('input[name="vpc_MerchTxnRef"]').fill('TEST_1793635323329-1942399726');
    await page.locator('input[name="vpc_MerchTxnRef"]').press('Enter');
    await page.getByText('Thẻ tín dụng / Ghi nợ').click();
    await page.getByRole('radio', { name: 'Thẻ tín dụng / Ghi nợ' }).check();
    await page.goto('https://dev26.opdev.vn/paygate/general/?id=INV-H76pU3fMRAisbxtFTuNohA&locale=vi&b=&type=1');
    await page.getByRole('textbox', { name: '5678 9101 1234' }).click();
    await page.getByRole('textbox', { name: '5678 9101 1234' }).fill('5123 4500 0000 0008');
    await page.getByRole('textbox', { name: '/25' }).fill('12/33');
    await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
    await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).fill('ng');
    await page.getByRole('textbox', { name: 'NGUYEN VAN A' }).press('Tab');
    await page.getByRole('textbox', { name: 'name@email.com' }).fill('name@gmail.com');
    await page.getByText('Tôi đã đọc, hiểu rõ và đồng').click();
    await page.getByRole('checkbox', { name: 'Tôi đã đọc, hiểu rõ và đồng' }).check();
    await page.getByRole('button', { name: 'Thanh toán' }).click();
    await page.goto('https://dev26.opdev.vn/vpcpay/mpgs3ds2-authenticate-payer.op');
    await page.goto('https://dev26.opdev.vn/bank-emulator/emulator-mpgs/?url=https%3A%2F%2Fdev26.opdev.vn%2Fpaygate%2Fapi%2Fv1%2Fauthorizations%2FAUT-qJK4rGGcSwiM6lDCJQ9s2A%3Finvoice_id%3DINV-H76pU3fMRAisbxtFTuNohA%26payment_id%3DPAY-6epm2ZgXQIe7yJEZxbcxoA%26brand_id%3Dmastercard%26acq%3DMPGS%26merchant%3DTESTOPTEST%26merchTxnRef%3DPAY-6epm2ZgXQIe7yJEZxbcxoA%26version%3D3DS2&order.id=PAY-6epm2ZgXQIe7yJEZxbcxoA&response.gatewayRecommendation=PROCEED&result=SUCCESS');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible();
})

