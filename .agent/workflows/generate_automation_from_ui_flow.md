---
description: Execute UI flows directly on a real browser, collect locators from the actual DOM, and generate automation scripts. Supports Playwright, Selenium, Appium.
skills:
  - ui_debug_agent
  - smart_locator_agent
  - qa_automation_engineer
---
# Workflow: Generate Automation from UI Flow (v2 — Enhanced)

> **MANDATORY SKILL:** You MUST load and read the following skills before starting:
>
> | Skill                      | SKILL.md                                          | Role                                              |
> | -------------------------- | ------------------------------------------------- | ------------------------------------------------- |
> | `ui_debug_agent`         | `.agent/skills/ui_debug_agent/SKILL.md`         | Inspect DOM, analyze accessibility tree, debug UI |
> | `smart_locator_agent`    | `.agent/skills/smart_locator_agent/SKILL.md`    | Generate stable locators, avoid fragile selectors |
> | `qa_automation_engineer` | `.agent/skills/qa_automation_engineer/SKILL.md` | General automation rules, workflow routing        |

This workflow helps the agent **directly execute** a series of UI actions on a real browser, collect locators from the actual DOM, and generate complete automation scripts — all in one automated flow, without requiring pre-existing manual test cases.

**Fixed tech stack:** Playwright · TypeScript · Playwright Test runner

---

## ⚠️ Execution Principles

- **All output in Vietnamese**
- **ABSOLUTELY NO guessing locators** — must be collected from the real DOM using MCP browser tools
- **Must execute each UI step on a real browser** before generating code
- **Desktop viewport 1920×1080** for all UI debugging
- **Do NOT read `.env` files directly** — credentials from fixtures or ask the user
- ⚠️ **Rule E3:** After coding, run **compile check only** (`tsc --noEmit`). Do NOT run Playwright tests automatically. Only run tests when user **explicitly requests**. If test fails → report log → ask user → fix + re-run **max 1 round**.

## How is this different from `generate_automation_from_testcases`?

|                       | `from_testcases`                     | `from_ui_flow` (this workflow)                                       |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| **Input**       | Existing manual test case files        | UI steps described in natural language or URL + actions                |
| **Approach**    | Read TC → inspect UI → generate code | **Execute on real browser** → collect locators → generate code |
| **When to use** | Test case documents already exist      | No TCs available, only "go to this page, click that button"            |

---

## 📥 Required Input

The agent needs at least **1 of the following inputs** from the user:

| Input                                | Example                                               | Priority                     |
| ------------------------------------ | ----------------------------------------------------- | ---------------------------- |
| **URL + UI steps description** | "Go to https://example.com, login, create a new user" | ⭐ Most common               |
| **URL + recording/video**      | User provides a video of the actions                  | Optional                     |
| **URL + screenshots**          | User provides step-by-step screenshots                | Optional                     |
| **URL only**                   | "Automate the login flow for this page"               | Agent explores independently |

If the user has not provided enough information → ask:

- Application URL?
- Describe the flow to automate (step by step)?
- Credentials if login is required?
- Output directory? (defaults to project structure)
- Environment? (dev9/dev18/dev32/dev36/dev37/dev42/stg)

---

## 📤 Output

| Artifact                       | Location                | Description                                                 |
| ------------------------------ | ----------------------- | ----------------------------------------------------------- |
| `task.md`                    | Artifact directory      | Progress checklist + Locator Collection + test results      |
| **Page Object classes**  | `lib/pages/<module>/` | 1 file per page, getter pattern, locators verified from DOM |
| **Test spec files**      | `tests/<module>/`     | `.spec.ts` files, stable PASS 2/2                         |
| **Locator Collection**   | (inside `task.md`)    | All elements + primary/fallback + confidence score          |
| **Evidence screenshots** | (in response)           | Captured at important milestones                            |

**📁 Naming Convention:**

- Page Object: `<module-name>.page.ts` (lowercase, kebab-case) — e.g., `login.page.ts`
- Spec file: `<flow-name>.spec.ts` (kebab-case) — e.g., `login-flow.spec.ts`

---

