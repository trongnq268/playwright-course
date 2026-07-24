# KEY TAKEAWAYS - SESSION TYPESCRIPT: FUNCTION & ASYNC/AWAIT

## 1\. Function

- Function hoạt động theo mô hình Input → Xử lý → Output.
- Phân biệt định nghĩa hàm (mô tả chức năng) và gọi hàm (thực thi).
- Luôn khai báo kiểu dữ liệu cho tham số để TypeScript kiểm tra lỗi sớm.
- Khai báo kiểu trả về rõ ràng, sử dụng void khi hàm chỉ thực hiện tác vụ mà không trả dữ liệu.
- Tham số có giá trị mặc định nên được đặt ở cuối danh sách tham số.

## 2\. Arrow Function

- Là cú pháp được sử dụng phổ biến nhất trong Playwright.
- Có thể viết ngắn gọn khi chỉ trả về một biểu thức.
- Arrow Function không tạo this riêng mà kế thừa this từ ngữ cảnh bao quanh.
- Nên sử dụng cho callback của test, hook, filter, eval và các helper function ngắn.

## 3\. Promise

- Promise đại diện cho kết quả của tác vụ bất đồng bộ với 3 trạng thái: Pending, Fulfilled và Rejected.
- Promise&lt;T&gt; cho biết kiểu dữ liệu sẽ nhận được khi Promise hoàn thành.
- Các kiểu phổ biến gồm Promise&lt;number&gt;, Promise&lt;boolean&gt;, Promise&lt;PaymentData&gt; và Promise&lt;void&gt;.

## 4\. Async / Await

- Hàm async luôn trả về Promise.
- await giúp chờ Promise hoàn thành trước khi tiếp tục xử lý và lấy giá trị thực tế.
- Nên sử dụng try/catch để xử lý lỗi trong các tác vụ bất đồng bộ.

## 5\. Playwright và await

- Hầu hết thao tác trong Playwright đều là bất đồng bộ và cần sử dụng await.
- Quên await có thể gây race condition, flaky test, assertion sai hoặc dữ liệu undefined.
- Nên sử dụng ESLint rule no-floating-promises để hạn chế bỏ sót Promise chưa được xử lý.

## 6\. Ghi nhớ nhanh

- Function = Input → Xử lý → Output.
- void = Hàm không trả giá trị.
- Arrow Function = phổ biến trong Playwright và giữ nguyên this.
- Promise&lt;T&gt; = lời hứa sẽ trả về dữ liệu kiểu T trong tương lai.
- async/await giúp code bất đồng bộ dễ đọc như code đồng bộ.
- Luôn kiểm tra và thêm await cho các thao tác Playwright.