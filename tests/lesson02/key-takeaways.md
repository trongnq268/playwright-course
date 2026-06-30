# Note Buổi 2 - TypeScript: Biến, Kiểu dữ liệu & Toán tử

---

## 1. Biến là gì?

Biến là nơi dùng để lưu trữ dữ liệu trong quá trình chương trình chạy. Thay vì viết đi viết lại nhiều lần, chỉ cần lưu vào biến.

Ví dụ trong Automation:

- URL website
- Username
- Password


```ts
const Url = "http://google.com.vn/";
```

---

## 2. Let và const

Const: dùng khi giá trị **không thay đổi**.

```ts
const BASE_URL = "https://staging.vn";
const EXPECTED_TITLE = "Trang chủ";
```

> Nếu cố gắng thay đổi thì IDE sẽ báo lỗi

Let: dùng khi giá trị biến đó **có thể thay đổi**.

Ví dụ:

```ts
let number = "";
number = "482910";
```

---

### Quy tắc nhớ

👉 Mặc định dùng **const**

👉 Chỉ dùng **let** khi biết chắc sẽ thay đổi giá trị.

---

## 3. Quy tắc đặt tên biến

Sử dụng camelCase

Đúng

```ts
productName
totalAmount
isLoggedIn
```

Sai

```ts
u
1name
```

Tên biến nên thể hiện đúng ý nghĩa dữ liệu.

---

## 4. Kiểu dữ liệu (Data Types)

### String

Dùng để lưu văn bản.

```ts
const username: string = "admin";
```


---

### Number

Dùng để lưu số.

```ts
const amount: number = 150000;
```

Có thể tính toán

```ts
const tax = amount * 0.1;
```

Lưu ý:

Nếu API trả về "150000" thì đây vẫn là **string**, nếu thực hiện "150000" + 50000 thì kết quả sẽ là 15000050000 chứ không phải 200000
=> Cần convert sang number.

---

### Boolean

Chỉ có

```ts
true
false
```

Ví dụ

```ts
const isLoggedIn = true;
const isPaymentSuccess = false;
```

Nên đặt tên bắt đầu bằng

- is
- has
- can
- should

Ví dụ

```ts
isValid
hasToken
canLogin
```

---

### null và undefined

undefined: là biến đã khai báo nhưng chưa có giá trị.

```ts
let errorMessage: string | undefined;
```

---

null: do người code chủ động gán.

```ts
let avatar: string | null = null;
```

Khác nhau

| undefined | null |
|------------|------|
| Chưa được gán | Chủ động gán rỗng |

Nếu truy cập thuộc tính của null hoặc undefined thì chương trình có thể bị lỗi.

---

## 5. Type Annotation

Là khai báo kiểu dữ liệu.

Cú pháp

```ts
let amount: number = 150000;
```

Có thể khai báo

```ts
let name: string

let isOk: boolean

let list: string[]
```

Lợi ích

- Để biết kiểu dữ liệu
- Báo lỗi sớm

Ví dụ

```ts
let amount: number = "150000";
```

Báo lỗi ngay:

```
Type 'string' is not assignable to type 'number'
```

Không cần phải chạy mới biết.

---

## 6. Type Inference

TypeScript có thể tự đoán kiểu.

Ví dụ

```ts
const name = "Playwright";
```

TS hiểu đây là string.

```ts
const price = 25000;
```

TS hiểu là number.

> Tốt nhất nên khai báo kiểu từ đầu

## 7. Template String

Thay vì

```ts
const msg =
"Hello " + name + " total " + amount;
```

Nên dùng

```ts
const msg =
`Hello ${name}, total ${amount}`;
```

Ưu điểm

- Dễ đọc
- Dễ sửa
- Không phải nối chuỗi bằng +

---

Ví dụ

```ts
const expected = 150000;
const actual = 148000;

const message =
`Expected: ${expected}, Actual: ${actual}`;
```


---

## 8. Toán tử

### Toán tử số học

```ts
+, -, *, /, %
```

Ví dụ

```ts
const subtotal = price * quantity;

const discount = subtotal * 0.1;

const total = subtotal - discount;
```

---

### Toán tử so sánh

```ts
>, <, >=, <=
```

Quan trọng nhất "===" và "!=="

Ví dụ

```ts
150000 === 150000
```

true

```ts
150000 === "150000"
```

false

---

Không nên dùng "==" vì sẽ tự ép kiểu.

---

### Toán tử logic

AND ( && ): Tất cả điều kiện phải đúng.

```ts
isLoggedIn &&
hasBalance &&
!isLocked
```

---

OR ( || ): Chỉ cần một điều kiện đúng.

```ts
isVIP || hasCoupon
```

---

NOT (!): Đảo ngược giá trị.

```ts
!isLocked
```

---

## 9. Đọc lỗi trong IDE

Các lỗi thường gặp

-  Sai kiểu dữ liệu

```ts
let amount: number = "150000";
```


- Sai tên biến

```ts
console.log(productNam);
```

- Gán lại const

```ts
const MAX = 100;

MAX = 200;
```

- Tính toán với string

```ts
"abc" * 2
```

---

### Khi gặp gạch đỏ

- Bước 1: Hover vào lỗi.
- Bước 2: Đọc thông báo.
- Bước 3: Kiểm tra kiểu dữ liệu.
- Bước 4: Sửa code.
- Bước 5: Lưu file.

=> Nếu gạch đỏ mất là sửa đúng.