## ⚙️ Execution Modes

### Mode A — VERIFY & ASK (after code generation)

- **When:** Code generation is complete
- **Rule:** Run `tsc --noEmit` to verify TypeScript correctness. Do NOT run Playwright tests automatically.
- **Run test:** Only when user **explicitly requests** (e.g. "chạy thử", "run test", "test luôn")
- **If test fails:** Report error log clearly → ask user if they want AI to fix → fix + re-run **max 1 round only**. If still fails → stop and report.
- **Reason:** Running Playwright tests + browser MCP + retry loops consumes significant token quota.

### Mode B — INTERACTIVE GATE (after completing the flow)

- **When:** Flow has PASSED 2/2 and cleanup is done
- **Rule:** MUST stop and ask user for confirmation
- **Template:** `"Flow [NAME] completed ✅. Would you like to make any changes?"`

---

## 🛡️ Rules & Guardrails

### Architecture Protection

- Do NOT duplicate locators / page methods / utilities if they already exist in the project
- Do NOT create a new framework structure if the project already has one
- Do NOT place business logic in test files — logic belongs in helpers/pages
- Do NOT hardcode fixes just to force PASS | Do NOT bypass assertions
- Do NOT use `force: true` before verifying the root cause
- Do NOT use `waitForTimeout()` (unless a clearly commented exception)
- Do NOT use `readonly field` for locators — MUST use getter pattern

When changes are needed: prefer updating existing Page Objects, maintain backward compatibility and naming conventions.

### Locator Confidence Score

| Score | Meaning                                                               | Example                                      |
| ----- | --------------------------------------------------------------------- | -------------------------------------------- |
| A     | `getByRole` + accessible name, `getByLabel`, `getByPlaceholder` | `getByRole('button', {name: 'Login'})`     |
| B     | stable `data-testid`                                                | `getByTestId('btn-submit')`                |
| C     | stable `id` or `name` attribute                                   | `locator('#email')`                        |
| D     | css/xpath fallback (stable)                                           | `locator('//div[@class="form"]//button')`  |
| F     | dynamic/generated selector                                            | `locator('.css-1abc-btn')` — ❌ FORBIDDEN |

**Priority:** A > B > C > D. **Score F: FORBIDDEN** — mandatory warning log + must ask user before using.

> **AGENTS.md note:** This project prioritizes XPath for locators. However, only use **relative, semantic XPath** (Score D or above). Positional XPath (`//div[3]/button[2]`) is FORBIDDEN.

### Fix Guardrails (when user requests test run)

| Condition                     | Action                                                                |
| ----------------------------- | --------------------------------------------------------------------- |
| Same error repeats after fix  | Stop — report to user, do NOT keep patching                          |
| Files modified > 3 for 1 flow | STOP — ask user to review                                            |
| Fix round exhausted (1 round) | STOP — report error details to user                                  |
| Assertion changed             | Document the reason clearly in `task.md`                            |

---

## Execution Steps

### Step 0: Pre-flight Validation ⚡ (MANDATORY — run before everything)

- [ ] URL accessible? (`browser_navigate` → verify page loads successfully)
- [ ] Project structure detected? (`list_dir` → find `lib/pages/`, `tests/`, `lib/fixture/index.ts`)
- [ ] Existing POMs checked? (`grep_search` → find existing page classes, avoid duplicates)
- [ ] `playwright.config.ts` read? (`view_file` → extract timeout, viewport, reporter — **use these values, do NOT hardcode**)
- [ ] Fixture composition reviewed? (`view_file lib/fixture/index.ts` → identify available fixtures)
- [ ] Base page reviewed? (`view_file lib/pages/base.pom.ts` → identify inherited methods/locators)
- [ ] Environment confirmed with user? (`$env:ENV` = ?)

> ⚠️ If any check FAILS → **STOP IMMEDIATELY**, notify the user, do NOT continue.

---

### Step 1: Intake & Setup

1. **Confirm Environment** with the user:

   ```
   "Which environment do you want to run on? (dev9/dev18/dev32/dev36/dev37/dev42/stg)"
   ```

   > ⚠️ MANDATORY — Do not assume the URL. Always ask the user.
   >
