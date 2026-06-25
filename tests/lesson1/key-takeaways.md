Lesson 01 - Tổng quan Automation Test & Playwright
## Mục tiêu buổi học
    - Hiểu Automation Test là gì
    - Biết khi nào nên và không nên automate
    - Cài đặt môi trường Playwright
    - Chạy được test đầu tiên

1. Automation Test là gì?

Automation Test là việc sử dụng chương trình để thực hiện các bước kiểm thử thay cho con người.

### Manual Test

- Mở trình duyệt -> Nhập username + Nhập password + Nhấn Login -> Kiểm tra kết quả -> Mất thời gian.

### Automation Test

Chỉ cần chạy một lệnh: ```bash``: npx playwright test -> Máy tính sẽ tự thực hiện toàn bộ.   

2. Khi nào nên Automation?

### Regression Test
Ví dụ: Sau mỗi lần release, chạy lại luồng **Đăng nhập → Thanh toán → Hoàn tiền** để đảm bảo tính năng cũ không bị lỗi.

### Smoke Test
Ví dụ: Sau khi deploy lên môi trường Dev/UAT, chạy nhanh các chức năng chính như **Đăng nhập, Tạo giao dịch, Đăng xuất** để kiểm tra hệ thống có hoạt động hay không.

### Test nhiều dữ liệu
Ví dụ: Kiểm tra chức năng đăng nhập với **50 tài khoản** khác nhau hoặc tạo giao dịch với nhiều mức tiền (10.000đ, 100.000đ, 1.000.000đ...).

### Test nhiều trình duyệt
Ví dụ: Chạy cùng một kịch bản trên **Chrome, Firefox và Edge** để đảm bảo website hoạt động giống nhau trên mọi trình duyệt.

3. Khi nào KHÔNG nên Automation?

### UI thay đổi liên tục
Ví dụ: Trang đăng ký đang trong giai đoạn phát triển, giao diện thay đổi mỗi ngày nên script sẽ thường xuyên bị lỗi và phải sửa liên tục.

### Chỉ test một lần
Ví dụ: Kiểm thử một chương trình khuyến mãi chỉ diễn ra trong 1 ngày hoặc một tính năng dùng để demo rồi bị xóa.

### Exploratory Testing
Ví dụ: Tester tự do khám phá chức năng mới để tìm lỗi về giao diện, trải nghiệm người dùng hoặc các trường hợp chưa được tài liệu đề cập.

### Chi phí bảo trì lớn hơn lợi ích
Ví dụ: Chức năng rất ít sử dụng nhưng thường xuyên thay đổi giao diện. Mỗi lần sửa code automation mất nhiều thời gian hơn việc test thủ công vài phút.

4. Test Pyramid

Test Pyramid (Kim tự tháp kiểm thử) là mô hình hướng dẫn cách phân bổ các loại kiểm thử trong dự án để tối ưu thời gian và chi phí.

```
         UI / E2E Test
      (Ít - Chậm - Tốn kém)
               ▲
               │
     API / Integration Test
      (Vừa - Nhanh hơn)
               ▲
               │
         Unit Test
 (Nhiều - Nhanh - Chi phí thấp)
```

## Unit Test
Kiểm tra từng hàm hoặc module nhỏ của chương trình.

Ví dụ: Hàm tính phí giao dịch: ```ts: calculateFee(100000) // Kết quả: 2200``` -> Developer thường viết Unit Test.

## API / Integration Test
Kiểm tra việc giao tiếp giữa các hệ thống hoặc API.

Ví dụ: Gọi API tạo giao dịch: ```POST /api/payment``` -> Kiểm tra: - Status Code = 200 + Response đúng + Dữ liệu được lưu vào database

## UI / End-to-End (E2E) Test
Mô phỏng toàn bộ thao tác của người dùng trên giao diện.

Ví dụ:

- Mở website -> Đăng nhập -> Tạo giao dịch -> Thanh toán -> Kiểm tra giao dịch thành công

Playwright chủ yếu được sử dụng để viết UI/E2E Test.

## Vì sao gọi là "Kim tự tháp"?
-> Mục tiêu là có 'nhiều Unit Test', 'ít API Test hơn' và 'rất ít UI/E2E Test' để đảm bảo hiệu quả kiểm thử.
- Đáy (Unit Test): Viết nhiều nhất vì chạy rất nhanh và dễ bảo trì.
- Giữa (API Test): Viết vừa phải để kiểm tra luồng nghiệp vụ.
- Đỉnh (UI/E2E Test): Viết ít vì chạy chậm, dễ bị ảnh hưởng khi giao diện thay đổi và tốn chi phí bảo trì.

