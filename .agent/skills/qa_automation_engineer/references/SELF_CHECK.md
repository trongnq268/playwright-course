# Self Check — OnePay Playwright

Quality checklist the agent MUST self-evaluate and complete **before handing over or committing any changes**.

---

## 🧹 Code Quality
- [ ] Follows **Page Object Model (POM)**:
  - Locators declared only in Page class (`lib/pages/`), never inline in tests.
  - Page class contains no business logic or assertions — only getters returning `Locator`.
- [ ] No debug logs (`console.log`), temporary comments, or disabled commented-out code.
- [ ] No hardcoded sensitive values (URLs, passwords, API keys) or static data. Use `ENV()` helper.
- [ ] Uses required path aliases (`@pages/*`, `@helper/*`, `@fixtures/*`, `@utils/*`).

---

## 🎯 Locator Quality
- [ ] Strictly follows Playwright locator priority (getByRole > getByLabel > getByPlaceholder > getByText > getByAltText > getByTitle > getByTestId > CSS > XPath as last resort).
- [ ] Avoids fragile locators:
  - NO auto-generated dynamic class names (e.g. `.css-1n2xyz`).
  - NO absolute positional XPath (e.g. `/div[3]/div[2]/button`).
- [ ] Locator is **unique** — matches exactly 1 element on screen (verify via `count() === 1`).

---

## ⏱️ Wait Strategy
- [ ] **NO hard sleep** (`page.waitForTimeout()` or `Thread.sleep()`).
- [ ] Uses Playwright auto-waiting and web-first assertions (`expect(locator).toBeVisible()`).
- [ ] Timeouts configured reasonably in Playwright config (Action: 15s, Navigation: 120s) — no arbitrary hardcoded wait times.

---

## 🚀 Test Execution & Local Debug
- [ ] Uses CLI proxy **`rtk`** for all terminal commands to optimize token usage (e.g. `rtk npm run test...`).
- [ ] Follows the standard UI Debug flow:
  1. `browser_navigate` to the page.
  2. Resize viewport to **1920×1080** (`browser_resize`).
  3. Wait for page to stabilize (`browser_wait_for`).
  4. Snapshot and interact.
- [ ] Test case runs in headed mode locally and **PASSes stably at least 2 consecutive times**.
- [ ] Each test case is fully independent — no dependency on execution order or other test results.
- [ ] Random data is auto-generated with a traceable prefix (`test_name + timestamp + prefix`).