2. **Parse UI steps** from user input:

   - Convert natural language description into a structured step list:
     ```
     Step 1: Navigate to https://dev36-iportal.opdev.vn/iportal/
     Step 2: Login using credentials from fixture
     Step 3: Navigate to "Merchant Management" menu
     Step 4: Search for merchant "TEST_MERCHANT"
     Step 5: Verify results are displayed
     ```
3. **Create `task.md` artifact** to track progress:

   ```markdown
   # UI Flow Automation Progress

   ## Environment
   - ENV: dev36
   - URL: https://dev36-iportal.opdev.vn/iportal/

   ## Execution Checklist
   - [x] Step 0: Pre-flight Validation
   - [x] Step 1: Setup — parse UI steps
   - [ ] Step 2: Execute UI flow on browser — collect locators
   - [ ] Step 2.5: Locator Review Gate
   - [ ] Step 3: Generate Page Objects + Test scripts
   - [ ] Step 3.5: Code Quality Gate
   - [ ] Step 4: Verify & Report (compile check + user-driven test)
   - [ ] Step 5: Cleanup & Delivery
   ```

---

### Step 2: Execute UI Flow on Browser & Collect Locators (Live Recon)

> ⚡ This is the **most important step** — it distinguishes this workflow from all others.

1. **Open browser via MCP** and navigate to URL:

   ```
   browser_navigate → URL
   browser_resize → 1920 × 1080
   browser_wait_for → page load complete
   browser_snapshot → collect initial DOM
   ```
2. **Execute each step** from the list. For each step:

   ```
   a. browser_snapshot → read DOM, identify element to interact with
   b. Determine locator (using Locator Confidence Score)
   c. Validate locator uniqueness:
      - browser_evaluate → document.querySelectorAll(selector).length
      - If count !== 1 → find a different locator or narrow the scope
   d. Execute action (click / type / select / hover)
   e. browser_snapshot → confirm action result
   f. Record in Locator Collection table
   ```
3. **Locator Collection Table** (record after each step, write to `task.md`):

   | Step | Action   | Element         | Primary Locator                               | Fallback                           | Score | Count | Verified |
   | ---- | -------- | --------------- | --------------------------------------------- | ---------------------------------- | ----- | ----- | -------- |
   | 1    | Navigate | —              | —                                            | —                                 | —    | —    | ✅       |
   | 2    | Type     | Email input     | `getByLabel('Email')`                       | `locator('#email')`              | A     | 1     | ✅       |
   | 3    | Type     | Password input  | `getByLabel('Password')`                    | `locator('#password')`           | A     | 1     | ✅       |
   | 4    | Click    | Login button    | `getByRole('button', {name: 'Login'})`      | `locator('button[type=submit]')` | A     | 1     | ✅       |
   | 5    | Assert   | Dashboard title | `getByRole('heading', {name: 'Dashboard'})` | `locator('.dashboard-title')`    | A     | 1     | ✅       |
4. **Locator Strategy** (follows `.agent/rules/locator_strategy.md` + AGENTS.md):

   > **Project-specific priority:** Ưu tiên Semantic Locators. XPath (tương đối, semantic) chỉ dùng làm **fallback** khi không có semantic locator phù hợp.
   >

   **Effective priority for this project:**

   | Priority | Locator                    | Score | When to use                                         |
   | -------- | -------------------------- | ----- | --------------------------------------------------- |
   | 1        | `getByRole()`            | A     | Element có role + accessible name rõ ràng           |
   | 2        | `getByLabel()`           | A     | Form input có label                                 |
   | 3        | `getByPlaceholder()`     | A     | Input có placeholder, không có label                |
   | 4        | `getByText()`            | A     | Unique text content                                 |
   | 5        | `getByTestId()`          | B     | Element có `data-testid` attribute                |
   | 6        | CSS (`locator()`)        | C     | Stable `id` hoặc `name` attribute                 |
   | 7        | XPath (relative, semantic) | D   | **Fallback** — không có semantic locator phù hợp   |
   | 🚫       | XPath positional           | F     | `//div[3]/button[2]` — FORBIDDEN                 |
   | 🚫       | Dynamic class              | F     | `.css-1abc`, `.MuiXxx-root` — FORBIDDEN         |
