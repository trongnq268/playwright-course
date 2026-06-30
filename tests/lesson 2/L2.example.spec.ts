import { test, expect } from '@playwright/test';

test('has title', async () => {
  // let firstName='HaNT';
  // console.log(firstName);

  // const url = "google.com.vn";
  // console.log(url);

  // const age: number = 2.5;
  // console.log(firstName);
  // const userName: string = "HaNT tester OnePay";
  // console.log(userName);
  // const isMale: boolean = true ;
  // console.log(isMale);


  // let number1: number = 1000;
  // let number2: string = '1000';
  // let sum = number1 + number2;
  // console.log(sum);

  // let firstName: string = "Tester";
  // console.log(firstName);
  // let age: number = 25;

  // // Tôi là Tester tôi 25 tuổi
  // let info:string = `Tôi là ${firstName} tôi ${age} tuổi`;
  // console.log(info)


  // let number1: number = 10;
  // let number2: number = 3;
  // let total: number;
//   + Phép cộng
//   total = number1 + number2;
//   console.log (total)
// - Phép trừ
//   total = number1 - number2;
//   console.log (total)
//   * Phép nhấn
//   total = number1 * number2;
//   console.log (total)

//    / Phép chia lấy phần nguyên 
//   total = number1 / number2;
//   console.log (total)
//  % Phép chia lấy phần dư (10 chia 3 = 3 dư 1)
//   total = number1 % number2;
//   console.log (total)


// == so sánh và ko check data type (kiểu dữ liệu)
//   let number1: number = 3 ;
//   let number2: string = '3';
// console.log(number1 == number2)
// != Không check data type và so sánh : Check number 2 có khác number 1 không
// let number1: number = 3 ;
// let number2: number = 32 ;
// console.log(number1 != number2)

// let number1: number = 3 ;
// let number2: string = '32' ;
// console.log(number1 != number2)
// === so sánh và bắt buộc check xem có cùng data type (kiểu dữ liệu): Check xem number 1 có khác number 2 ko
// let number1: number = 3 ;
// let number2: string = '3';
// console.log(number1 === number2)

// !== Cùng data type mới so sánh : Check number 2 có khác number 1 không
// let number1: number = 3 ;
// let number2: number = 32 ;
// console.log(number1 !== number2)

//**Nên cùng === và !== 
// Lớn hơn
//  let number1: number = 3 ;
//  let number2: number = 1 ;
//  console.log(number1 > number2)

 // Nhỏ hơn
//  let number1: number = 3 ;
//  let number2: number = 32 ;
//  console.log(number1 < number2)

  // Lớn hơn hoặc bằng 
//  let number1: number = 32 ;
//  let number2: number = 3 ;
//  console.log(number1 >= number2)

// Nhỏ hơn hoặc bằng 
//  let number1: number = 3 ;
//  let number2: number = 32 ;
//  console.log(number1 <= number2)


// const isLoggedIn: boolean = true;
// const hasBalance: boolean = true;
// const userUnLock: boolean = false;
// 1. AND (&&) - TẤT CẢ các điều kiện phải đúng (true)
//  const canPay = isLoggedIn && hasBalance && !userUnLock ; // true
//  console.log(canPay)

// 2. OR (||) - CHỈ CẦN MỘT trong các điều kiện đúng
//  const isVIP = false;
//  const hasCoupon = false;
//  const isDiscount = isVIP || hasCoupon; // true
//  console.log (isDiscount)

// 3. NOT (!) - Đảo ngược boolean
//  const isGuest: boolean = false
//  console.log(!true)

//  const isLoggedIn: boolean = true;
//  const hasBalance: boolean = true;
//  const isLocked: boolean = false;
//  const canPay = isLoggedIn && hasBalance && !isLocked;
// console.log(canPay)


// let BASE_URL = 'https://staging.vn';
// BASE_URL = 'https://prod.vn';   // Môi trường thay đổi → gán lại
// console.log(BASE_URL);

 //const retryCount = 0 ;
//  const retryCount = 1 ;               // Test thất bại, tăng retry lên 1
// console.log(retryCount);

//  let currentPage = 1;
// currentPage = currentPage + 1; 
//  console.log(currentPage); // Chuyển sang trang tiếp theo
// });

// const price = 200000;
// const qty = 3; 
// const discount = 0.1;
// const total = price * qty * (1 - discount);

//console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
//console.log(`Có ${qty} món hàng trong giỏ.`);
 //console.log(`Đơn giá: ${price}, Tổng: ${total}`);

// const records: number = 47; 
// const pageSize: number  = 10;
// let lastPageRecords: number;

// lastPageRecords = records % pageSize;
// console.log (lastPageRecords)

const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
// const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
 //const canCheckout: boolean = cartItemCount >0 && accountBalance >= orderTotal;

// 3. Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
 //const canPay: boolean = isLoggedIn && !isAccountLocked && cartItemCount >0 && accountBalance >= orderTotal;

// 4. Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
const isVIP = false;
const hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;
 console.log (isDiscount)
;})