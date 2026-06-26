# Buổi 1 — Tổng quan Automation Test & Cài đặt Playwright

---

## 1. Automation Test là gì?

**Định nghĩa:** dùng code để máy tính thực hiện các bước test thay con người.

| | Manual | Automation |
|---|---|---|
| Cách làm | Mở browser → gõ user/pass → bấm Login → nhìn kết quả | Chạy 1 lệnh → máy làm hết → báo pass/fail |
| Thời gian | ~5 phút / lần | ~5 giây / lần |
| Quy mô | Người mệt sau vài chục lần | Chạy 1000 lần không mệt |

**Ghi nhớ:** Automation **không** thay thế manual tester — nó giải phóng tester khỏi việc lặp lại nhàm chán để tập trung vào test thông minh hơn (exploratory, UX, edge case…).

---

## 2. Khi nào NÊN và KHÔNG NÊN automate

### ✅ NÊN automate
- **Regression test** — lặp lại mỗi lần release
- **Smoke test** — kiểm tra nhanh sau deploy
- Test với **nhiều bộ dữ liệu** (ví dụ 50 tài khoản)
- Test trên **nhiều trình duyệt / thiết bị**

### ⛔ KHÔNG nên automate
- Tính năng **đang thay đổi liên tục** (UI chưa ổn định) → viết xong là phải sửa
- Test **chỉ chạy 1 lần duy nhất** → không đáng công viết
- **Exploratory testing**, đánh giá UX / cảm quan → cần con người
- Khi **chi phí viết + bảo trì > lợi ích**

---

## 3. Test Pyramid (Kim tự tháp test)

```
        ▲
       ╱ ╲      UI / E2E         ← ít, chậm, đắt
      ╱___╲
     ╱     ╲    API / Integration
    ╱_______╲
   ╱         ╲  Unit test         ← nhiều, nhanh, rẻ
  ╱___________╲
```

- **Đáy** (Unit): nhiều, nhanh, rẻ — chạy mili-giây
- **Giữa** (API/Integration): cân bằng tốc độ & coverage
- **Đỉnh** (UI/E2E): ít, chậm, dễ flaky — chỉ automate **luồng nghiệp vụ quan trọng nhất**

> Playwright nằm ở tầng UI/E2E, nhưng **cũng test được API** (sẽ học ở buổi 10).

---

## 4. Playwright là gì? Vì sao chọn?

Công cụ automation **mã nguồn mở** do **Microsoft** phát triển từ 2020. Đội ngũ gốc từng làm Puppeteer ở Google.

### So sánh nhanh

| Tiêu chí | Playwright | Selenium | Cypress |
|---|---|---|---|
| Ngôn ngữ | TS/JS, Python, Java, C# | Rất nhiều | Chỉ JS/TS |
| Trình duyệt | Chromium, Firefox, WebKit | Tất cả | Không có Safari thật |
| Auto-waiting | Có sẵn, rất tốt | Phải tự viết wait | Có |
| Tốc độ | Nhanh | Chậm hơn | Nhanh |
| Chạy song song | Có sẵn, miễn phí | Cần Selenium Grid | Trả phí (Cloud) |
| Nhiều tab / origin | Có | Hạn chế | Hạn chế |
| Công cụ debug | UI Mode, Trace, Codegen | Ít | Tốt |

### ★ Điểm "ăn tiền" của Playwright
**Auto-waiting** — tự chờ element sẵn sàng trước khi tương tác, giảm **~80% lỗi flaky** so với Selenium. Nhiều JD QA tại VN đã yêu cầu Playwright.

---

## 5. Vì sao học TypeScript?

- Playwright **"sinh ra" cho TypeScript** — tài liệu chính thức, codegen, ví dụ đều ưu tiên TS
- **TypeScript = JavaScript + kiểu dữ liệu** → VS Code gợi ý code, bắt lỗi ngay khi gõ (rất hợp người mới)
- Không cần giỏi lập trình mới học được — buổi 2 sẽ học đủ TS để viết test, học đến đâu dùng đến đó

---

## 6. Kiến trúc tổng quan Playwright

```
┌────────────┐     ┌─────────────────┐     ┌──────────────────────┐     ┌─────────┐
│  Code test │ ──▶ │ Playwright Test │ ──▶ │ Browser              │ ──▶ │ Website │
│   (.ts)    │     │     Runner      │     │ Chromium / FF / WebKit│     │         │
└────────────┘     └─────────────────┘     └──────────────────────┘     └─────────┘
```