5. **Handling situations during UI execution:**

   | Situation                 | Resolution                                                              |
   | ------------------------- | ----------------------------------------------------------------------- |
   | Element not found         | `browser_snapshot` again → check DOM → try different locator        |
   | Page not fully loaded     | `browser_wait_for` text/element → retry                              |
   | Modal/popup appears       | Handle popup first → continue flow                                     |
   | Redirect/navigation       | `browser_snapshot` again on the new page                              |
   | Need to scroll            | `browser_evaluate` → `scrollIntoView()`                            |
   | Login required            | Use `login("iportal")` fixture or ask user for credentials            |
   | CAPTCHA / 2FA             | Notify user — cannot automate                                          |
   | URL blocked / VPN         | Ask user: (A) Retry (B) Generate code without DOM verification (C) Stop |
   | Shadow DOM / Canvas       | Log limitation in `task.md` — notify user                            |
   | Dynamic content / SPA     | `browser_wait_for` specific text before snapshot                      |
   | **Score F locator** | **Mandatory warning log → ask user before using**                |
6. **Screenshot evidence** — capture at important milestones:

   - After successful login
   - After completing the main flow
   - When encountering errors/unexpected state

---

### Step 2.5: Locator Review Gate (Conditional)

> **Conditional Gate** — chỉ dừng lại khi chất lượng locator cần chú ý.

**Rule:**
- Nếu **tất cả locators Score A/B** → **auto-proceed** (thông báo ngắn, không chờ user)
- Nếu **có Score C** → hiển thị bảng, hỏi user xác nhận
- Nếu **có Score D/F** → **MANDATORY STOP** — không được tiếp tục cho đến khi user phê duyệt

1. Display the full Locator Collection table to the user
2. Highlight any locators with Score C or lower
3. **Khi cần dừng**, ask the user:

   ```
   📋 Locator Collection is complete.

   - Total elements: [N]
   - Score A: [N] | Score B: [N] | Score C: [N] | Score D: [N]
   - ⚠️ Locators needing attention: [list Score C/D/F locators]

   Would you like to:
     (A) Approve locators → proceed to code generation
     (B) Adjust specific locators
     (C) Stop workflow
   ```
4. **Do NOT proceed until user response is received** (only when Score C/D/F present).

---

### Step 3: Generate Automation Scripts (Code Generation)

> **Data source:** Locator Collection from Step 2 in `task.md`.

#### 3.1. Check existing code

Before creating new files, **MANDATORY**:

```
1. grep_search → find existing page classes in lib/pages/<module>/
2. If found → UPDATE, do NOT create new
3. grep_search → find existing helpers in lib/helpers/<module>/
4. If helper found → UPDATE helper, do NOT duplicate business logic in test file
5. grep_search → find existing dataFactory in lib/dataFactory/<module>/
6. view_file lib/fixture/index.ts → identify usable fixtures
```

#### 3.2. Generate Page Object classes

**Standard template for this project (Playwright TypeScript):**

```typescript
// lib/pages/<module>/<page-name>.page.ts
import { Page, Locator } from '@playwright/test';
import { PageBasePom } from '@pages/base.pom';

export class LoginPage extends PageBasePom {
  constructor(page: Page) {
    super(page);
  }

  // ===== LOCATORS — GETTER PATTERN (lazy, never stale) =====
  
  get emailInput()    { return this.page.getByLabel('Email'); }
  get passwordInput() { return this.page.getByLabel('Password'); }
  get loginButton()   { return this.page.getByRole('button', { name: 'Login' }); }
  get dashboardTitle() { return this.page.getByRole('heading', { name: 'Dashboard' }); }

  // ===== METHODS — describe user behavior, NOT DOM actions =====
  
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
```

**POM Rules (MANDATORY):**

