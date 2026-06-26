# Buổi 1: Tổng quan Automation Test & Cài đặt môi trường Playwright

## 1. Cài đặt môi trường
- Cài đặt IDE: Antigravity or VScode
- Cài đặt nodejs (LTS version)
    - Check version Node: `node -v`
- Cài đặt thư viện playwright:
    - Chạy trên thư mục dự án đã tạo: `npm init playwright@latest`
    - Check version thư viện playwright: `npm-v`

## 2. Khái niệm automation test là gì, tại sao cần automation, khi nào thì cần sử dụng automation
- Automation Testing: Tự động hóa kiểm thử (dùng code để thay thế con người kiểm thử)
- Tại sao cần automation:
    - Tiết kiệm thời gian và công sức khi việc test phải lặp lại nhiều lần
- Khi nào thì cần sử dụng automation:
    - Regression test
    - Smoke test
    - Test với nhiều dữ liệu (50, 100, hay thậm chí 500 users)
    - Test trên nhiều trình duyệt / thiết bị
- Khi nào thì không nên sử dụng automation:
    - Tính năng có thay đổi liên tục
    - Test chỉ chạy một lần duy nhất
    - Exploratory testing

## 3. Playwright là gì
- Playwright là thư viện automation test được phát triển bởi Microsoft
- Playwright hỗ trợ test trên các trình duyệt: Chromium, Firefox, WebKit
- Playwright hỗ trợ nhiều ngôn ngữ: JavaScript, TypeScript, Python, .NET, Java

## 4. Thực hành 
### 4.1. Cấu trúc project
```
Playwright-course/
├── node_modules/               // các thư viện đã cài
├── playwright-report/          // báo cáo HTML chi tiết sau khi chạy test
├── test-results/               // kết quả chạy test
├── tests/                      // code test do mình viết
├── package.json                // dependency
├── package-lock.json           // chi tiết version của các dependency
└── playwright.config.ts        // file cấu hình Playwright
```
### 4.2. File playwright.config.ts
- Đoạn `use` dùng để config các tùy chọn cho test
```  
use: {
    trace: 'on',         // chụp ảnh màn hình mỗi lần chạy test
    video: 'on'          // quay video lại mỗi lần chạy test
  },
```
-> Kết quả trace và video sẽ lưu trong thư mục `test-results`

- Đoạn `projects` dùng để config các trình duyệt sẽ test
``` 
projects: [
    {
      name: 'chromium',                         // Đặt tên cho trình duyệt, có thể đặt bất kì 
      use: { ...devices['Desktop Chrome'] },    // Chrome giả lập PC
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },   // Firefox giả lập PC
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },    // Safari giả lập PC
    },
    {
      name: 'mobile_chrome',
      use: { ...devices['Pixel 5'] },           // Chrome giả lập Mobile android
    },
    {
      name: 'mobile_safari',
      use: { ...devices['iPhone 12'] },         // Safari giả lập Mobile IOS
    }
```
### 4.3. File .gitignore
Thêm các file/thư mục không muốn git quản lý, để tránh bị đẩy lên github/gitlab

### 4.4. Chạy test bằng code
- Chạy toàn bộ test tất cả các browsers `npx playwright test`
- Chạy toàn bộ test với browser cụ thể `npx playwright test --project=tên_project`
    - Ví dụ: `npx playwright test --project=chromium`
- Chạy một test cụ thể, không chạy toàn bộ test `npx playwright test -g "tên_test"`
    - Ví dụ: `npx playwright test -g "get started link"`

**Note** Các test trên sẽ không mở trình duyệt lên, nếu muốn mở trình duyệt thì có thể thêm cờ `--headed`
```
npx playwright test --headed                       # mở trình duyệt
npx playwright test --project=chromium --headed    # mở trình duyệt và chỉ chạy chromium
```
### 4.5. Xem report HTML
Để xem report HTML, sau khi chạy test xong, gõ lệnh vào terminal `npx playwright show-report`

- Với `trace: 'on'`: Mỗi lần chạy test, playwright sẽ chụp ảnh màn hình mỗi bước, sẽ hiển thị trong report HTML
- Với `video: 'on'`: Mỗi lần chạy test, playwright sẽ quay video quá trình test, sẽ hiển thị trong report HTML

## 5. Extension Playwright Test for VSCode
- Tìm kiếm "Playwright Test for VSCode" và cài đặt extension
- Hỗ trợ chạy test không cần sử dụng Terminal
- Có thể tạo code test bằng cách record hành động trực tiếp trên trình duyệt
    - **Record new**: Mỗi lần chạy sẽ tạo file test mới và tạo code test mỗi thao tác trên trình duyệt
    - **Record new at cursor**: Thực hiện tương tự như Record new nhưng không tạo file mới mà tạo code test tại vị trí con trỏ chuột đang đứng
