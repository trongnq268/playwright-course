---
name: ui-debug-agent
description: Skill for inspecting web/mobile applications via browser tools, analyzing DOM elements, identifying stable locators, debugging UI automation failures, and generating Page Object classes.
---

# UI Debug Agent

## Description

Specialized skill that helps the agent inspect web/mobile applications directly in a real browser, analyze the DOM, collect stable locators, and debug UI automation issues.

The agent can:

- Open a real browser and navigate to any URL
- Inspect DOM elements — identify attributes, hierarchy, state
- Collect stable locators for Playwright, Selenium, Appium
- Debug automation failures (element not found, click intercepted, timeout)
- Capture UI state (snapshot, screenshot) for analysis
- Analyze dynamic content, iframes, shadow DOM, SPA navigation

---

## When to Use

Use this skill when:

- **Exploring the UI** of a new web page/module
- **Finding locators** for specific elements
- **Debugging** automation tests failing due to UI changes
- **Verifying** that a locator actually works on the real DOM
- **Analyzing DOM** to understand UI structure (forms, tables, modals)
- **Capturing evidence** (screenshots) for test reports

Trigger keywords (English): "inspect UI", "find locator", "debug element", "open browser and check", "inspect DOM"

Trigger keywords (tiếng Việt): "tìm locator", "inspect element", "debug element bị lỗi", "mở browser kiểm tra", "phần tử không tìm thấy", "element không click được", "locator bị hỏng"

---

## MCP Command Sequence (MANDATORY)

When using Playwright MCP to debug UI, **ALWAYS** follow this order:

```
1. browser_navigate(url)           → Open page
2. browser_resize(1920, 1080)      → Desktop viewport
3. browser_wait_for(text/time)     → Wait for page load
4. browser_snapshot()              → Collect DOM (use for analysis + locator discovery)
5. browser_click/type/hover(ref)   → Interact (if needed)
6. browser_take_screenshot()       → Capture image (evidence on failure or milestone)
```

### Key Rules:

| Rule | Detail |
|---|---|
| **DO NOT re-navigate** if already on the correct page | Avoid unintended reloads |
| **ALWAYS resize** immediately after navigating | `browser_resize(1920, 1080)` — ensures desktop viewport |
| **ALWAYS wait** before taking a snapshot | Wait for page to fully load |
| **Use snapshot for analysis** | Snapshot returns accessibility tree — fast, accurate, includes `ref` for interaction |
| **Use screenshot for reporting** | Screenshot is an image — use when visual evidence is needed |

---

## Snapshot vs Screenshot

| | `browser_snapshot` | `browser_take_screenshot` |
|---|---|---|
| **Returns** | Accessibility tree (text + ref IDs) | Image (PNG/JPEG) |
| **Purpose** | DOM analysis, locator discovery, element identification | Visual evidence, reporting, layout debugging |
| **When to use** | ⭐ Always before interacting | Only on failure or important milestone |
| **Has ref to interact** | ✅ Yes — use ref to click/type/hover | ❌ No — image only |
| **Speed** | Fast | Slower |

**Rule:** Prefer `snapshot` for analysis; use `screenshot` for evidence.

---

## UI Inspection Process

### 1. Open & Prepare the Page

**Pre-check (MANDATORY trước khi mở browser):**
```
grep_search → lib/pages/<module>/ → nếu đã có POM → UPDATE, không tạo mới
```

**Mở browser và chuẩn bị:**
```
browser_navigate → target URL
browser_resize → 1920 × 1080
browser_wait_for → wait for page-loaded indicator (text or time)
```

If the page requires login:
- Ask user for credentials OR use an existing fixture in the project
- **DO NOT read `.env` files directly** (security rule)

### 2. Collect DOM Structure

```
browser_snapshot → accessibility tree
```

From the snapshot, identify:
- **Key elements:** buttons, inputs, links, headings, tables
- **Important attributes:** role, name, label, placeholder, testid
- **Hierarchy:** parent → child relationships
- **State:** visible, enabled, disabled, checked, expanded

### 3. Identify Locators

For each element requiring a locator, apply the **Playwright TypeScript priority order**:

**Locator Priority + Confidence Score:**

