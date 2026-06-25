# Lesson 01 - Playwright Basics

## Mục tiêu buổi học

- Cài đặt Node.js
- Cài đặt Playwright
- Tạo project Playwright
- Chạy testcase đầu tiên

## Kiến thức đã học

### 1\. Cài đặt Playwright

npm init playwright@latest

Playwright sẽ tự động:

- Tạo project
- Cài đặt package cần thiết
- Tạo thư mục tests
- Tạo file playwright.config.ts

### 2\. Cấu trúc project

playwright-course/  
├── tests/  
├── playwright.config.ts  
├── package.json  
└── node_modules/

### 3\. Cấu trúc testcase

test('get started link', async ({ page }) => {  
await page.goto('<https://playwright.dev/>');  
await page.getByRole('link', { name: 'Get started' }).click();  
});

### 4\. Các lệnh thường dùng

Chạy toàn bộ test case:

npx playwright test

Chạy 1 test case:

npx playwright test -g "get started link"

Liệt kê tất cả test case:

npx playwright test --list

Mở report:

npx playwright show-report

## Khó khăn gặp phải

- Chưa cài extension Playwright cho VS Code, dùng PowerShell bị lỗi script
- Lỗi workers must be a positive number. Do đang để workers: 1, trong file playwright.config.ts
- VS Code chưa nhận Playwright Test

## Bài học rút ra

- Luôn kiểm tra file playwright.config.ts
- Sử dụng Git Bash thay vì PowerShell khi gặp lỗi script
- Chạy npx playwright test --list để xác nhận Playwright nhận testcase

## Todo

- Tìm hiểu Locator
- Tìm hiểu Assertions
- Viết testcase đầu tiên cho website demo