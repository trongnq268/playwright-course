bài 3.1
```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';   
console.log(BASE_URL);
```

```ts
const retryCount = 1 ;               
console.log(retryCount);              
```

```ts
let currentPage = 1;
currentPage = currentPage + 1; 
console.log(currentPage);
 ```


 Bài 3.2
Tên môi trường test (không đổi trong toàn bộ suite)	->   const
Biến đếm số lần gọi API thất bại	-> let  
Mã giảm giá coupon cần điền vào form	->   const
Kết quả kiểm tra điều kiện (tính xong không đổi)	->   const
Trạng thái trang hiện tại khi phân trang	-> let  

Bài 3.3
```ts
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false
```

Bài 3.4
```ts
let amount: number = "150000"              -> ko có ""
const isValid: boolean = 1                 -> chỉ có true/false
const label: string = "Thanh toán" 
let timeout: string = 5000                 -> sai định dạng
const count: number = 0 
```

Bài 3.5
```ts
const price = 200000;
const qty = 3; 
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);

```
Bài 3.6
```ts
const records: number = 47; 
const pageSize: number  = 10;
let lastPageRecords: number;

lastPageRecords = records % pageSize;
console.log (lastPageRecords)

Bài 3.7
```ts
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
```ts
const canAccess: boolean = isLoggedIn && !isAccountLocked;
console.log (canAccess)
```

// 2. Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
```ts
const canCheckout: boolean = cartItemCount >0 && accountBalance >= orderTotal;
console.log (canCheckout);
```

// 3. Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
```ts
const canPay: boolean = isLoggedIn && !isAccountLocked && cartItemCount >0 && accountBalance >= orderTotal;
console.log (canPay)
```

// 4. Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
```ts
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;
console.log (isDiscount);
```
;})
```