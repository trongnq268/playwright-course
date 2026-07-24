**Lesson 4 - Key Takeaways**

**1\. filter() = Lọc dữ liệu**

- Dùng để giữ lại các phần tử thỏa mãn điều kiện (true).
- Trả về **một mảng mới**, không làm thay đổi mảng gốc.
- Thích hợp khi cần lấy ra một nhóm dữ liệu theo điều kiện xác định.

const successPayments = payments.filter(

(payment) => payment.status === "SUCCESS"

);

Ví dụ kết quả:

\[

{

transactionId: "TXN001",

...

},

{

transactionId: "TXN003",

...

}

\]

**Ghi nhớ:** filter() = **Lọc dữ liệu**.

**2\. map() = Biến đổi dữ liệu**

- Dùng để chuyển đổi mỗi phần tử trong mảng thành một giá trị mới.
- Trả về **một mảng mới** có cùng số lượng phần tử với mảng ban đầu.
- Thích hợp khi chỉ cần lấy ra một hoặc một vài trường dữ liệu.

const ids = payments.map(

(payment) => payment.transactionId

);

Ví dụ kết quả:

\[

"TXN001",

"TXN002",

"TXN003"

\]

**Ghi nhớ:** map() = **Biến đổi dữ liệu**.

**3\. So sánh nhanh**

| **Method** | **Mục đích**           | **Kết quả**                              |
| ---------- | ---------------------- | ---------------------------------------- |
| filter()   | Lọc dữ liệu            | Mảng mới chứa các phần tử thỏa điều kiện |
| map()      | Biến đổi dữ liệu       | Mảng mới chứa các giá trị mới            |
| for...of   | Duyệt và xử lý dữ liệu | Không tạo mảng mới                       |

**4\. Khi nào nên sử dụng?**

**Sử dụng filter() khi:**

- Cần lọc dữ liệu theo điều kiện.
- Ví dụ:
  - Lấy tất cả giao dịch SUCCESS.
  - Lấy các giao dịch có số tiền lớn hơn 2.000.000.
  - Lấy các giao dịch thanh toán bằng VISA.

const successPayments = payments.filter(

(payment) => payment.status === "SUCCESS"

);

**Sử dụng map() khi:**

- Cần lấy ra một trường dữ liệu hoặc biến đổi dữ liệu sang dạng khác.
- Ví dụ:
  - Danh sách transactionId.
  - Danh sách customer.
  - Danh sách amount.

const transactionIds = payments.map(

(payment) => payment.transactionId

);

**Sử dụng for...of khi:**

- Cần thống kê nhiều điều kiện cùng lúc.
- Muốn tối ưu số lần duyệt mảng.
- Cần cộng tổng, đếm số lượng hoặc xử lý nhiều logic trong một lần duyệt.

for (const payment of payments) {

// SUCCESS

// FAILED

// VISA

// MASTER

// QR

// Total Amount

// Suspicious Transaction

}

Trong các bài Dashboard hoặc Automation Test, for...of thường là lựa chọn phù hợp vì chỉ cần duyệt dữ liệu một lần duy nhất.

**5\. Ví dụ kết hợp filter() và map()**

Lấy danh sách transactionId của các giao dịch SUCCESS:

const successIds = payments

.filter((payment) => payment.status === "SUCCESS")

.map((payment) => payment.transactionId);

Ví dụ kết quả:

\[

"TXN001",

"TXN003",

"TXN005",

"TXN007"

\]

**Key Takeaways**

- filter() → **Lọc dữ liệu**.
- map() → **Biến đổi dữ liệu**.
- for...of → **Duyệt và xử lý dữ liệu**.
- filter() và map() đều trả về **một mảng mới** và không làm thay đổi mảng gốc.
- for...of phù hợp khi cần xử lý nhiều nghiệp vụ trong một lần duyệt.
- filter() phù hợp khi cần lấy ra dữ liệu theo điều kiện.
- map() phù hợp khi cần chuyển đổi dữ liệu sang một dạng mới.
- Trong quá trình học Automation Testing, nên nắm vững for...of trước, sau đó kết hợp filter() và map() để viết mã nguồn ngắn gọn, dễ đọc và dễ bảo trì hơn.