# 📚 Buổi 02 - TypeScript: Biến, Kiểu dữ liệu và Toán tử

> **📅 Ngày:** 30/06/2026
>
> **👨‍💻 Người thực hiện:** Khánh Linh
>
> **🎯 Chủ đề:** TypeScript Fundamentals for Playwright

---

# 🎯 Mục tiêu buổi học

Sau buổi học này mình cần:

- Hiểu biến (Variable) là gì.
- Phân biệt được `let` và `const`.
- Hiểu các kiểu dữ liệu cơ bản trong TypeScript.
- Biết khai báo Type Annotation.
- Biết sử dụng Template String.
- Hiểu các toán tử thường dùng trong Automation Test.
- Biết cách đọc và sửa lỗi TypeScript trên VSCode.

---

# 📑 Mục lục

1. Biến (Variable)
2. let và const
3. Kiểu dữ liệu (Data Types)
4. Type Annotation (Khai báo kiểu dữ liệu)
5. Template String
6. Toán tử (Operators)
7. Đọc lỗi trên VSCode
8. Thực hành tốt
9. Lỗi thường gặp
10. Kiến thức cần nhớ

---

# 1️⃣ Biến (Variable)

## 📖 Khái niệm

Biến = ô nhớ có nhãn, dùng để lưu trữ dữ liệu trong quá trình chương trình chạy.

Có thể hiểu đơn giản:

> Biến giống như một chiếc hộp có tên để chứa dữ liệu. Khi cần sử dụng, chỉ cần gọi tên biến thay vì phải nhập lại giá trị nhiều lần.

---

## 💻 Cú pháp

```typescript
const tenBien = giaTri;

let tenBien = giaTri;
```

Ví dụ:

```typescript
const username = "tester";

const baseUrl = "https://dev8.onepay.vn";

let otpCode = "123456";
```

---

## 💼 Áp dụng trong Automation Test

Biến thường được sử dụng để lưu:

- Username
- Password
- URL
- OTP
- Mã giao dịch
- Mã đơn hàng
- Token
- Kết quả mong đợi
- ...

Ví dụ:

```typescript
const username = "admin";

const password = "123456";

const expectedTitle = "Trang chủ";
```

---

## 📌 Quy tắc đặt tên

Nên sử dụng **camelCase**.

✅ Đúng

```typescript
const customerName = "Nguyễn Văn A";

const totalAmount = 150000;

const isLoggedIn = true;
```

❌ Không nên

```typescript
const a = "Nguyễn Văn A";

const abc = true;
```

Tên biến nên thể hiện đúng nội dung của dữ liệu.

---

# 2️⃣ let và const

## 📖 Khái niệm

TypeScript có hai cách khai báo biến phổ biến:

- `let`
- `const`

Khác nhau ở khả năng thay đổi giá trị.

---

## const

Dùng khi giá trị **không thay đổi**.

```typescript
const BASE_URL = "https://dev8.onepay.vn";

const MAX_RETRY = 3;
```

Nếu cố gắng thay đổi:

```TypeScript
const timeout = 5000;

timeout = 10000;
```

VSCode sẽ báo lỗi.

---

## let

Dùng khi giá trị **có thể thay đổi**.

```typescript
let otpCode = "123456";

otpCode = "654321";
```

---

## ⚖️ So sánh

| Đặc tính           |                let                | const                                  |
| --------------------- | :-------------------------------: | -------------------------------------- |
| Giá trị thay đổi? | Có thể gán lại giá trị mới | Không thể gán lại (Báo lỗi ngay) |
| Dùng khi nào?       |    Dùng cho dữ liệu động    | Dùng cho dữ liệu cố định         |
| Ví dụ thực tế     |   OTP, Bộ đếm, Trạng thái   | URL, username, API Endpoint           |

---

## ⭐ Best Practice

> Luôn ưu tiên sử dụng **const**.

Chỉ sử dụng **let** khi thật sự cần thay đổi giá trị.

---

## ⚠️ Lỗi thường gặp

❌ Sai

```typescript
let BASE_URL = "...";
```

✅ Đúng

```typescript
const BASE_URL = "...";
```

---

# 3️⃣ Kiểu dữ liệu

TypeScript có các kiểu dữ liệu cơ bản:

- string
- number
- boolean

## 📖 string

Kiểu dữ liệu `string` dùng để lưu trữ dữ liệu dạng văn bản hoặc chuỗi ký tự.

---

## 💻 Ví dụ

```typescript
const username: string = "tester";

const password: string = "123456";

const customerName: string = "Nguyễn Văn A";

const orderId: string = "ORDER001";
```

---

## 💼 Áp dụng trong Automation Test

Trong Playwright, kiểu dữ liệu `string` thường được sử dụng khi:

