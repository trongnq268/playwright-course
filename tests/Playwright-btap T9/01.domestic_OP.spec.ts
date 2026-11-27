import { test, expect } from '@playwright/test'
import { simulatorPage } from '../../lib/pages/ui/00.simulator/00.simulator.page';
import { invoiceData } from '../../lib/datas/paygate/invoice.data';
import { domesticPaygatePage } from '../../lib/pages/ui/01.paygate/00.domestic.page';
import { domesticData } from '../../lib/datas/paygate/invoice.data';


test('Test thanh toan noi dia - VCB OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('.bank-list-item').first().click();
    await domestic.inputDomesticInfo(domesticData[0]);

    await domestic.submitOTPdomesticInfo_OP(domesticData[0]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - BIDV OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(3) > .bank-list-item').click();
    // await domestic.selectDomesticVCB_OP();
    await domestic.inputDomesticInfo(domesticData[1]);

    await domestic.submitOTPdomesticInfo_OP(domesticData[1]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - AGR OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(5) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[2]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[2]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - Vietin OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(7) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[3]);
    // await domestic.submitOTPdomesticInfo_OP(domesticData[3]);
    await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - VP OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(10) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[5]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[5]);

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - Sacombank OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(12) > .bank-list-item').click();
    await domestic.inputDomesticInfo_NoDate(domesticData[6]);
    // await domestic.submitOTPdomesticInfo_OP(domesticData[6]);
    await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - TPB OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(14) > .bank-list-item').click();
    await domestic.inputDomesticInfo_NoDate(domesticData[7]);
    // await domestic.submitOTPdomesticInfo_OP(domesticData[7]);
    await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - MBB OP', async ({ page }) => {

    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(16) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[8]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[8]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - VIB OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(20) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[9]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[9]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - Eximbank OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(22) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[10]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[10]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - SHB OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(24) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[11]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[11]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - MSB OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(26) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[12]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[12]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})
test('Test thanh toan noi dia - HDBANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(28) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[13]);
    // await domestic.submitOTPdomesticInfo_OP(domesticData[13]);
    await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - SEABANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(30) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[14]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[14]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - ABBANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(32) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[15]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[15]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - BACABANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(34) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[16]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[16]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - NAMABANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(36) > .bank-list-item').click();
    await domestic.inputDomesticInfo_NoDate(domesticData[17]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[17]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - NCB OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(38) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[18]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[18]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - MBV OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(40) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[19]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[19]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - PVCOMBANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(42) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[20]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[20]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - SCB OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(44) > .bank-list-item').click();
    await domestic.inputDomesticInfo_NoDate(domesticData[21]);
    // await domestic.submitOTPdomesticInfo_OP(domesticData[21]);
    await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - BVBANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(46) > .bank-list-item').click();
    await domestic.inputDomesticInfo(domesticData[22]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[22]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})

test('Test thanh toan noi dia - VIETABANK OP', async ({ page }) => {
    const domestic = new domesticPaygatePage(page);
    const simulator = new simulatorPage(page);
    await simulator.goto('https://dev26-mtf.opdev.vn/client/qt/');
    await simulator.createInvoice(invoiceData[1]);

    await domestic.selectDomesticMethod();
    await page.locator('div:nth-child(48) > .bank-list-item').click();
    await domestic.inputDomesticInfo_NoDate(domesticData[23]);
    await domestic.submitOTPdomesticInfo_OP(domesticData[23]);
    // await domestic.SubmitAuthen();

    await expect(page.getByRole('cell', { name: 'Giao dịch thành công' })).toBeVisible({ timeout: 10000 });

})


