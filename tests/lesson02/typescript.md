## Câu 1

## Phân tích lỗi
### Typescrip1

```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';
```

**Không có lỗi.**

**Giải thích:**

- `BASE_URL` được khai báo bằng `let`.
- Biến khai báo bằng `let` được phép gán lại giá trị.
- Vì môi trường có thể thay đổi (staging → production), nên dùng `let` là phù hợp.

---

### Typescript2

```ts
const retryCount = 0;
retryCount = 1;
```

**Lỗi:** Không thể gán lại giá trị cho một biến được khai báo bằng `const`. Vì `const` chỉ cho phép gán giá trị một lần.

**Cách sửa:** Có thể sửa lại ts bằng 2 cách
**Cách 1:** Dùng let nếu cần thay đổi giá trị

```ts
let retryCount = 0;
retryCount = 1;
```
**Cách 1:** Giữ `const` nhưng không gán lại

```ts
const retryCount = 0;

expect(retryCount).toBe(0);
```


**Giải thích:**

`retryCount` có thể thay đổi trong quá trình chạy test nên cần khai báo bằng `let`. hoặc vẫn giữ `const` nhưng expect không gán lại.

---

### Typescript3

```ts
const currentPage = 1;
currentPage = currentPage + 1;
```

**Lỗi:** Không thể gán lại giá trị cho biến `const`.và biến `const` dùng để khai báo hằng số

**Cách sửa:** Có thể sửa lại ts bằng 2 cách:
**Cách 1:** Trường hợp muốn thay đổi giá trị gán


```ts
let currentPage = 1;

currentPage = currentPage + 1;

expect(currentPage).toBe(2);
```

**hoặc có thể:**

```ts
let currentPage = 1;
currentPage = currentPage + 1;
```

**Cách 2:** Trường hợp biến không thay đổi thì không được gán lại

```ts
const currentPage = 1;

expect(currentPage).toBe(1);
```
**hoặc:**

```ts
currentPage++;
```

---

## Code sau khi sửa

```ts
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';

let retryCount = 0;
retryCount = 1;

let currentPage = 1;
currentPage++;
```

---

## Với cách hiểu của em

- Dùng `const` khi giá trị không thay đổi trong suốt quá trình chạy chương trình.
- Dùng `let` khi giá trị cần được cập nhật hoặc gán lại.
- Trong ví dụ trên, `retryCount` và `currentPage` đều thay đổi giá trị nên phải dùng `let`.
- `BASE_URL` được khai báo bằng `let` nên việc gán lại giá trị là hoàn toàn hợp lệ.

---------------------------------

##Câu 2

## Với cách hiểu của em

- **const** dùng cho những giá trị cố định, không cần thay đổi trong quá trình chạy chương trình.
- **let** dùng cho những biến có thể thay đổi giá trị nhiều lần.
- Khi viết Playwright, em sẽ ưu tiên dùng `const` trước. Chỉ khi biết chắc biến sẽ thay đổi thì mới dùng `let`.

## Đáp án

| Yêu cầu | Đáp án | Giải thích |
|---------|---------|------------|
| Tên môi trường test (không đổi trong toàn bộ suite) | **const** | Tên môi trường được sử dụng cố định trong suốt quá trình chạy test nên không cần thay đổi giá trị. |
| Biến đếm số lần gọi API thất bại | **let** | Biến đếm sẽ tăng lên sau mỗi lần API thất bại nên giá trị sẽ thay đổi. |
| Mã giảm giá coupon cần điền vào form | **const** | Mã coupon được sử dụng cố định trong một lần chạy test, không cần thay đổi sau khi khai báo. |
| Kết quả kiểm tra điều kiện (tính xong không đổi) | **const** | Sau khi tính toán, kết quả không thay đổi nên nên dùng `const`. |
| Trạng thái trang hiện tại khi phân trang | **let** | Khi chuyển trang (page 1 → page 2 → page 3...), giá trị sẽ thay đổi nên cần dùng `let`. |



##Câu 3

## Với cách hiểu của em

- **string**: Dùng để lưu văn bản hoặc chuỗi ký tự như tên, email, URL, tiêu đề.
- **number**: Dùng để lưu các giá trị số như tuổi, số lượng, giá tiền.
- **boolean**: Dùng để lưu trạng thái chỉ có hai giá trị là `true` hoặc `false`.

Khi viết Playwright, em thường sử dụng:
- `string` cho URL, username, password, tiêu đề trang.
- `number` cho số tiền, số lượng sản phẩm, số trang.
- `boolean` cho trạng thái đăng nhập, checkbox, hoặc kết quả kiểm tra điều kiện.


## Đáp án

```ts
const email: string = 'test@onepay.vn';

const totalAmount: number = 500000;

const isCheckboxChecked: boolean = true;

const pageTitle: string = 'Trang chủ';

const itemCount: number = 12;

const isPaymentEnabled: boolean = false;
```

