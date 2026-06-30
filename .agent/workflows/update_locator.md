---
description: Automatically detect and update broken/outdated locators in a Page class. Supports Playwright.
skills:
  - smart_locator_agent
  - ui_debug_agent
---

# /update_locator — Update Locators in a Page Class

> User provides the Page class to update. AI inspects the real DOM, detects broken/outdated locators, generates stable replacements, and writes them back to the file.

> **MANDATORY:** Before starting, MUST read:
> - `.agent/skills/smart_locator_agent/SKILL.md`
> - `.agent/skills/ui_debug_agent/SKILL.md`
> - `.agent/rules/locator_strategy.md`
> - `.agent/rules/playwright_rules.md`

---

## Required Input from User

| Input | Required | Description |
|-------|----------|-------------|
| Page class file | ✅ | The file whose locators need to be updated |
| Corresponding page URL | ✅ | For AI to navigate and inspect the real DOM |
| Trigger reason | ✅ | `broken` / `ui-changed` / `refactor` |
| Specific locator(s) to fix | ❌ | If the User already knows which locators are failing |
| Login required | ❌ | If the page requires authentication — specify how to log in |

> **Important:** AI MUST NOT read `.env` files or guess credentials under any circumstance.

---

## Execution Steps

### Phase 0: Pre-flight — Inventory & Confirmation

1. **Read the entire Page class file** provided by the User.

2. **List all current locators** into an inventory table:

   **Locator Inventory — [Page Class Name]**

   | # | Locator Name | Current Value | Type | Suspected Fragile? |
   |---|--------------|---------------|------|--------------------|
   | 1 | `btnLogin` | `page.locator('#login')` | CSS ID | No |
   | 2 | `ddlCountry` | `page.locator('.css-1n2xyz')` | Dynamic class | ⚠️ Yes |
   | 3 | `btnSubmit` | `page.locator('//html/body/div[1]/button')` | Absolute XPath | ⚠️ Yes |

3. **Flag locators suspected to be fragile** — look for these patterns:
   - Dynamic CSS class (e.g. `css-1n2xyz`, `sc-bdnxRM`, `_1abc`)
   - Absolute XPath (e.g. `//html/body/div[1]/div[2]/button`)
   - Auto-generated ID (e.g. `ember123`, `react-select-2-input`, `:r1:`)
   - Positional selectors without context (e.g. `nth-child`, `nth-of-type`)

4. **If `trigger = broken`** → prioritize locators related to the currently failing test first.

> **→ STOP HERE. Present the inventory table to the User and wait for confirmation before proceeding to DOM inspection.**

---

### Phase 1: Inspect Real DOM

> ⚠️ **NON-NEGOTIABLE: NEVER GUESS. ALWAYS INSPECT THE REAL DOM.**

5. **Navigate to the target page:**
   ```
   browser_navigate(url=<target_url>)
   ```
   > ⚠️ **Login handling:** If a login page appears after navigation:
   > - DO NOT read `.env` or guess credentials
   > - Ask the User: how to log in (fixture, saved storage state, manual login steps)
   > - After successful login → navigate again to the target URL

6. **Resize viewport (MANDATORY):**
   ```
   browser_resize(width=1920, height=1080)
   ```

7. **Wait for page to stabilize before snapshot (MANDATORY):**
   ```
   browser_wait_for(text=<visible_landmark_text>)
   // or wait via evaluate:
   browser_evaluate(function="() => document.readyState === 'complete'")
   ```
   > ⚠️ **Do NOT snapshot immediately after navigation** — the page may not have finished rendering, especially in CI/CD.

8. **Capture DOM:**
   ```
   browser_snapshot()
   ```

9. **For each locator under inspection:**
   - Find the corresponding element in the DOM snapshot
   - Record **all attributes with values**: `role`, `aria-label`, `aria-labelledby`, `data-testid`, `data-test`, `data-qa`, `id`, `name`, `placeholder`, `type`, `text content`
   - Record **parent context**: dialog? table? sidebar? **iframe?** custom element (shadow DOM)?
   - Determine whether the current locator still matches → **Still valid / Broken / Changed**