5. Playwright

## Ưu điểm của Playwright

5.1. Microsoft phát triển và bảo trì nên tài liệu đầy đủ, cập nhật thường xuyên và được nhiều công ty sử dụng.

Ví dụ: Khi gặp lỗi hoặc muốn học thêm, có rất nhiều tài liệu và ví dụ trên website chính thức của Playwright.

5.2. Hỗ trợ nhiều trình duyệt: Một kịch bản test có thể chạy trên nhiều trình duyệt mà không cần viết lại code.

Ví dụ:

- Chrome (Chromium)
- Firefox
- Safari (WebKit)

Chỉ cần chạy:

```bash
npx playwright test
```

Playwright sẽ chạy trên tất cả trình duyệt đã cấu hình.

---

5.3. Auto Waiting: Playwright tự động chờ element xuất hiện trước khi thao tác.

Ví dụ: Khi nhấn nút **Login**, website mất khoảng 2 giây mới hiển thị nút.

Ở Selenium thường phải viết:

```java
WebDriverWait...
```

Trong Playwright chỉ cần:

```ts
await page.getByRole('button', { name: 'Login' }).click();
```

Playwright sẽ tự chờ nút sẵn sàng rồi mới click -> Giúp giảm rất nhiều lỗi do thao tác quá nhanh.


5.4. Chạy song song (Parallel)

Có thể chạy nhiều test cùng lúc để tiết kiệm thời gian.

Ví dụ:

Có 30 test:

- Chạy tuần tự: khoảng 30 phút.
- Chạy song song: chỉ khoảng 8–10 phút (tùy số worker).

5.5. HTML Report: Sau khi chạy test sẽ sinh ra báo cáo trực quan.

Chạy:

```bash
npx playwright show-report
```

Có thể xem:

- Test Pass/Fail
- Thời gian chạy
- Screenshot (nếu có)
- Error chi tiết

-> Dễ gửi cho Leader hoặc khách hàng.


5.6. UI Mode: Cho phép chạy test bằng giao diện thay vì Terminal.

Chạy:

```bash
npx playwright test --ui
```

Có thể:

- Chạy từng test
- Theo dõi từng bước
- Xem element
- Debug lỗi dễ dàng

---
5.7: Ví dụ thực tế

Giả sử cần kiểm thử chức năng **Đăng nhập**.

Playwright sẽ:
    1. Mở trình duyệt.
    2. Truy cập website.
    3. Nhập username.
    4. Nhập password.
    5. Click Login.
    6. Tự chờ trang tải xong (Auto Waiting).
    7. Kiểm tra kết quả.
    8. Sinh HTML Report sau khi chạy.

6. Các lệnh đã học (Git Bash)

Kiểm tra môi trường
node -v: Kiểm tra phiên bản Node.js.
npm -v: Kiểm tra phiên bản npm.
git --version: Kiểm tra phiên bản Git.

Khởi tạo project Playwright (code .):
B1: mở cmd Di chuyển đến nơi muốn tạo project 
B2: chạy lệnh: ```npm init playwright@latest``
B3: Trả lời câu hỏi: 

Getting started with writing end-to-end tests with Playwright

 - Do you want to use TypeScript or JavaScript? › TypeScript

- Where to put your end-to-end tests? › tests

- Add a GitHub Actions workflow? › No

- Install Playwright browsers? › Yes

B4: Chờ cài

Playwright sẽ tự động:

- Cài thư viện Playwright
- Tải các trình duyệt (Chromium, Firefox, WebKit)
- Tạo sẵn cấu trúc project

Chạy thử test đầu tiên: ```npx playwright test```

Chạy có giao diện: ```npx playwright test --headed```

Chạy Chromium:```npx playwright test --project=chromium --headed```

Xem report: ```npx playwright show-report```

UI Mode```npx playwright test --ui```

Chạy 1 file test: ```npx playwright test tests/lesson01/lesson1.spec.ts```


**Nếu clone project từ Git về thì không dùng npm init playwright@latest nữa, vì project đã được tạo sẵn. Thay vào đó bạn cần cài các thư viện từ file package.json -> 
    Nếu chưa có thư mục node_modules: Cài thư viện: ``` npm install ```
    Chạy test: ``` npx playwright test ```
**