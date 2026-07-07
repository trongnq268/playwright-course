# Buổi 3 - TypeScript: Object, Type & Array

## 1. Object
- Object dùng để nhóm nhiều dữ liệu liên quan thành một đối tượng.
- Gồm các cặp `key: value`.

```ts
const payment = {
  transactionId: "TXN001",
  amount: 150000,
  status: "SUCCESS",
};
```

---

## 2. Truy cập thuộc tính
Dùng dấu `.` để lấy giá trị của object.

```ts
payment.transactionId;
payment.amount;
payment.status;
```

IDE sẽ gợi ý các thuộc tính khi gõ `payment.`

---

## 3. type và interface
### Định nghĩa type và interface

Dùng để định nghĩa cấu trúc dữ liệu.

```ts
type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
};
```

Hoặc

```ts
interface PaymentData {
  transactionId: string;
  amount: number;
  status: string;
}
```
### So sánh type và interface

| Tiêu chí | `interface` | `type` |
|----------|-------------|---------|
| Định nghĩa object | ✅ | ✅ |
| Kế thừa | `extends` | `&` (intersection) |
| Khai báo trùng (Declaration Merging) | ✅ Có | ❌ Không |
| Union (`A \| B`) | ❌ | ✅ |
| Tuple, Literal, Primitive | ❌ | ✅ |
| Dùng với `class` (`implements`) | ✅ Phù hợp | ✅ Được |

Khi nào dùng?

- Dùng **interface** khi định nghĩa cấu trúc của Object, API Response, Page Object...
- Dùng **type** khi cần Union, Tuple hoặc các kiểu dữ liệu phức tạp.
---

## 4. Optional Property
Thuộc tính không bắt buộc dùng dấu `?`.

```ts
type PaymentData = {
  email?: string;
};
```

Có hoặc không có `email` đều hợp lệ.

---

## 5. Array
Array là danh sách nhiều phần tử cùng kiểu dữ liệu.

```ts
const transactionIds = ["TXN001", "TXN002"];
```

- Truy cập bằng index (`0` là phần tử đầu tiên).
- Thêm phần tử bằng `.push()`.
- Đếm số phần tử bằng `.length`.

```ts
transactionIds.push("TXN003");
console.log(transactionIds[0]);
console.log(transactionIds.length);
```

---

## 6. Array of Objects
Mảng chứa nhiều object.

```ts
const payments: PaymentData[] = [
  {
    transactionId: "TXN001",
    amount: 150000,
    status: "SUCCESS",
  },
  {
    transactionId: "TXN002",
    amount: 200000,
    status: "FAILED",
  },
];
```

Truy cập:

```ts
payments[0].transactionId;
payments[1].status;
```
