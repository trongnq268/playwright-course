 Lesson 01 - Key Takeaways

# Tổng quan Automation Test

## Automation Test là gì?

Automation Test là việc sử dụng chương trình (code) để tự động thực hiện các bước kiểm thử thay cho con người.

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

✅ Regression Testing

- Kiểm thử sau mỗi lần release
- Tiết kiệm thời gian

✅ Smoke Testing

- Kiểm tra nhanh sau khi deploy

✅ Test nhiều dữ liệu

Ví dụ:
- 50 tài khoản
- 100 khách hàng

✅ Test nhiều trình duyệt

- Chrome
- Firefox
- Edge
- Safari

---

# Khi nào KHÔNG nên Automation?

❌ Chức năng đang thay đổi liên tục

❌ Chỉ test một lần

❌ Exploratory Testing

❌ Đánh giá giao diện (UX/UI)

---

# Test Pyramid

Unit Test
⬇️
API / Integration Test
⬇️
UI / E2E Test

Ý nghĩa:

- Unit Test nhiều nhất
- API Test ở mức trung gian
- UI Test ít nhất vì chạy chậm và dễ lỗi

Playwright chủ yếu dùng để test UI/E2E nhưng cũng hỗ trợ API Testing.

---

# Playwright là gì?

Playwright là framework Automation Test mã nguồn mở được Microsoft phát triển.

Ưu điểm:

- Hỗ trợ TypeScript, JavaScript, Python, Java, C#
- Chạy trên Chromium, Firefox, WebKit
- Auto Waiting
- Chạy song song (Parallel)
- Có Trace Viewer
- Có UI Mode
- Có Codegen

---

# Vì sao học TypeScript?

- Là ngôn ngữ được Playwright ưu tiên
- Có kiểm tra kiểu dữ liệu
- VS Code hỗ trợ gợi ý code
- Dễ phát hiện lỗi khi lập trình

---

# Kiến trúc Playwright

Test Code

↓

Playwright Test Runner

↓

Browser

↓

Website

Các thành phần chính:

- Browser
- Browser Context
- Page

---

# Các lệnh đã học

Kiểm tra môi trường

```bash
node -v
npm -v
git --version
```

Khởi tạo project

```bash
npm init playwright@latest
```

Chạy test

```bash
npx playwright test
```

Chạy có giao diện

```bash
npx playwright test --headed
```

Chạy Chromium

```bash
npx playwright test --project=chromium --headed
```

Mở Report

```bash
npx playwright show-report
```

UI Mode

```bash
npx playwright test --ui
```

---

# Kiến thức quan trọng

✔ Automation giúp tiết kiệm thời gian.

✔ Không phải test nào cũng nên automate.

✔ Playwright hiện là framework rất mạnh và được nhiều công ty sử dụng.

✔ Auto Waiting giúp giảm lỗi flaky.

✔ UI Mode là công cụ rất hữu ích để học và debug.
