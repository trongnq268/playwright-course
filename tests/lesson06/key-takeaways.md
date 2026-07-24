# Key_Takeaways (TypeScript)

## Locator Strategy

### 1. Mục tiêu

-   Học cách tìm phần tử theo tư duy của người dùng.
-   Ưu tiên User-facing Locator.

### 2. Thứ tự ưu tiên Locator

``` ts
getByRole()
getByLabel()
getByPlaceholder()
getByText()
getByTestId()
locator('css/xpath')
```

### 3. Ví dụ `getByRole`

``` ts
import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('https://example.com');

  await page
    .getByRole('button', { name: 'Login' })
    .click();
});
```

### 4. Filter & Chaining

``` ts
await page
  .getByRole('row')
  .filter({ hasText: 'TXN-1001' })
  .getByRole('button', { name: 'Hoàn tiền' })
  .click();
```

### 5. Strict Mode

``` ts
const rows = page.getByRole('row');

await rows.first().click();
await rows.last().click();

const total = await rows.count();

expect(total).toBeGreaterThan(0);
```

### Key Takeaways

-   Test what users see, not what developers code.
-   Role \> Label \> Placeholder \> TestId \> CSS/XPath.
-   Hạn chế XPath và CSS.

------------------------------------------------------------------------

## Actions & Auto-wait

### 1. Mục tiêu

-   Hiểu cách Playwright tương tác với ứng dụng.
-   Nắm được cơ chế Auto-wait.

### 2. Auto-wait

``` ts
await page.getByRole('button', {
  name: 'Submit'
}).click();
```

Playwright sẽ tự chờ: - Visible - Stable - Enabled

### 3. Fill vs PressSequentially

``` ts
await page.getByLabel('Username')
  .fill('hangpt');

await page.getByPlaceholder('Search')
  .pressSequentially('iPhone 15');
```

### 4. Checkbox & Radio

``` ts
await page
  .getByRole('checkbox')
  .setChecked(true);

await page
  .getByRole('radio', {
    name: 'Visa'
  })
  .check();
```

### 5. Hover & Keyboard

``` ts
await page
  .getByRole('button', {
    name: 'Menu'
  })
  .hover();

await page.keyboard.press('Enter');
```

### 6. Deprecated API

``` ts
// Không nên dùng
await locator.type('Playwright');

// Nên dùng
await locator.fill('Playwright');
```

### Key Takeaways

-   Auto-wait \> Sleep.
-   fill() \> type().
-   Tin tưởng Auto-wait của Playwright.
-   force: true chỉ dùng khi cần.

------------------------------------------------------------------------

## Assertions

### 1. Mục tiêu

-   Xác định điều kiện Pass/Fail.
-   Hiểu Web-first Assertion.

### 2. Assertion cơ bản

``` ts
await expect(
  page.getByRole('button', {
    name: 'Login'
  })
).toBeVisible();
```

### 3. Các Matcher thường dùng

``` ts
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();

await expect(locator).toBeChecked();
await expect(locator).toBeEditable();

await expect(locator)
  .toHaveText('Success');

await expect(locator)
  .toContainText('Success');

await expect(locator)
  .toHaveValue('hangpt');

await expect(locator)
  .toHaveCount(2);
```

### 4. URL & Title

``` ts
await expect(page)
  .toHaveURL(/dashboard/);

await expect(page)
  .toHaveTitle('Dashboard');
```

### 5. Hard vs Soft Assertion

``` ts
// Hard
await expect(title)
  .toHaveText('Profile');

// Soft
await expect.soft(title)
  .toHaveText('Profile');
```

### 6. Timeout

``` ts
await expect(spinner)
  .toBeHidden({
    timeout: 15000
  });
```

``` ts
// playwright.config.ts
export default defineConfig({
  expect: {
    timeout: 10000
  }
});
```

### Key Takeaways

-   Assertion là linh hồn của Automation Testing.
-   Luôn dùng `await expect(locator)`.
-   Hard cho Business Flow.
-   Soft cho UI Validation.

------------------------------------------------------------------------

## Cheat Sheet

``` ts
// Locator
Role > Label > Placeholder > TestId > CSS/XPath

// Actions
Auto-wait > Sleep
fill() > type()

// Assertions
await expect(locator)

toHaveText()  // Text
toHaveValue() // Input

// Assertion Type
Hard = Business Flow
Soft = UI Validation
```