## Giải thích
### 1. email 
**Vì:** Email là chuỗi ký tự. Nên đáp án là string

```ts
const email: string = 'test@onepay.vn';
```

### 2. totalAmount
**Vì:** Giá trị là số tiền. Nên đáp án là number

```ts
const totalAmount: number = 500000;
```

### 3. isCheckboxChecked
**Vì:** Chỉ có hai trạng thái `true` hoặc `false`. Nên đáp án là boolean

```ts
const isCheckboxChecked: boolean = true;
```

### 4. pageTitle
**Vì:** Tiêu đề trang là chuỗi ký tự. Nên đáp án là string

```ts
const pageTitle: string = 'Trang chủ';
```

### 5. itemCount
**Vì:** Đây là số lượng sản phẩm. Nên đáp án là number

```ts
const itemCount: number = 12;
```

### 6. isPaymentEnabled
**Vì:** Chỉ biểu thị trạng thái bật hoặc tắt. Nên chọn boolean

```ts
const isPaymentEnabled: boolean = false;
```


-----------------------------------------

## Câu 4

## Với cách hiểu của em
**TypeScript kiểm tra kiểu dữ liệu ngay khi viết code. Nếu khai báo kiểu dữ liệu không khớp với giá trị được gán thì VS Code sẽ báo lỗi và gạch đỏ. Điều này giúp phát hiện lỗi sớm trước khi chạy chương trình, từ đó giảm lỗi trong quá trình phát triển và kiểm thử.**

## Đáp án

- Đoạn code | `let amount: number = "150000"` | báo lỗi do gán `string` cho biến `number`
- Đoạn code | `const isValid: boolean = 1` | báo lỗi do biến  `boolean` chỉ nhận `true` hoặc `false`
- Đoạn code | `const label: string = "Thanh toán"` | không báo lỗi, khai báo đúng kiểu dữ liệu
- Đoạn code | `let timeout: string = 5000` | báo lỗi do gán `number` cho biến `string`
- Đoạn code | `const count: number = 0` | không báo lỗi, khai báo đúng kiểu dữ liệu



## Câu 5
## Với cách hiểu của em
- Khi muốn chèn giá trị của biến vào chuỗi, em sử dụng **Template Literal** với dấu **backtick (`)**.
- Biến được đặt trong cú pháp **`${tên_biến}`**.
- Cách này giúp code ngắn gọn, dễ đọc hơn so với việc nối chuỗi bằng dấu `+`.

## Đáp án
```text
Tổng tiền sau giảm giá 10%: 540000 VND
Có 3 món hàng trong giỏ.
Đơn giá: 200000, Tổng: 540000
```

## Giải thích

### 1. `${total}`

```ts
console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
```

`total` đã được tính trước:

```ts
price * qty * (1 - discount)

↓

200000 * 3 * (1 - 0.1)

↓

200000 * 3 * 0.9

↓

540000
```

---

### 2. `${qty}`

```ts
console.log(`Có ${qty} món hàng trong giỏ.`);
```

`qty = 3`

Kết quả:

```text
Có 3 món hàng trong giỏ.
```

---

### 3. `${price}` và `${total}`

```ts
console.log(`Đơn giá: ${price}, Tổng: ${total}`);
```

Kết quả:

```text
Đơn giá: 200000, Tổng: 540000
```

## Câu 6

## Với cách hiểu của em

- Dùng toán tử `%` để lấy số dư sau phép chia.
- Nếu còn dư thì số dư chính là số bản ghi ở trang cuối.
- Nếu chia hết thì trang cuối sẽ có đầy đủ số bản ghi bằng `pageSize`.

## Đáp án

```ts
lastPageRecords = 7;
```
** Vì:** Trang cuối cùng sẽ có 7 bản ghi

```text
47 % 10 = 7
```

** Trường hợp đặc biệt:** Nếu tổng số bản ghi chia hết cho số bản ghi mỗi trang thì phép chia lấy dư (`%`) sẽ bằng **0**. Thì lúc này trang cuối vẫn có 10 bản ghi

** Code đầy đủ:**
```ts
lastPageRecords =
  records % pageSize === 0
    ? pageSize
    : records % pageSize;
```


## Câu 7

## Theo cách hiểu của em
- `&&` (AND) dùng khi **tất cả điều kiện đều phải đúng**.
- `||` (OR) dùng khi **chỉ cần một điều kiện đúng**.
- `!` (NOT) dùng để **đảo ngược giá trị boolean** (`true` thành `false`, `false` thành `true`).
- Trong Playwright, các toán tử logic thường được dùng để kiểm tra điều kiện trước khi thực hiện thao tác hoặc xác minh kết quả của test.

## Đáp án

```ts
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
```


