### Lesson 2 - TypeScript: Biến, Kiểu dữ liệu & Toán tử

##  Mục tiêu buổi học

* Biết cách khai báo biến bằng `const` và `let`.
* Hiểu các kiểu dữ liệu cơ bản trong TypeScript.
* Viết được Type Annotation để VSCode kiểm tra lỗi ngay khi code.
* Sử dụng Template String để log dữ liệu rõ ràng.
* Áp dụng toán tử để tính toán và kiểm tra điều kiện trong Automation Test.


# 1. Variable (Biến)

Biến giống như **một chiếc hộp có tên**, dùng để lưu dữ liệu để sử dụng nhiều lần.

Ví dụ:

```
const productName: string = "iPhone 16";
const price: number = 25000000;
```

-> Nếu đổi tên sản phẩm chỉ cần sửa 1 chỗ, toàn bộ code sẽ dùng giá trị mới.


# 2. let và const

## const

Dùng cho dữ liệu **không thay đổi**.

```
const baseUrl = "https://demo.com";
```

Sau đó:
```
baseUrl = "https://abc.com";
```

-> Không được -> VSCode sẽ báo lỗi.


## let

Dùng khi giá trị có thể thay đổi.

Ví dụ:

```
let quantity = 1;

quantity = 2;
```
-> Hợp lệ.


## Mẹo nhớ

> Không chắc dùng gì → dùng **const**.

Chỉ dùng **let** khi chắc chắn sẽ thay đổi giá trị.


# 3. Kiểu dữ liệu (Data Type)

## String

Lưu chữ.

```
const username: string = "huongbt";
```

Ví dụ thực tế:

* Email
* Password
* URL
* Tên sản phẩm

## Number

Lưu số.

```
const amount: number = 500000;
```

Ví dụ:

* Giá tiền
* Tuổi
* Timeout
* Số lượng sản phẩm

## Boolean

Chỉ có:

* true
* false

Ví dụ:

```ts
const isLogin = true;
const hasCoupon = false;
```

Boolean thường dùng để kiểm tra điều kiện.

## null

Có chủ đích để trống.

```
let note: string | null = null;
```

Ý nghĩa > Hiện tại chưa có dữ liệu.

## undefined

Biến chưa được gán giá trị.

```
let otp;
```

Kết quả: ``` undefined```


# 4. Type Annotation

Cú pháp:

```
const age: number = 23;
```

Trong đó:

* age → tên biến
* number → kiểu dữ liệu

Lợi ích:

* VSCode báo lỗi ngay.
* Hạn chế bug.

Ví dụ sai:

```ts
const age: number = "23";
```

VSCode sẽ báo đỏ vì `"23"` là string.


# 5. Template String

Dùng dấu **backtick** (`).

Ví dụ:

```ts
const name = "Hương";
const age = 23;

console.log(`Tên: ${name}, Tuổi: ${age}`);
```

Kết quả:

```
Tên: Hương, Tuổi: 23
```

Ưu điểm:

* Dễ đọc.
* Không phải nối chuỗi bằng dấu `+`.


# 6. Toán tử

## Toán tử số học

```ts
+
-
*
/
%
```

Ví dụ:

```ts
const total = price * quantity;
```

---

## Toán tử so sánh

Nên dùng:

```ts
===
!==
```

Ví dụ:

```ts
100 === 100
```

true

```ts
100 === "100"
```

false

Không nên dùng:

```ts
==
```

Vì JavaScript sẽ tự ép kiểu.

---

## Toán tử Logic

### AND

```ts
&&
```

Ví dụ:

```ts
isLogin && hasBalance
```

Chỉ đúng khi cả hai đều đúng.

---

### OR

```ts
||
```

Ví dụ:

```ts
isVIP || hasCoupon
```

Chỉ cần một điều kiện đúng.

---

### NOT

```ts
!
```

Ví dụ:

```ts
!isLocked
```

Nếu tài khoản chưa bị khóa thì trả về true.

---

# 7. Đọc lỗi VSCode

Khi thấy gạch đỏ:

Đọc thông báo lỗi.

Kiểm tra kiểu dữ liệu.

Sửa đúng kiểu.

Không nên chạy test ngay khi còn lỗi đỏ.

---

# Ví dụ thực tế Automation Test

Ví dụ kiểm tra người dùng có thể thanh toán hay không.

```ts
const isLogin = true;
const hasMoney = true;
const isLocked = false;

const canPay =
    isLogin &&
    hasMoney &&
    !isLocked;

console.log(canPay);
```

Kết quả:

```
true
```

Nếu tài khoản bị khóa:

```ts
const isLocked = true;
```

Kết quả:

```
false
```

---

# Điều mình rút ra sau buổi học

* Ưu tiên dùng **const**.
* Chỉ dùng **let** khi giá trị thay đổi.
* Luôn khai báo kiểu dữ liệu để tránh bug.
* Sử dụng **Template String** thay vì nối chuỗi.
* Luôn dùng `===` và `!==`.
* Khi VSCode báo lỗi đỏ, đọc và sửa trước khi chạy test.

---

# Mẹo nhớ nhanh

| Nội dung | Ghi nhớ             |
| -------- | ------------------- |
| const    | Không đổi           |
| let      | Có thể đổi          |
| string   | Chữ                 |
| number   | Số                  |
| boolean  | true / false        |
| `${}`    | Chèn biến vào chuỗi |
| ===      | So sánh chuẩn       |
| &&       | Tất cả đúng         |
| ||       | Một đúng là được    |
| !        | Đảo ngược           |
