import { test, expect } from '@playwright/test';

test('has title', async ({  }) => {

// const url = "google.com.vn";
// console.log(url);

//khai báo biến
  let firstName: string ="Huongbt";
   console.log(firstName);
  let age: number = 23;
   console.log(age);
  let isFemale: boolean = true;
  console.log(isFemale);

  let infor: string = ` Tên tôi là ${firstName} và tôi ${age} tuổi`
  console.log(infor);

//TOÁN TỬ
let number1: number = 10;
let number2: number = 20;
let  total: number;

total = number2 + number1;
console.log(total);

total = number2 - number1;
console.log(total);

total = number2 * number1;
console.log(total);
 
total = number2 / number1;
console.log(total);

total = number1 % number2;
console.log(total);

//Toán tử so sánh
let numbercheck1: number = 1;
let numbercheck2: number = 1;
 // === == !== >= <=
console.log(numbercheck1 == numbercheck2);

// toán tử logic
// && || !

const isLoggedIn = true;
const hasBalance = true;
const userUnlock = false;
// const isLocked = false;

// 1. AND (&&) - TẤT CẢ phải đúng
const canPay = isLoggedIn && hasBalance && !userUnlock; 
console.log(canPay);

// 2. OR (||) - CHỈ CẦN MỘT cái đúng
const isVIP = false, hasCoupon = true;
const isDiscount = isVIP || hasCoupon; // true
console.log(isDiscount);

// 3. NOT (!) - Đảo ngược boolean

const isGuest = !isLoggedIn; // false

});