| Priority | Score | Locator | Example | When to Use |
|---|---|---|---|---|
| 1 ⭐ | A | `getByRole()` | `getByRole('button', {name: 'Submit'})` | Element có role + accessible name rõ ràng |
| 2 | A | `getByLabel()` | `getByLabel('Email')` | Form input có label |
| 3 | A | `getByPlaceholder()` | `getByPlaceholder('Enter email')` | Input có placeholder, không có label |
| 4 | A | `getByText()` | `getByText('Welcome back')` | Unique text content |
| 5 | B | `getByTestId()` | `getByTestId('submit-btn')` | Element có `data-testid` attribute |
| 6 | C | CSS (`locator()`) | `page.locator('#email')` | Stable `id` hoặc `name` attribute |
| 7 | D | XPath (relative, semantic) | `page.locator('//button[@type="submit"]')` | **Fallback** — không có semantic locator phù hợp |
| 🚫 | F | XPath positional | `page.locator('//div[3]/button[2]')` | **FORBIDDEN** |
| 🚫 | F | Dynamic class | `page.locator('.css-1abc')` | **FORBIDDEN** |

**Confidence Score:**

| Score | Meaning |
|---|---|
| A | Semantic locator — stable, readable, recommended |
| B | Stable custom attribute — good fallback |
| C | Stable id/name — acceptable |
| D | XPath fallback — dùng khi không có lựa chọn nào tốt hơn |
| F | Dynamic/positional — **FORBIDDEN**, bắt buộc cảnh báo user |

**Appium (Mobile):**

| Priority | Locator | Example |
|---|---|---|
| 1 ⭐ | Accessibility ID | `MobileBy.accessibilityId("loginButton")` |
| 2 | ID (resource-id) | `MobileBy.id("com.app:id/login_btn")` |
| 3 | Name | `MobileBy.name("Login")` |
| 4 | XPath (relative) | `MobileBy.xpath("//android.widget.Button[@text='Login']")` |

### 4. Verify Locator

After identifying the locator, **mandatory verification** on the real DOM:

```
1. browser_evaluate → verify uniqueness:
   document.querySelectorAll('<css-selector>').length  → phải bằng 1
   Nếu count !== 1 → tìm locator khác hoặc narrow scope

2. browser_snapshot → find element by ref
3. browser_click/type(ref) → attempt interaction
4. browser_snapshot → confirm result
```

> ⚠️ **Bắt buộc:** Mỗi locator phải match đúng **1 element**. Nếu match nhiều hơn → locator không hợp lệ, phải tìm lại.

