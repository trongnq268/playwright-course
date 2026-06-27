# Buổi 1: Tổng quan Automation Test & Cài đặt Playwright

## 1. Tổng quan về Automation Testing
* **Định nghĩa:** Là việc sử dụng mã code để máy tính thực hiện các bước kiểm thử tự động thay thế cho con người.

Không phải lúc nào cũng nên áp dụng kiểm thử tự động, cần phân biệt rõ:

### ✅ NÊN Automate
* **Regression test:** Kiểm thử hồi quy, lặp đi lặp lại sau mỗi lần hệ thống release bản cập nhật mới.
* **Smoke test:** Kiểm tra nhanh các chức năng chính ngay sau khi vừa deploy.
* **Test data lớn:** Khi cần kiểm thử với nhiều bộ dữ liệu (ví dụ: chạy thử với 50 tài khoản khác nhau).
* **Multi-browser/devices:** Kiểm thử trên nhiều trình duyệt và thiết bị khác nhau.

### ⛔ KHÔNG NÊN Automate
* Tính năng đang thay đổi liên tục, giao diện (UI) chưa ổn định.
* Các ca kiểm thử (test case) chỉ chạy duy nhất một lần.
* Kiểm thử khám phá (Exploratory testing) hoặc đánh giá trải nghiệm người dùng (UX), cảm quan thẩm mỹ.
* Khi chi phí bỏ ra để viết và bảo trì script lớn hơn lợi ích thu lại.

>  Automation không thay thế hoàn toàn Manual Tester. 

---

## 2. Tại sao chọn Playwright & TypeScript?
### Vì sao chọn Playwright?
Playwright là công cụ mã nguồn mở do Microsoft phát triển với nhiều ưu điểm vượt trội so với Selenium hay Cypress:
* Hỗ trợ đa ngôn ngữ (JS/TS, Python, Java, C#) và đa trình duyệt (Chromium, Firefox, WebKit).
* Tính năng **Auto-waiting** (tự động chờ phần tử hiển thị sẵn sàng) giúp giảm tới ~80% lỗi flaky so với Selenium.
* Tốc độ chạy nhanh, hỗ trợ chạy song song miễn phí, quản lý nhiều tab/origin tốt.
* Bộ công cụ hỗ trợ debug cực mạnh: UI Mode, Trace Viewer, Codegen.

### Vì sao chọn TypeScript (TS)?
* Playwright được tối ưu tốt nhất cho TypeScript từ tài liệu hướng dẫn đến các công cụ đi kèm.
* TypeScript cung cấp kiểu dữ liệu mạnh, giúp VS Code gợi ý code tự động và bắt lỗi cú pháp ngay khi gõ, rất thân thiện cho người mới.

---

## 3. Cài đặt Antigravity IDE và NodeJs
***(Tự thực hành cài và tạo project trên máy)***

---

## 4. Cấu trúc thư mục của một Project Playwright
Khi khởi tạo thành công, cấu trúc thư mục tiêu chuẩn bao gồm:
* `tests/`: Nơi chứa toàn bộ các file kịch bản kiểm thử (ví dụ: `example.spec.ts`).
* `playwright.config.ts`: File cấu hình trung tâm (quản lý trình duyệt, môi trường, số lần thử lại - retries, ghi trace, video...).
* `package.json`: Nơi quản lý thông tin dự án và danh sách các thư viện được cài đặt.
* `.gitignore`: File cấu hình sẵn để loại bỏ các thư mục không cần đẩy lên Git như `node_modules`, `test-results`, `playwright-report`.

---

## 5. Cấu trúc thư mục của một Project Playwright
### Các câu lệnh cơ bản
| Câu lệnh | Mục đích |
| :--- | :--- |
| `node -v` \| `npm -v` | Kiểm tra phiên bản Node.js và npm trên máy |
| `npm init playwright@latest` | Khởi tạo một project Playwright mới từ đầu. |
| `npx playwright test` | Chạy toàn bộ các test case ở chế độ ngầm (Headless). |
| `npx playwright show-report` | Mở báo cáo kết quả test dưới dạng giao diện HTML. |
| `npx playwright test --ui` | Mở **UI Mode** - công cụ trực quan để chạy, debug và xem snapshot từng bước. |

### Cài đặt extensions Playwright Test for VS Code và cấu hình
Cài đặt extension này giúp việc viết và chạy test Playwright dễ dàng hơn

## 6. Thực hành gencode 
* **Bước 1:** Khởi động gencode.
* **Bước 2:** Record kịch bản bằng cách thực hiện các hành động sau trên Cửa sổ Trình duyệt.
* **Bước 3:** Xác minh kết quả bằng Assertion.
* **Bước 4:** Stop record và lưu code.
* **Bước 5:** Chạy lại kịch bản vừa ghi.