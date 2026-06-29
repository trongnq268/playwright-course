import { test, expect } from '@playwright/test';

test('has title', async () => {
    let number1: number = 1;
    let number2: number = 2;
    // let total: number;

    // // +,-
    // total = number1 - number2;
    // console.log(total);

    // //*
    // total = number1 * number2;
    // console.log(total);

    // // chia/: chia lấy phần nguyên
    // total = number1 / number2;
    // console.log(total); 

    // // chia %: lấy phần dư
    // total = number1 % number2;
    // console.log(total);

    // ===, !== không dùng ==, !=
     
    // >, <, >=, <=
    

    const isLoggedIn: boolean = true;
    const hasBalance: boolean = true;
    //const isUnlocked: boolean = false;
    const isLocked: boolean = false;

    // 1. AND (&&) - TẤT CẢ phải đúng
    const canPay = isLoggedIn && hasBalance;
    console.log(canPay); // true

    // 2. OR (||) - CHỈ CẦN MỘT cái đúng
    const isVIP: boolean = false;
    const hasCoupon: boolean = false;
    const isDiscount = isVIP || hasCoupon; // true
    console.log(isDiscount)

    // 3. NOT (!) - Đảo ngược boolean
    const isGuest: boolean = true; // false
    console.log(isGuest)

    
    });



    
