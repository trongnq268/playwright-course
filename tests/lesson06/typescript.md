# TypeScript - Áp dụng Interface trong Playwright Test

## Mục tiêu
- Sử dụng **TypeScript Interface** để quản lý dữ liệu test.
- Tách riêng dữ liệu, locator và test script.
- Tăng khả năng tái sử dụng và hỗ trợ IntelliSense.
- Giúp code dễ bảo trì hơn khi dự án lớn.

---

# 1. Khai báo Interface

Tạo file:

```text
types/user.interface.ts
```

## Interface địa chỉ

```ts
export interface IAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
```

### Giải thích

- `company?` nghĩa là optional (không bắt buộc).
- `address2?` cũng là optional.

Ví dụ hợp lệ:

```ts
const address: IAddress = {
  firstName: "Hoc",
  lastName: "Vien",
  address: "123 Nguyen Trai",
  country: "India",
  state: "Ha Noi",
  city: "Thanh Xuan",
  zipcode: "100000",
  mobileNumber: "0988888888"
};
```

---

## Interface đăng ký

```ts
export interface IUserRegister extends IAddress {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  title: "Mr" | "Mrs";
  newsletter: boolean;
  specialOffers: boolean;
}
```

### Kiến thức

`extends` giúp kế thừa toàn bộ thuộc tính của `IAddress`.

Ví dụ:

```
IAddress
    ↑
IUserRegister
```

Ngoài các field của địa chỉ còn có:

- email
- password
- birthday
- title
- newsletter
- specialOffers

Đặc biệt:

```ts
title: "Mr" | "Mrs";
```

Chỉ cho phép:

- Mr
- Mrs

Nếu viết:

```ts
title: "Miss"
```

TypeScript sẽ báo lỗi.

---

## Interface đăng nhập

```ts
export interface IUserLogin {
  email: string;
  password: string;
}
```

Được sử dụng cho testcase Login.

---

# 2. Data Test

Tạo file:

```text
data/userData.ts
```

Import interface

```ts
import { IUserRegister, IUserLogin } from "../types/user.interface";
```

---

## Register Data

```ts
export const VALID_REGISTER_DATA: IUserRegister = {
  ...
}
```

### Lợi ích

TypeScript sẽ kiểm tra toàn bộ field.

Nếu thiếu:

```ts
password
```

hoặc

```ts
zipcode
```

sẽ báo lỗi ngay.

---

## Email động

```ts
email: `user_${Date.now()}@gmail.com`
```

Mỗi lần chạy sẽ tạo email khác nhau.

Ví dụ:

```
user_175343344343@gmail.com
```

Giúp tránh lỗi:

```
Email already exists
```

---

## Existing Email

```ts
export const EXISTING_EMAIL_DATA = {
  name: "Hoc Vien Auto",
  email: "email_da_ton_tai@gmail.com",
};
```

Dùng cho testcase:

Register với email đã tồn tại.

---

## Login Data

```ts
export const VALID_LOGIN_DATA: IUserLogin = {
  email: "...",
  password: "...",
};
```

và

```ts
export const INVALID_LOGIN_DATA: IUserLogin = {
  email: "...",
  password: "...",
};
```

Giúp tái sử dụng dữ liệu test.

---

# 3. Locator

Tạo file

```text
locators/authLocators.ts
```

Ví dụ:

```ts
export const AuthLocators = {

  signupLoginBtn: 'a[href="/login"]',

  signupNameInput: '[data-qa="signup-name"]',

  signupEmailInput: '[data-qa="signup-email"]',

  signupBtn: '[data-qa="signup-button"]',

}
```

---

## Lợi ích

Không hard-code selector trong test.

Thay vì:

```ts
await page.click('a[href="/login"]');
```

Sử dụng:

```ts
await page.click(AuthLocators.signupLoginBtn);
```

Khi UI thay đổi chỉ cần sửa 1 nơi.

---

## Locator động

```ts
loggedInUserText: (username: string) =>
    `text=Logged in as ${username}`,
```

Có thể truyền tên user.

Ví dụ:

```ts
AuthLocators.loggedInUserText("Hoc Vien Auto")
```

Kết quả:

```
text=Logged in as Hoc Vien Auto
```

---

# 4. Test Script

Tạo file

```text
tests/auth.spec.ts
```

Import

