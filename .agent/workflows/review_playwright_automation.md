---
description: Review Playwright/TypeScript automation code against best practices — analyze 10 aspects, return issues table + score + refactor examples.
skills:
  - qa_automation_engineer
  - ui_debug_agent
---

# Workflow: /review_playwright_automation

> **Slash command:** `/review_playwright_automation`
> **Description:** Review Playwright/TypeScript automation code against best practices — analyze 10 aspects, return issues table + score + refactor examples.
> **Skill references:** `qa_automation_engineer`, `ui_debug_agent`
> **Rule references:** `automation_rules.md`, `locator_strategy.md`, `playwright_rules.md`

---

## Usage

```
/review_playwright_automation target=<file or folder>
```

**Examples:**

```
# Review a single spec file
/review_playwright_automation target=tests/login/login.spec.ts

# Review a Page Object
/review_playwright_automation target=src/pages/LoginPage.ts

# Review an entire folder
/review_playwright_automation target=tests/checkout/

# Review multiple targets (spec + page pair)
/review_playwright_automation target=tests/login/login.spec.ts,src/pages/LoginPage.ts
```

> ⚠️ `target` is **required**. If the user invokes the command without a `target` → ask immediately, do not proceed.

---

## Input Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `target` | ✅ Yes | File or folder to review (relative path from project root). Accepts comma-separated list for multiple targets. | `tests/login/login.spec.ts` |
| `depth` | No | `quick` — 5 core aspects (⚡) \| `full` — 10 aspects | Default: `full` |

**`depth=quick` covers exactly these 5 aspects:**
1. Code Structure
2. Page Object Model
3. Locator Strategy
4. Wait Strategy
5. Test Stability

**`depth=full` adds 5 more aspects:**
6. Code Smell
7. Maintainability
8. Reusability
9. Clean Code
10. TypeScript Quality

---

## Workflow Steps

### Step 0 — Input Validation (Think Before Coding)

AI **must** complete before reading any file:

- [ ] Confirm `target` is provided — if missing → ask immediately, do not continue
- [ ] Verify the path exists — if invalid → notify user and ask again
- [ ] Confirm `depth` — default to `full` if not specified
- [ ] If `target` is a **single file** → begin review immediately (no confirmation needed)
- [ ] If `target` is a **folder with < 5 files** → list files and begin review immediately
- [ ] If `target` is a **folder with 5–20 files** → list files and ask user to confirm before proceeding
- [ ] If `target` is a **folder with > 20 files** → ask user: "Review all files, or only `spec/` and `pages/` files?"
- [ ] If `target` is a **mixed list** (spec + page files together) → enable cross-file analysis mode (see Step 2)

---

### Step 1 — Recon

```
1. Read all files in target
2. Reference: .agent/rules/automation_rules.md   → used for Aspects #1, #2, #5
3. Reference: .agent/rules/locator_strategy.md   → used for Aspect #3
4. Reference: .agent/rules/playwright_rules.md   → used for Aspects #4, #8
5. Identify actual tech stack from the code
```

Output of this step: list of files read + confirmed tech stack.

---

### Step 2 — Static Analysis

Review in order. Do not skip any active aspect.
- `depth=quick` → review only aspects marked ⚡
- `depth=full` → review all 10 aspects

#### ⚡ 1. Code Structure *(ref: automation_rules.md)*
- Is the file/folder structure clear and organized?
- Correct separation: `pages/` / `tests/` / `utils/` / `data/` / `fixtures/`?
- Are file names, class names, and method names consistent with convention?

#### ⚡ 2. Page Object Model *(ref: automation_rules.md)*
- Are locators defined inside the Page class, not inline in tests?
- Are assertions placed in the Test class, not in the Page?
- Are methods named after actions (`clickLogin`, `fillEmail`, `selectDropdown`)?
- Is single responsibility violated?

#### ⚡ 3. Locator Strategy *(ref: locator_strategy.md)*
Check in priority order:

```
✅ getByRole()        — highest priority
✅ getByLabel()       — form elements
✅ getByText()        — visible text
✅ getByTestId()      — data-testid
⚠️  CSS selector      — only when none of the above apply
❌ Absolute XPath    — never use
❌ Auto-generated classes — never use (.ant-btn-primary-12abc)
```

#### ⚡ 4. Wait Strategy *(ref: playwright_rules.md)*
- Any hardcoded `waitForTimeout` / `page.waitForTimeout`? → **Critical immediately**
- Any `sleep`? → **Critical immediately**
- Is `expect(locator).toBeVisible()` / `toBeEnabled()` used correctly?
- Are timeouts reasonable and consistent?

#### ⚡ 5. Test Stability *(ref: automation_rules.md)*
- Are tests independent, with no execution-order dependencies?
- Is test data unique (timestamp/random)?
- Is there shared state between tests?
- Are assertions specific enough (avoid overly broad `toBeTruthy()`)?

