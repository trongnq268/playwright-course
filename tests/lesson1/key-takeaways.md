 Lesson 01 - Key Takeaways

# Tổng quan Automation Test

## Automation Test là gì?

Automation Test là dùng phần mềm/công cụ để chạy các bài kiểm tra phần mềm một cách tự động, thay vì phải ngồi click tay từng bướ

Ví dụ:

Manual Test:
- Mở trình duyệt
- Nhập Username
- Nhập Password
- Click Login
- Kiểm tra kết quả

Automation Test:
- Chạy 1 câu lệnh
- Máy tự thao tác
- Trả về kết quả Pass/Fail

---

# Khi nào nên Automation?
Không phải lúc nào mang automation test vào dự án cũng tốt. Nếu áp dụng sai thời điểm, nó sẽ trở thành "gánh nặng" vì tốn thời gian viết code test nhưng không mang lại hiệu quả-> Tính năng ổn định
1. Regression Testing
- Kiểm thử sau mỗi lần release
- Tiết kiệm thời gian

2. Smoke Testing

- Kiểm tra nhanh sau khi deploy

3. Test nhiều dữ liệu

Ví dụ:
- 50 tài khoản
- 100 khách hàng

4. Test nhiều trình duyệt

- Chrome
- Firefox
- Edge
- Safari

---

# Khi nào KHÔNG nên Automation?
-Chức năng đang thay đổi liên tục

- Chỉ test một lần

- Kiểm thử khám phá: Exploratory Testing

- Đánh giá giao diện (UX/UI)

---

# Test Pyramid: Test Pyramid (Kim tự tháp kiểm thử) là một mô hình/khung hướng dẫn cách phân bổ các loại bài kiểm thử (test) khác nhau trong một dự án phần mềm. Mô hình này được đề xướng bởi Mike Cohn trong cuốn sách Succeeding with Agile.-> cái nào nên làm nhiều, cái nào ko nên làm ít. Chia làm 3 tầng chính

1.Unit Test: Test từng hàm, vừa code vừa test từng hàm mình viết (nhanh nhất)
2.API / Integration Test: Test xem các thành phần, các module hoặc các dịch vụ (API) khi ghép lại với nhau có giao tiếp mượt mà không -> đảm bảo hệ thống k bị rời rạc. 
3.UI / E2E Test: Test giả lập toàn bộ hành vi của người dùng thật trên giao diện web hoặc app (chạy chậm nhất. dễ lỗi)
**Playwright chủ yếu dùng để test UI/E2E nhưng cũng hỗ trợ API Testing.

---

# Playwright là gì?

Playwright là framework Automation Test mã nguồn mở được Microsoft phát triển. Playwright là công cụ giúp bạn viết code để "điều khiển" các trình duyệt như Chrome, Firefox, Safari làm việc tự động thay cho con người.

- Hỗ trợ TypeScript, JavaScript, Python, Java, C#
- Chạy trên Chromium, Firefox, WebKit
- Auto Waiting
- Chạy song song (Parallel)
- Có Trace Viewer
- Có UI Mode
- Có Codegen

Automation Tester: Cần một công cụ mạnh mẽ, cài đặt nhanh gọn (chỉ mất vài phút), chạy nhanh để làm các bài test UI/E2E.
---
# Vì sao học TypeScript?
- Cũng là của Microsoft
- Là ngôn ngữ được Playwright ưu tiên
- Có kiểm tra kiểu dữ liệu
- VS Code hỗ trợ gợi ý code: Tự động gợi ý code thông minh
- Dễ phát hiện lỗi khi lập trình:Phát hiện lỗi ngay sau khi gõ
- Dễ dàng bảo trì và nâng cấp dự án lớn (dự án phình to với hàng trăm file code) với 1 click Rename symbol
-> Việc dùng TS trong Automation Test giúp kịch bản test ổn định và ít bị lỗi vặt hơn nhiều.
  - Code tự giản thích: Khi bạn làm việc nhóm hoặc tiếp quản dự án từ người khác, nhìn vào code TypeScript bạn sẽ hiểu ngay: Hàm này cần truyền vào cái gì (Số, Chuỗi hay Object?) và nó sẽ trả về kết quả gì. Kiểu dữ liệu chính là một cuốn tài liệu sống hướng dẫn cách dùng code.
---

# Kiến trúc Playwright
Luồng chạy sẽ diễn ra như sau:

