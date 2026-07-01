import { test, expect } from '@playwright/test';

test('has title', async () => {

    const isLoggedIn: boolean = true;
    const hasBalance = true;
    const userUnLock = false;
    const isLocked = false;

    // 1. AND (&&) - TẤT CẢ phải đúng
    const canPay = isLoggedIn && hasBalance && !isLocked; // true

    // 2. OR (||) - CHỈ CẦN MỘT cái đúng
    const isVIP = false, hasCoupon = true;
    const isDiscount = isVIP || hasCoupon; // true

    // 3. NOT (!) - Đảo ngược boolean
    const isGuest = !isLoggedIn; // false






    // let number1: number = 10;
    // let number2: number = 3;
    // let total: number;

    //==
    // ===
    // !=
    // !==
    // console.log(number1 <= number2)
    // nen su dung === hoac !== de so sanh trong typescript
    // ko sd == hoac != vi no se so sanh gia tri va kieu du lieu

    // // tru
    //    total = number1 - number2;
    //    console.log(total);
    // // cong
    //    total = number1 + number2;
    //    console.log(total);
    // // nhan
    //    total = number1 * number2;
    //    console.log(total);
    // // chia
    //    total = number1 / number2;
    //     console.log(total);
    // // chia lay du
    //     total = number1 % number2;
    //     console.log(total);



    // let firstName: string = 'Tester';
    // console.log(firstName);

    // let age: number = 25;
    // console.log(age);

    // let info: string = `Tôi là ${firstName} tôi ${age} tuổi`;
    // console.log(info);

    // let isMale: boolean = true; // true hoặc false
    // console.log(isMale);



    // console.log(firstName);

    // firstName = 'test2';
    // console.log(firstName);

    // const url = 'google.com.vn';
    // console.log(url);
});

