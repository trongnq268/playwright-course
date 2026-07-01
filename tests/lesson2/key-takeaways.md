# 📘 Key Takeaways — Buổi 2: TypeScript – Biến, Kiểu Dữ Liệu & Toán Tử

> Notes tổng hợp lại toàn bộ nội dung mình nắm được sau buổi 2 (Playwright Automation Bootcamp).

---

## 🎯 1. Mục tiêu buổi học

Sau buổi 2 mình cần làm được:
- Khai báo biến bằng `let` / `const` và biết chọn đúng từ khoá cho từng trường hợp.
- Sử dụng đúng các kiểu dữ liệu cơ bản: `string`, `number`, `boolean`, `null`, `undefined`.
- Viết type annotation để TypeScript bắt lỗi ngay trong VSCode (không cần chạy mới biết lỗi).
- Dùng template string (backtick + `${}`) để viết log/assertion message linh động.
- Đọc hiểu gạch đỏ trên VSCode và tự sửa lỗi kiểu dữ liệu cơ bản.

---

## 📦 2. Biến (Variable) là gì?

- Biến = **cái hộp có nhãn** dùng để lưu tạm dữ liệu khi chạy test.
- **Tên biến** = nhãn dán trên hộp (để gọi ra khi cần).
- **Giá trị** = thứ bỏ bên trong hộp — có thể thay đổi (bởi vậy gọi là "biến").
- Lợi ích: sửa dữ liệu test **tại 1 chỗ**, không cần đi tìm từng dòng để sửa thủ công.

### So sánh với Manual Test

| Manual Test | Tương đương trong code |
| --- | --- |
| Ghi URL staging vào notepad | `const url = "https://..."` |
| Copy OTP từ mail dán vào form | `let otpCode = "482910"` |
| Ghi số tiền kỳ vọng để đối chiếu | `const expected = 150000` |

### Cú pháp khai báo

```ts
// từ-khóa  tên-biến  =  giá-trị;
let   loginUrl  = "https://app.com/login";
const MAX_RETRY = 3;
```

### Quy tắc đặt tên biến
- Dùng **camelCase**: `productName`, `totalAmount`, `isLoggedIn`.
- Đặt tên **mô tả rõ nội dung** — tránh viết tắt kiểu `u` → nên là `username`.
- **Không bắt đầu bằng số**: `1name` ❌ → `name1` ✅.

---

## 🔑 3. `let` vs `const` — Chọn cái nào?

| Đặc tính | `let` | `const` |
| --- | --- | --- |
| Gán lại được không? | ✅ Được | ❌ Không (báo lỗi ngay) |
| Dùng khi nào? | Dữ liệu **thay đổi** trong quá trình test | Dữ liệu **cố định** suốt buổi test |
| Ví dụ thực tế | Mã OTP, biến đếm, trạng thái test | Base URL, thông tin login, expected title |
| Bắt buộc gán giá trị khi khai báo? | Không — mặc định là `undefined` | Bắt buộc phải gán ngay |

### 👉 Quy tắc "ngón tay cái" (Best Practice)
> **Mặc định luôn dùng `const`.** Chỉ đổi sang `let` khi thực sự cần gán lại giá trị mới.

Lý do: `const` giúp code an toàn hơn, tránh bị "flaky test" do biến bị thay đổi ngoài ý muốn.

### Ví dụ lỗi thường gặp

```ts
// ❌ Lỗi: gán lại const
const timeout = 5000;
timeout = 10000; // ← VSCode gạch đỏ: "Cannot assign to 'timeout' because it is a constant"
```

---

## 🧱 4. Các kiểu dữ liệu (Data Types) cơ bản

> Nếu **biến** là chiếc hộp, thì **kiểu dữ liệu** quy định *loại đồ vật* nào được phép bỏ vào hộp đó.

### 🔤 `string` — Văn bản

```ts
const username: string = "test_user";
const customer: string = 'Nguyễn Văn A';
const s3: string       = `backtick`; // template string
```