- ❌ FORBIDDEN: `readonly emailInput = this.page.getByLabel('Email');` — field becomes stale after navigation
- ✅ REQUIRED: `get emailInput() { return this.page.getByLabel('Email'); }` — getter is always fresh
- Assertions MUST NOT be placed in Page classes — only in tests
- Method names describe user behavior (`login()`, `searchTransaction()`), NOT DOM actions (`clickButton()`, `fillInput()`)
- MUST extend `PageBasePom` from `@pages/base.pom`
- Place files at `lib/pages/<module>/`

#### 3.2.5. Generate Helper class (MANDATORY nếu có business actions)

> Helper là lớp **bắt buộc** theo kiến trúc project: `Pages (locators) → Helpers (business actions) → Tests (orchestration)`

**Standard template:**

```typescript
// lib/helpers/<module>/ui/<name>.helper.ts
import { Page } from '@playwright/test';
import { XxxPage } from '@pages/<module>/<name>.page';

export class HelperXxx {
  private xxxPage: XxxPage;

  constructor(private page: Page) {
    this.xxxPage = new XxxPage(page);
  }

  async doSomething(data: string): Promise<void> {
    await this.xxxPage.someInput.fill(data);
    await this.xxxPage.submitButton.click();
  }
}
```

**Helper Rules:**
- Helper MUST được đăng ký vào fixture tại `lib/fixture/index.ts` — **KHÔNG** dùng trực tiếp trong test
- Method names mô tả **user behavior**, không phải DOM action (`searchMerchant()`, không phải `clickSearchButton()`)
- Assertions **KHÔNG** được đặt trong helper — chỉ đặt trong test
- Locators **KHÔNG** được đặt trong helper — chỉ đặt trong Page class

#### 3.3. Generate Test class

**Standard template for this project:**

```typescript
// tests/<module>/<flow-name>.spec.ts
import { test, expect } from '@fixtures/index';  // ← composed fixture, do NOT use @playwright/test

test.describe('@<module> <Flow Name> Tests', () => {

  test('<ID> | <flow description>', 
    { tag: ['@smoke', '@<module>'] },
    async ({ login, helperXxx }) => {  // ← dùng fixtures từ lib/fixture/index.ts, KHÔNG dùng page trực tiếp
      // ARRANGE — ưu tiên dùng dataFactory nếu đã có
      // import { createXxxData } from '@dataFactory/<module>/xxx.factory';
      const testData = { name: `auto_flow_${Date.now()}`, email: `auto_${Date.now()}@auto.test` };

      // ACT
      await test.step('Login to the system', async () => {
        await login('iportal');  // ← use existing login fixture
      });

      await test.step('Execute main flow', async () => {
        await helperXxx.doSomething(testData.name);  // ← delegate to helper, KHÔNG inline actions
      });

      // ASSERT
      await test.step('Verify results', async () => {
        await expect(
          helperXxx.someResultLocator,
          'Result must be visible after completing action'
        ).toBeVisible({ timeout: 10_000 });
      });
    }
  );
});
```

**Test Rules:**

- Import `test, expect` từ `@fixtures/index` — KHÔNG dùng `@playwright/test`
- Each action/assert group MUST be wrapped in `test.step()` — aids debugging on failure
- Assertions MUST have a message describing expected behavior
- **TUYỆT ĐỐI KHÔNG** gọi locator trực tiếp trong test — phải qua helper/fixture
- Test data phải unique + traceable — ưu tiên dùng `@dataFactory/<module>/` nếu đã có
- Tags: `{ tag: ['@smoke', '@<module>'] }` — for CI filtering
- Credentials: read from fixtures/env — do NOT hardcode

**Check dataFactory trước khi inline test data:**

```
1. grep_search → find existing factories in lib/dataFactory/<module>/
2. Nếu đã có → import và dùng factory với overrides
3. Nếu chưa có → dùng inline Date.now() tạm thời, thêm comment: // TODO: move to dataFactory
```

#### 3.4. Wait Strategy

Apply the correct wait strategy based on the situation:

```typescript
// 1. After clicking a button that triggers an API call → waitForResponse (HIGHEST PRIORITY)
await Promise.all([
  page.waitForResponse(r => r.url().includes('/api/transactions') && r.status() === 200),
  page.getByRole('button', { name: 'Search' }).click(),
]);

// 2. After navigation → waitForURL
await page.waitForURL('**/transaction/detail/**');

// 3. After heavy page load → waitForLoadState
await page.waitForLoadState('networkidle');

// 4. Default — Web-First Assertion (auto-retry)
await expect(locator).toBeVisible({ timeout: 10_000 });

// 5. Wait for loading to disappear (project pattern)
await this.loadingOverlay.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});

// ❌ FORBIDDEN:
await page.waitForTimeout(3000);            // hard sleep
await new Promise(r => setTimeout(r, N));   // manual delay
```

#### 3.5. Code Generation Principles

- Locators MUST come from Step 2 (verified on DOM) — do NOT guess
- Do not hardcode test data (credentials read from env/fixture)
- Do not use `waitForTimeout()` / `Thread.sleep()` — smart waits only
- Method names describe user behavior, not DOM actions
- One page → 1 file, one flow → 1 spec file
- ❌ Do NOT use `.or()` as a locator fallback — `.or()` matches both locators simultaneously, silently hides broken locators, and creates hidden technical debt. Each element should have **only 1 good-enough locator**:
  ```typescript
  // ❌ FORBIDDEN — .or() hides broken locators
  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' })
      .or(this.page.locator('//button[contains(@class,"submit")]'));
  }

  // ✅ CORRECT — pick the single most stable locator
  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }
  ```

  > `.or()` is only appropriate when the same element displays different text depending on state (e.g., multi-language).
  >

---

### Step 3.5: Code Quality Gate (MANDATORY — before running tests)

Before running tests, the agent MUST verify:

- [ ] `grep_search` the newly created page file → find `waitForTimeout` → if present (except commented exceptions) → fix
- [ ] `grep_search` → find `console.log` → if present → remove
- [ ] `grep_search` → find `readonly.*Locator` in Page class → if present → convert to getter
- [ ] Verify imports from `@fixtures/index`, NOT from `@playwright/test` (in test file)
- [ ] Verify test has at least 1 `test.step()`
- [ ] Verify assertions have descriptive messages
- [ ] Verify Page class extends `PageBasePom`
- [ ] Verify files are placed in correct directories (`lib/pages/<module>/` and `tests/<module>/`)

> If any check fails → fix before running tests.

---

### Step 4: Verify & Report (Compile Check + User-Driven Execution)

> ⚠️ **Token-saving rule (aligned with GEMINI.md):** AI does NOT auto-run Playwright tests. Only compile-check by default.

1. **Compile check** — verify TypeScript correctness:

   ```bash
   npx tsc --noEmit
   ```

   - If **compile PASS** → report to user, ask if they want to run tests
   - If **compile FAIL** → fix errors → re-run `tsc --noEmit` until clean

2. **Report to user** (MANDATORY — do NOT skip):

   ```
   ✅ Compile check PASSED — code TypeScript hợp lệ.

   📁 Files created:
   - Page: [page file path]
   - Test: [spec file path]

   Bạn có muốn tôi chạy test không?
     (A) Chạy test luôn
     (B) Không, tôi tự chạy
   ```

3. **Run test — ONLY when user explicitly requests** (e.g. "chạy thử", "run test", "test luôn"):

   ```bash
   # Project convention — use npm scripts
   $env:ENV="dev36"; $env:HEADED="1"; npm run test:headless -- tests/<path>/<file>.spec.ts
   ```

   > ⚠️ Do NOT use `npx playwright test` directly — use `npm run test:headless` per project convention.

4. **If test FAILS** — report and ask user:

   ```
   ❌ Test FAILED.

   📋 Error: [mô tả lỗi ngắn gọn từ log]

   Bạn có muốn tôi fix và chạy lại không? (max 1 lần)
     (A) Fix và chạy lại
     (B) Không, tôi tự debug
   ```

   - **User chọn (A):** Fix root cause → re-run **1 lần duy nhất**. Nếu vẫn fail → stop và report.
   - **User chọn (B):** Stop, báo cáo error details.

   > **Reason:** Running Playwright tests + browser MCP + retry loops consumes significant token quota.

