Câu 1: Tìm và sửa 3 lỗi liên quan đến `let` / `const`
 3 lỗi phát hiện


| 1 | `let BASE_URL = 'https://staging.vn'; BASE_URL = 'https://prod.vn';` | `BASE_URL` là URL config môi trường — theo best practice không nên gán lại giữa chừng. Tên `UPPER_SNAKE_CASE` cũng ngầm quy ước là **hằng số**. Dùng `let` ở đây sai chuẩn. | Đổi sang `const` và chọn thẳng URL cần dùng. |
| 2 | `const retryCount = 0; retryCount = 1;` | Không được gán lại `const` → **VSCode gạch đỏ**: `Cannot assign to 'retryCount' because it is a constant.` | Đổi `const` → `let` vì retry sẽ tăng dần trong quá trình test. |
| 3 | `const currentPage = 1; currentPage = currentPage + 1;` | Tương tự lỗi 2 — trang hiện tại thay đổi khi phân trang, không thể là `const`. | Đổi `const` → `let`. |

### ✅ Code sau khi sửa

```ts
const BASE_URL = 'https://prod.vn';    // URL môi trường cố định → const

let retryCount = 0;
retryCount = 1;                        // OK vì retryCount là let

let currentPage = 1;
currentPage = currentPage + 1;         // OK vì currentPage là let
```

---



Câu 2: Chọn `let` / `const` phù hợp

| Tên môi trường test (không đổi trong toàn bộ suite) | **`const`** | Không đổi trong suốt quá trình chạy → hằng số. |
| Biến đếm số lần gọi API thất bại | **`let`** | Giá trị tăng dần mỗi lần fail → cần gán lại. |
| Mã giảm giá coupon cần điền vào form | **`const`** | Coupon là giá trị test data cố định, chỉ đọc để `.fill()`. |
| Kết quả kiểm tra điều kiện (tính xong không đổi) | **`const`** | Đã tính xong ra 1 giá trị boolean → không đổi nữa. |
| Trạng thái trang hiện tại khi phân trang | **`let`** | Số trang thay đổi (1 → 2 → 3 ...) → cần gán lại. |



Câu 3: Điền kiểu dữ liệu (`string` / `number` / `boolean`)

```ts
const email: string              = 'test@onepay.vn';    // văn bản → string
const totalAmount: number        = 500000;              // số → number
const isCheckboxChecked: boolean = true;                // đúng/sai → boolean
const pageTitle: string          = 'Trang chủ';         // văn bản → string
const itemCount: number          = 12;                  // số → number
const isPaymentEnabled: boolean  = false;               // đúng/sai → boolean

Câu 4: Đoạn code nào bị VSCode gạch đỏ?

```ts
let amount: number    = "150000"       // ❌ ĐỎ — string không gán được cho number
const isValid: boolean = 1              // ❌ ĐỎ — number không gán được cho boolean
const label: string   = "Thanh toán"   // ✅ OK
let timeout: string   = 5000           // ❌ ĐỎ — number không gán được cho string
const count: number   = 0              // ✅ OK


Câu 5: Điền `${...}` vào chỗ trống

```ts
const price    = 200000;
const qty      = 3;
const discount = 0.1;
const total    = price * qty * (1 - discount);  // 200000 * 3 * 0.9 = 540000

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

Câu 6: Trang cuối có bao nhiêu bản ghi?

**Dữ liệu**: 47 bản ghi, mỗi trang 10 → tổng cộng 5 trang (`Math.ceil(47/10) = 5`).


- Trang 1–4: mỗi trang 10 bản ghi (10 × 4 = 40).
- Trang 5 (trang cuối): 47 − 40 = **7 bản ghi**.
- Về công thức: `47 % 10 = 7` → trang cuối có 7 bản ghi.


Câu 7: Toán tử logic & so sánh

```ts
// 1. Đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;
// = true && !false = true && true = true ✅

// 2. Giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = cartItemCount > 0 && accountBalance >= orderTotal;
// = (2 > 0) && (500000 >= 450000) = true && true = true ✅

// 3. Gộp cả 2 điều kiện: có thể thanh toán
const canPay: boolean = canAccess && canCheckout;
// = true && true = true ✅

// 4. VIP HOẶC có coupon → được giảm giá
const isDiscounted: boolean = isVIP || hasCoupon;
// = false || true = true ✅
```
