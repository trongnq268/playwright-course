import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    // Bài 1
    // let BASE_URL = 'https://staging.vn';
    // BASE_URL = 'https://prod.vn';   // Môi trường thay đổi → gán lại

    // let retryCount = 0;
    // retryCount = 1;               // Test thất bại, tăng retry lên 1

    // let currentPage = 1;
    // currentPage = currentPage + 1; // Chuyển sang trang tiếp theo

    // Bài 2




    const price = 200000;
    const qty = 3;
    const discount = 0.1;
    const total = price * qty * (1 - discount);

    console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
    console.log(`Có ${qty} món hàng trong giỏ.`);
    console.log(`Đơn giá: ${price}, Tổng: ${total}`);


});