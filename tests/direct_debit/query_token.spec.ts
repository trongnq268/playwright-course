import { test } from '@playwright/test';
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
    // Đọc dữ liệu từ file Excel
    records = xlsx.utils.sheet_to_json<TestRecord>(worksheet, { defval: '' });
    console.log(`Đọc được ${records.length} dòng từ ${excelFilePath}`);
} else {
    console.warn(`Không tìm thấy file: ${excelFilePath}`);
}

// Cấu hình chạy tuần tự các test
test.describe.configure({ mode: 'serial' });

// Hàm cập nhật Token và Status vào file Excel
function updateExcel(account: string | number, token: string, status: string) {
    if (fs.existsSync(excelFilePath)) {
        const workbook = xlsx.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json<any>(worksheet, { defval: '' });

        let updated = false;
        for (const row of rows) {
            if (String(row.Account) === String(account)) {
                row.Token = token;
                row.Status = status; // Lưu state vào Status
                updated = true;
                break;
            }
        }

        if (updated) {
            const newWorksheet = xlsx.utils.json_to_sheet(rows, { header: ['Account', 'TokenId', 'Token', 'Status'] });
            workbook.Sheets[sheetName] = newWorksheet;
            xlsx.writeFile(workbook, excelFilePath);
            console.log(`Đã cập nhật Token: "${account}" -> Token: "${token}", Status: "${status}"`);
        } else {
            console.error(`Không tìm thấy Account: ${account} trong file Excel.`);
        }
    }
}

// Chạy test cho từng dòng dữ liệu trong Excel
for (const [index, record] of records.entries()) {
    test(`Query Token - row ${index + 1} [Account: ${record.Account}]`, async ({ page }) => {
        // Nếu không có TokenId, bỏ qua
        if (!record.TokenId) {
            console.log(`⏭️ Bỏ qua dòng ${index + 1} [Account: ${record.Account}] - Không có TokenId`);
            return;
        }

        // Nếu đã có Token, bỏ qua để tránh query lại
        if (record.Token) {
            console.log(`⏭️ Bỏ qua dòng ${index + 1} [Account: ${record.Account}] - Đã có Token: ${record.Token}`);
            return;
        }

        // Đi tới trang query
        await page.goto('https://dev6-mtf.opdev.vn/ldp/direct-debit/query');

        // Nhập TokenId vào textbox để query
        await page.getByRole('textbox').fill(String(record.TokenId));

        // Nhấn nút Query Token
        await page.getByRole('button', { name: 'Query Token' }).click();

        // Đợi redirect tới trang result
        await page.waitForURL('**/result**', { timeout: 30000 });

        // Lấy dữ liệu từ tham số b_data trong URL
        const currentUrl = new URL(page.url());
        const bData = currentUrl.searchParams.get('b_data');

        if (bData) {
            try {
                // Decode base64 b_data
                const decodedData = JSON.parse(Buffer.from(bData, 'base64').toString('utf-8'));
                console.log(`Row ${index + 1} - Decoded data:`, decodedData);

                // Lấy trường token và state (Status) giống như link result ví dụ
                const token = decodedData.token || '';
                const state = decodedData.state || '';

                if (token || state) {
                    updateExcel(record.Account, token, state);
                }
            } catch (err: any) {
                console.error(`Lỗi giải mã b_data - Row ${index + 1}:`, err.message);
            }
        } else {
            console.error(` Không tìm thấy b_data ở URL kết quả cho Row ${index + 1}`);
        }

        await page.close();
    });
}
