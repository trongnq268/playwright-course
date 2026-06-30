# TypeScript – Biến, Kiểu Dữ Liệu & Toán Tử
## 1. Biến và Khai Báo Biến
*   **Biến là gì:** Là một vùng nhớ trong máy tính được đặt tên, dùng để lưu trữ dữ liệu tạm thời trong quá trình chạy code.
*   **Tên biến:** Phải mang ý nghĩa rõ ràng, tuân thủ quy tắc `camelCase` (ví dụ: `userName`, `paymentTotal`). Không được bắt đầu bằng số hoặc chứa ký tự đặc biệt (ngoại trừ `_` và `$`).
*   **Giá trị của biến:** Là dữ liệu thực tế mà biến đó đang nắm giữ (ví dụ: số `100`, chuỗi `"Thành công"`).
*   **Cách khai báo biến:** Sử dụng từ khóa `let` hoặc `const` + Tên biến + Cú pháp gán (`=`) + Giá trị.
    *   *Ví dụ:* `let retryCount = 3;`
---

## 2. Phân Biệt `let` và `const`
*   **`let` (Biến có thể thay đổi):**
    *   *Đặc điểm:* Cho phép gán lại giá trị mới sau khi đã khai báo.
    *   *Khi nào dùng:* Dùng cho các biến đếm trong vòng lặp (`for`), cờ trạng thái (flags), hoặc các giá trị chắc chắn sẽ bị cập nhật trong quá trình test chạy.
*   **`const` (Hằng số):**
    *   *Đặc điểm:* Bắt buộc phải gán giá trị ngay khi khai báo và **không thể gán lại** giá trị khác.
    *   *Khi nào dùng:* Dùng làm mặc định cho hầu hết các khai báo (ví dụ: khai báo URL, lưu locators, hằng số cấu hình). Việc dùng `const` giúp tránh các lỗi vô tình ghi đè dữ liệu.

---

## 3. Kiểu Dữ Liệu Cơ Bản (Primitive Types)
*   **`number`:** Biểu diễn số nguyên hoặc số thực.
    *   *Ví dụ:* `let timeout: number = 5000;`, `let price: number = 99.99;`
*   **`string`:** Biểu diễn chuỗi văn bản, luôn được đặt trong dấu nháy đơn `''`, nháy kép `""` hoặc backticks ` \`\` `.
    *   *Ví dụ:* `let merchantName: string = "OnePAY";`
*   **`boolean`:** Chỉ mang 1 trong 2 giá trị `true` (Đúng) hoặc `false` (Sai). Thường dùng trong các câu lệnh điều kiện.
    *   *Ví dụ:* `let isPaymentSuccess: boolean = true;`
*   **`any`:** Một kiểu đặc biệt vô hiệu hóa việc kiểm tra kiểu dữ liệu của TypeScript. Chỉ nên dùng khi thực sự không biết dữ liệu trả về là gì (ví dụ: ép kiểu một API response phức tạp), cần hạn chế lạm dụng.
*   **`null` và `undefined`:** Thể hiện việc biến không có giá trị hoặc chưa được gán giá trị.

---

## 4. Type Annotation & Type Inference
*   **Type Annotation (Khai báo tường minh):** chỉ định rõ kiểu dữ liệu của biến bằng cú pháp dấu hai chấm `:` ngay khi khởi tạo. Giúp code an toàn và dễ đọc hơn.
    *   *Ví dụ:* `let transactionId: string = "TXN12345";`
*   **Type Inference (Tự suy luận kiểu):** khởi tạo biến bằng một giá trị ngay lập tức, TypeScript tự đoán kiểu mà không cần phải viết Type Annotation.
    *   *Ví dụ:* `let status = "Success";` (TypeScript tự ngầm hiểu `status` là kiểu `string`).

---

## 5. Template String (Chuỗi Nội Suy)
*   **Template string là gì:** Là cách khai báo chuỗi bằng dấu backticks ( \` \` ). Nó cho phép viết chuỗi trên nhiều dòng và nhúng trực tiếp các biến hoặc biểu thức toán học vào trong chuỗi thông qua cú pháp `${tên_biến}`.
*   **Thực tế trong Playwright:** Cực kỳ hữu dụng khi bạn cần tạo các bộ định vị (Locators) hoặc các thông báo lỗi động.
    *   *Ví dụ:* 
    ```typescript
    const buttonName = "Thanh toán";
    // Nhúng biến vào locator
    await page.locator(`button[name="${buttonName}"]`).click();
    ```

---

## 6. Toán Tử (Operators)
*   **Toán tử số học:** Dùng để tính toán: `+` (Cộng), `-` (Trừ), `*` (Nhân), `/` (Chia), `%` (Chia lấy dư).
*   **Toán tử so sánh (Nền tảng của Assertion):** Dùng để đối chiếu 2 giá trị. Kết quả trả về luôn là `boolean`.
    *   `===` (Bằng tuyệt đối cả giá trị lẫn kiểu dữ liệu - **Luôn khuyên dùng**).
    *   `!==` (Khác).
    *   `>`, `<`, `>=`, `<=`.
    *   *Thực tiễn Playwright:* `expect(actualAmount === expectedAmount).toBeTruthy();`
*   **Toán tử logic (Kết hợp điều kiện):** Dùng nhiều trong cấu trúc `if...else`.
    *   `&&` (AND - Chỉ `true` khi cả hai vế cùng `true`).
    *   `||` (OR - `true` khi ít nhất một vế `true`).
    *   `!` (NOT - Phủ định, đảo ngược kết quả từ `true` thành `false` và ngược lại).

---

## 7. Đọc Lỗi Đỏ (Compiler Errors) Trên VSCode
Khi viết TypeScript, VSCode sẽ gạch chân đỏ khi phát hiện lỗi trước cả khi chạy code. Dưới đây là cách hiểu và fix:
*   **Lỗi 1: Sai kiểu dữ liệu**
    *   *Cảnh báo:* `Type 'string' is not assignable to type 'number'.`
    *   *Nguyên nhân:* đang cố gán một chuỗi chữ vào một biến đã được định dạng là số.
    *   *Cách Fix:* Kiểm tra lại kiểu dữ liệu của biến hoặc ép kiểu (casting) trước khi gán.
*   **Lỗi 2: Không tìm thấy tham chiếu**
    *   *Cảnh báo:* `Cannot find name 'myVariable'.`
    *   *Nguyên nhân:* Thường do gõ sai chính tả tên biến/hàm, hoặc bạn đang sử dụng một thư viện (như hàm `expect` của Playwright) mà quên chưa `import` nó ở đầu file.
*   **Lỗi 3: Gán lại cho hằng số**
    *   *Cảnh báo:* `Cannot assign to 'x' because it is a constant.`
    *   *Nguyên nhân:* Bạn đang cố gắng thay đổi giá trị của một biến được khai báo bằng từ khóa `const`.
    *   *Cách Fix:* Đổi `const` thành `let` nếu logic của bạn thực sự cần cập nhật/thay đổi giá trị đó.
