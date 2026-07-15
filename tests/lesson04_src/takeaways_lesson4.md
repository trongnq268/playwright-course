# Buổi 4 - If, For, For of

## 1. Điều kiện (`if`, `else`, `else if`)

-   Sử dụng `if` để thực hiện một hành động khi điều kiện đúng.
-   Sử dụng `if...else` khi có hai trường hợp cần xử lý.
-   Sử dụng `if...else if...else` khi có nhiều trường hợp cần phân loại.
-   TypeScript kiểm tra điều kiện **từ trên xuống dưới** và dừng ở điều
    kiện đúng đầu tiên.

``` ts
if (payment.status === "SUCCESS") {
    ...
} else if (payment.status === "FAILED") {
    ...
} else {
    ...
}
```

## 2. Toán tử so sánh và logic

### Toán tử so sánh

-   `===` : bằng (so sánh cả kiểu dữ liệu)
-   `!==` : khác
-   `>`
-   `<`
-   `>=`
-   `<=`

### Toán tử logic

-   `&&` : AND (tất cả điều kiện đều đúng)
-   `||` : OR (chỉ cần một điều kiện đúng)
-   `!` : NOT (phủ định điều kiện)

``` ts
if (
    payment.amount > 2000000 &&
    payment.currency === "USD" &&
    payment.status === "SUCCESS"
)
```

## 3. Vòng lặp `for` và `for...of`

### `for`

Dùng khi cần **index**.

``` ts
for (let i = 0; i < payments.length; i++) {
}
```

### `for...of`

Dùng khi chỉ cần lấy từng phần tử.

``` ts
for (const payment of payments) {
}
```

Trong Automation Test, `for...of` thường được ưu tiên vì ngắn gọn và dễ
đọc hơn.

## 4. Duyệt mảng Object

``` ts
for (const payment of payments) {
    if (payment.status === "SUCCESS") {
        console.log(payment.transactionId);
    }
}
```

Có thể: - Lọc dữ liệu - Thống kê - Tính tổng - Validate dữ liệu - Sinh
báo cáo

chỉ với **một vòng lặp**.

## 5. `filter()` và `map()`

### `filter()`

Dùng để **lọc** dữ liệu.

``` ts
const successPayments =
    payments.filter(p => p.status === "SUCCESS");
```

### `map()`

Dùng để **biến đổi** dữ liệu.

``` ts
const ids =
    payments.map(p => p.transactionId);
```

## 6. Import / Export

Ví dụ:

``` ts
// paymentData.ts
export const payments = [];
```

``` ts
// main.ts
import { payments } from "./paymentData";
```

Ưu tiên **Named Export** (`export const`, `export type`).

> **Hạn chế sử dụng `any`**

Không nên:

``` ts
let payment: any;
```

Nên:

``` ts
let payment: PaymentData;
```

