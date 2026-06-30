import { test } from '@playwright/test';

test('Lesson 2 - TypeScript Practice', async () => {

console.log("========== CÂU 1 ==========");
//1.1:
  let BASE_URL = 'https://staging.vn';
  BASE_URL = 'https://prod.vn';
  
  console.log("BASE_URL:", BASE_URL);

//1.2:
  let retryCount = 0;
  retryCount = 1;

  console.log("Retry Count:", retryCount);

//1.3:
  let currentPage = 1;
  currentPage = currentPage + 1;

  console.log("Current Page:", currentPage);

console.log("\n========== CÂU 3 ==========");

  const email: string = 'test@onepay.vn';
  const totalAmount: number = 500000;
  const isCheckboxChecked: boolean = true;
  const pageTitle: string = 'Trang chủ';
  const itemCount: number = 12;
  const isPaymentEnabled: boolean = false;

  console.log(email);
  console.log(totalAmount);
  console.log(isCheckboxChecked);
  console.log(pageTitle);
  console.log(itemCount);
  console.log(isPaymentEnabled);

console.log("\n========== CÂU 5 ==========");

    const price = 200000;
    const qty = 3;
    const discount = 0.1;
    const total = price * qty * (1 - discount);

    console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
    console.log(`Có ${qty} món hàng trong giỏ.`);
    console.log(`Đơn giá: ${price} VND, Tổng: ${total} VND`);

console.log("\n========== CÂU 6 ==========");

  const records: number = 47;
  const pageSize: number = 10;

  let lastPageRecords: number = records % pageSize;

  console.log(`Trang cuối có ${lastPageRecords} bản ghi.`);

  console.log("\n========== CÂU 7 ==========");

  const isLoggedIn = true;
  const isAccountLocked = false;
  const cartItemCount = 2;
  const accountBalance = 500000;
  const orderTotal = 450000;

  const canAccess: boolean =
    isLoggedIn && !isAccountLocked;

  const canCheckout: boolean =
    cartItemCount > 0 &&
    accountBalance >= orderTotal;

  const canPay: boolean =
    canAccess && canCheckout;

  const isVIP = false;
  const hasCoupon = true;

  const isDiscounted: boolean =
    isVIP || hasCoupon;

  console.log("Can Access:", canAccess);
  console.log("Can Checkout:", canCheckout);
  console.log("Can Pay:", canPay);
  console.log("Discount:", isDiscounted);

});