# Bài tập: TypeScript – Object, Type & Array

> **Khóa học:** Playwright Automation Testing cho QA Manual
> **Chủ đề:** Object, Type/Interface, Optional Property, Array, Array of Objects
> **Cách làm:** Tạo file `.ts`, viết code, chạy bằng `npx ts-node <tên-file>.ts` (hoặc dán vào https://www.typescriptlang.org/play)
> **Cách nộp:** Chụp màn hình code + kết quả console cho mỗi bài.

---

## Hướng dẫn chung

- Mỗi phần có độ khó tăng dần: **Cơ bản → Vận dụng → Thử thách**.
- Ưu tiên làm đúng trước, tối ưu sau.
- Khi thấy gạch đỏ trong VSCode, **đọc thông báo lỗi** trước khi hỏi — đây là kỹ năng quan trọng.
- Chỉ dùng các kiến thức đã học: object, dấu chấm, `type`/`interface`, optional property, array, `.push()`, truy cập bằng index.

---

## Phần A – Object & Truy cập thuộc tính (Cơ bản)

### Bài A1. Tạo object giao dịch

Tạo một object `payment` mô tả một giao dịch gồm: mã giao dịch `TXN100`, số tiền `250000`, loại tiền tệ `VND`, trạng thái `SUCCESS`.

**Yêu cầu:**
1. Khai báo object `payment`.
2. In ra màn hình mã giao dịch và số tiền bằng cú pháp dấu chấm.

### Bài A2. Object người dùng

Tạo object `user` mô tả một tài khoản gồm: `username` là `"an.nguyen"`, `balance` là `500000`, `isActive` là `true`.

**Yêu cầu:** In ra `username`, `balance` và `isActive`.

### Bài A3. Cập nhật giá trị

Dựa trên object `payment` ở bài A1:
1. Đổi giá trị `status` thành `"FAILED"` bằng cú pháp dấu chấm.
2. In lại `status` để kiểm chứng.

---

## Phần B – Type / Interface (Vận dụng)

### Bài B1. Định nghĩa PaymentData

1. Định nghĩa `type PaymentData` gồm 4 trường: `transactionId: string`, `amount: number`, `currency: string`, `status: string`.
2. Tạo một object `payment1` **gắn nhãn** kiểu `PaymentData` với dữ liệu bất kỳ hợp lệ.
3. In ra `transactionId` và `amount`.

### Bài B2. Đọc và sửa lỗi

Cho đoạn code sau đang **báo lỗi**. Hãy tìm và sửa cho đúng:

```typescript
type PaymentData = {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
};

const payment2: PaymentData = {
  transactionId: "TXN200",
  amount: 300000,
  currency: "VND",
};
```

**Yêu cầu:** Giải thích thông báo lỗi VSCode đưa ra và sửa lại cho hết gạch đỏ.

### Bài B3. Interface thay cho type

Viết lại `PaymentData` ở bài B1 bằng `interface` thay vì `type`. Tạo một object mới `payment3` dùng interface đó và in ra `status`.

---

## Phần C – Optional Property (Vận dụng)

### Bài C1. Thêm trường optional

1. Bổ sung vào `PaymentData` trường email.
2. Tạo `paymentWithEmail` có email.
3. Tạo `paymentNoEmail` **không** có email.
4. Cả hai object đều phải hợp lệ (không gạch đỏ).

### Bài C2. In thông tin

Với hai object ở bài C1:
1. In ra `email` của `paymentWithEmail`.
2. In ra `transactionId` và `status` của `paymentNoEmail`.

---

## Phần D – Array (Vận dụng)

### Bài D1. Mảng mã giao dịch

1. Tạo mảng `transactionIds` kiểu `string[]` chứa 3 mã: `"TXN001"`, `"TXN002"`, `"TXN003"`.
2. In ra phần tử **đầu tiên**  và phần tử **thứ hai**.
3. In ra tổng số phần tử bằng.

### Bài D2. Thêm phần tử

Tiếp tục từ bài D1:
1. Bổ sung thêm phần tử `"TXN004"`.
2. In lại toàn bộ mảng.
3. In lại số lượng phần tử.

### Bài D3. Bẫy index

Cho mảng `transactionIds` có 4 phần tử (sau bài D2).

**Yêu cầu:**
1. Dự đoán kết quả của `transactionIds[4]` **trước khi chạy**.
2. Chạy để kiểm chứng và giải thích tại sao.

---

## Phần E – Array of Objects (Thử thách)

### Bài E1. Danh sách giao dịch

1. Dùng `type PaymentData` (có `email?`) từ các phần trước.
2. Tạo mảng `payments: PaymentData[]` chứa **3 giao dịch**, trong đó ít nhất 1 giao dịch không có email:
   - TXN001 – 150000 – VND – SUCCESS – có email
   - TXN002 – 200000 – VND – FAILED – không email
   - TXN003 – 99000 – VND – PENDING – có email
3. In ra `transactionId` của phần tử thứ 2.
4. In ra `status` của phần tử thứ 3.

### Bài E2. Thêm giao dịch và đếm

Tiếp tục từ E1:
1. Thêm một giao dịch TXN004 tùy ý.
2. In ra tổng số giao dịch trong mảng.

### Bài E3. Truy cập dữ liệu lồng nhau

Từ mảng `payments` sau bài E2:
1. In ra `amount` của giao dịch đầu tiên.
2. In ra `email` của giao dịch thứ 3.
3. In ra `currency` của giao dịch cuối cùng.

---

## Phần F – Bài tập tổng hợp (Thử thách, sát công việc QA)

### Bài F1. Bộ test data đơn hàng

Mô phỏng chuẩn bị test data cho tính năng đặt hàng:

1. Định nghĩa `type OrderData` gồm:
   - `orderId: string`
   - `total: number`
   - `paid: boolean`
   - `note?: string` (optional)
2. Tạo mảng `orders: OrderData[]` gồm **ít nhất 3 đơn hàng**, trong đó:
   - Ít nhất 1 đơn **chưa thanh toán**.
   - Ít nhất 1 đơn **không có** `note`.
3. Thêm 1 đơn hàng mới.
4. In ra tổng số đơn hàng trong mảng.
5. In ra `orderId` và `total` của đơn hàng đầu tiên.
6. In ra `paid` của đơn hàng cuối cùng.

---

## Tiêu chí chấm điểm (Rubric)

| Tiêu chí | Điểm |
|----------|------|
| Code chạy được, không lỗi cú pháp | 3 |
| Dùng đúng `type`/`interface` và optional property | 2 |
| Truy cập object đúng cú pháp (dấu chấm) | 2 |
| Truy cập array đúng cú pháp (index, `.length`, `.push`) | 2 |
| Đặt tên biến rõ ràng, code gọn gàng | 1 |
| **Tổng** | **10** |
