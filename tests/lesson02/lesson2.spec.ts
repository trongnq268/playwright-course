import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    const isLoggedIn = true;
    const hasBalance = true;
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


    // Toán tử so sánh === !==, để check cả data type
    // console.log(number1 === number2);
    // console.log(number1 !== number2);

    // Toán tử >, <, >=, <= 

    // Toán tử so sánh == != === !==
    // total = number1 + number2;
    // console.log(total);

    // total = number1 - number2;
    // console.log(total);

    // total = number1 * number2;
    // console.log(total);

    // total = number1 / number2;
    // console.log(total);

    // total = number1 % number2;
    // console.log(total)



    // let firstName: string = "Tester";
    // console.log(firstName);
    // let age: number = 18; // number bao gồm số nguyên và float
    // console.log(age);
    // let isMale: boolean = false; //boolean là true hoặc false
    // console.log(isMale);

    // let info: string = `Tôi là ${firstName}, năm nay ${age} tuổi, giới tính ${isMale}`  // bắt buộc dùng dấu ``, ko được dùng "" (vì "" dùng cho chuỗi)
    // console.log(info);



});