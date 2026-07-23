import { test, expect } from '@playwright/test';

test('has title', async () => {
    // let number1: number = 1;
    // let number2: number = 2;
    // // let total: number;

    // // // +,-
    // // total = number1 - number2;
    // // console.log(total);

    // // //*
    // // total = number1 * number2;
    // // console.log(total);

    // // // chia/: chia lấy phần nguyên
    // // total = number1 / number2;
    // // console.log(total); 

    // // // chia %: lấy phần dư
    // // total = number1 % number2;
    // // console.log(total);

    // // ===, !== không dùng ==, !=
     
    // // >, <, >=, <=
    

    // const isLoggedIn: boolean = true;
    // const hasBalance: boolean = true;
    // //const isUnlocked: boolean = false;
    // const isLocked: boolean = false;

    // // 1. AND (&&) - TẤT CẢ phải đúng
    // const canPay = isLoggedIn && hasBalance;
    // console.log(canPay); // true

    // // 2. OR (||) - CHỈ CẦN MỘT cái đúng
    // const isVIP: boolean = false;
    // const hasCoupon: boolean = false;
    // const isDiscount = isVIP || hasCoupon; // true
    // console.log(isDiscount)

    // // 3. NOT (!) - Đảo ngược boolean
    // const isGuest: boolean = true; // false
    // console.log(isGuest)
//  1. 
//     let BASE_URL = 'https://staging.vn';
//     BASE_URL = 'https://prod.vn';   // Môi trường thay đổi → gán lại

//  2. 
//     let retryCount = 0;
//     retryCount = 1;               // Test thất bại, tăng retry lên 1

// 3. 
//     let currentPage = 1;
//     currentPage = currentPage + 1;

    // let amount: number = "150000"
    // const isValid: boolean = 1
    // const label: string = "Thanh toán"
    // let timeout: string = 5000
    // const count: number = 0

    // const price = 200000;
    // const qty = 3;
    // const discount = 0.1;
    // const total = price * qty * (1 - discount);

    // console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
    // console.log(`Có ${qty} món hàng trong giỏ.`);
    // console.log(`Đơn giá: ${price}, Tổng: ${total}`);


    // const records: number = 47;
    // const pageSize: number = 10;
    // let lastPageRecords: number;

    // lastPageRecords = records % pageSize;
    // console.log(lastPageRecords);

    const isLoggedIn = true;
    const isAccountLocked = false;
    const cartItemCount = 2;
    const accountBalance = 500000;
    const orderTotal = 450000;

    // 1. Đã đăng nhập VÀ không bị khóa
    const canAccess: boolean = isLoggedIn && !isAccountLocked;

    // 2. Giỏ hàng không trống VÀ đủ số dư
    const canCheckout: boolean = (cartItemCount > 0) && (accountBalance >= orderTotal);

    // 3. Gộp cả 2 điều kiện: có thể thanh toán
    const canPay: boolean = canAccess && canCheckout;

    // 4. Khách hàng là VIP hoặc có mã giảm giá
    const isVIP = false, hasCoupon = true;
    const isDiscounted: boolean = isVIP || hasCoupon;

    });



    
