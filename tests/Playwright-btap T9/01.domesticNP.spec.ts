import { test, expect } from '@playwright/test'
import { simulatorPage } from '../../lib/pages/ui/00.simulator/00.simulator.page';
import { invoiceData } from '../../lib/datas/paygate/invoice.data';
import { domesticPaygatePage } from '../../lib/pages/ui/01.paygate/00.domestic.page';
import { domesticData } from '../../lib/datas/paygate/invoice.data';

// ---------------------------------------------- Napas

test('Test thanh toan noi dia - VCB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(2) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[0]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[0]);
    // await expect(page.getByText('Approved', { exact: true })).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Approved' })).toBeVisible({ timeout: 10000 });
})

test('Test thanh toan noi dia - BIDV NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(4) > .bank-list-item').click();

    await domestic.inputDomesticInfo_NoDate(domesticData[1]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[1]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - AGR NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(6) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[2]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[2]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - Vietin NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(8) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[3]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[3]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - TCB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(9) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[4]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[4]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - VP NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(11) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[5]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[5]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - Sacombank NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(13) > .bank-list-item').click();

    await domestic.inputDomesticInfo_NoDate(domesticData[6]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[6]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - TPB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(15) > .bank-list-item').click();

    await domestic.inputDomesticInfo_NoDate(domesticData[7]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[7]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - MBB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(17) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[8]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[8]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - VIB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(21) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[9]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[9]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - EximBank NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(23) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[10]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[10]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - SHB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(25) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[11]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[11]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - MSB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(27) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[12]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[12]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - HDBANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(29) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[13]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[13]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - SEABANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(31) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[14]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[14]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - ABBANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(33) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[15]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[15]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - BACABANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(35) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[16]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[16]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - NAMABANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(37) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[17]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[17]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - NCB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(39) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[18]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[18]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - MBV NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(41) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[19]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[19]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - PVCOMBANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(43) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[20]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[20]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - SCB NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(45) > .bank-list-item').click();

    await domestic.inputDomesticInfo_NoDate(domesticData[21]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[21]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - BVBANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(47) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[22]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[22]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - VIETABANK NP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(49) > .bank-list-item').click();

    await domestic.inputDomesticInfo(domesticData[23]);
    await domestic.submitOTPdomesticInfo_NP(domesticData[23]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