5. **Stability verification** — chỉ thực hiện khi user yêu cầu:

   > Theo DoD, test cần PASS 2/2 trước khi commit. Tuy nhiên, AI chỉ chạy stability check khi user yêu cầu rõ ràng.

---

### Step 5: Cleanup & Delivery

#### 5.1. Code cleanup (MANDATORY before handover)

- [ ] Remove `console.log()` / `print()` / debug logs
- [ ] Remove unused locators
- [ ] Remove commented-out code
- [ ] No remaining `waitForTimeout()` / hardcoded credentials / hardcoded test data
- [ ] No unused imports
- [ ] Verify all locators are getters (not readonly fields)

#### 5.2. Update `task.md` artifact with results

```markdown
## Results

### Files Created
| File | Type | Location |
|---|---|---|
| login.page.ts | Page Object | lib/pages/iportal/login.page.ts |
| login-flow.spec.ts | Test Spec | tests/03.iportal/login-flow.spec.ts |

### Locator Collection
| Element | Primary Locator | Fallback | Score | Verified |
|---|---|---|---|---|
| Email input | `getByLabel('Email')` | `locator('#email')` | A | ✅ |
| Login button | `getByRole('button', {name: 'Login'})` | `locator('button[type=submit]')` | A | ✅ |

### Test Status
- ✅ PASS (or PASS 2/2 if user requested stability verification)
- Fix rounds: 0
- Locators collected: 8, all Score A-C
```

#### 5.3. Definition of Done (DoD)

A flow is only considered **complete** when **ALL** of the following criteria are met:

- [ ] PASS 2 consecutive times (not flaky)
- [ ] Locators verified on real DOM — all Score ≥ C
- [ ] No `waitForTimeout()` / hardcoded credentials / hardcoded test data
- [ ] POM is reusable — locators are getters in Page class, NOT inline in tests
- [ ] Page class extends `PageBasePom`
- [ ] Assertions have clear failure messages
- [ ] Cleanup complete (no debug logs, no commented-out code, no unused imports)
- [ ] `task.md` updated
- [ ] User approved (Mode B)

---

### 🔴 HARD STOP — Mandatory after completion (MUST NOT be skipped)

> **RULE:** After completing a flow (whether PASS, FAIL, or SKIP), the AI **MUST STOP COMPLETELY** and wait for user response.

**HARD STOP template — mandatory response in Vietnamese:**

```
---
✅ Flow [NAME] completed.

📊 Result: [PASS 2/2 | FAIL | SKIP]
📁 Files created:
  - Page: [page file path]
  - Test: [spec file path]
📊 Locator quality: Score A: [N] | B: [N] | C: [N] | D: [N]
📋 task.md: updated

Would you like to:
  (A) Edit code before finishing
  (B) Approve — complete workflow
  (C) Continue automating another flow
---
```

> 🚫 Do **NOT** proceed with even a single step without receiving user response.

---

## 📋 Final Result Report

When the workflow ends, generate a summary report:

```markdown
## Automation Result Summary

### Flow Information
| Field | Value |
|---|---|
| Flow name | [name] |
| Environment | [env] |
| URL | [url] |

### Results
| Flow | Result | Stability | File spec | File page |
|---|---|---|---|---|
| [Name] | ✅ PASS | 2/2 | tests/.../flow.spec.ts | lib/pages/.../page.ts |

### Locator Quality
| Score | Count | % |
|---|---|---|
| A (semantic) | N | XX% |
| B (testid) | N | XX% |
| C (id/name) | N | XX% |
| D (css/xpath) | N | XX% |
| Total | N | 100% |

### Auto-Heal Summary
- Rounds used: [N]
- Errors fixed: [list]

### Known Issues / Limitations
- [Specify if any]

### Run Command
```bash
# Local (headed)
$env:ENV="[env]"; $env:HEADED="1"; npm run test:headless -- tests/<path>

# CI (headless)
ENV=[env] npm run test:headless -- tests/<path>
```

```
