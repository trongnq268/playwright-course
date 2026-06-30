---
description: >
  Analyze automation scope, assess feasibility, then convert manual test cases into Playwright
  TypeScript automation scripts following the AI-RBT 6-step framework. Includes Scope Analysis
  and Feasibility Assessment phases before implementation.
skills:
  - qa_automation_engineer
  - ui_debug_agent
  - smart_locator_agent
  - test_data_generator
---

# Workflow: Generate Automation Scripts from Manual Test Cases (v2 — Enhanced)

> **MANDATORY:** Load and read the following skills before starting:
>
> | Skill | SKILL.md | Role in this workflow |
> |---|---|---|
> | `qa_automation_engineer` | `.agent/skills/qa_automation_engineer/SKILL.md` | Master skill — orchestrates the entire automation process |
> | `ui_debug_agent` | `.agent/skills/ui_debug_agent/SKILL.md` | Inspects live DOM, analyzes accessibility tree, debugs UI failures |
> | `smart_locator_agent` | `.agent/skills/smart_locator_agent/SKILL.md` | **Generates stable locators for UI elements** — prioritizes semantic locators, avoids fragile selectors |
> | `test_data_generator` | `.agent/skills/test_data_generator/SKILL.md` | Generates unique, traceable test data to avoid conflicts between runs |

This workflow reads manual test case files, performs **Scope Analysis** and **Feasibility Assessment**, opens a browser to inspect the live UI, collects locators, generates Playwright TypeScript automation scripts (POM + Test), runs tests, and auto-heals failures until PASS.

**Fixed tech stack:** Playwright · TypeScript · Playwright Test runner

---

## 📥 Input

Before starting, the user **MUST** provide the following information. If anything is missing → **ask the user immediately**, do not make assumptions.

| # | Input | Description | Required |
|---|---|---|---|
| 1 | **Test case file** | Absolute path or URL to the MD/Excel/JSON file containing manual TCs | ✅ |
| 2 | **Application URL** | Base URL of the test environment (e.g., `https://dev38-iportal.opdev.vn`) | ✅ |
| 3 | **Output directory** | Where to save `.spec.ts` and Page Object files (e.g., `tests/03.iportal/...`) | ✅ |
| 4 | **Credentials / Fixture** | Test account or path to a saved `storageState` file | Optional |

**How to pass inputs when invoking the workflow:**

```
/generate_automation_from_testcases_v2

- File TC:     d:\Auto-OnePay\OnePay_playwright\docs\testcases\AR-01.md
- URL app:     https://dev38-iportal.opdev.vn
- Output dir:  tests/03.iportal/09.Accountant_Management_P2/03.Account_Receivable
- Fixture:     .auth/iportal.json
```

---

## 📤 Output

Once the workflow completes, the following artifacts will be produced:

