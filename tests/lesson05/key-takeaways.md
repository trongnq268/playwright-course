# Buổi 5: FUNCTION & ASYNC/AWAIT
## 1. FUNCTION TRONG TYPESCRIPT

### 1.1. Function là gì
Hàm (Function) là khối mã được thiết kế để thực hiện một nhiệm vụ cụ thể. Hiểu đơn giản nhiệm vụ của hàm là: **INPUT → XỬ LÝ → OUTPUT**.

```typescript
type OrderData = {
  orderId: string;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  customerEmail: string;
};

// Input: amount (giá trị đơn hàng) → Xử lý: tính phí vận chuyển 2.5% → Output: number (tổng tiền sau phí)
function addShippingFee(amount: number): number {
  const shippingFee = amount * 0.025; // Phí vận chuyển 2.5%
  return amount + shippingFee;
}
```

---

### 1.2. Phân biệt Định nghĩa hàm vs Gọi hàm
- **Định nghĩa (Declaration):** Mô tả hàm làm gì, tiếp nhận tham số gì và trả về kết quả gì. Lúc này mã nguồn **chưa thực thi**.
- **Gọi hàm (Invocation/Execution):** Truyền tham số thực tế và yêu cầu hệ thống thực thi khối mã.

```typescript
// ĐỊNH NGHĨA HÀM — Khai báo cấu trúc, chưa thực thi
function logOrderStatus(status: string): void {
  console.log("Trạng thái đơn hàng hiện tại:", status);
}

// GỌI HÀM — Bắt đầu thực thi chương trình
logOrderStatus("PROCESSING"); // Output: Trạng thái đơn hàng hiện tại: PROCESSING
```

---

### 1.3. Tham số & Kiểu tham số (Parameters & Type Annotations)
Trong TypeScript, luôn bắt buộc hoặc khuyến khích khai báo kiểu dữ liệu cho tham số để trình biên dịch phát hiện lỗi sớm ngay trong quá trình phát triển (Compile-time checking).

```typescript
function formatOrderPrice(amount: number, currency: string): string {
  return `${amount.toLocaleString("vi-VN")} ${currency}`;
}

// ✓ Đúng kiểu dữ liệu
const priceString = formatOrderPrice(250000, "VND"); // "250.000 VND"

// ✗ Lỗi biên dịch (Compile Error)
// formatOrderPrice("250000", "VND"); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

### 1.4. Kiểu trả về (Return Type) & Kiểu `void`
- **Kiểu trả về cụ thể (`number`, `string`, `boolean`, ...):** Hàm tính toán và trả về một giá trị thuộc kiểu đó.
- **Kiểu `void`:** Dùng khi hàm **không trả về giá trị nào** mà chỉ gây ra tác dụng phụ (side effects) như in log, ghi file, gọi API, hoặc tương tác UI.

```typescript
// Hàm trả về kiểu number
function calculateVat(total: number): number {
  return total * 0.08; // VAT 8%
}

// Hàm trả về void: Chỉ thực hiện hành động in hóa đơn
function printInvoice(order: OrderData): void {
  console.log(`--- HÓA ĐƠN ĐƠN HÀNG #${order.orderId} ---`);
  console.log(`Khách hàng: ${order.customerEmail}`);
  console.log(`Thành tiền: ${order.totalAmount} VND`);
}
```

---

### 1.5. Tham số mặc định (Default Parameters)
Tham số mặc định cho phép gán trước một giá trị nếu người gọi không truyền giá trị cho tham số đó.

> **Quy tắc:** Các tham số có giá trị mặc định hoặc tham số tùy chọn (`optional`) nên được đặt ở **cuối danh sách tham số**.

```typescript
function createOrderInfo(totalAmount: number, currency: string = "VND"): string {
  return `Đơn hàng trị giá ${totalAmount} ${currency}`;
}

console.log(createOrderInfo(500000));          // Output: "Đơn hàng trị giá 500000 VND"
console.log(createOrderInfo(100, "USD"));       // Output: "Đơn hàng trị giá 100 USD"
```

---

## 2. ARROW FUNCTION (HÀM MŨI TÊN)

### 2.1. Cú pháp Arrow Function
Arrow Function là cách viết hàm ngắn gọn, được sử dụng phổ biến nhất trong TypeScript modern và Playwright Automation.

```typescript
// 1. Dạng đầy đủ (Block body): Cần dấu { } và từ khóa return
const calculateDiscount = (amount: number): number => {
  return amount * 0.15; // Giảm giá 15%
};

