# 📚 Lesson 01 - Automation Test & Playwright

> **📅 Date:** 25/06/2026
> **👨‍💻 Author:** Nguyễn Linh
> **🎯 Lesson:** Introduction to Automation Testing & Playwright Setup

---

## 🎯 Learning Objectives

Sau buổi học này mình cần:

- Hiểu Automation Test là gì.
- Biết khi nào nên và không nên Automation.
- Hiểu Test Pyramid.
- Biết Playwright là gì.
- Cài đặt thành công môi trường Playwright.
- Chạy được testcase đầu tiên.
- Biết sử dụng UI Mode và HTML Report.

---

## 📑 Table of Contents

1. Automation Test
2. Khi nào nên Automation?
3. Test Pyramid
4. Playwright
5. Playwright Architecture
6. Environment Setup
7. Project Structure
8. Common Commands
9. Best Practices
10. Common Mistakes
11. Practical Experience
12. Summary

---

## 1️⃣ Automation Test

### 📖 Definition

Automation Test là phương pháp sử dụng code để máy tính tự động thực hiện các bước kiểm thử thay cho con người.

Thay vì Tester phải thao tác thủ công:

```text
Open Browser
↓
Enter username
↓
Enter password
↓
Click Login
↓
Verify Result
```

Chỉ cần chạy:

```bash
npx playwright test
```

Playwright sẽ tự thực hiện toàn bộ quy trình và trả về kết quả Pass hoặc Fail.

---

### ⚖️ Manual Test vs Automation Test

| Manual Test                | Automation Test        |
| -------------------------- | ---------------------- |
| Tester thao tác bằng tay | Chạy bằng code       |
| Chậm                      | Nhanh                  |
| Dễ sai sót               | Chính xác            |
| Tốn nhiều nhân lực     | Tiết kiệm thời gian |
| Khó chạy Regression      | Phù hợp Regression   |

---

## 2️⃣ Khi nào nên Automation?

### ✅ Nên

| Trường hợp                  | Lý do                       |
| ------------------------------ | ---------------------------- |
| Regression Test                | Lặp lại mỗi lần release |
| Smoke Test                     | Kiểm tra nhanh sau deploy   |
| Test nhiều dữ liệu          | Tiết kiệm thời gian       |
| Test nhiều Browser/thiết bị | Dễ dàng chạy song song    |

### ❌ Không nên

| Trường hợp                          | Lý do👨                                                          |
| -------------------------------------- | ----------------------------------------------------------------- |
| UI thay đổi liên tục               | Chi phí bảo trì cao                                            |
| Chỉ test một lần duy nhất          | Không đáng đầu tư                                           |
| Exploratory Testing                    | Cần tư duy của Tester                                          |
| UX/UI Review                           | Automation không đánh giá được trải nghiệm người dùng |
| Chi phí viết + bảo trì > lợi ích | Doanh thu không cao                                              |

💡 **Ghi nhớ:** Automation **không thay thế** Manual Tester, mà **hỗ trợ** để làm việc hiệu quả hơn.

---

## 3️⃣ Test Pyramid

```text
              UI / E2E
        API / Integration
           Unit Test
```

| Layer     | Đặc điểm              |
| --------- | ------------------------- |
| Unit Test | Nhanh nhất, nhiều nhất |
| API Test  | Cân bằng                |
| UI Test   | Chậm nhất, ít nhất    |

#### 📌 Ghi nhớ

Playwright chủ yếu dùng để kiểm thử UI/E2E, tuy nhiên vẫn hỗ trợ API Testing.

Một dự án tốt nên có nhiều Unit Test, vừa đủ API Test và chỉ automate những UI Test quan trọng.

---

## 4️⃣ Playwright

### 📖 Playwright là gì?

Playwright là framework Automation Test mã nguồn mở được Microsoft phát triển.

Hiện tại hỗ trợ:

- Chromium
- Firefox
- WebKit


### ⭐ Ưu điểm

| Feature            | Benefit                           |
| ------------------ | --------------------------------- |
| Auto Waiting       | Không cần viết wait thủ công |
| Parallel Execution | Chạy nhiều test cùng lúc      |
| Multi Browser      | Chrome, Firefox, Safari           |
| UI Mode            | Debug trực quan                  |
| HTML Report        | Báo cáo kết quả               |
| Trace Viewer       | Phân tích lỗi chi tiết        |

❓Vì sao học TypeScript?
- Playwright "sinh ra" cho TypeScript → tài liệu chính thức, codegen, ví dụ đều ưu tiên TS
- TypeScript = JavaScript + kiểu dữ liệu → VS Code gợi ý code, bắt lỗi ngay khi gõ (rất hợp người mới)
---

## 5️⃣ Playwright Architecture

```text
Test Script
      │
      ▼
Playwright Test Runner
      │
      ▼
Browser
      │
      ▼
Website
```

Các khái niệm chính:

- Browser
- Context (phiên ẩn danh)
- Page (tab)

---

## 6️⃣ Environment Setup

### Kiểm tra môi trường

```bash
node -v
npm -v
git --version
```

---

### Khởi tạo Project

```bash
mkdir playwright-course
cd playwright-course

npm init playwright@latest
```

---

## 7️⃣ Project Structure

```text
playwright-course
│
├── tests/
├── tests-examples/
├── playwright.config.ts
├── package.json
└── node_modules/
```

### Ý nghĩa

| File                 | Vai trò              |
| -------------------- | --------------------- |
| tests                | Chứa testcase        |
| playwright.config.ts | Cấu hình Playwright |
| package.json         | Quản lý thư viện  |
| node_modules         | Dependency            |

---

## 8️⃣ Common Commands

### Chạy toàn bộ testcase

```bash
npx playwright test
```

---

### Chạy có giao diện

```bash
npx playwright test --headed
```

---

### Chạy Chromium

```bash
npx playwright test --project=chromium --headed
```

---

### UI Mode

```bash
npx playwright test --ui
```

---

### HTML Report

```bash
npx playwright show-report
```

---

## 💡 Best Practices

- Không sử dụng `waitForTimeout()` nếu không thực sự cần.
- Đặt tên testcase theo nghiệp vụ.
- Mỗi testcase chỉ kiểm tra một chức năng.
- Luôn đọc HTML Report khi test fail.
- Ưu tiên Locator ổn định.
- Commit source thường xuyên.

---

## ❌ Common Mistakes

- Sử dụng Hard Wait quá nhiều.
- Viết XPath quá dài.
- Một testcase kiểm tra quá nhiều chức năng.
- Không đọc Error Message khi test fail.
- Không xem HTML Report trước khi sửa code.

---

## 📝 Key Takeaways

Sau buổi học mình đã:

- Hiểu Automation Test là gì.
- Biết khi nào nên và không nên Automation.
- Hiểu Test Pyramid.
- Biết Playwright là gì.
- Cài đặt thành công Playwright.
- Chạy được testcase đầu tiên.
- Biết sử dụng UI Mode.
- Biết xem HTML Report.

