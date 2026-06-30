# Note bài 3 - lesson 2
## Bài 1

Sửa lại:
```jsx
const BASE_URL_STG = 'https://staging.vn'; // Khai báo đúng môi trường ngay từ đầu
const BASE_URL_PROD = 'https://prod.vn';

let retryCount = 0;
retryCount = 1;               // Đổi từ const sang let 

let currentPage = 1;
currentPage = currentPage + 1;  // Đổi từ const sang let
```

## Bài 2
```jsx
Tên môi trường test (không đổi trong toàn bộ suite) → const
Biến đếm số lần gọi API thất bại → let
Mã giảm giá coupon cần điền vào form → const
Kết quả kiểm tra điều kiện (tính xong không đổi) → const
Trạng thái trang hiện tại khi phân trang → let
```

## Bài 3
```jsx
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false
```
## Bài 4
Các đoạn code sẽ bị báo lỗi và gạch đỏ:
```jsx
let amount: number = "150000" // Khai báo number nhưng lại gán string
const isValid: boolean = 1    // Khai báo boolean nhưng lại gán number 
let timeout: string = 5000    // Khai báo string nhưng lại gán number 
```

## Bài 5

```jsx
const price = 200000;
const qty = 3; 
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

## Bài 6
```jsx
const records: number = 47;
const pageSize: number = 10;

let lastPageRecords: number = records % pageSize;
```
Giải thích: Sử dụng % để chưa lấy dư => cho biết có bao nhiêu bản ghi ở trang cuối cùng

## Bài 7
```jsx
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = cartItemCount > 0 && accountBalance >= orderTotal;

// 3. Có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4. Là VIP hoặc có mã giảm giá
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;
```