**Locator is accepted when:**
- [ ] Unique on page — `querySelectorAll().length === 1`
- [ ] Stable across multiple reloads
- [ ] Does not contain dynamic class (css-xxx, sc-xxx, MuiXxx-root)
- [ ] Does not contain positional xpath (//div[3]/button[2])
- [ ] Does not depend on auto-generated attributes
- [ ] Score ≥ C (không dùng Score F)

---

## 5. Debug Flow khi Test Fail

Khi nhận yêu cầu "debug test bị fail / element không tìm thấy", thực hiện theo thứ tự:

```
1. Đọc log / stack trace → xác định bước đang fail và tên locator
2. browser_navigate → URL của trang bị lỗi
3. browser_resize → 1920 × 1080
4. Thực hiện lại các bước đến step bị fail
5. browser_snapshot → tìm element trong DOM thực tế
6. So sánh locator trong code vs DOM thực tế:
   - Element đã đổi text/role/attribute?
   - Element bị ẩn? (visibility, opacity, display)
   - Element bị overlay che? (z-index, position)
   - Element nằm trong iframe/shadow DOM?
7. Verify uniqueness: document.querySelectorAll().length === 1
8. Đề xuất locator mới + update POM + báo cáo root cause
```

**Error Classification:**

| Lỗi | Root Cause thường gặp | Hướng xử lý |
|---|---|---|
| `Element not found` | DOM thay đổi / locator sai | Snapshot → tìm locator mới |
| `Click intercepted` | Overlay / Toast / Modal che element | Wait for overlay to disappear |
| `Timeout` | Page chưa load / API chưa trả về | Add `waitForResponse` |
| `Strict mode violation` | Locator match nhiều hơn 1 element | Narrow scope, thêm filter |
| `Assertion failed` | Expected vs Actual value sai | Check actual DOM value |

---

## Handling Special Cases

### Page Requires Login
- Use existing login fixture in the project or ask user for credentials
- **DO NOT read `.env` directly**
- After login, navigate to the page to inspect

### Modal / Dialog / Popup
- Modals are typically overlays on the main page
- `browser_snapshot` will show modal content in the accessibility tree
- Interact with modal elements using ref from snapshot
- Wait for modal animation to complete before interacting

### Iframe
- `browser_snapshot` may not see content inside iframes
- Use `browser_evaluate` to access iframe:
  ```javascript
  () => document.querySelector('iframe').contentDocument.body.innerHTML
  ```
- Or use Playwright frame locator: `page.frameLocator('#iframe-id')`

### Shadow DOM
- Playwright `locator()` automatically pierces shadow DOM
- Selenium requires `shadowRoot.findElement()`
- `browser_snapshot` may see shadow DOM content depending on MCP version

### Dynamic Content (SPA / AJAX)
- Wait for content to load with `browser_wait_for(text)` before snapshot
- If content loads lazily → scroll down first, then snapshot
- If content changes over time → take multiple snapshots

### Tables / Lists (Many repeating elements)
- Identify the locator pattern for row/cell
- Use `nth()` or `filter()` to target a specific element
- Playwright example: `page.getByRole('row').filter({hasText: 'John'}).getByRole('button', {name: 'Edit'})`

### Obscured Elements (Overlay / Toast)
- Check z-index, opacity, visibility in DOM
- Wait for overlay to disappear: `browser_wait_for(textGone: 'Loading...')`
- If toast notification covers a button → wait for toast timeout

### API / Network Debug

Dùng khi: button click xong không có gì xảy ra, page không load dữ liệu, không rõ lỗi từ UI.

```
browser_network_requests → xem tất cả requests sau action
browser_network_request(url) → xem response của một request cụ thể
```

| Kết quả | Root Cause | Hướng xử lý |
|---|---|---|
| API trả về lỗi 4xx/5xx | Lỗi server/data | Báo cáo — không phải locator issue |
| API không được gọi | Action chưa thực sự trigger | Kiểm tra lại click + wait |
| API thành công nhưng UI không update | Render/state issue | Thêm explicit wait sau response |

---

## Anti-Patterns (FORBIDDEN)

| ❌ Wrong | ✅ Correct | Reason |
|---|---|---|
| Guess locators from feature name | Inspect real DOM first, then get locator | 100% accurate locators |
| Use screenshot to select locator | Use snapshot (accessibility tree) | Snapshot has refs; screenshot does not |
| Copy locator from old code without verifying | Always verify locator on current browser | DOM may have changed |
| Use dynamic class `.css-1abc` | Use role/label/testid | Dynamic classes change every build |
| Use positional xpath `//div[3]` | Use relative xpath or CSS | Positional xpath is fragile |
| Take screenshots continuously | Only screenshot on failure or milestone | Wastes resources, slows down |
| Re-navigate when already on the correct page | Only navigate when URL needs to change | Avoids unnecessary reloads |

---

## Output

This skill can return:

- **Locator recommendations** — primary + fallback locator table kèm Confidence Score
- **DOM analysis** — element structure, attributes, state, hierarchy
- **Page Object class** — theo getter pattern bắt buộc của project (see template below)
- **Screenshots** — visual evidence at milestones
- **Debug findings** — root cause of element not found / click fail + fix

**POM Output Template (MANDATORY format):**

```typescript
// lib/pages/<module>/<name>.page.ts
import { Page } from '@playwright/test';
import { PageBasePom } from '@pages/base.pom';

export class XxxPage extends PageBasePom {
  constructor(page: Page) {
    super(page);
  }

  // ===== LOCATORS — GETTER PATTERN (bắt buộc, KHÔNG dùng readonly field) =====

  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }
  get emailInput()   { return this.page.getByLabel('Email'); }
  get resultTable()  { return this.page.getByRole('table'); }
}
```

> ❌ **FORBIDDEN:** `readonly submitButton = this.page.getByRole(...)` — field trở nên stale sau navigation
> ✅ **REQUIRED:** `get submitButton() { return this.page.getByRole(...); }` — getter luôn fresh

---

## Rules References

Agent MUST follow the detailed rules in:

- `.agent/rules/locator_strategy.md` — Master locator priority map
- `.agent/rules/playwright_rules.md` — Playwright browser setup and locator rules
- `.agent/rules/selenium_rules.md` — Selenium locator and wait rules
- `.agent/rules/appium_rules.md` — Appium mobile locator rules
- `.agent/rules/automation_rules.md` — General automation best practices