### 1. Đoạn code sau có 3 lỗi liên quan đến let / const. Tìm và sửa đúng:

```typescript
const BASE_URL_STG = 'https://staging.vn';
const BASE_URL_PROD = 'https://prod.vn';   

let retryCount = 0;
retryCount = 1;               // Test thất bại, tăng retry lên 1

let currentPage = 1;
currentPage = currentPage + 1; // Chuyển sang trang tiếp theo
```

---

### 2. Đọc từng yêu cầu, chọn từ khoá phù hợp (let / const):

*   Tên môi trường test (không đổi trong toàn bộ suite):  `const`
*   Biến đếm số lần gọi API thất bại: `let` 
*   Mã giảm giá coupon cần điền vào form: `const`
*   Kết quả kiểm tra điều kiện (tính xong không đổi): `const`
*   Trạng thái trang hiện tại khi phân trang: `let` 

---

### 3. Điền từ khoá kiểu dữ liệu phù hợp (string | number | boolean) vào chỗ trống:

```typescript
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false
```

---

### 4. Nhận diện xem đoạn code nào sẽ bị VScode báo lỗi và gạch đỏ:

```typescript
let amount: number = "150000" -> lỗi vì gán value string cho kiểu number
const isValid: boolean = 1 -> lỗi vì gán value number cho kiểu boolean
const label: string = "Thanh toán" -> đúng
let timeout: string = 5000 -> lỗi vì gán number cho kiểu string
const count: number = 0 -> đúng
```

---

### 5. Điền `${...}` vào chỗ trống để in ra đúng kết quả:

```typescript
const price = 200000;
const qty = 3; 
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

---

### 6. Có 47 bản ghi, mỗi trang hiển thị 10. Trang cuối có bao nhiêu bản ghi? Viết công thức tính lastPageRecords:

```typescript
const records: number = 47; 
const pageSize: number  = 10;
let lastPageRecords: number;

// Trang cuối có 7 bản ghi
lastPageRecords = records % pageSize;
```

---

### 7. Thực hành với toán tử logic và so sánh:

```typescript
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
const canAccess: boolean = (isLoggedIn && !isAccountLocked);

// 2. Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = (cartItemCount > 0 && accountBalance >= orderTotal);

// 3. Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
const canPay: boolean = (canAccess && canCheckout);

// 4. Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = (isVIP || hasCoupon);
```