Trong Playwright: `.fill()`, `.innerText()`, so sánh text trong assertion.

### 🔢 `number` — Số

```ts
const amount: number       = 150000;
const discountRate: number = 0.1;
const tax = amount * discountRate; // 15000
```

TypeScript chỉ có **1 kiểu `number` duy nhất** cho cả integer + float.

> ⚠️ **Cạm bẫy QA**: API thường trả số dưới dạng string (JSON). Nếu không convert:
> `"150000" + 50000 = "15000050000"` (nối chuỗi) — KHÔNG phải phép cộng!

### ✅ `boolean` — Đúng/Sai

```ts
const isLoggedIn: boolean = false;
const hasPermission: boolean = false;
expect(isPaymentSuccess).toBe(true);
```

Đặt tên biến boolean nên bắt đầu bằng: **`is`, `has`, `can`, `should`** → `isValid`, `hasToken`, `canPay`.

### 🕳 `null` vs `undefined`

- `null` = **cố ý** để trống (no value).
- `undefined` = biến **chưa được gán** giá trị.

---

## 🏷 5. Type Annotation

Cú pháp:
```ts
// từ-khóa tên-biến : kiểu-dữ-liệu = giá-trị;
let amount: number  = 150000;
let name:   string  = "Nguyễn Văn A";
let isOk:   boolean = true;
```

- Dấu `:` là ranh giới giữa **tên biến** và **kiểu dữ liệu**.
- Đây là tính năng **độc quyền của TypeScript** (JS không có).
- Nhờ đó VSCode gợi ý autocomplete chuẩn xác và **báo lỗi sớm khi gõ code**.

### Vì sao TypeScript bắt kiểu quan trọng?

Ví dụ thực tế: đồng nghiệp đổi API `amount: 150000` (number) sang `"150.000"` (string).
- **JS**: chạy được nhưng ra `NaN` → sai âm thầm.
- **TS**: gạch đỏ ngay khi code — chặn bug từ đầu.

```ts
let amount: number = "150.000";
// ❌ Type 'string' is not assignable to type 'number'
```

---

## 🧵 6. Template String — Viết log chuyên nghiệp

Dùng dấu **backtick `` ` ``** thay cho nháy đơn/đôi, chèn biến bằng `${biến}`.

```ts
// ❌ Kiểu cũ (nối chuỗi bằng +)
const msg1 = "Khách hàng " + name + " thanh toán " + amount + " VND";

// ✅ Template string
const msg2 = `Khách hàng ${name} thanh toán ${amount} VND`;
```

### Ứng dụng trong Playwright

```ts
// 1. URL động theo môi trường
const orderUrl = `https://${env}.app.com/orders/${orderId}`;

// 2. Assertion message rõ ràng khi debug
const assertMsg = `[PAYMENT] Expected: ${expected}, Actual: ${actual}`;