10. **If the element is inside a dialog, dropdown, or tooltip:**
    - Trigger the element to open: `browser_click(ref=<trigger>)`
    - Re-capture: `browser_snapshot()`

11. **If the element does not appear in the snapshot at all** → investigate special contexts (Phase 1B below) before concluding the locator is broken.

---

### Phase 1B: Special Contexts

> ⚠️ **MUST identify the rendering context before declaring a locator broken.** The cases below cause locators to silently fail if skipped.

**iframe:**
```typescript
// Playwright — scope into the iframe first
const frame = page.frameLocator('iframe[name="payment-frame"]');
// or: page.frameLocator('iframe[src*="checkout"]')
const element = frame.getByRole('button', { name: 'Pay Now' });
```
> Signal: `browser_snapshot()` does not show the element even though it is visible in the UI → element is inside an iframe.

**Shadow DOM:**
```typescript
// Playwright — automatically pierces shadow root
page.locator('custom-element >> button.submit')
// If explicit pierce is needed:
page.locator('custom-element').locator('button.submit')
```
> Signal: Element in snapshot has a `custom-*` tag or cannot be found in the standard DOM tree.

**Lazy load / Dynamic content:**
```typescript
// Step 1: Scroll to the section containing the element
await page.locator('.content-section').scrollIntoViewIfNeeded();
// Step 2: Wait for network to settle
await page.waitForLoadState('networkidle');
// Step 3: Re-snapshot
await page.waitForSelector('[data-testid="lazy-item"]', { state: 'visible' });
browser_snapshot()
```
> ⚠️ **CI Risk:** Lazy load is 2–5x slower in CI/CD than locally. Do not snapshot immediately after navigation.

**Popup / New tab:**
```typescript
// Playwright — capture the popup BEFORE clicking the trigger
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('button', { name: 'Open' }).click(),
]);
await popup.waitForLoadState();
browser_snapshot() // on the popup context
```

---

### Phase 2: Generate New Locators

12. **For each locator that needs updating, apply the Master Priority Map:**

    | # | Locator API | When to use |
    |---|-------------|-------------|
    | 1 | `getByRole(role, { name })` | **Always preferred** — role + accessible name, most resilient |
    | 2 | `getByTestId()` | Element has `data-testid` / `data-test` / `data-qa` |
    | 3 | `getByLabel()` | Form field with an associated `<label>` |
    | 4 | `getByPlaceholder()` | Input with no label but a clear placeholder |
    | 5 | `getByText()` | Static text content that does not change across locales |
    | 6 | `locator('[attr=val]')` | CSS with stable attributes (id, name, type, data-\*) |
    | 7 | Relative XPath | **Only when no other option exists** |

    > ⚠️ **Note:** The `aria-label` CSS selector (`[aria-label="..."]`) falls under Priority 6, NOT Priority 1. Use `getByRole()` with an accessible name instead.

13. **Generate both Primary and Fallback** for every locator that is updated:

    ```typescript
    // Example: replace dynamic class locator
    // ❌ Old (fragile): page.locator('.css-1n2xyz')
    // ✅ Primary:       page.getByRole('button', { name: 'Login' })
    // 🔄 Fallback:      page.locator('[data-testid="login-btn"]')
    ```

---

### Phase 3: Validate New Locators

14. **Verify uniqueness — MUST match exactly 1 element:**

    **MUST use `locator().count()` — not plain DOM API:**
    ```typescript
    // ✅ CORRECT — works with all Playwright locator types (role, testId, CSS, XPath)
    browser_evaluate(function="async () => {
      return await page.locator('<locator_expression>').count();
    }")
    // CSS-only fallback:
    browser_evaluate(function="() => document.querySelectorAll('<css_selector>').length")
    // ⚠️ Note: DOM API only works with plain CSS selectors — does NOT work with getByRole(), getByText(), etc.
    ```

    **Decision tree when count ≠ 1:**
    ```
    count == 1  → ✅ Unique — proceed to stability check
    count == 0  → Element not yet rendered?
                   → Trigger an action (click, scroll, hover)
                   → Wait for networkidle / waitForSelector
                   → Re-snapshot and inspect
                   → If still == 0: check for iframe / shadow DOM context
                   → If confirmed missing: flag in report as "Element not found — manual review needed"
    count > 1   → Locator is not unique:
                   → Add parent scope: page.locator('.container').getByRole(...)
                   → Add filter: .filter({ hasText: 'specific text' })
                   → Or use .nth(index) with a clearly documented reason
                   → DO NOT use .first() without a written explanation
    ```