-Test Code: Bạn viết kịch bản test (bằng TypeScript/JavaScript...).

-Playwright Test Runner: Đóng vai trò là "bộ não" trung tâm, dịch code của bạn thành các lệnh điều khiển, quản lý việc chạy song song (parallel) và báo cáo kết quả.

-Browser (Trình duyệt): Playwright gửi các lệnh này qua WebSocket (siêu nhanh) để điều khiển trực tiếp các lõi trình duyệt (Chromium, WebKit, Firefox).

-Website: Trình duyệt tương tác trực tiếp với trang web để click, nhập liệu, kiểm tra dữ liệu theo kịch bản.
**3 thành phần chính: Browser, Browser Context, và Page (giống như phân tầng, ví dụ: khách sạn -> phòng -> tivi..)
**Playwright thường chỉ khởi động Browser một lần duy nhất và dùng chung cho nhiều bài test để tiết kiệm thời gian. (Browser tốn khá nhiều thời gian khi làm)

---

# Các lệnh đã học

I.Kiểm tra môi trường

```bash
1. node -v: kiểm tra xem máy đã cài node js chưa, kiểm tra được version
2. npm -v : NPM giống như một cái chợ online, nơi bạn có thể tải các công cụ, thư viện do người khác viết sẵn về máy mình
3. git --version: kiểm tra lịch sử chỉnh sửa. có thể back lại nếu cần
```

II. Khởi tạo project  

```bash
4. npm init playwright@latest: Đi ra "chợ" NPM để tải phiên bản Playwright mới nhất về, đồng thời tự động xây dựng cho bạn một bộ khung dự án mẫu từ A-Z. Bạn chỉ cần gõ lệnh này một lần duy nhất khi bắt đầu làm dự án mới.
```

Chạy test

```bash
npx playwright test: Ra lệnh cho robot bắt đầu  test (chạy ngầm- không bật màn hình trình duyệt lên);tự bấm tự chạy và chỉ thông báo kết quả cuối cùng (nhanh nhất)
```

Chạy có giao diện

```bash
npx playwright test --headed: Giống lệnh trên, nhưng có thêm đuôi --headed (nghĩa là "có đầu"). Trình duyệt sẽ bật mở trên màn hình để bạn tận mắt nhìn thấy robot đang click vào đâu, nhập chữ gì giống như người thật.
```

Chạy Chromium

```bash
npx playwright test --project=chromium --headed: Bình thường robot sẽ test trên cả 3 trình duyệt (Chrome, Firefox, Safari). Lệnh này giúp bạn ra lệnh cụ thể: "Chỉ test trên một mình Chromium (Chrome) thôi, và nhớ bật màn hình lên cho tôi xem".
```

Mở Report

```bash
npx playwright show-report: Mở một trang web báo cáo cực đẹp sau khi test xong (Xanh - Pass; Đỏ - Fail). hiển thị rõ fail ở đòng nào
```

UI Mode

```bash
npx playwright test --ui: Mở ra một "bảng điều khiển tối tân" (UI Mode). Tại đây bạn có thể vừa nhìn thấy code, vừa thấy màn hình web, vừa bấm nút "Chạy" cho từng bài test nhỏ. Đây là chế độ tuyệt vời nhất khi bạn đang vừa viết code vừa muốn sửa lỗi trực tiếp.
```

---

# Kiến thức quan trọng

- Automation giúp tiết kiệm thời gian.

- Không phải test nào cũng nên automate.

- Playwright hiện là framework rất mạnh và được nhiều công ty sử dụng.

-  Auto Waiting giúp giảm lỗi flaky; Flaky Test (Bài test không ổn định) là một thuật ngữ dùng để chỉ một bài kiểm thử mà lúc chạy thì ĐẠT (Pass), lúc chạy lại thì XỊT (Fail), mặc dù cả code test lẫn code hệ thống (Website) đều không có bất kỳ thay đổi nào.

-  UI Mode là công cụ rất hữu ích để học và debug.
-  Học chắc Locator và Assertion là chìa khóa
-  Code Automation cũng cần được chăm sóc như Code Dev: viết code test sạch sẽ, dễ hiểu và dễ bảo trì
-  Playwright không cần tắt đi bật lại trình duyệt cho mỗi bài test. Nó chỉ tạo ra một Browser Context mới, giúp các bài test độc lập dữ liệu hoàn toàn mà vẫn tiết kiệm thời gian tối đa.