// 3. Multi-line string (không cần cộng chuỗi)
const emailBody = `
Xin chào ${name},
Đơn hàng #${orderId} đã được xác nhận.
`;
```

> 💡 100% các project Playwright hiện đại đều dùng template string.

---

## ➕ 7. Toán tử (Operators)

### 7.1 Toán tử số học

| Toán tử | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| `+` `-` `*` `/` | Cộng, trừ, nhân, chia | `price * quantity` |
| `%` | Chia lấy dư | Đếm bản ghi trang cuối, check chẵn/lẻ |
| `Math.ceil()` | Làm tròn lên | Tính tổng số trang phân trang |
| `Math.floor()` | Làm tròn xuống | |

```ts
const items = 53, itemsPerPage = 10;
const totalPages = Math.ceil(items / itemsPerPage); // 6
const remainder  = items % itemsPerPage;            // 3
```

### 7.2 Toán tử so sánh — nền tảng Assertion

| Toán tử | Ý nghĩa |
| --- | --- |
| `===` / `!==` | So sánh **nghiêm ngặt** (cả giá trị + kiểu) |
| `==` / `!=` | So sánh **ép kiểu** — ⚠️ nguy hiểm |
| `<`, `>`, `<=`, `>=` | So sánh lớn hơn / nhỏ hơn |

```ts
150000 === "150000"; // false ❌ (khác kiểu)
150000 ==  "150000"; // true  ⚠️ (bị ép kiểu ngầm)
0 == false;          // true  ⚠️
0 === false;         // false ✅ (đúng logic)
```

> ⚠️ **NGUYÊN TẮC**: Luôn dùng `===` và `!==`. **Tuyệt đối tránh** `==` và `!=`.

### 7.3 Toán tử logic

| Toán tử | Ý nghĩa | Dùng khi |
| --- | --- | --- |
| `&&` (AND) | Tất cả phải đúng | Gộp precondition trước khi test |
| `\|\|` (OR) | Chỉ cần 1 cái đúng | Nhiều đường rẽ nhánh (VIP hoặc có coupon) |
| `!` (NOT) | Đảo boolean | Kiểm tra *không* bị khóa |

```ts
const canPay      = isLoggedIn && hasBalance && !isLocked;
const isDiscount  = isVIP || hasCoupon;
const isGuest     = !isLoggedIn;
```

---

## 🐞 8. Đọc lỗi đỏ trên VSCode

### 4 lỗi thường gặp nhất

| # | Đoạn code | Thông báo lỗi |
| --- | --- | --- |
| 1 | `let amount: number = "150000"` | `Type 'string' is not assignable to type 'number'` |
| 2 | `console.log(productNam)` | `Cannot find name 'productNam'. Did you mean...?` |
| 3 | `const MAX = 100; MAX = 200;` | `Cannot assign to 'MAX' because it is a constant` |
| 4 | `const result = "abc" * 2` | `The left-hand side of an arithmetic operation...` |

### Workflow sửa lỗi

1. **Hover chuột** vào chỗ gạch đỏ → đọc kỹ dòng đầu tiên.
2. Xác định **dòng + ký tự** bị gạch đỏ.
3. So sánh **kiểu mong đợi** vs **kiểu thực tế**.
4. Sửa (đổi kiểu biến HOẶC sửa giá trị cho khớp).
5. `Ctrl + S` → gạch đỏ biến mất là xong! ✅

> 💡 Luyện thói quen sửa gạch đỏ **trước khi chạy**. TypeScript giải quyết ~90% lỗi cú pháp + kiểu dữ liệu ngay ở khâu gõ code.

---

## 🧠 9. Ghi nhớ nhanh (Cheat Sheet)

| Khái niệm | Ghi nhớ |
| --- | --- |
| `let` vs `const` | Mặc định dùng `const`, chỉ đổi sang `let` khi cần gán lại |
| Kiểu core | `string` (văn bản), `number` (mọi loại số), `boolean` (true/false) |
| `null` vs `undefined` | `null` = cố ý trống · `undefined` = chưa gán |
| Type annotation | `: kiểu` — giúp VSCode bắt lỗi khi gõ |
| Template string | Backtick `` ` `` + `${biến}` |
| So sánh | LUÔN dùng `===` và `!==`, KHÔNG dùng `==`, `!=` |
| Logic | `&&` (AND), `\|\|` (OR), `!` (NOT) |

---

## ✅ 10. Checklist tự đánh giá

- [x] Phân biệt được `let` và `const`, biết khi nào chọn cái nào.
- [x] Khai báo biến kèm type annotation đúng cú pháp.
- [x] Hiểu khi nào dùng `string`, `number`, `boolean`.
- [x] Phân biệt `null` (cố ý trống) và `undefined` (chưa gán).
- [x] Viết được template string kèm biểu thức `${}`.
- [x] Dùng linh hoạt `&&`, `||`, `!` để gộp điều kiện.
- [x] Luôn dùng `===` thay vì `==`.
- [x] Tự tin hover đọc lỗi và sửa gạch đỏ trên VSCode.
