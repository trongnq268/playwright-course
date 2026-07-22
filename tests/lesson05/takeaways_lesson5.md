#  Buổi 5 - Function & Async/Await

## 1. Function
- Function là một khối code thực hiện một công việc.
- Tư duy: **Input → Xử lý → Output**.
- Hàm chỉ chạy khi được **gọi**.

```ts
function addFee(amount: number): number {
  return amount * 1.1;
}

addFee(100000);
```

---

## 2. Tham số và kiểu trả về
- Khai báo kiểu dữ liệu cho tham số để TypeScript kiểm tra lỗi.
- Khai báo kiểu trả về (`number`, `string`, `boolean`, `void`,...).

```ts
function formatMoney(amount: number): string {
  return `${amount} VND`;
}
```

### `void`
Dùng khi hàm **không trả về giá trị**, chỉ thực hiện một hành động.

```ts
function logStatus(status: string): void {
  console.log(status);
}
```

---

## 3. Tham số mặc định

Có thể gán giá trị mặc định cho tham số.

```ts
function createPayment(amount: number, currency = "VND") {
  return `${amount} ${currency}`;
}
```

> Tham số có giá trị mặc định nên đặt ở cuối.

---

## 4. Arrow Function ⭐
Đây là kiểu function được dùng nhiều nhất trong Playwright.

```ts
const getTax = (amount: number) => amount * 0.1;
```

Ưu điểm:
- Cú pháp ngắn gọn.
- Giữ nguyên `this`.
- Thường dùng cho callback và helper.

Ví dụ trong Playwright:

```ts
test("Login", async ({ page }) => {
  await page.goto("https://...");
});
```

---

## 5. Promise
Promise đại diện cho **một tác vụ bất đồng bộ**.

Có 3 trạng thái:
- `Pending`
- `Fulfilled`
- `Rejected`

```ts
function fetchData(): Promise<string> {
  ...
}
```

`Promise<T>` nghĩa là khi hoàn thành sẽ trả về kiểu `T`.

---

## 6. async / await ⭐

- Hàm có `async` luôn trả về `Promise`.
- `await` dùng để chờ Promise hoàn thành rồi mới lấy kết quả.

```ts
const data = await fetchPaymentRaw(id);
```

Có thể dùng `try...catch` để xử lý lỗi.

```ts
try {
  const data = await fetchData();
} catch (error) {
  console.log(error);
}
```

---

## 7. Vì sao Playwright cần `await`

Hầu hết các thao tác của Playwright đều là bất đồng bộ.

```ts
await page.goto(url);
await page.click(...);
await expect(locator).toBeVisible();
```

Nếu quên `await` có thể gây:
- Race condition.
- Test flaky.
- Assertion sai.
- Giá trị `undefined`.