**Khái niệm cần nhớ** (sẽ đi sâu sau):
- **Browser** → trình duyệt thực
- **Context** → phiên ẩn danh, isolate cookie/storage
- **Page** → 1 tab trong context

---

## 7. Cài đặt môi trường

### 7.1 Yêu cầu trước
```bash
node -v        # cần >= 18, khuyến nghị bản LTS
npm -v
git --version
```

> **Node.js** là môi trường chạy JS/TS ngoài trình duyệt. **npm** là kho thư viện.

### 7.2 Khởi tạo project
```bash
mkdir playwright-course
cd playwright-course
npm init playwright@latest
```

**Trả lời các câu hỏi khi cài:**

| Câu hỏi | Chọn |
|---|---|
| TypeScript hay JavaScript? | **TypeScript** |
| Tên thư mục tests? | `tests` (mặc định) |
| Thêm GitHub Actions workflow? | **false** (buổi 11 sẽ học) |
| Cài browsers? | **true** (~vài trăm MB, hơi lâu) |

---

## 8. Cấu trúc project sau khi cài

```
playwright-course/
├── tests/
│   └── example.spec.ts        ← file test mẫu
├── tests-examples/
│   └── demo-todo-app.spec.ts  ← ví dụ nâng cao
├── playwright.config.ts       ← cấu hình trung tâm
├── package.json               ← danh sách thư viện
└── node_modules/              ← thư viện (KHÔNG sửa tay)
```

Trong `playwright.config.ts` chú ý: `projects` (3 trình duyệt), `testDir`, `retries`, `trace`, `video`.

---

## 9. Bộ lệnh chạy test cơ bản

```bash
npx playwright test                                # chạy tất cả test (headless)
npx playwright test --headed                       # mở trình duyệt thật để xem
npx playwright test --project=chromium --headed    # chỉ 1 trình duyệt cho nhanh
npx playwright show-report                         # xem HTML report
npx playwright test --ui                           # mở UI Mode (debug trực quan)
npx playwright codegen <url>                       # ghi lại thao tác → sinh code test
```

**Ý nghĩa "6 passed":** 2 test × 3 trình duyệt (Chromium, Firefox, WebKit).

**Headless vs Headed:**
- *Headless* (mặc định) = chạy ngầm, không hiện cửa sổ → nhanh, phù hợp CI
- *Headed* = có giao diện → để debug, xem mắt thường

---

## 10. UI Mode — vũ khí học tập tốt nhất

```bash
npx playwright test --ui
```

- Chạy từng test bằng nút bấm
- **Timeline** từng bước
- **Snapshot DOM** tại mỗi bước → biết chính xác trang đang ở trạng thái nào
- **Watch mode** — sửa file là tự chạy lại

> Mẹo người mới: học Playwright bằng UI Mode trực quan hơn rất nhiều so với chỉ nhìn terminal.

---

## 11. HTML Report

```bash
npx playwright show-report
```

Hiển thị: danh sách test, thời gian chạy, lọc theo trình duyệt, screenshot/video khi fail.

---

## 12. Đọc lỗi khi test fail

Ví dụ chủ đích làm fail:

```ts
await expect(page).toHaveTitle(/Playwright/);   // đổi thành /Playwrong/ → fail
```

Khi chạy lại sẽ thấy thông báo dạng **expected vs received**.

> Đừng sợ test fail — error message của Playwright rất dễ đọc, đó là **bạn** chứ không phải kẻ thù.

---

## 13. Tóm tắt 1 dòng

> Playwright = công cụ automation E2E mạnh, có **auto-waiting**, **UI Mode**, **codegen** — chạy 1 lệnh thay vì click tay 5 phút mỗi lần.

---

## 14. Checklist sau buổi 1

- [x] Cài Node.js (≥ 18 LTS), npm, Git
- [x] Tạo project `playwright-course` bằng `npm init playwright@latest`
- [x] Chạy thành công `npx playwright test`
- [x] Mở được HTML report (`npx playwright show-report`)
- [x] Thử được UI Mode (`npx playwright test --ui`)
- [x] Hiểu vì sao chọn Playwright thay vì Selenium / Cypress
- [ ] Hoàn thành 3 bài tập về nhà và push lên GitHub
