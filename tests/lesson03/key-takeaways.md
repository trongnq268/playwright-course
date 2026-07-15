# Lesson 03 — Object & Array


| Khái niệm | Cú pháp | Ý nghĩa với QA |
|---|---|---|
| **Object** | `{ key: value }` | Một dòng test data |
| **Truy cập thuộc tính** | `object.key` | Lấy giá trị để assert |
| **type / interface** | `type T = { ... }` | Template dữ liệu chuẩn |
| **Optional property** | `email?: string` | Trường không bắt buộc |
| **Array** | `string[]`, `[...]` | Danh sách giá trị |
| **Thêm phần tử** | `.push(...)` | Bổ sung test data |
| **Array of objects** | `PaymentData[]` | Cả bảng test data |

---

## Ghi chú thêm

### Object — 1 dòng test data
Một object đại diện cho **1 bản ghi dữ liệu** duy nhất, ví dụ 1 giao dịch thanh toán:
```typescript
const payment = {
    transactionId: "TXN001",
    amount: 1200000,
    status: "SUCCESS"
};
```

### Truy cập thuộc tính — lấy giá trị để assert
Dùng dấu chấm (`.`) để lấy ra giá trị cụ thể trong object, phục vụ việc kiểm tra (assert) trong test:
```typescript
expect(payment.status).toBe("SUCCESS");
expect(payment.amount).toBeGreaterThan(0);
```

### type / interface — Template dữ liệu chuẩn
Định nghĩa trước **cấu trúc chuẩn** mà mọi test data phải tuân theo, giúp phát hiện sai sót ngay khi viết code (thiếu field, sai kiểu dữ liệu) thay vì phải chạy test mới biết lỗi:
```typescript
type PaymentData = {
    transactionId: string;
    amount: number;
    status: "SUCCESS" | "FAILED" | "PENDING";
};
```

### Optional property — trường không bắt buộc
Dùng dấu `?` sau tên field khi trường đó **có thể có hoặc không có** trong dữ liệu thực tế — hữu ích khi test data không phải lúc nào cũng đầy đủ mọi field (ví dụ: không phải giao dịch nào cũng có `email`):
```typescript
type PaymentData = {
    transactionId: string;
    email?: string;   // có thể bỏ trống, không bắt buộc
};
```

### Array — danh sách giá trị
Dùng khi cần lưu **nhiều giá trị cùng kiểu** liên tiếp nhau, ví dụ danh sách các mã giao dịch:
```typescript
const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];
```

### Thêm phần tử — bổ sung test data
Dùng `.push()` để thêm 1 hoặc nhiều phần tử mới vào cuối mảng đã có, hữu ích khi cần bổ sung test case mới mà không cần viết lại toàn bộ mảng:
```typescript
transactionIds.push("TXN004");
```

### Array of objects — cả bảng test data
Kết hợp Array + Object để lưu **nhiều bản ghi dữ liệu** cùng lúc, giống như cả 1 bảng dữ liệu test — đây chính là cấu trúc dùng xuyên suốt các bài tập trước đó (`payments: PaymentData[]`):
```typescript
const payments: PaymentData[] = [
    { transactionId: "TXN001", amount: 1200000, status: "SUCCESS" },
    { transactionId: "TXN002", amount: 500000, status: "FAILED" },
];
```

---

## Vì sao các khái niệm này quan trọng với QA

- **type/interface** giúp đảm bảo mọi test data được tạo ra đều đúng cấu trúc, tránh trường hợp thiếu field hoặc sai kiểu dữ liệu gây lỗi test không đáng có.
- **Optional property** phản ánh đúng thực tế: không phải trường dữ liệu nào cũng bắt buộc phải có trong mọi bản ghi, giúp test data linh hoạt hơn khi mô phỏng các tình huống thực tế (edge case).
- **Array of objects** là cấu trúc phổ biến nhất để quản lý bộ test data lớn, cho phép duyệt qua từng bản ghi (`for...of`), lọc (`filter`), hoặc biến đổi (`map`) một cách có hệ thống — thay vì viết nhiều biến rời rạc.