#### 6. Code Smell *(full mode only)*
- Is there duplicated logic between tests and pages?
- Are any methods too long (> 30 lines)?
- Are there magic numbers / hardcoded magic strings?
- Is there dead code (unused methods, unused variables)?

#### 7. Maintainability *(full mode only)*
- How many places need to change when the UI changes?
- Are locators centralized or scattered across files?
- Is there a centralized config (base URL, timeout)?

#### 8. Reusability *(ref: playwright_rules.md — full mode only)*
- Are helper/util functions reusable?
- Are Playwright fixtures used correctly?
  - Are fixture scopes appropriate (`test` / `worker` / `page`)?
  - Are built-in Playwright fixtures overridden correctly?
  - Are fixtures type-safe (explicit TypeScript types)?
- Are custom wrappers reasonable and not over-engineered?

#### 9. Clean Code *(full mode only)*
- Any remaining `console.log` / debug logs?
- Any commented-out code?
- Any unused imports?
- Any unresolved TODO / FIXME?

#### 10. TypeScript Quality *(full mode only)*
- Is `any` used without control?
- Are type assertions (`as X`) used safely?
- Do public methods in Page classes have explicit return types?
- Are interfaces/types defined for test data objects?

---

#### 🔗 Cross-File Analysis *(activated when target is a spec + page pair)*

When reviewing a spec file together with its Page Object, additionally check:

- Are locators imported from the Page class (not redefined inline in tests)?
- Are assertions placed in the correct layer (test, not page)?
- Are Page method names consistent with how they are called in tests?
- Is there any logic duplication between the spec and the page?

---

### Step 3 — Output: Issues Table

> 🇻🇳 **All output content must be written in Vietnamese.**

```markdown
## Danh sách Issues

| # | Issue | File / Line | Aspect | Severity | Suggested Fix |
|---|-------|-------------|--------|----------|---------------|
| 1 | ... | `path/file.ts:42` | Wait | 🔴 Critical | ... |
| 2 | ... | `path/file.ts:15` | POM | 🟡 Major | ... |
| 3 | `path/file.ts:7`  | Clean Code | 🟢 Minor | ... |
```

**Severity levels:**
- 🔴 **Critical** — Causes failures or flakiness; must be fixed before merge
- 🟡 **Major** — Serious best-practice violation; fix within this sprint
- 🟢 **Minor** — Quality improvement; fix when time allows

---

### Step 4 — Output: Summary

```markdown
## Tổng kết đánh giá

**Overall Score: X/10**

> **Scoring formula:**
> - High-priority aspects (Locator Strategy, Wait Strategy, Test Stability): weight **2**
> - All other aspects: weight **1**
> - Overall Score = (Σ score × weight) / (Σ weights) — rounded to 1 decimal place

| Aspect | Score | Comment |
|--------|-------|---------|
| Code Structure | X/10 | |
| Page Object Model | X/10 | |
| Locator Strategy | X/10 | |
| Wait Strategy | X/10 | |
| Test Stability | X/10 | |
| Code Smell | X/10 | *(skipped if depth=quick)* |
| Maintainability | X/10 | *(skipped if depth=quick)* |
| Reusability | X/10 | *(skipped if depth=quick)* |
| Clean Code | X/10 | *(skipped if depth=quick)* |
| TypeScript Quality | X/10 | *(skipped if depth=quick)* |

### Top 3 Most Critical Issues
1. **[Issue #N]** — reason for priority
2. **[Issue #N]** — ...
3. **[Issue #N]** — ...
```

---

### Step 5 — Output: Refactor Examples

> **Limit:** Maximum **5 Refactor Examples** — prioritize Critical first, then Major by issue number.
> If there are more issues than examples provided → add a note: "N additional issues without examples — see Issues table for details."

For each selected issue, provide a concrete example:

```markdown
## Refactor Examples

### Issue #N — [Issue Name]

❌ **Before:**
```typescript
await page.waitForTimeout(3000);
await page.click('.login-btn-abc123');
```

✅ **After:**
```typescript
await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
await page.getByRole('button', { name: 'Login' }).click();
```

**Reason:** Brief explanation.
```

> **Surgical Changes (Karpathy Rule #3):** Refactor examples only fix the specific issue. If other problems are spotted outside scope → log them in the issues table, do not auto-fix.

---

## Definition of Done

Workflow is complete when output contains all of the following:

- [ ] List of files reviewed
- [ ] Issues table (may be empty if code is clean — output the empty table with a note: "No issues found. Code meets standards.")
- [ ] Overall score /10 with per-aspect breakdown
- [ ] Scoring formula applied and shown
- [ ] Top 3 most critical issues (or note "No critical/major issues found")
- [ ] Refactor examples for Critical and Major issues (max 5)
- [ ] All output written in **Vietnamese** (issues, comments, refactor reasons, summary notes)