// 2. Dạng rút gọn (Concise body): 1 biểu thức trả về → Bỏ { } và bỏ return
const calculateDiscountShort = (amount: number) => amount * 0.15;
const isDelivered = (order: OrderData) => order.status === "DELIVERED";

// 3. Trả về Object Literal: Phải bọc object trong cặp ngoặc đơn ( )
const toOrderSummary = (order: OrderData) => ({ 
  id: order.orderId, 
  total: order.totalAmount 
});
```

---

### 2.2. Cơ chế xử lý `this` trong Arrow Function
Cốt lõi khác biệt giữa Function thường và Arrow Function là cách ràng buộc con trỏ `this`:
- **Function thường:** Tạo ra ngữ cảnh `this` riêng, giá trị `this` bị thay đổi tùy thuộc vào cách hàm được gọi (dễ dẫn đến `this = undefined`).
- **Arrow Function:** **Không** tạo `this` riêng mà **giữ nguyên (mượn)** `this` từ ngữ cảnh bao quanh nó (Lexical `this`).

```typescript
// ✗ BỊ LỖI VỚI FUNCTION THƯỜNG
class OrderProcessorBad {
  storeName = "TechMart";

  processOrders(orders: OrderData[]) {
    orders.forEach(function(order) {
      // Lỗi runtime: Cannot read properties of undefined (reading 'storeName')
      // Do trong callback function(), 'this' bị mất ngữ cảnh (undefined)
      console.log(`[${this.storeName}] Xử lý đơn: ${order.orderId}`);
    });
  }
}

// ✓ CHÍNH XÁC VỚI ARROW FUNCTION
class OrderProcessorGood {
  storeName = "TechMart";

  processOrders(orders: OrderData[]) {
    orders.forEach((order) => {
      // 'this' được giữ nguyên từ instance của OrderProcessorGood
      console.log(`[${this.storeName}] Xử lý đơn: ${order.orderId}`); // Output: [TechMart] Xử lý đơn: ...
    });
  }
}
```

---

### 2.3. Dùng Arrow Function trong Playwright Framework
Arrow Function là cú pháp tiêu chuẩn trong Playwright cho các trường hợp:

```typescript
import { test, expect } from '@playwright/test';

// 1. Callback của test case - Cực kỳ phổ biến
test("Đặt hàng thành công trên hệ thống", async ({ page }) => {
  await page.goto("https://ecommerce-dev.example.com");
  await page.getByRole("button", { name: "Thanh toán" }).click();
});

// 2. Hook test
test.beforeEach(async ({ page }) => page.goto("/login"));

// 3. Helper function nhỏ gọn
const maskEmail = (email: string) => email.replace(/(?<=.{2}).(?=.*@)/g, "*");