15. **Verify stability checklist for each new locator:**
    - [ ] Does not use dynamic CSS class (e.g. `css-1n2xyz`, `sc-bdnxRM`)
    - [ ] Does not use absolute XPath (e.g. `//html/body/div[1]/div[2]/button`)
    - [ ] Does not use auto-generated ID (e.g. `ember123`, `react-select-2-input`, `:r1:`)
    - [ ] Does not use `nth-child` / `nth-of-type` when a better option exists
    - [ ] **Actually reload the page and verify count again** (do not just tick the checkbox)
    - [ ] Stable across multiple page states (loading, loaded, with data, without data)
    - [ ] Fallback locator has been evaluated — must not be more fragile than primary

---

### Phase 4: Report & Apply

16. **Generate the mandatory Update Report BEFORE writing any changes to the file:**

```markdown
## Update Report — [Page Class Name]

### Summary
- Total locators scanned: X
- Needs update: Y
- Kept unchanged: Z
- Could not resolve (manual review needed): W

### Changes
| Locator Name | Old Locator | New Locator | Reason |
|---|---|---|---|
| `btnLogin` | `.css-1n2xyz` | `getByRole('button', { name: 'Login' })` | Dynamic class |
| `btnSubmit` | `//html/body/div[1]/button` | `getByRole('button', { name: 'Submit' })` | Absolute XPath |

### Kept Unchanged
| Locator Name | Reason |
|---|---|
| `inputEmail` | Already uses `getByLabel` — stable |
| `btnCancel` | Uses `data-testid` — no change needed |

### ⚠️ Could Not Resolve
| Locator Name | Issue | Recommendation |
|---|---|---|
| `iconStatus` | Element not found in snapshot — possible iframe or dynamic render | Manual inspection required |

### Fallback Locators
| Locator Name | Primary | Fallback |
|---|---|---|
| `btnLogin` | `getByRole('button', { name: 'Login' })` | `locator('[data-testid="login-btn"]')` |
```

> **→ STOP HERE. Wait for User confirmation before overwriting the file.**

17. **After User confirms** — update the Page class file:
    - Replace only the locator values — do NOT touch method logic
    - Preserve the existing file structure and naming convention
    - Preserve all existing comments
    - Do NOT delete locators without an explicit reason documented in the report

---

## STRICTLY PROHIBITED

| ❌ Do NOT | ✅ Correct Alternative |
|-----------|----------------------|
| Guess new locators without inspecting the DOM | Always run `browser_snapshot()` first |
| Overwrite the file without generating a report | Output Update Report and wait for User confirmation |
| Delete a locator when the element is not found | Flag it in the report as "manual review needed" |
| Change the naming convention of existing locators | Preserve the project's existing convention |
| Modify method logic inside the Page class | Only update the locator expressions |
| Read `.env` to retrieve login credentials | Ask the User how to log in or use an existing fixture |
| Snapshot immediately after navigation | Always wait for page to stabilize first |

---

## Final Checklist

- [ ] All locators in the Page class have been scanned and inventoried
- [ ] Real DOM was inspected — no guessing
- [ ] Special contexts checked (iframe / shadow DOM / lazy load / popup) where applicable
- [ ] New locators follow the correct priority map
- [ ] Each new locator matches exactly 1 element (verified via `locator().count()`)
- [ ] Primary + Fallback provided for every updated locator
- [ ] Update Report generated and User confirmation received
- [ ] File updated while preserving structure, naming convention, and existing comments