```ts
import { test, expect } from "@playwright/test";

import { AuthLocators } from "../locators/authLocators";

import {
  VALID_REGISTER_DATA,
  EXISTING_EMAIL_DATA,
  VALID_LOGIN_DATA,
  INVALID_LOGIN_DATA,
} from "../data/userData";
```

---

# beforeEach

```ts
test.beforeEach(async ({ page }) => {
    await page.goto("http://automationexercise.com");

    await expect(
        page.locator(AuthLocators.homePageLogo)
    ).toBeVisible();
});
```

Giúp tất cả testcase đều:

- mở website
- verify trang Home

Không cần viết lại nhiều lần.

---

# TC01 - Register User

Luồng test:

```
Home

↓

Signup

↓

Nhập Name

↓

Nhập Email

↓

Signup

↓

Enter Account Information

↓

Điền Form

↓

Create Account

↓

Continue

↓

Verify Logged in

↓

Delete Account

↓

Verify Deleted
```

---

## Radio button

```ts
if (VALID_REGISTER_DATA.title === "Mr") {
    await page.check(AuthLocators.titleMr);
}
```

Kiểm tra dữ liệu trước khi chọn radio button.

---

## Checkbox

```ts
if (VALID_REGISTER_DATA.newsletter)
    await page.check(AuthLocators.newsletterCheckbox);
```

Nếu dữ liệu là:

```ts
newsletter: true
```

thì checkbox được chọn.

---

## Dropdown

```ts
await page.selectOption(
    AuthLocators.dayDropdown,
    VALID_REGISTER_DATA.day
);
```

Áp dụng tương tự cho:

- Day
- Month
- Year
- Country

---

## Optional field

```ts
await page.fill(
    AuthLocators.companyInput,
    VALID_REGISTER_DATA.company!
);
```

Dấu `!` (Non-null Assertion) nói với TypeScript rằng giá trị chắc chắn không phải `null` hoặc `undefined`.

Ví dụ:

```ts
company?: string
```

vẫn có thể dùng:

```ts
company!
```

khi biết dữ liệu đã được khai báo.

---

## Verify Account Created

```ts
await expect(
    page.locator(AuthLocators.accountCreated)
).toBeVisible();
```

---

## Verify Login

```ts
await expect(
    page.locator(
        AuthLocators.loggedInUserText(
            VALID_REGISTER_DATA.name
        )
    )
).toBeVisible();
```

---

## Delete Account

```ts
await page.click(AuthLocators.deleteAccountBtn);

await expect(
    page.locator(AuthLocators.accountDeleted)
).toBeVisible();
```

---

# TC02 - Register Existing Email

Luồng:

```
Signup

↓

Nhập email đã tồn tại

↓

Signup

↓

Verify

Email Address already exist!
```

---

# TC03 - Login Success

Sử dụng:

```ts
VALID_LOGIN_DATA
```

Điền:

- Email
- Password

Sau đó verify:

```
Logged in as Hoc Vien Auto
```

---

# TC04 - Login Failed

Sử dụng:

```ts
INVALID_LOGIN_DATA
```

Verify thông báo:

```
Your email or password is incorrect!
```

---

# Cấu trúc thư mục

```text
project
│
├── data
│   └── userData.ts
│
├── locators
│   └── authLocators.ts
│
├── tests
│   └── auth.spec.ts
│
└── types
    └── user.interface.ts
```

---

# Ưu điểm của cách tổ chức

- **Tách biệt dữ liệu test** khỏi test script.
- **Quản lý selector tập trung**, dễ cập nhật khi UI thay đổi.
- **Kiểm tra kiểu dữ liệu** ngay khi viết code nhờ TypeScript.
- **Tái sử dụng dữ liệu** cho nhiều testcase.
- **Code dễ đọc, dễ bảo trì** và phù hợp với các dự án Playwright quy mô lớn.

---

# Tổng kết

Trong ví dụ này, TypeScript được sử dụng để:

- Định nghĩa **Interface** cho dữ liệu người dùng (`IAddress`, `IUserRegister`, `IUserLogin`).
- Quản lý **test data** tập trung bằng các object có kiểu dữ liệu rõ ràng.
- Lưu trữ **locator** trong một file riêng để tránh lặp code.
- Xây dựng các testcase **Register** và **Login** rõ ràng, dễ mở rộng.
- Tận dụng các tính năng của TypeScript như `extends`, optional property (`?`), union type (`"Mr" | "Mrs"`), và non-null assertion (`!`) để tăng độ an toàn và tính nhất quán của mã nguồn.