- Nhập dữ liệu vào ô Input.
- Lấy nội dung Text trên giao diện.
- So sánh kết quả mong đợi với kết quả thực tế.
- Tạo URL hoặc API Endpoint.

---

## 📖 number

Kiểu dữ liệu `number` dùng để lưu trữ tất cả các kiểu số.

---

## 💻 Ví dụ

```typescript
const amount: number = 150000;

const quantity: number = 2;

const discountPercent: number = 10;

const timeout: number = 5000;
```

---

## 💼 Áp dụng trong Automation Test

Ví dụ tính tổng tiền:

```typescript
const unitPrice = 150000;

const quantity = 2;

const total = unitPrice * quantity;
```

---

## 📖 boolean

Kiểu dữ liệu `boolean` chỉ có hai giá trị:

```typescript
true

false
```

Boolean thường được sử dụng để kiểm tra trạng thái hoặc điều kiện.

---

## 💻 Ví dụ

```typescript
const isLoggedIn: boolean = true;

const isPaymentSuccess: boolean = false;

const hasPermission: boolean = true;
```

---

## 💼 Áp dụng trong Automation Test

Boolean thường dùng để:

- Verify kết quả.
- Kiểm tra trạng thái đăng nhập.
- Kiểm tra nút có được Enable hay không.
- Kiểm tra Checkbox đã được chọn hay chưa.

---

## 📝 Kiến thức cần nhớ

Sau phần này mình đã hiểu:

- `string` dùng để lưu dữ liệu dạng văn bản.
- `number` dùng để lưu dữ liệu dạng số.
- `boolean` chỉ có hai giá trị: `true` và `false`.
- Việc chọn đúng kiểu dữ liệu giúp hạn chế lỗi và tăng khả năng đọc hiểu code.

---

# 4️⃣ Type Annotation (Khai báo kiểu dữ liệu)

## 📖 Khái niệm

Type Annotation là cách khai báo rõ kiểu dữ liệu của biến ngay khi tạo ra.

Đây là tính năng đặc trưng của TypeScript, giúp VSCode hiểu biến đang chứa kiểu dữ liệu gì và phát hiện lỗi ngay trong lúc viết code.

---

## 💻 Cú pháp

```typescript
let tenBien: kieuDuLieu = giaTri;
```

Ví dụ:

```typescript
let amount: number = 150000;

let customerName: string = "Nguyễn Văn A";

let isSuccess: boolean = true;
```

---

## 💼 Áp dụng trong Automation Test

Trong Playwright, Type Annotation giúp:

- VSCode gợi ý code chính xác hơn.
- Phát hiện lỗi ngay khi viết.
- Giảm lỗi truyền sai kiểu dữ liệu.

Ví dụ:

```typescript
const expectedAmount: number = 150000;

const actualAmount: number = 150000;
```

---

## ⚠️ Lỗi thường gặp

❌ Sai

```typescript
let amount: number = "150000";
```

VSCode sẽ báo lỗi vì biến `amount` được khai báo là `number` nhưng lại gán giá trị kiểu `string`.

✅ Đúng

```typescript
let amount: number = 150000;
```

---

# 5️⃣ Template String

## 📖 Khái niệm