// Quy ước dự án (Team Convention):
// - Callback (test, hook, filter, page.evaluate) & Helper đơn lẻ: Dùng Arrow Function
// - Method thuộc Class Page Object Model (POM): Dùng async method thường
```

---

## 3. PROMISE & BẤT ĐỒNG BỘ (ASYNCHRONOUS)

### 3.1. Promise là gì?
`Promise` là một đối tượng Javascript đại diện cho **kết quả của một tác vụ bất đồng bộ** (tác vụ chưa hoàn thành ngay lập tức, cần thời gian xử lý như gọi API, đọc file, truy vấn Database).

`Promise` trải qua 3 trạng thái:
1. **PENDING (Đang chờ):** Trạng thái ban đầu, tác vụ chưa hoàn thành.
2. **FULFILLED (Thành công):** Tác vụ hoàn thành xuất sắc và trả về kết quả qua `resolve()`.
3. **REJECTED (Thất bại):** Tác vụ gặp lỗi và trả về nguyên nhân qua `reject()`.

```typescript
function fetchOrderRaw(orderId: string): Promise<OrderData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderId) {
        resolve({
          orderId: orderId,
          totalAmount: 1200000,
          status: "DELIVERED",
          customerEmail: "user@example.com"
        });
      } else {
        reject(new Error("Mã đơn hàng không hợp lệ"));
      }
    }, 500);
  });
}
```

---

### 3.2. Generic `Promise<T>` trong TypeScript
`Promise<T>` là kiểu dữ liệu Generics. Phần nằm trong `<T>` cho biết **kiểu dữ liệu thực sự** mà Promise sẽ trả về khi nó ở trạng thái `FULFILLED`.

| Kiểu trả về đồng bộ | Kiểu trả về bất đồng bộ | Giải thích |
| :--- | :--- | :--- |
| `getSyncOrder(): OrderData` | `getAsyncOrder(): Promise<OrderData>` | Trả về một **lời hứa** sẽ cung cấp `OrderData` |
| `getAmount(): number` | `getAmountAsync(): Promise<number>` | Trả về lời hứa chứa kiểu `number` |
| `getList(): OrderData[]` | `getListAsync(): Promise<OrderData[]>` | Trả về lời hứa chứa mảng đơn hàng |
| `doAction(): void` | `doActionAsync(): Promise<void>` | Trả về lời hứa không có dữ liệu trả về |

> **Tại sao không thể trả về `OrderData` trực tiếp trong bất đồng bộ?**  
> Dữ liệu chưa tồn tại ngay thời điểm hàm thực hiện lệnh `return`. Hàm phải trả về đối tượng đại diện (`Promise`) và dữ liệu thật chỉ có sau khi tác vụ hoàn thành (qua `resolve`).

---

## 4. ASYNC / AWAIT & PLAYWRIGHT AUTOMATION

### 4.1. Cơ chế hoạt động của `async / await`
Cú pháp `async/await` giúp viết mã bất đồng bộ trông giống hệt mã đồng bộ, giúp mã nguồn sạch hơn và dễ bảo trì hơn so với dùng `.then()` / `.catch()`.

- **`async`:** Đặt trước một hàm, ép buộc hàm đó luôn luôn trả về một `Promise`.
- **`await`:** Đặt trước một `Promise`, **tạm dừng** việc thực thi hàm cho đến khi Promise đó hoàn thành (Fulfilled hoặc Rejected) và lấy giá trị trả về.

```typescript
async function safeFetchOrderInfo(orderId: string): Promise<void> {
  try {
    // Dừng hàm cho đến khi fetchOrderRaw hoàn tất và gán dữ liệu vào biến data
    const data: OrderData = await fetchOrderRaw(orderId);
    console.log("Lấy thông tin đơn hàng thành công:", data.orderId, data.status);
  } catch (error) {
    console.error("Xảy ra lỗi khi lấy đơn hàng:", (error as Error).message);
  }
}
```

---

### 4.2. Tại sao Playwright bắt buộc phải dùng `await`?
Trong Playwright Automation, hầu như tất cả mọi thao tác với trình duyệt (`page.goto`, `click`, `fill`, `expect`) đều là tác vụ bất đồng bộ và trả về `Promise`.

#### So sánh việc Quên `await` vs Có `await`:

```typescript
// ✗ SAI - QUÊN AWAIT (Gây ra lỗi Race Condition, Flaky Test)
page.goto("https://ecommerce-dev.example.com"); // Không chờ load trang
page.getByRole("button", { name: "Đặt hàng" }).click(); // Click bị lỗi vì trang chưa load xong!
expect(locator).toBeVisible(); // Assertion không được chờ → Pass giả (False Positive)!

const order = fetchOrderRaw("ORD123");
console.log(order.status); // Lỗi! order là Promise, order.status sẽ là 'undefined'!


// ✓ ĐÚNG - CÓ AWAIT ĐẦY ĐỦ
await page.goto("https://ecommerce-dev.example.com"); // Chờ trang load xong hẳn
await page.getByRole("button", { name: "Đặt hàng" }).click(); // Chờ click thực hiện thành công
await expect(locator).toBeVisible(); // Chờ phần tử hiển thị rõ ràng

const orderData = await fetchOrderRaw("ORD123");
console.log(orderData.status); // Output: "DELIVERED" (Đúng dữ liệu)
```