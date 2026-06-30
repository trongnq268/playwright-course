# Bài 3

## Câu 1: Sửa lỗi `let` / `const`

### 1.1

**Đề bài**

```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';
```

**Đáp án**

Không có lỗi.

```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';
```

**Giải thích**

* `BASE_URL` được gán lại giá trị.
* `let` cho phép thay đổi giá trị sau khi khai báo.

---

### 1.2

**Đề bài**

```ts
const retryCount = 0;
retryCount = 1;
```

**Đáp án**

```ts
let retryCount = 0;
retryCount = 1;
```

**Giải thích**

* `retryCount` tăng sau mỗi lần retry.
* `const` không cho phép gán lại giá trị nên phải đổi sang `let`.

---

### 1.3

**Đề bài**

```ts
const currentPage = 1;
currentPage = currentPage + 1;
```

**Đáp án**

```ts
let currentPage = 1;
currentPage = currentPage + 1;
```

**Giải thích**

* `currentPage` thay đổi khi chuyển sang trang tiếp theo.
* Vì cần cập nhật giá trị nên sử dụng `let`.


# Câu 2: Chọn let hay const

| Trường hợp                       | Đáp án    |
| -------------------------------- | --------- |
| Tên môi trường test              | **const** |
| Biến đếm số lần gọi API thất bại | **let**   |
| Coupon Code                      | **const** |
| Kết quả kiểm tra điều kiện       | **const** |
| Trạng thái trang hiện tại        | **let**   |

---

# Câu 3: Điền kiểu dữ liệu

```ts
const email: string = 'test@onepay.vn';
const totalAmount: number = 500000;
const isCheckboxChecked: boolean = true;
const pageTitle: string = 'Trang chủ';
const itemCount: number = 12;
const isPaymentEnabled: boolean = false;
```

---

# Câu 4: Đoạn nào bị VSCode báo lỗi?

### 4.1.

```ts
let amount: number = "150000";
```
**Báo lỗi** > Do biến `amount` được khai báo kiểu `number` nhưng lại gán giá trị kiểu `string`.

----------------------------------------------------------------------------------------------------

### 4.2.

```ts
const isValid: boolean = 1;
```

**Báo lỗi** > Do biến `isValid` được khai báo kiểu `boolean` nhưng lại gán giá trị kiểu `number`.

----------------------------------------------------------------------------------------------------
### 4.3.

```ts 
const label: string = "Thanh toán";
```
 **Đúng** > Giá trị `"Thanh toán"` thuộc kiểu `string`, đúng với kiểu dữ liệu đã khai báo.

----------------------------------------------------------------------------------------------------

### 4.4.

```ts
let timeout: string = 5000;
```

**Báo lỗi** > Do biến `timeout` được khai báo kiểu `string` nhưng lại gán giá trị kiểu `number`.

----------------------------------------------------------------------------------------------------

### 4.5.

```ts
const count: number = 0;
```

**Đúng** > Giá trị `0` thuộc kiểu `number`, đúng với kiểu dữ liệu đã khai báo.


# Câu 5: Điền Template String

```ts
const price = 200000;
const qty = 3;
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```
----------------------------------------------------------------------------------------------------

Kết quả:

    Tổng tiền sau giảm giá 10%: 540000 VND
    Có 3 món hàng trong giỏ.
    Đơn giá: 200000, Tổng: 540000
----------------------------------------------------------------------------------------------------

# Câu 6: Có 47 bản ghi, mỗi trang hiển thị 10. Trang cuối có bao nhiêu bản ghi? viết công thức tính lastPageRecords. -> Trang cuối có bao nhiêu bản ghi?

```ts
const records: number = 47;
const pageSize: number = 10;

let lastPageRecords: number;
----------------------------------------------------------------------------------------------------

lastPageRecords = records % pageSize;

console.log(lastPageRecords);
```
----------------------------------------------------------------------------------------------------

Kết quả: 7

----------------------------------------------------------------------------------------------------

# Câu 7: Toán tử logic

```ts
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1: Viết điều kiện: đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2: Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = cartItemCount > 0 && accountBalance >= orderTotal;

// 3:  Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4: Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
const isVIP = false;
const hasCoupon = true;

const isDiscounted: boolean = isVIP || hasCoupon;
```

### Kết quả

| Biến         | Giá trị |
| ------------ | ------- |
| canAccess    | true    |
| canCheckout  | true    |
| canPay       | true    |
| isDiscounted | true    |

---
