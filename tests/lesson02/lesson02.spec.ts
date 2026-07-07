import { test, expect } from '@playwright/test';

test('homework_1', async () => {
    let firstName: string = 'Tên';
    console.log(firstName);
    let age: number = 70;
    console.log(age)
    const info = `Tôi là ${firstName} tôi năm nay hơn ${age} tuổi`;
    console.log(info);
});

test('homework_3', async () => {
    const email: string = 'test@onepay.vn'
    const totalAmount: number = 500000
    const isCheckboxChecked: boolean = true
    const pageTitle: string = 'Trang chủ'
    const itemCount: number = 12
    const isPaymentEnabled: boolean = false
});

//test('homework_4', async () => {
//let amount: number = "150000";
//const isValid: boolean = 1;
//const label: string = "Thanh toán";
//let timeout: string = 5000;
//const count: number = 0;
//});

test('homework_5', async () => {
    const price = 200000;
    const qty = 3;
    const discount = 0.1;
    const total = price * qty * (1 - discount);

    console.log(`Tổng tiền sau giảm giá 10% ${total} VND`);
    console.log(`Có ${qty} món hàng trong giỏ.`);
    console.log(`Đơn giá: ${price}, Tổng: ${total}`);
});

test('homework_6', async () => {
    const records: number = 47;
    const pageSize: number = 10;
    let lastPageRecords: number = records % pageSize;
    console.log(`Số dòng trên trang cuối cùng là: ${lastPageRecords}`);
});

test('homework_7', async () => {
    const isLoggedIn = true;
    const isAccountLocked = false;
    const cartItemCount = 2;
    const accountBalance = 500000;
    const orderTotal = 450000;

    // 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
    const canAccess: boolean = isLoggedIn && !isAccountLocked;

    // 2. Giỏ hàng không trống VÀ đủ số dư
    const canCheckout: boolean =
        cartItemCount > 0 && (accountBalance >= orderTotal);

    // 3. Có thể thanh toán
    const canPay: boolean = canAccess && canCheckout;

    // 4. VIP hoặc có mã giảm giá
    const isVIP = false, hasCoupon = true;
    const isDiscounted: boolean = isVIP || hasCoupon;

    console.log(canAccess);
    console.log(canCheckout);
    console.log(canPay);
    console.log(isDiscounted);
});
