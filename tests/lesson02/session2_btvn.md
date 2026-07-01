
# Lesson 2

**Bài 1:** Dựa vào nội dung sau buổi 2 hãy tạo file tests/lesson2/key-takeaways.md note lại toàn bộ nội dung bạn nắm và hiểu được trong buổi 2 dưới dạng markdown (tip: bạn nên xem lại record đồng thời note lại)

**Bài 2:** Tạo file tests/lesson2/answer.txt Phân biệt var, let, const (bạn có thể hỏi AI nhưng hãy note lại theo cách hiểu của bạn)

**Bài 3:** tạo file tests/lesson2/typescript.md trả lời các câu hỏi ở dưới (mọi người có thể sử dụng file spec.ts để chạy thử code)

**1:** Đoạn code sau có 3 lỗi liên quan đến let / const. Tìm và sửa đúng:

```jsx
let BASE_URL = 'https://staging.vn';
BASE_URL = 'https://prod.vn';   // Môi trường thay đổi → gán lại

const retryCount = 0;
retryCount = 1;               // Test thất bại, tăng retry lên 1

const currentPage = 1;
currentPage = currentPage + 1; // Chuyển sang trang tiếp theo

=> Trả lời:
//  Môi trường có thể thay đổi, gán let cho phép thay đổi các giá trị sau khi khai báo -> ko có lỗi 
let baseUrl = 'https://staging.vn';
baseUrl = 'https://prod.vn';


// Sửa lỗi 1: Đổi const thành let
let retryCount = 0;
retryCount = 1;

// Sửa lỗi 2: Đổi const thành let
let currentPage = 1;
currentPage = currentPage + 1;
```

**2:** Đọc từng yêu cầu, chọn từ khoá phù hợp (let / const):

| Yêu cầu                                                 | Đáp án |
| ------------------------------------------------------- | ------- |
| **Tên môi trường test (không đổi trong toàn bộ suite)** | `const` |
| **Biến đếm số lần gọi API thất bại**                    | `let`   |
| **Mã giảm giá coupon cần điền vào form**                | `const` |
| **Kết quả kiểm tra điều kiện (tính xong không đổi)**    | `const` |
| **Trạng thái trang hiện tại khi phân trang**            | `let`   |

**3:** Điền từ khoá kiểu dữ liệu phù hợp (string | number | boolean) vào chỗ trống (đã điền:)

```jsx
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false
```

4: Nhận diện xem đoạn code nào sẽ bị VScode báo lỗi và gạch đỏ

```jsx
let amount: number = "150000" // Lỗi 1: number != string
const isValid: boolean = 1 // Lỗi 2: boolean != number
const label: string = 123 // Lỗi 3: string != number
let timeout: string = "5000" // Ok: string
const count: number = 0 // Ok: number
```

5: Điền ${...} vào chỗ trống để in ra đúng kết quả (đã điền:)

```jsx
const price = 200000;
const qty = 3; 
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: _${total}_ VND`);
console.log(`Có _${qty}_ món hàng trong giỏ.`);
console.log(`Đơn giá: _${price}_, Tổng: _${total}_`);
```

6: Có 47 bản ghi, mỗi trang hiển thị 10.  Trang cuối có bao nhiêu bản ghi? viết công thức tính lastPageRecords

```jsx
const records: number = 47; 
const pageSize: number  = 10;
let lastPageRecords: number;

// Công thức tính số bản ghi ở trang cuối: (lấy số dư)
let lastPageRecords: number = records % pageSize; 
// Kết quả bằng 7

```

7: Thực hành với toán tử logic và so sánh

```jsx
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = cartItemCount > 0 && accountBalance >= orderTotal;

// 3. Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4. Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;
```
