# Locator Strategy — Playwright TypeScript

> Core Principle: Build locators based on semantics, not DOM structure or styling.
> This file is the single source of truth for locator strategy in this Playwright TS project.

## 1. Priority Order (as per playwright.dev/docs/best-practices)

| Priority | Locator | When to use |
|---|---|---|
| 🥇 1 | `getByRole()` | Buttons, links, headings, textboxes, checkboxes, radios... |
| 🥈 2 | `getByLabel()` | Form inputs that have a `<label>` |
| 🥉 3 | `getByPlaceholder()` | Inputs that only have a `placeholder`, with no label |
| 4 | `getByText()` | Visible text content (not inputs) |
| 5 | `getByAltText()` | Images with an `alt` attribute |
| 6 | `getByTitle()` | Elements with a `title` attribute |
| 7 | `getByTestId()` | Elements with `data-testid` — fallback when no better semantic locator exists |
| 8 | `locator('css')` | CSS with semantic attributes (`[name=]`, `[data-*]`, `#id`) |
| 🚫 9 | XPath | Absolute last resort — must comment the reason (Chỉ dùng XPath tương đối ổn định làm giải pháp dự phòng cuối cùng) |

## 2. Real-World Examples

```typescript
// ✅ Level 1 — getByRole (Highest Priority)
page.getByRole('button', { name: 'Log in' })
page.getByRole('button', { name: /confirm/i })       // regex, case-insensitive
page.getByRole('textbox', { name: 'Email' })
page.getByRole('link', { name: 'View Details' })
page.getByRole('heading', { name: 'Search Transactions', level: 1 })
page.getByRole('row').filter({ hasText: 'TRX-001' })  // table row

// ✅ Level 2 — getByLabel
page.getByLabel('From Date')
page.getByLabel('Transaction Type')

// ✅ Level 3 — getByPlaceholder
page.getByPlaceholder('Enter transaction code')
page.getByPlaceholder('dd/mm/yyyy')

// ✅ Level 4 — getByText
page.getByText('Transaction successful')
page.getByText('Success', { exact: true })   // exact match

// ✅ Level 5 — getByAltText
page.getByAltText('OnePay Logo')

// ✅ Level 6 — getByTitle
page.getByTitle('Download Report')

// ✅ Level 7 — getByTestId (Fallback when no better semantic locator exists)
page.getByTestId('btn-search')
page.getByTestId('transaction-table')

// ✅ Level 8 — Semantic CSS
page.locator('[data-status="active"]')
page.locator('#transaction-table')
page.locator('[name="transactionCode"]')

// ✅ Level 9 — Relative XPath (Fallback / Last Resort - Phải là XPath tương đối ổn định)
page.locator('//input[@name="username"]')
page.locator('//button[@type="submit" and contains(text(), "Đăng nhập")]')

// ❌ STRICTLY FORBIDDEN
page.locator('.css-1n2xyz-btn')            // dynamic class hash
page.locator('//div[3]/form/button[2]')    // positional XPath (Cực kỳ không ổn định)
page.locator('button').nth(2)              // nth khi có thể lựa chọn locator tốt hơn
page.locator('.btn-primary')               // styling-only class
page.locator('[id^="ember"]')              // auto-generated ID
```

## 3. Scoping & Chaining (Crucial Pattern)

When an element is not unique page-wide, **scoping within a container is mandatory**:

```typescript
// ✅ Pattern: Modal / Dialog
const modal = page.getByRole('dialog');
await modal.getByRole('button', { name: 'Confirm' }).click();
await modal.getByLabel('Note').fill('Test note');

// ✅ Pattern: Table row — most common in this project
const row = page.getByRole('row').filter({ hasText: 'TRX-001' });
await row.getByRole('button', { name: 'View' }).click();
await expect(row.getByRole('cell', { name: 'Success' })).toBeVisible();

// ✅ Pattern: Filter by text
page.getByRole('listitem').filter({ hasText: 'Active' })

// ✅ Pattern: Filter by child locator
page.getByRole('listitem').filter({ has: page.getByRole('img', { name: 'success' }) })

// ✅ Pattern: Sidebar / Panel
const sidebar = page.locator('[data-panel="filter"]');
await sidebar.getByLabel('Status').selectOption('Success');
```

## 4. Handling Iframes

```typescript
// Payment gateway, 3DS frame, embedded widget...
const frame = page.frameLocator('#payment-iframe');
await frame.getByLabel('Card Number').fill('4111111111111111');
await frame.getByLabel('Expiry Date').fill('12/26');
await frame.getByRole('button', { name: 'Pay' }).click();

// Iframe by URL pattern
const frame2 = page.frameLocator('iframe[src*="payment"]');
```

## 5. Regex & Exact Options

```typescript
// Regex — match partial, case-insensitive
page.getByRole('button', { name: /confirm/i })
page.getByText(/transaction.*success/i)

// Exact — full match (default is partial)
page.getByText('Success', { exact: true })
page.getByRole('button', { name: 'OK', exact: true })
```

## 6. Stability Rules

Every locator must be:
- **Unique:** Must match exactly 1 element — verify using `await locator.count()` (must equal 1).
- **Resilient:** Survive DOM layout changes (adding wrapper divs, changing flexbox, changing classes).
- **Readable:** Instantly clear what element the locator represents.

**STRICTLY FORBIDDEN:**
- Dynamic CSS class hashes: `.css-1n2xyz`, `.sc-abc123`, `.MuiButton-root-456`
- Auto-generated IDs: `input-123`, `:r1:`, `ember123`
- Absolute positional XPath: `//div[3]/div[2]/button`
- `nth()` when text or role can be used to target specifically.

## 7. Verification Process Before Committing a Locator

1. Open browser: `browser_navigate` → `browser_resize(1920, 1080)` → `browser_snapshot()`
2. Verify count: The locator must match **exactly 1 element** (`count() === 1`).
3. Verify interaction: Is the element `visible` and `enabled`?
4. Test reload: Does the locator still work after pressing `F5`?
5. Test multiple states: Loading, with data, empty data, and error state.

## 8. Decision Tree

```
Need to locate an element?
  ├─ Has a clear role (button/link/heading/textbox/checkbox...)? → getByRole()
  ├─ Is a form field with a <label>? → getByLabel()
  ├─ Only has placeholder? → getByPlaceholder()
  ├─ Recognized via visible text? → getByText()
  ├─ Is an image with alt text? → getByAltText()
  ├─ Has a title attribute? → getByTitle()
  ├─ Has data-testid? → getByTestId()
  ├─ Has stable id/name/data-*? → locator('[name=x]') or locator('#id')
  └─ None of the above? → Relative XPath (Phải có comment giải trình lý do sử dụng)
```
