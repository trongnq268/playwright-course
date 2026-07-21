import { test, expect } from '@playwright/test';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Đường dẫn tới file Excel (cùng thư mục với file test này)
const excelFilePath = path.join(__dirname, 'create_data.xlsx');

interface TestRecord {
    Account: string | number;
    TokenId?: string;
    Token?: string;
    Status?: string;
}

let records: TestRecord[] = [];

if (fs.existsSync(excelFilePath)) {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Sử dụng { defval: '' } để đảm bảo cột TokenId luôn tồn tại trong các record
    records = xlsx.utils.sheet_to_json<TestRecord>(worksheet, { defval: '' });
    console.log(`Đọc được ${records.length} dòng từ ${excelFilePath}`);
} else {
    console.warn(`Không tìm thấy file: ${excelFilePath}`);
    console.warn('Hãy tạo file create_data.xlsx với các cột: Account, TokenId, Token, Status');
}

// Cấu hình chạy tuần tự các test trong file này để tránh xung đột ghi file Excel
test.describe.configure({ mode: 'serial' });

// Hàm cập nhật TokenId vào file Excel cho một Account cụ thể
function updateTokenInExcel(account: string | number, tokenId: string) {
    if (fs.existsSync(excelFilePath)) {
        const workbook = xlsx.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json<any>(worksheet, { defval: '' });

        let updated = false;
        for (const row of rows) {
            if (String(row.Account) === String(account)) {
                row.TokenId = tokenId;
                updated = true;
                break;
            }
        }

        if (updated) {
            const newWorksheet = xlsx.utils.json_to_sheet(rows, { header: ['Account', 'TokenId'] });
            workbook.Sheets[sheetName] = newWorksheet;
            xlsx.writeFile(workbook, excelFilePath);
            console.log(`✅ Đã lưu TokenId: "${tokenId}" cho Account: "${account}"`);
        } else {
            console.error(`❌ Không tìm thấy Account: ${account} trong file Excel để cập nhật TokenId.`);
        }
    } else {
        console.error(`❌ Không thể lưu TokenId vì không tìm thấy file Excel tại: ${excelFilePath}`);
    }
}

// Mỗi dòng trong Excel sẽ tạo ra 1 test case riêng biệt
for (const [index, record] of records.entries()) {
    test(`test register - row ${index + 1} [Account: ${record.Account}]`, async ({ page }) => {
        // Nếu đã có TokenId từ trước (ở lần chạy trước), bỏ qua để tiết kiệm thời gian
        if (record.TokenId) {
            console.log(`⏭️ Bỏ qua dòng ${index + 1} [Account: ${record.Account}] - Đã có TokenId: ${record.TokenId}`);
            return;
        }

        await page.goto('https://dev6-mtf.opdev.vn/ldp/direct-debit/register');
        await page.getByRole('button', { name: 'Register' }).click();
        await page.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();
        await page.getByRole('textbox').first().fill('NGUYEN VAN A');
        await page.getByRole('textbox').nth(1).fill('123456789000');

        // nth(2) = Phone - dùng mặc định theo script ban đầu
        await page.getByRole('textbox').nth(2).fill('0912300000');

        await page.getByRole('textbox', { name: 'abc@gmail.com' }).fill('test@gmail.com');

        // nth(4) = Account number - lấy từ cột Account trong Excel
        await page.getByRole('textbox').nth(4).fill(String(record.Account));

        await page.getByText('Tôi đã đọc, hiểu rõ và đồng').click();
        await page.getByText('Bằng việc nhấn đăng ký, khách').click();
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        await page.getByRole('textbox', { name: 'Nhập mã xác thực' }).fill('000000');
        await page.getByRole('button', { name: 'Xác nhận' }).click();

        // Chờ redirect tới trang result
        await page.waitForURL('**/result**', { timeout: 30000 });

        // Lấy các tham số từ URL
        const currentUrl = new URL(page.url());
        const actualResponseCode = currentUrl.searchParams.get('ResponseCode') || '';
        const actualMessage = currentUrl.searchParams.get('Message') || '';
        const merchTokenRef = currentUrl.searchParams.get('MerchTokenRef') || '';

        if (actualResponseCode === '0') {
            updateTokenInExcel(record.Account, merchTokenRef);
        } else {
            console.error(`❌ Lỗi đăng ký - Row ${index + 1} [Account: ${record.Account}]: Message = "${actualMessage}" (ResponseCode: ${actualResponseCode})`);
        }

        // Đảm bảo test case fail nếu đăng ký không thành công
        expect(actualResponseCode).toBe('0');

        await page.close();
    });
}