| Artifact | Location | Description |
|---|---|---|
| `task.md` | `C:\Users\trongnq\.gemini\antigravity\brain\<conv-id>\` | Progress checklist, Scope Analysis, Feasibility Report, Locator Collection, test run results |
| **Scope Analysis Report** | (inside `task.md`) | Module priority table, criticality levels, automation candidates |
| **Feasibility Report** | (inside `task.md`) | Easy/Medium/Complex/Manual Only classification + coverage % |
| **Page Object classes** | `lib/pages/<module>/` | One `.ts` file per page, locators verified against live DOM |
| **Test spec files** | `tests/<output_dir>/` | `.spec.ts` files that PASS stable 2/2 |
| **Final result report** | (end-of-workflow response) | PASS/FAIL/SKIP summary per TC + automation coverage % |

**📁 Naming Convention cho file output:**
- Page Object: `<module-name>.page.ts` (lowercase, kebab-case) — ví dụ: `account-receivable.page.ts`
- Spec file: `<tc-id>-<module-name>.spec.ts` — ví dụ: `AR-01-create-invoice.spec.ts`

---

## ⚙️ Execution Modes

The workflow operates in **2 distinct modes** — do not mix them:

### Mode A — VERIFY & ASK (after code generation)
- **When:** Code generation for a TC is complete
- **Rule:** Run `tsc --noEmit` to verify TypeScript correctness. Do NOT run Playwright tests automatically.
- **Run test:** Only when user **explicitly requests** (e.g. "chạy thử", "run test", "test luôn")
- **If test fails:** Report error log clearly → ask user if they want AI to fix → fix + re-run **max 1 round only**. If still fails → stop and report.
- **Reason:** Running Playwright tests + browser MCP + retry loops consumes significant token quota.

### Mode B — INTERACTIVE GATE (between TCs)
- **When:** Current TC PASSES 2/2 and cleanup is done
- **Rule:** MUST pause and ask user confirmation before moving to the next TC
- **Template (Vietnamese):** `"TC [ID] đã hoàn thành ✅. Bạn có muốn chỉnh sửa gì không, hay approve để tiếp tục?"`

---

## 🛡️ Rules & Guardrails

### Architecture Protection

- Do NOT duplicate locators / page methods / utilities if they already exist
- Do NOT create a new framework structure if the project already has one
- Do NOT move business logic into test files
- Do NOT hardcode fixes just to force PASS | Do NOT bypass or disable assertions
- Do NOT use `force: true` before verifying the root cause
- Do NOT use `waitForTimeout()`
- Do NOT patch locators randomly | Do NOT create fragile CSS/XPath when a better accessible locator exists

When changes are needed: prefer updating existing Page Objects, maintain backward compatibility and naming conventions.

### Locator Confidence Score

| Score | Meaning |
|---|---|
| A | `getByRole` + accessible name |
| B | stable `data-testid` |
| C | stable `id` |
| D | css/xpath fallback |
| F | dynamic/generated selector |

Priority order: **A > B > C > D**. Score F: **FORBIDDEN — log warning bắt buộc + phải hỏi user trước khi dùng**. If a locator scores below C → log a warning in `task.md`.

### Fix Guardrails (when user requests test run)

| Condition | Action |
|---|---|
| Same error repeats after fix | Stop — report to user, do NOT keep patching |
| Files modified > 5 for one TC | Stop — request user review |
| Fix round exhausted (1 round) | Stop — report error details to user |
| Assertion changes | Document the reason clearly in `task.md` |

> **Guardrail priority:** Nếu nhiều điều kiện dừng trigger cùng lúc (ví dụ: đã sửa 6 files) → **ưu tiên điều kiện "Files modified > 5"** — dừng ngay.

**Rollback:** If fix round exhausted and still FAILS → run `git diff --stat` → list modified files → ask user: revert or keep changes?

### Definition of Done (DoD)

A TC is considered complete only when **ALL** of the following are met:

- [ ] PASS 2 consecutive times (not flaky)
- [ ] Locators verified against live DOM
- [ ] No `waitForTimeout()` / hardcoded credentials / hardcoded test data
- [ ] POM is reusable — locators defined in Page class, not inline in tests
- [ ] Assertions have clear failure messages
- [ ] Cleanup complete (no debug logs, no commented-out code, no unused imports)
- [ ] `task.md` updated
- [ ] User approved (Mode B)

---

## Step 0: Pre-flight Validation ⚡ (MANDATORY — run before everything)

- [ ] TC file exists and is readable? (`view_file` or `read_url_content`)
- [ ] App URL accessible? (`browser_navigate` → verify page loads successfully)
- [ ] Project structure detected? (`list_dir` → locate `lib/pages/`, `tests/` directories)
- [ ] Credentials / fixture available? (env vars, `.auth/*.json`, or user-provided?)
- [ ] Existing POMs checked? (`grep_search` to find existing page classes and avoid duplicates)
- [ ] `playwright.config.ts` read? (`view_file` → extract `baseURL`, `globalTimeout`, `reporter` — **dùng các giá trị này trong test, KHÔNG hardcode**)

> ⚠️ If any check FAILS → **STOP IMMEDIATELY**, report the reason to the user, do NOT continue.

---

## 🔍 Phase I — Scope Analysis (MANDATORY before implementation)

> **Goal:** Understand the full automation scope, identify priority modules, and assess the criticality of each business flow before writing any code.

### Step S1: Collect & Classify Test Cases

Parse the entire test case file and extract:

```
FOR EACH test case:
  - TC ID
  - Title / Module
  - Priority (P0/P1/P2/P3)
  - Steps count
  - Pre-conditions
  - Expected Results
  - Special test data (file upload, CAPTCHA, 3rd party...)
  - Dependencies (does this TC depend on another TC?)
```

### Step S2: Identify Modules & Functional Groups

Group TCs by **module / business flow**:

| Module | TC Count | Main business flow description |
|---|---|---|
| [Module Name] | N | [Brief description] |

Identify the **dependency graph** between modules (which module must run first).

### Step S3: Assess Criticality Level

Rank each module/flow by criticality:

| Level | Symbol | Criteria |
|---|---|---|
| **Critical** | 🔴 | Revenue-impacting, data integrity, security, core transaction |
| **High** | 🟠 | Core user journey, main feature, frequently regressed |
| **Medium** | 🟡 | Secondary feature, low impact if it fails |
| **Low** | 🟢 | Nice-to-have, UI cosmetic, rarely triggered |

### Step S4: Identify Automation Candidates

Evaluate each module using the Automation Value Score:

```
Automation Value Score (AVS) =
  (Regression Frequency × 3)  +  (Business Risk × 3)
  + (TC Count × 1)             +  (Execution Time Saved × 2)
  - (Complexity Penalty × 2)   -  (Maintenance Cost × 1)
```

**Thang điểm AVS (1–5 cho từng biến):**

| Biến | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Regression Frequency | < 1 lần/quý | 1 lần/quý | 1 lần/tháng | 1 lần/tuần | > 1 lần/tuần |
| Business Risk | Cosmetic | Low impact | Medium impact | High impact | Revenue-critical |
| TC Count | 1–2 TCs | 3–5 TCs | 6–10 TCs | 11–20 TCs | > 20 TCs |
| Execution Time Saved | < 5 phút | 5–15 phút | 15–30 phút | 30–60 phút | > 60 phút |
| Complexity Penalty | Trivial | Easy | Medium | Complex | Very complex |
| Maintenance Cost | Near-zero | Low | Medium | High | Very high |

Output the Automation Candidates table:

| Module | AVS | Reason for priority | Decision |
|---|---|---|---|
| [Module] | 85 | High regression freq, critical flow | ✅ Automate |
| [Module] | 45 | Low freq, complex setup | ⏸️ Defer |
| [Module] | 10 | CAPTCHA, manual verification required | 🚫 Manual Only |

**MANDATORY STOP** — Present the Scope Analysis Report to the user and wait for confirmation of which modules to automate before proceeding to Phase II.

**Template phản hồi (Vietnamese):**
> `"📊 Phase I — Scope Analysis hoàn thành. Đây là bản phân tích scope. Vui lòng xác nhận: (A) Approve để tiếp tục Phase II | (B) Điều chỉnh danh sách module/TC | (C) Dừng workflow."`
>
> ⏳ Nếu không nhận được phản hồi, hiển thị lại prompt một lần nữa trước khi dừng hẳn.

---

## 📊 Phase II — Automation Feasibility Assessment (MANDATORY)

> **Goal:** Classify each test case by implementation difficulty and identify technical risks that need to be handled.

### Step F1: Classify Test Cases by Difficulty

Apply the classification matrix to each TC:

#### 🟢 EASY — Straightforward to automate

**Criteria (ALL must be satisfied):**
- [ ] Linear flow — no complex conditional logic
- [ ] UI elements have stable `id`, `data-testid`, or ARIA role
- [ ] No external services required (email OTP, SMS, payment gateway)
- [ ] No file upload or image comparison needed
- [ ] Simple test data, no complex setup required
- [ ] Expected result is clear and assertable via text/state

**Examples:** Successful login, basic form submit, navigation check, simple CRUD.

---

#### 🟡 MEDIUM — Automatable but requires attention

**Criteria (AT LEAST 1 must be satisfied):**
- [ ] Flow has conditional branches (if/else in steps)
- [ ] Requires dynamic data handling (date picker, dynamic dropdown, pagination)
- [ ] Complex verification needed (table data, multiple assertions)
- [ ] Complex test data setup required (create entity → operate → verify)
- [ ] Elements with lazy-load or async behavior
- [ ] Cross-page flow with multiple navigations

**Examples:** Multi-filter search, CRUD with validation rules, multi-step workflow.

---

#### 🔴 COMPLEX — Difficult to automate, requires careful consideration

**Criteria (AT LEAST 1 must be satisfied):**
- [ ] Requires iframe / shadow DOM / popup window handling
- [ ] Requires file upload and file content verification
- [ ] Requires external system integration (email, SMS OTP, webhook)
- [ ] Requires visual comparison (chart, PDF, image)
- [ ] Race condition / real-time data (WebSocket, polling)
- [ ] Multi-user / multi-session coordination
- [ ] Complex business rules with many variables

**Examples:** Multi-level approval workflow, payment flow with OTP, export PDF verification.

---

#### ⛔ MANUAL ONLY — Should not be automated

**Criteria (AT LEAST 1 must be satisfied):**
- [ ] Requires human judgment (UX/UI aesthetics, content review)
- [ ] CAPTCHA with no workaround
- [ ] Depends on physical hardware (card reader, biometric)
- [ ] One-time test only (one-off)
- [ ] Cost of automation >> Cost of manual execution
- [ ] Unstable test environment with no test sandbox

**Examples:** Visual responsive layout review, usability testing, hardware integration.

---

### Step F2: Assess Technical Risks

For each TC classified as MEDIUM or COMPLEX, document the risks:

| TC ID | Technical Risk | Level | Proposed Solution |
|---|---|---|---|
| TC-05 | OTP via SMS | 🔴 High | Mock OTP service or skip assertion |
| TC-12 | Dynamic table with pagination | 🟡 Medium | Custom wait strategy + data normalization |
| TC-18 | File upload + preview | 🟡 Medium | Use fixture files, verify upload state |

### Step F3: Compile Feasibility Report

Generate the final summary table for Phase II.
**Report content must be written in Vietnamese for user presentation:**

```markdown
## Feasibility Report Summary

### Phân loại Automation

| Loại | Số TC | % |
|---|---|---|
| 🟢 Easy | N | XX% |
| 🟡 Medium | N | XX% |
| 🔴 Complex | N | XX% |
| ⛔ Manual Only | N | XX% |
| **Tổng Automate** | **N** | **XX%** |

### Danh sách chi tiết

| TC ID | Tiêu đề | Loại | Rủi ro chính | Ghi chú |
|---|---|---|---|---|
| TC-01 | ... | 🟢 Easy | — | |
| TC-05 | ... | 🔴 Complex | OTP via SMS | Cần mock |
| TC-09 | ... | ⛔ Manual | Human judgment | Skip automation |

### Coverage Target

- Tổng TC trong file: N
- TC sẽ automate: N (XX%)
- TC skip (Manual Only): N (XX%)
```

**MANDATORY STOP** — Present the full Feasibility Report to the user and wait for confirmation of which TCs to implement in this sprint.

**Template phản hồi (Vietnamese):**
> `"📊 Phase II — Feasibility Assessment hoàn thành. Đây là danh sách phân loại TC. Vui lòng xác nhận: (A) Approve để bắt đầu implementation | (B) Điều chỉnh danh sách TC | (C) Dừng workflow."`
>
> ⏳ Nếu không nhận được phản hồi, hiển thị lại prompt một lần nữa trước khi dừng hẳn.

---

## Step 1: Analysis & Planning

> This step runs only after the user has approved the TC list from Phase I & II.

1. **Parse test case file** — extract (approved TCs only):
   - TC list: ID, Title, Steps, Expected Results, Test Data, Priority, Feasibility Class
   - Pages/screens involved in each flow *(dự kiến dựa trên mô tả TC — sẽ được xác nhận lại bằng DOM inspection trong Step 2)*
   - Pre-conditions (login, setup data, navigate...)
   - Dependencies between TCs

2. **Create `task.md` artifact:**

   ```markdown
   # Automation Generation Progress

   ## Phase Summary
   - Scope: [N modules, N TCs analyzed]
   - Approved for automation: [N TCs — Easy: N, Medium: N, Complex: N]
   - Skipped (Manual Only): [N TCs]

   ## Execution Checklist
   - [x] Step 0: Pre-flight Validation
   - [x] Phase I: Scope Analysis
   - [x] Phase II: Feasibility Assessment
   - [x] Step 1: Test case analysis
   - [ ] Steps 2–7: Execute per TC

   ## Test Cases (Approved)
   | TC ID | Title | Pages | Priority | Class | Status |
   |---|---|---|---|---|---|
   | TC01 | ... | ... | P1 | 🟢 Easy | ⏳ |
   | TC05 | ... | ... | P1 | 🔴 Complex | ⏳ |
   ```

3. **MANDATORY STOP** — wait for user to review the parsed TC list and execution order before entering the loop.

   **Template phản hồi (Vietnamese):**
   > `"📋 Đây là danh sách TC đã phân tích và thứ tự thực hiện. Bạn có muốn: (A) Điều chỉnh thứ tự | (B) Loại bỏ TC nào không | (C) Approve và bắt đầu Step 2?"`
   >
   > ⏳ Nếu không nhận được phản hồi, hiển thị lại prompt một lần nữa trước khi dừng hẳn.

---

## 🔄 Loop: Execute per TC (ONE-BY-ONE)

> Steps 2 → 7 repeat for **one TC at a time**. Do NOT generate multiple TCs simultaneously.
> Priority order: **Easy → Medium → Complex** (builds confidence early).

---

### Step 2: UI Recon — Collect Locators

> 🛠️ **Skills activated at this step:** `ui_debug_agent` (DOM inspection) + `smart_locator_agent` (generate stable locators)

**Mandatory sequence:**

```
browser_navigate → application URL
browser_resize   → 1920 × 1080
browser_wait_for → page fully loaded
browser_snapshot → capture DOM
```

For each page in the TC:
1. `browser_snapshot` → read full accessibility tree
2. Identify all elements that need interaction (inputs, buttons, links, dropdowns, tables...)
3. Apply **`smart_locator_agent`** to generate locators in priority order:
   - `getByRole` + accessible name (Score A)
   - `getByLabel` / `getByPlaceholder` / `getByText` (Score A)
   - stable `data-testid` attribute (Score B)
   - stable `id` attribute (Score C)
   - CSS selector / XPath only when no better option exists (Score D)
4. Verify the locator with real browser interaction (`browser_click`, `browser_type`)

**Fallback process when a locator is hard to find:**

```
If locator is Score D or F:
  1. Use ui_debug_agent → inspect raw HTML source
  2. Look for stable attributes (aria-label, role, name, title)
  3. Try getByRole with exact: false or regex
  4. **Score D:** Log warning in task.md → proceed (fallback acceptable)
  5. **Score F (dynamic/generated):**
     → Log warning bắt buộc trong task.md
     → Dừng — hỏi user: "Locator [X] chỉ đạt Score F. Bạn có muốn tiếp tục với selector này không?"
     → KHÔNG tự ý dùng Score F khi chưa được user chấp thuận
```

**Situation handling:**

| Situation | Action |
|---|---|
| URL blocked / requires VPN | Hỏi user: (A) Cung cấp proxy/VPN → retry \| (B) Generate code không verify DOM \| (C) Dừng workflow |
| Login required | Use existing fixture or ask user for credentials |
| Element not found | `ui_debug_agent` inspects DOM → try alternative locator → notify user if DOM has changed |
| CAPTCHA / 2FA | Notify user — cannot automate |
| Dynamic content / SPA | `browser_wait_for` specific text before snapshot |
| Shadow DOM / Canvas / iFrame | Log limitation in `task.md` — notify user |
| Unstable locator (generated class) | `smart_locator_agent` finds a more stable alternative attribute |
| **Score F locator encountered** | **Log warning bắt buộc → hỏi user trước khi dùng — KHÔNG tự ý dùng Score F** |

**Required output — write to `task.md` (Locator Collection):**

| Page | Element | Action | Primary Locator | Fallback | Score | Verified |
|---|---|---|---|---|---|---|
| LoginPage | Email input | fill | `getByLabel('Email')` | `#email` | A | ✅ |
| LoginPage | Login button | click | `getByRole('button', {name: 'Login'})` | `button[type=submit]` | A | ✅ |

> ⚠️ Step 3 will use this table as the sole data source — **DO NOT guess locators**. Every locator must be verified working in the current browser before being written into code.

---

### Step 3: POM Design

**Data source:** Locator Collection from Step 2 in `task.md`.

1. Identify Page classes to create (1 page/screen → 1 class)
2. Check project: if a page class already exists → **update it**, do NOT create a duplicate
3. Generate Page Object with this structure:

```
- Locators            (declared at top of class, sourced from Step 2)
- Constructor         (receives Playwright Page instance)
- Action methods      (describe user behavior: login(), fillForm() — NOT clickButton())
- Verification methods (check state after an action)
```

**Principle:** Method names describe user behavior, not DOM structure. Use smart waits only. Return `this` or the next page object where appropriate.

---

### Step 4: Prepare Test Data

1. Classify data from the TC:
   - **Unique per run** (email, username, ID) → generate random + traceable
   - **Fixed** (URL, config) → read from env/config
   - **Data-driven** (multiple sets) → create external JSON file

2. Data generation format:
   ```
   Email:    auto_<testname>_<timestamp>@test.com
   Username: auto_<testname>_<timestamp>
   Code:     TC_<id>_<timestamp>
   ```

3. **Credentials:** Read from env variables or `storageState` fixture. Do NOT hardcode. Do NOT read `.env` files directly.

4. **Pre-conditions phức tạp:** Nếu TC yêu cầu data hoặc entity phải tồn tại trước khi test:
   - Tạo `beforeAll` block để setup data một lần cho cả describe block
   - Tạo `beforeEach` nếu mỗi test cần state riêng biệt
   - Document rõ pre-condition steps trong `task.md`
   - Mỗi TC phải **self-contained** — không được phụ thuộc vào TC khác đã chạy trước

---

### Step 5: Generate Automation Scripts

**Playwright TypeScript template:**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('[TC_ID] - [TC_TITLE]', () => {
  test('[TC_ID] [TC_TITLE]', async ({ page }) => {
    // ARRANGE
    const loginPage = new LoginPage(page);
    const testEmail = `auto_login_${Date.now()}@test.com`;

    // ACT
    await loginPage.navigate();
    await loginPage.login(testEmail, process.env.TEST_PASSWORD!);

    // ASSERT
    await expect(page.getByRole('heading', { name: /Dashboard/ }))
      .toBeVisible({ timeout: 10_000 });
  });
});
```

**Assertion requirements:**
- Each TC must have at least 1 assertion with a clear failure message
- Use soft assertions when checking multiple points simultaneously
- Set appropriate timeouts for the app (do not rely on defaults that may be too short)

**Code principles:**
- No `waitForTimeout()` — use smart waits only (`expect().toBeVisible()`, `expect().toBeEnabled()`)
- No inline locators in tests — locators belong in the Page class
- Clean imports — no unused imports
- Tests must be independent — no dependency on execution order
- Include cleanup/teardown if the test creates data

**Performance:**
- Reuse `storageState` to avoid logging in before every test
- Reuse fixtures and browser context
- Avoid duplicate navigation and test data setup

---

### Step 6: Verify & Report (Compile Check + User-Driven Execution — Mode A)

> ⚠️ **Token-saving rule (aligned with GEMINI.md):** AI does NOT auto-run Playwright tests. Only compile-check by default.

**1. Compile check** — verify TypeScript correctness:

```bash
npx tsc --noEmit
```

- If **compile PASS** → report to user, ask if they want to run tests
- If **compile FAIL** → fix errors → re-run `tsc --noEmit` until clean

**2. Report to user** (MANDATORY — do NOT skip):

```
✅ Compile check PASSED — code TypeScript hợp lệ.

📁 Files created:
- Page: [page file path]
- Test: [spec file path]

Bạn có muốn tôi chạy test không?
  (A) Chạy test luôn
  (B) Không, tôi tự chạy
```

**3. Run test — ONLY when user explicitly requests** (e.g. "chạy thử", "run test", "test luôn"):

```bash
$env:ENV="dev36"; $env:HEADED="1"; npm run test:headless -- tests/<path>/<file>.spec.ts
```

> ⚠️ Do NOT use `npx playwright test` directly — use `npm run test:headless` per project convention.

**4. If test FAILS** — report and ask user:

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

**5. Stability verification** — chỉ thực hiện khi user yêu cầu:

> Theo DoD, test cần PASS 2/2 trước khi commit. Tuy nhiên, AI chỉ chạy stability check khi user yêu cầu rõ ràng.

Update `task.md`: TC → ✅ PASS (hoặc PASS 2/2 nếu đã verify stability)

---

### Step 7: Cleanup & Interactive Gate (Mode B)

**Cleanup checklist:**
- [ ] Remove `console.log()` / temporary debug logs
- [ ] Remove unused locators
- [ ] Remove commented-out code
- [ ] No remaining `waitForTimeout()` / hardcoded credentials / hardcoded test data
- [ ] Clean imports — no unused imports

**Update `task.md`:**

```markdown
| TC ID | Title | Class | Status | Stability | Files |
|---|---|---|---|---|---|
| TC01 | Login thành công | 🟢 Easy | ✅ PASS | 2/2 | lib/pages/login.page.ts, tests/.../login.spec.ts |
```

---

### 📌 Cập nhật trạng thái TC trong file Manual Test Case (BẮT BUỘC)

Sau khi TC hoàn thành, AI **BẮT BUỘC** cập nhật trạng thái vào file TC manual gốc theo quy tắc sau:

#### Quy tắc đánh dấu theo kết quả:

| Kết quả | Trạng thái cần ghi vào file TC | Ghi chú |
|---|---|---|
| ✅ PASS 2/2 | `[AUTOMATED] ✅` + đường dẫn file spec | Ví dụ: `[AUTOMATED] ✅ tests/.../tc01.spec.ts` |
| ❌ FAIL sau 2 rounds | `[AUTOMATED] ❌ FAIL` + mô tả lỗi tóm tắt | Ví dụ: `[AUTOMATED] ❌ Element not found — cần xem lại` |
| ⏭️ Manual Only / Skip | `[SKIP] ⛔` + lý do | Ví dụ: `[SKIP] ⛔ OTP qua SMS — không thể automate` |

#### Cách thực hiện theo từng format file:

| Format file TC | Cách cập nhật |
|---|---|
| **Markdown (.md)** | Tìm dòng TC ID → thêm trạng thái vào cuối dòng tiêu đề hoặc tạo thêm field `Status:` trong block TC |
| **Excel (.xlsx)** | **KHÔNG ghi đè file gốc** → Ghi note vào `task.md` với nội dung: `"TC [ID] → cần cập nhật cột Automation Status = [trạng thái] trong file Excel"` |
| **JSON** | **KHÔNG ghi đè file gốc** → Ghi note vào `task.md` tương tự Excel |

> ⚠️ Nếu file TC là Markdown và **có thể ghi**, AI được phép dùng `write_to_file` / `replace_file_content` để update. Nếu **không chắc có quyền ghi** → hỏi user trước.

---

### 🔴 HARD STOP — Bắt buộc sau mỗi TC (KHÔNG được bỏ qua)

> **QUY TẮC:** Sau khi hoàn thành 1 TC (dù PASS, FAIL hay SKIP), AI **PHẢI DỪNG HOÀN TOÀN** và chờ phản hồi từ user. **TUYỆT ĐỐI KHÔNG tự động chuyển sang TC tiếp theo.**

**Checklist trước khi HARD STOP:**
- [ ] Cleanup hoàn tất (không còn debug log, unused code)
- [ ] `task.md` đã cập nhật trạng thái TC này
- [ ] File TC manual đã được đánh dấu trạng thái (hoặc note trong task.md nếu không ghi được)
- [ ] Tất cả DoD đã đạt (với TC PASS)

**Template HARD STOP — phản hồi bắt buộc bằng tiếng Việt:**

```
---
✅ TC [TC_ID] — [TC_TITLE] đã hoàn thành.

📊 Kết quả: [PASS 2/2 | FAIL | SKIP]
📁 File spec: [đường dẫn file .spec.ts]
📝 Trạng thái file TC manual: [đã cập nhật | cần update thủ công tại cột X]
📋 task.md: đã cập nhật

Bạn có muốn:
  (A) Tiếp tục sang TC tiếp theo: [TC_NEXT_ID] — [TC_NEXT_TITLE]
  (B) Chỉnh sửa TC vừa xong trước khi tiếp tục
  (C) Dừng workflow tại đây
---
```

> 🚫 **KHÔNG** tiếp tục dù chỉ một bước nếu chưa nhận được phản hồi (A), (B), hoặc (C) từ user.

- **User chọn (A):** Chuyển sang TC tiếp theo, loop từ Step 2
- **User chọn (B):** Cập nhật code → chạy lại → lặp lại Step 7
- **User chọn (C):** Dừng workflow, xuất Final Result Report với các TC đã hoàn thành

---

## 📋 Final Result Report

After all TCs are complete, generate a summary report.
**Report content must be written in Vietnamese for user presentation:**

```markdown
## Automation Result Summary

| TC ID | Tiêu đề | Class | Kết quả | Stability | File spec |
|---|---|---|---|---|---|
| TC-01 | ... | 🟢 Easy | ✅ PASS | 2/2 | tests/.../tc01.spec.ts |
| TC-05 | ... | 🔴 Complex | ✅ PASS | 2/2 | tests/.../tc05.spec.ts |
| TC-09 | ... | ⛔ Manual | ⏭️ SKIP | — | — |

## Coverage
- Tổng TC trong file: N
- Đã automate: N (XX%)
- Bỏ qua (Manual Only): N (XX%)
- PASS: N | FAIL: N | SKIP: N

## Known Issues / Limitations
- [Ghi rõ nếu có TC nào cần chú ý đặc biệt]
```
