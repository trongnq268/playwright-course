import { test, expect } from '@playwright/test';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Đường dẫn tới file Excel (cùng thư mục với file test này)
const excelFilePath = path.join(__dirname, 'data_register.xlsx');

interface TestRecord {
    Phone: string;
    Card: string;
    ResCode: number | string;
    ResMessage: string;
}

let records: TestRecord[] = [];

if (fs.existsSync(excelFilePath)) {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    records = xlsx.utils.sheet_to_json<TestRecord>(worksheet);
    console.log(`✅ Đọc được ${records.length} dòng từ ${excelFilePath}`);
} else {
    console.warn(`⚠️ Không tìm thấy file: ${excelFilePath}`);
    console.warn('📝 Hãy tạo file data_register.xlsx với các cột: Phone, Card, ResCode, ResMessage');
}


// Mỗi dòng trong Excel sẽ tạo ra 1 test case riêng biệt
for (const [index, record] of records.entries()) {
    test(`test register - row ${index + 1} [Phone: ${record.Phone}]`, async ({ page }) => {
        await page.goto('https://dev6-mtf.opdev.vn/ldp/direct-debit/register');
        await page.getByRole('button', { name: 'Register' }).click();
        await page.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('NGUYEN VAN A');
        await page.getByRole('textbox').first().press('Tab');
        await page.getByRole('textbox').nth(1).fill('123456789000');

        // ✅ nth(2) = Phone - lấy từ cột Phone trong Excel
        await page.getByRole('textbox').nth(2).click();
        await page.getByRole('textbox').nth(2).fill(String(record.Phone));

        await page.getByRole('textbox', { name: 'abc@gmail.com' }).click();
        await page.getByRole('textbox', { name: 'abc@gmail.com' }).fill('test@gmail.com');

        // ✅ nth(4) = Card number - lấy từ cột Card trong Excel
        await page.getByRole('textbox').nth(4).click();
        await page.getByRole('textbox').nth(4).fill(String(record.Card));

        await page.getByText('Tôi đã đọc, hiểu rõ và đồng').click();
        await page.getByText('Bằng việc nhấn đăng ký, khách').click();
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        await page.getByText('Hủy giao dịch').click();

        // ✅ Chờ redirect tới trang result
        await page.waitForURL('**/result**', { timeout: 30000 });

        // ✅ Lấy ResponseCode và Message từ URL query params
        const currentUrl = new URL(page.url());
        const actualResponseCode = currentUrl.searchParams.get('ResponseCode') || '';
        const actualMessage = currentUrl.searchParams.get('Message') || '';

        // ✅ Lấy expected values từ Excel (cùng hàng)
        const expectedResCode = String(record.ResCode);
        const expectedResMessage = String(record.ResMessage);

        // ✅ So sánh và log kết quả (Message so sánh không phân biệt hoa/thường)
        const isResCodeMatch = actualResponseCode === expectedResCode;
        const isResMessageMatch = actualMessage.toLowerCase() === expectedResMessage.toLowerCase();
        const isPass = isResCodeMatch && isResMessageMatch;

        const comparisonDetails = [
            `  ResponseCode : Actual="${actualResponseCode}" | Expected="${expectedResCode}" → ${isResCodeMatch ? '✅ MATCH' : '❌ MISMATCH'}`,
            `  Message      : Actual="${actualMessage}" | Expected="${expectedResMessage}" → ${isResMessageMatch ? '✅ MATCH' : '❌ MISMATCH'}`,
        ].join('\n');

        if (isPass) {
            console.log(`✅ PASS - Row ${index + 1} [Phone: ${record.Phone}]`);
            console.log(comparisonDetails);
        } else {
            console.log(`❌ FAIL - Row ${index + 1} [Phone: ${record.Phone}]`);
            console.log(comparisonDetails);
        }

        // ✅ Assert để Playwright đánh pass/fail test case
        expect(isPass, `Row ${index + 1} [Phone: ${record.Phone}] - So sánh kết quả:\n${comparisonDetails}`).toBe(true);

        await page.close();
    });
}
