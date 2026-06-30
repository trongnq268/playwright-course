# 📚 BÀI TẬP 3

## 1️⃣ Câu 1

### Đoạn 1

Code gốc:

```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';   // Môi trường thay đổi → gán lại
```

Lỗi:

Sai logic khi chọn từ khóa khai báo: BASE_URL, URL thường là cấu hình cố định

Sửa:

```TypeScript
// URL thường cố định → dùng const
const BASE_URL = 'https://staging.vn';
// Nếu thực sự cần đổi môi trường thì có thể dùng let
```

### Đoạn 2

Code gốc:

```ts
const retryCount = 0;
retryCount = 1;               // Test thất bại, tăng retry lên 1
```


Lỗi:
Không thể gán lại giá trị cho `const`.

Sửa:

```ts
let retryCount = 0;
retryCount = 1;
```

### Đoạn 3

Code gốc:

```ts
const currentPage = 1;
currentPage = currentPage + 1; // Chuyển sang trang tiếp theo
```

Lỗi:
currentPage thay đổi khi chuyển trang nên không nên dùng `const`.

Sửa:

```TypeScript
let currentPage = 1;
currentPage = currentPage + 1;
```

---

## 2️⃣ Câu 2



| Yêu cầu                                                    | Đáp án | Giải thích                                                                                                              |
| ------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Tên môi trường test (không đổi trong toàn bộ suite) | const     | Tên môi trường sẽ được sử dụng xuyên suốt quá trình chạy test và không thay đổi, nên dùng`const`. |
| Biến đếm số lần gọi API thất bại                     | let       | Biến đếm sẽ tăng lên mỗi khi gọi API thất bại, vì giá trị thay đổi nên dùng`let`.                      |
| Mã giảm giá coupon cần điền vào form                  | const     | Mã coupon đã được xác định trước và không thay đổi trong quá trình chạy test, nên dùng`const`.      |
| Kết quả kiểm tra điều kiện (tính xong không đổi)   | const     | Sau khi tính toán điều kiện, kết quả sẽ được giữ nguyên để sử dụng tiếp, nên dùng`const`.           |
| Trạng thái trang hiện tại khi phân trang                | let       | Khi chuyển sang trang tiếp theo hoặc quay lại trang trước, số trang hiện tại sẽ thay đổi, nên dùng`let`.  |

---

## 3️⃣ Câu 3

```ts
const email: string = "test@onepay.vn";
const totalAmount: number = 500000;
const isCheckboxChecked: boolean = true;
const pageTitle: string = "Trang chủ";
const itemCount: number = 12;
const isPaymentEnabled: boolean = false;
```

---

## 4️⃣ Câu 4

❌ Đoạn code sẽ bị VScode báo lỗi và gạch đỏ:

1.

```ts
let amount: number = "150000";
```

⚠️ Sai vì number nhưng lại gán string.

2. 

```ts
const isValid: boolean = 1;
```

⚠️ Sai vì boolean chỉ nhận true hoặc false.

3. 

```ts
let timeout: string = 5000;
```

⚠️ Sai vì string nhưng lại gán number.

## 5️⃣ Câu 5

```ts
const price = 200000;
const qty = 3;
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

---

## 6️⃣ Câu 6

```ts
    const records: number = 47;
    const pageSize: number = 10;
    let lastPageRecords: number;

    lastPageRecords = records % pageSize;
    console.log(lastPageRecords);
```

Kết quả:

```
47 % 10 = 7
```

=> Trang cuối có **7 bản ghi**.

---

## 7️⃣ Câu 7

```ts
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = (cartItemCount > 0) && (accountBalance >= orderTotal);

// 3. Gộp cả 2 điều kiện: có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4. Khách hàng là VIP hoặc có mã giảm giá
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;
```
