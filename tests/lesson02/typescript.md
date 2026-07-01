## Bài 1

```typescript
const BASE_URL_STAGING = 'https://staging.vn';
const BASE_URL_PROD = 'https://prod.vn';   // Config môi trường nên để là hằng số và không nên gán lại

let retryCount = 0;
retryCount = 1;               // Test thất bại, tăng retry lên 1

let currentPage = 1;
currentPage = currentPage + 1; // Chuyển sang trang tiếp theo

```

## Bài 2
```
**Tên môi trường test (không đổi trong toàn bộ suite)**           | const
**Biến đếm số lần gọi API thất bại**                              | let
**Mã giảm giá coupon cần điền vào form**                          | const
**Kết quả kiểm tra điều kiện (tính xong không đổi)**              | const
**Trạng thái trang hiện tại khi phân trang**                      | let
```

## Bài 3
```typescript
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false
```

## Bài 4

```typescript
let amount: number = "150000" // highlight ở amount đang khai báo dạng number, nhưng giá trị lại là string nên bị báo lỗi
const isValid: boolean = 1 // highlight ở isValid đang khai báo dạng boolean, nhưng giá trị lại là number nên bị báo lỗi
const label: string = "Thanh toán"
let timeout: string = 5000 // highlight ở timeout đang khai báo dạng string, nhưng giá trị lại là number nên bị báo lỗi
const count: number = 0
```
***Ngoài các lỗi trên thì còn lỗi thiếu `;` mỗi cuối dòng.***

## Bài 5
```typescript
const price = 200000;
const qty = 3; 
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10% ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

## Bài 6
```typescript
const records: number = 47; 
const pageSize: number  = 10;
let lastPageRecords: number = records % pageSize;
console.log(`Số dòng trên trang cuối cùng là: ${lastPageRecords}`);
```

## Bài 7
```typescript
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
```