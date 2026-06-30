import { test, expect } from '@playwright/test';
// case VD
// test('has title', async ({ page }) => {
//     let firstName = 'Tester';
//     console.log(firstName);
//     firstName = 'QA';
//     console.log(firstName);

//     const url = 'google.com.vn';
//     console.log(url);
// });


//Khái niệm biến với ngôn ngữ QA
//Biến là một vùng nhớ tạm thời để lưu trữ dữ liệu trong quá trình thực thi chương trình
//Biến giúp chúng ta dêx dàng thay đổi giá trị testdata tại một nơi mà không phải sửa thủ công trên nhiều dòng code khác nhau
//VD: Lưu URL web vào note thì khai biến: const url = "http://google.com.vn"
//OTP từ email alert dán vào form: let otpCode = "123123"
//Số tiền cần so sánh: const expected = 15000000



//1, Cú pháp khai báo biến cơ bản
// - const: khai báo biến không thể gán lại, data cố định, ví dụ: URL, thông tin đăng nhập, title,...
// - let: khai báo biến có thể gán lại giá trị mới, data thay đổi trong lúc test, ví dụ: OTP, trạng thái,...
//2, Khai báo biến với let:





// Bài tập 3
// Case 1
// test('has title', async ({ page }) => {

//     let BASE_URL = 'https://staging.vn';
//     BASE_URL = 'https://prod.vn';

//     let retryCount = 0;
//     retryCount = 1;

//     let currentPage = 1;
//     currentPage = currentPage + 1;

// });


//Code ban đầu
// test('has title', async ({ page }) => {

///ts1

// let BASE_URL = 'https://staging.vn';
// BASE_URL = 'https://prod.vn'; 

///ts2

//ban đầu:
// const retryCount = 0;
// retryCount = 1;      


//Sửa lại cách 1:
// let retryCount = 0;
// retryCount = 1;  


//Sửa lại cách 2:
// const retryCount = 0;
// expect(retryCount).toBe(0);


///ts3

 //ban đầu       lỗi TypeError: Assignment to constant variable. do const dùng để khai báo hằng số và giá trị biến không được phép thay đổi sau khi tạo
// const currentPage = 1;
// currentPage = currentPage + 1; 

  //Sửa lại cách 1:
  
// let currentPage = 1;

// currentPage = currentPage + 1;

// expect(currentPage).toBe(2);

//hoặc

// let currentPage = 1;
// currentPage = currentPage + 1;

// });


//Case 7

test('has title', async ({ page }) => {
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Đã đăng nhập và không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Giỏ hàng không trống và đủ số dư
const canCheckout: boolean =
  cartItemCount > 0 && accountBalance >= orderTotal;

// 3. Có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4. Là VIP hoặc có mã giảm giá
const isVIP = false;
const hasCoupon = true;

const isDiscounted: boolean = isVIP || hasCoupon;

});