Template String là cách tạo chuỗi bằng dấu **Backtick (`)** thay vì dấu nháy đơn (`'`) hoặc nháy kép (`"`).

Cho phép chèn trực tiếp biến hoặc biểu thức vào chuỗi thông qua cú pháp:

```typescript
${tenBien}
```

Template String giúp code ngắn gọn, dễ đọc và dễ bảo trì hơn so với cách nối chuỗi bằng dấu `+`.

💻 Ví dụ

### Cách nối chuỗi truyền thống

```typescript
const name = "Linh";
const amount = 150000;
const message = "Khách hàng " + name + " thanh toán " + amount + " VND";
```

### Sử dụng Template String

```typescript
const name = "Linh";
const amount = 150000;
const message = `Khách hàng ${name} thanh toán ${amount} VND`;
```

---

## 💼 Áp dụng trong Automation Test

Tạo URL theo môi trường:

```typescript
const env = "dev";
const orderId = "ORDER001";
const url = `https://${env}.onepay.vn/orders/${orderId}`;
```

---

## ⚠️ Lỗi thường gặp

❌ Sai

```typescript
const message = "Hello ${name}";
```

Kết quả:

```text
Hello ${name}
```

✅ Đúng

```typescript
const message = `Hello ${name}`;
```

---

# 6️⃣ Toán tử (Operators)

## 📖 Khái niệm

Toán tử được sử dụng để:

- Thực hiện phép tính.
- So sánh dữ liệu.
- Kết hợp điều kiện.

Trong Automation Test thường sử dụng ba nhóm toán tử:

- Toán tử số học.
- Toán tử so sánh.
- Toán tử logic.

---

## ➕ Toán tử số học

### Các toán tử thường dùng

| Toán tử | Ý nghĩa     |
| --------- | ------------- |
| +         | Cộng         |
| -         | Trừ          |
| *         | Nhân         |
| /         | Chia          |
| %         | Chia lấy dư |

---

### 💻 Ví dụ

```typescript

    // +,-
    total = number1 - number2;
    console.log(total);

    //*
    total = number1 * number2;
    console.log(total);

    // chia/: chia lấy phần nguyên
    total = number1 / number2;
    console.log(total); 

    // chia %: lấy phần dư
    total = number1 % number2;
    console.log(total);
```

---

## ⚖️ Toán tử so sánh

### Các toán tử thường dùng

| Toán tử | Ý nghĩa             |
| --------- | --------------------- |
| ===       | Bằng                 |
| !==       | Khác                 |
| >         | Lớn hơn             |
| <         | Nhỏ hơn             |
| >=        | Lớn hơn hoặc bằng |
| <=        | Nhỏ hơn hoặc bằng |

---

### 💻 Ví dụ

```typescript
const expected = 150000;

const actual = 150000;

console.log(expected === actual);
```

Kết quả:

```text
true
```

---

## ⚠️ Lỗi thường gặp

```typescript
150000 == "150000"
```

Kết quả:

```text
true
```

Trong khi:

```typescript
150000 === "150000"
```

Kết quả:

```text
false
```

---

## 🔗 Toán tử logic

### Các toán tử thường dùng

| Toán tử | Ý nghĩa |
| --------- | --------- |
| &&        | AND       |
| \|\|      | OR        |
| !         | NOT       |

---

### 💻 Ví dụ

AND

```typescript
const canPay =
    isLoggedIn &&
    hasBalance;
```

OR

```typescript
const canDiscount =
    isVip ||
    hasCoupon;
```

NOT

```typescript
const isGuest = !isLoggedIn;
```

---

## 💼 Áp dụng trong Automation Test

Ví dụ kiểm tra điều kiện trước khi thanh toán:

```typescript
const canProceed =
    isLoggedIn &&
    !isAccountLocked &&
    accountBalance >= orderTotal;
```

Nếu tất cả điều kiện đều đúng thì mới thực hiện thanh toán.

---

# 7️⃣ Đọc lỗi trên VSCode

## 📖 Khái niệm

Một trong những ưu điểm lớn nhất của TypeScript là phát hiện lỗi ngay trong lúc viết code.

Khi thấy gạch đỏ trên VSCode, không nên bỏ qua mà hãy đọc kỹ nội dung lỗi.

---

## 💻 Một số lỗi thường gặp

### Sai kiểu dữ liệu

```typescript
let amount: number = "150000";
```

Thông báo:

```text
Type 'string' is not assignable to type 'number'
```

---

### Gán lại giá trị cho const

```typescript
const MAX = 100;

MAX = 200;
```

Thông báo:

```text
Cannot assign to 'MAX'
because it is a constant.
```

---

### Sai tên biến

```typescript
console.log(userNam);
```

Thông báo:

```text
Cannot find name 'userNam'
```

---

## 💼 Workflow xử lý lỗi

Khi gặp lỗi trên VSCode, mình sẽ thực hiện theo các bước:

1. Đọc thông báo lỗi.
2. Xác định dòng bị lỗi.
3. Kiểm tra kiểu dữ liệu.
4. Kiểm tra tên biến.
5. Sửa lỗi và lưu lại file.

---

# 💡 Thực hành tốt

- Luôn ưu tiên sử dụng `const`.
- Chỉ dùng `let` khi cần thay đổi giá trị.
- Đặt tên biến rõ ràng theo camelCase.
- Luôn khai báo đúng kiểu dữ liệu.
- Sử dụng Template String thay vì nối chuỗi.
- Luôn dùng `===` và `!==`.
- Đọc kỹ thông báo lỗi trước khi sửa.

---

# ❌ Lỗi thường gặp

- Khai báo sai kiểu dữ liệu.
- Nhầm giữa `let` và `const`.
- Sử dụng `==` thay vì `===`.
- Đặt tên biến quá ngắn hoặc không rõ nghĩa.
- Không đọc thông báo lỗi trên VSCode.
- Nối chuỗi bằng dấu `+` quá nhiều.

---

# 📝 Kiến thức cần nhớ

Sau buổi học mình đã hiểu:

- Variable dùng để lưu dữ liệu.
- Nên ưu tiên sử dụng `const`.
- Biết sử dụng các kiểu dữ liệu cơ bản.
- Biết khai báo Type Annotation.
- Biết sử dụng Template String.
- Hiểu các toán tử số học, so sánh và logic.
- Biết đọc và sửa lỗi TypeScript trên VSCode.
