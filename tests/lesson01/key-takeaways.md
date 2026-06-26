# Bài 1: Key Takeaways - Nhập môn Playwright & TypeScript

## 1. Tìm hiểu tổng quan về Playwright và TypeScript
* **Playwright:** Là một framework Automation Test mã nguồn mở do Microsoft phát triển, chuyên dùng để kiểm thử end-to-end (E2E) cho các ứng dụng web. Playwright nổi bật với khả năng chạy test nhanh, song song, và hỗ trợ đa trình duyệt (Chromium, Firefox, WebKit).
* **TypeScript:** Là ngôn ngữ lập trình phát triển từ JavaScript, bổ sung thêm hệ thống kiểu dữ liệu tĩnh (static typing). Kết hợp TypeScript với Playwright giúp code chặt chẽ hơn, dễ dàng phát hiện lỗi ngay trong quá trình gõ code thay vì đợi lúc chạy test.

## 2. Cách cài đặt môi trường Playwright
* Cần có Node.js cài đặt sẵn trên máy.
* Khởi tạo project dùng dòng lệnh `npm init playwright@latest`, tự động tải về các trình duyệt và thiết lập sẵn thư mục cấu trúc.

## 3. Tìm hiểu về cấu trúc Project cơ bản
Sau khi khởi tạo, project sẽ có các thư mục và file sau:
* **`tests/`**: Thư mục chính chứa toàn bộ các file code test (thường có đuôi `.spec.ts`).
* **`tests-examples/`**: Thư mục chứa các kịch bản test mẫu do Playwright tự sinh ra.
* **`playwright-report/`**: Nơi lưu trữ báo cáo (report) dạng HTML sau mỗi lần chạy test.
* **`test-results/`**: Chứa các dữ liệu bổ sung sinh ra trong lúc test (artifacts) như hình ảnh, video, hoặc file trace (đặc biệt khi test bị fail).
* **`playwright.config.ts`**: File cấu hình của toàn bộ project, chứa các thiết lập về môi trường, số luồng chạy, trình duyệt, v.v.

## 4. Tìm hiểu các cấu hình trong `playwright.config.ts`
* **`retries`** (Số lần chạy lại):
    * *Ý nghĩa:* Xác định số lần Playwright tự động chạy lại một test case nếu nó bị fail.
    * *Khi nào dùng:* hữu ích trên môi trường CI/CD (như GitHub Actions, Jenkins) để khắc phục tình trạng "flaky tests" — những test case đôi khi fail do mạng chậm, server phản hồi trễ hoặc môi trường không ổn định.
* **`workers`** (Số lượng luồng song song):
    * *Ý nghĩa:* Số lượng tiến trình (process) chạy test cùng lúc.
    * *Khi nào dùng:* Dùng để tăng tốc độ chạy bộ test (test suite). Máy càng mạnh thì càng có thể tăng số worker. Tuy nhiên, trên CI/CD, thường sẽ giới hạn số worker (ví dụ: 1 hoặc 2) để tránh quá tải tài nguyên.
* **`use: { trace: 'on', video: 'on' }`** (Cấu hình dữ liệu gỡ lỗi):
    * **`trace`**: Tính năng chụp lại toàn bộ DOM, network, console logs của mọi bước test. Cấu hình `'on'` sẽ luôn ghi lại trace, nhưng thực tế hay dùng `'retain-on-failure'` (chỉ lưu trace khi test fail) để tiết kiệm dung lượng.
    * **`video`**: Quay lại video màn hình trong quá trình test chạy. Tương tự trace, thường dùng khi cần bằng chứng trực quan xem test đã thao tác giao diện như thế nào khi gặp lỗi.
* **`projects`** (Cấu hình dự án/môi trường):
    * *Ý nghĩa:* Cho phép khai báo các cấu hình chạy test khác nhau.
    * *Khi nào dùng:* Phổ biến nhất là để chạy "Cross-browser testing" — định nghĩa một project chạy trên Chromium, một project chạy Firefox, một project giả lập Mobile. Hoặc có thể dùng để định nghĩa các môi trường khác nhau (như project test môi trường Dev, project test môi trường Staging).

## 5. Chạy thử Sample Test
* `npx playwright test`: Lệnh cơ bản để chạy toàn bộ file test. Mặc định chạy ở chế độ **Headless** (chạy ngầm, không mở giao diện trình duyệt lên), có thể mở giao diện bằng cách vào extension -> setting -> show browser
* `npx playwright test --ui`: Mở giao diện UI của Playwright. Tại đây có thể chọn chạy từng test, xem DOM, network và gỡ lỗi (debug) cực kỳ trực quan.

## 6. Tìm hiểu xem Report
* `npx playwright show-report`: Mở báo cáo HTML trên trình duyệt. Báo cáo này thống kê rõ bao nhiêu test pass/fail/flaky, thời gian chạy, và cho phép xem chi tiết từng bước (step) của một test bị lỗi.

## 7. Cài đặt extension Playwright Test for VSCode
* Thay vì luôn phải gõ lệnh ở terminal, extension này tích hợp Playwright thẳng vào IDE VSCode. Có thể nhấn nút "Play" ngay cạnh dòng code để chạy test, đặt breakpoint để debug, và quản lý các thiết lập một cách nhanh chóng.

## 8. Tính năng Record Codegen
* *Dùng tính năng record:* Khi kích hoạt, Playwright sẽ mở một trình duyệt. Mọi thao tác click, điền text, chuyển trang trên trình duyệt được Playwright tự động dịch ra thành code TypeScript ngay lập tức.
* *Chạy lại testcase vừa được record và gen code typescript tự động:* playwright tự động làm lại mọi thao tác của user đã thực hiện trên trình duyệt trước đó
