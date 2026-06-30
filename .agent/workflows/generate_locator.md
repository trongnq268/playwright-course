---
description: Generate stable locators for UI elements. Supports Playwright, Selenium, Appium.
skills:
  - smart_locator_agent
  - ui_debug_agent
---

# /generate_locator — Generate Stable Locators for UI Automation

> User provides the element to locate (description, screenshot, URL, or HTML snippet).
> AI inspects the real DOM/UI hierarchy, generates a stable locator following the standard priority order, verifies uniqueness, and returns the result.

> **MANDATORY:** Before starting, MUST load and read:
> - **Skill:** `.agent/skills/smart_locator_agent/SKILL.md` — Locator generation process
> - **Skill:** `.agent/skills/ui_debug_agent/SKILL.md` — DOM inspection process
> - **Rule:** `.agent/rules/locator_strategy.md` — Locator priority map
> - **Rule:** `.agent/rules/<framework>_rules.md` — Framework-specific rules

---

## Required Input from User

| Input | Required | Description |
|-------|----------|-------------|
| Element description | ✅ | e.g. "Login button", "Country dropdown", "Email input field" |
| Page URL containing the element | ✅ | For AI to navigate and inspect the real DOM |
| Framework | ✅ | `playwright`, `selenium`, or `appium` |
| HTML snippet | ❌ | If the User already has DOM context — AI uses it for quick analysis |
| Target Page class | ❌ | Page class file where the locator will be added |
| Login required | ❌ | If the page requires authentication — User specifies how to log in |

> **Login Note:** If the page requires authentication, the User MUST specify how to log in (fixture, script, login URL, etc.). AI MUST NOT read `.env` files or guess credentials.

---

## Execution Steps

### Phase 1: Requirement Analysis

1. **Understand the target element** — Identify clearly:
   - **Element type:** button, input, link, dropdown, dialog, table row, checkbox, radio...
   - **Context:** Is it in the main page, dialog/modal, sidebar, table, or iframe?
   - **Action:** click, fill, select, hover, verify text, verify visibility?

2. **Identify the framework and read the corresponding rules:**

   | Framework | Rule file |
   |-----------|-----------|
   | Playwright | `.agent/rules/playwright_rules.md` |
   | Selenium | `.agent/rules/selenium_rules.md` |
   | Appium | `.agent/rules/appium_rules.md` |

3. **Check the existing Page class (if specified by User):**
   - Read the Page class file → identify already-defined locators
   - Avoid duplicates or naming conflicts

---

### Phase 2: Inspect Real DOM / UI Hierarchy

> ⚠️ **NON-NEGOTIABLE RULE: NEVER GUESS A LOCATOR. ALWAYS INSPECT THE REAL DOM.**

#### 2A. Web (Playwright MCP)

4. **Navigate to the page containing the element:**
   ```
   browser_navigate(url=<target_url>)
   ```
   > ⚠️ **Login handling:** If a login page appears after navigation:
   > - DO NOT read `.env` or guess credentials
   > - Ask the User: how to log in (fixture, saved storage state, manual login steps)
   > - After successful login → navigate again to the target URL

5. **Resize viewport (MANDATORY):**
   ```
   browser_resize(width=1920, height=1080)
   ```

6. **Wait for page to stabilize before snapshot (MANDATORY):**
   ```
   browser_wait_for(text=<visible_landmark_text>)
   // or wait for network idle via evaluate:
   browser_evaluate(function="() => document.readyState === 'complete'")
   ```
   > ⚠️ **Do NOT snapshot immediately after navigation** — the page may not have finished rendering, especially in CI/CD.

7. **Capture DOM:**
   ```
   browser_snapshot()
   ```

8. **Analyze the element in the snapshot:**
   - Find the element ref in the DOM tree
   - Record **all attributes with values**: `role`, `aria-label`, `aria-labelledby`, `data-testid`, `data-test`, `data-qa`, `id`, `name`, `placeholder`, `type`, `href`, text content
   - Record **parent context**: dialog? table? sidebar? **iframe?** custom element (shadow DOM)?
   - **If the element does not appear in the snapshot** → consider Phase 2C (iframe / shadow DOM / lazy load)

9. **If element is hidden** (dropdown menu, modal, tooltip...):
   - Trigger the element to open: `browser_click(ref=<trigger>)`
   - Capture again: `browser_snapshot()`

#### 2B. Mobile (Appium)

4. **Use Appium Inspector** or get page source:
   ```java
   String pageSource = driver.getPageSource();
   ```
5. **Record attributes:** `accessibility-id`, `resource-id`, `content-desc`, `text`, `class`, `bounds`
6. **If the element is inside a scroll view** → scroll to the element before inspecting:
   ```java
   // Android — scroll to element
   new TouchAction(driver).scroll(element, direction).perform();
   // Then get page source again
   ```
7. **If the element is not found** → check whether it is on a different screen or tab

---

#### 2C. Special Contexts (Web)

> ⚠️ **MUST identify the context before inspecting.** Skipping any of the cases below will cause the locator to fail completely.

**iframe:**
```typescript
// Playwright — scope into the iframe first, DO NOT locate directly from page
const frame = page.frameLocator('iframe[name="payment-frame"]');
// or: page.frameLocator('iframe[src*="checkout"]')
const element = frame.getByRole('button', { name: 'Pay Now' });
```
> Signal: `browser_snapshot()` does not show the element even though it is visible in the UI → element is inside an iframe.

**Shadow DOM:**
```typescript
// Playwright — automatically pierces shadow root (pierce by default)
page.locator('custom-element >> button.submit')
// If explicit pierce is needed:
page.locator('custom-element').locator('button.submit')
```
```java
// Selenium — requires JS executor
WebElement shadowHost = driver.findElement(By.cssSelector("custom-element"));
WebElement shadowRoot = (WebElement) ((JavascriptExecutor) driver)
    .executeScript("return arguments[0].shadowRoot", shadowHost);
WebElement button = shadowRoot.findElement(By.cssSelector("button.submit"));
```
> Signal: Element in snapshot has a `custom-*` tag, or cannot be found in the standard DOM tree.

**Lazy load / Dynamic content:**
```typescript
// Step 1: Scroll to the section containing the element
await page.locator('.content-section').scrollIntoViewIfNeeded();
// Step 2: Wait for network to settle
await page.waitForLoadState('networkidle');
// Step 3: Re-snapshot (DO NOT use a snapshot taken before scrolling)
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
// Inspect the popup
browser_snapshot() // on the popup context
```

---

### Phase 3: Generate Locator by Priority

10. **Apply the Master Priority Map:**

    **Playwright (Web):**

    | # | Locator API | When to use |
    |---|-------------|-------------|
    | 1 | `getByRole(role, { name })` | **Always preferred** — role + accessible name, most resilient |
    | 2 | `getByTestId()` | Element has `data-testid` / `data-test` / `data-qa` |
    | 3 | `getByLabel()` | Form field with an associated `<label>` |
    | 4 | `getByPlaceholder()` | Input with no label but a clear placeholder |
    | 5 | `getByText()` | Static text content that does not change across locales |
    | 6 | `locator('[attr=val]')` | CSS with stable attributes (id, name, type, data-\*) |
    | 7 | Relative XPath | **Only when no other option exists** |

    > ⚠️ **Note:** Priority 1–5 are **Playwright semantic locators** — always take absolute precedence. The `aria-label` CSS selector (`[aria-label="..."]`) falls under Priority 6, NOT Priority 1.

    **Selenium (Web):**

    | # | Strategy | When to use |
    |---|----------|-------------|
    | 1 | `By.id()` | Stable `id`, not auto-generated |
    | 2 | `By.cssSelector('[data-testid]')` | Element has a test attribute |
    | 3 | `By.name()` | Form field with a stable `name` |
    | 4 | `By.cssSelector()` | CSS with a specific attribute |
    | 5 | `By.xpath()` | **Only when no other option exists** |

    **Appium (Mobile):**

    | # | Strategy | When to use |
    |---|----------|-------------|
    | 1 | `accessibility-id` | `accessibility-id` / `content-desc` is available |
    | 2 | `resource-id` (Android) | Stable `resource-id` (not obfuscated) |
    | 3 | iOS Predicate String | iOS — match by `label`, `name`, `value` |
    | 4 | iOS Class Chain | iOS — when hierarchy traversal is needed |
    | 5 | XPath | **Only when no other option exists** |

11. **Generate the locator for the framework:**

    **Playwright (TypeScript/JavaScript):**
    ```typescript
    // Priority 1: Role-based
    page.getByRole('button', { name: 'Submit' })

    // Priority 2: Test ID
    page.getByTestId('submit-btn')

    // Priority 3: Label / Placeholder
    page.getByLabel('Email')
    page.getByPlaceholder('Enter your password')

    // Priority 4: Text
    page.getByText('Submit')

    // Priority 5: CSS
    page.locator('#submit-button')
    page.locator('[data-testid="submit-btn"]')

    // Priority 6: XPath (last resort)
    page.locator('//button[@type="submit"]')
    ```

    **Playwright (Python):**
    ```python
    # Priority 1: Role-based
    page.get_by_role("button", name="Submit")

    # Priority 2: Test ID
    page.get_by_test_id("submit-btn")

    # Priority 3: Label / Placeholder
    page.get_by_label("Email")
    page.get_by_placeholder("Enter your password")

    # Priority 4: Text
    page.get_by_text("Submit")

    # Priority 5: CSS
    page.locator("#submit-button")

    # Priority 6: XPath (last resort)
    page.locator("//button[@type='submit']")
    ```

    **Selenium (Java):**
    ```java
    // Priority 1: ID
    driver.findElement(By.id("submit-button"));

    // Priority 2: Test attribute
    driver.findElement(By.cssSelector("[data-testid='submit-btn']"));

    // Priority 3: Name
    driver.findElement(By.name("submit"));

    // Priority 4: CSS Selector
    driver.findElement(By.cssSelector("button.btn-primary[type='submit']"));

    // Priority 5: XPath (last resort)
    driver.findElement(By.xpath("//button[@type='submit']"));
    ```

    **Appium (Java):**
    ```java
    // Priority 1: Accessibility ID
    driver.findElement(AppiumBy.accessibilityId("login_button"));

    // Priority 2: Resource ID (Android)
    driver.findElement(AppiumBy.id("com.app:id/login_button"));

    // Priority 3: iOS Predicate
    driver.findElement(AppiumBy.iOSNsPredicateString("label == 'Login'"));

    // Priority 4: Class Chain (iOS)
    driver.findElement(AppiumBy.iOSClassChain("**/XCUIElementTypeButton[`label == 'Login'`]"));

    // Priority 5: XPath (last resort)
    driver.findElement(AppiumBy.xpath("//android.widget.Button[@text='Login']"));
    ```

---

### Phase 4: Validate Locator

> ⚠️ **CI Stability Warning:** Always ensure the page has reached `networkidle` state or the target element is `visible` BEFORE validating. In CI/CD, page load is 2–5x slower than locally — snapshot/count immediately after navigation will produce incorrect results.

12. **Verify uniqueness — MUST match exactly 1 element:**

    **Web (Playwright MCP) — MUST use `locator().count()` instead of DOM API:**
    ```typescript
    // ✅ CORRECT — works with all Playwright locator types (role, testId, CSS, XPath)
    browser_evaluate(function="async () => {
      return await page.locator('<locator_expression>').count();
    }")
    // Or via MCP evaluate (CSS-only fallback):
    browser_evaluate(function="() => document.querySelectorAll('<css_selector>').length")
    // ⚠️ Note: DOM API only works with plain CSS selectors — does NOT work with getByRole(), getByText(), etc.
    ```

    **Decision tree when count ≠ 1:**
    ```
    count == 1  → ✅ Unique — proceed to verify visibility
    count == 0  → Element not yet rendered?
                   → Trigger an action (click, scroll, hover)
                   → Wait for networkidle / waitForSelector
                   → Re-snapshot and inspect
                   → If still == 0: check for iframe / shadow DOM context
    count > 1   → Locator is not unique:
                   → Add parent scope: page.locator('.container').getByRole(...)
                   → Add filter: .filter({ hasText: 'specific text' })
                   → Or use .nth(index) with a clearly documented reason
                   → DO NOT use .first() without a written explanation
    ```

    **Selenium:**
    ```java
    List<WebElement> matches = driver.findElements(By.<strategy>("<locator>"));
    // count == 1 → pass
    // count == 0 → trigger action, wait, retry
    // count > 1  → add parent scope or filter
    assert matches.size() == 1 : "Locator not unique: found " + matches.size() + " elements";
    ```

    **Appium:**
    ```java
    List<WebElement> matches = driver.findElements(AppiumBy.<strategy>("<locator>"));
    assert matches.size() == 1 : "Locator not unique: found " + matches.size() + " elements";
    ```

13. **Verify visibility** — Element must be interactable:
    ```typescript
    // Playwright — check visible + enabled simultaneously
    await expect(page.locator('<locator>')).toBeVisible();
    await expect(page.locator('<locator>')).toBeEnabled(); // if interaction is needed
    ```
    - Not overlaid by another element (sticky header, modal backdrop)
    - Not in state `hidden`, `display:none`, `visibility:hidden`, or `opacity:0`
    - Not outside the viewport → call `.scrollIntoViewIfNeeded()` first

14. **Verify stability — Checklist:**
    - [ ] Does not use dynamic CSS classes (e.g. `css-1n2xyz`, `sc-bdnxRM`)
    - [ ] Does not use absolute XPath (e.g. `//html/body/div[1]/div[2]/button`)
    - [ ] Does not use auto-generated IDs (e.g. `ember123`, `react-select-2-input`, `:r1:`)
    - [ ] Does not use `nth-child` / `nth-of-type` when a better option exists
    - [ ] **Actually reload the page and verify count again** (do not just tick the checkbox)
    - [ ] Stable across multiple page states (loading, loaded, with data, without data)
    - [ ] Fallback locator has been evaluated for stability — must not be more fragile than primary

---

### Phase 5: Return Results

15. **Output Format — MUST provide all 3 sections:**

```markdown
## Locator Result: [Element description]

**Framework:** [Playwright / Selenium / Appium]

### 🎯 Primary Locator (Recommended)
```<language>
// Locator code — copy-paste ready
```
- **Type:** [Role-based / Test ID / CSS / ...]
- **Unique:** ✅ Matches 1 element
- **Stability:** ✅ No dynamic class / absolute xpath used

### 🔄 Fallback Locator
```<language>
// Alternative locator when primary breaks
```
- **Type:** [CSS / XPath / ...]
- **When to use:** When the primary locator breaks due to DOM changes

### 💡 Reasoning
- Explain why this Primary locator was chosen
- Why other candidates were rejected
- Any potential risks (if applicable)

### 📋 Usage Example (if requested by User)
```<language>
// Example of using the locator in test code
```
```

16. **(Optional) If User requests adding to Page class:**
    - Add the locator in the correct location within the Page class
    - Follow the project's naming convention
    - Create a method using the locator if needed

---

## Common Patterns (Reference)

### Scoping a locator inside a Dialog / Modal:
```typescript
// Playwright — scope into the dialog first
const dialog = page.getByRole('dialog');
dialog.getByRole('button', { name: 'Confirm' }).click();
```
```java
// Selenium — scope into the dialog
WebElement dialog = driver.findElement(By.cssSelector("[role='dialog']"));
dialog.findElement(By.cssSelector("button[data-testid='confirm']")).click();
```

### Dynamic text matching:
```typescript
// Playwright — exact vs partial
page.getByText('Submit', { exact: true })     // exact match
page.getByText(/submit/i)                      // regex, case-insensitive
```
```python
# Playwright Python — normalize-space XPath
page.locator(f"//a[normalize-space()='{text}']")
```

### Table row action:
```typescript
// Playwright — filter the row, then interact
const row = page.getByRole('row').filter({ hasText: 'John Doe' });
row.getByRole('button', { name: 'Edit' }).click();
```
```java
// Selenium — relative XPath inside a table
driver.findElement(By.xpath("//tr[contains(., 'John Doe')]//button[text()='Edit']"));
```

---

## STRICTLY PROHIBITED

| ❌ Do NOT | ✅ Correct Alternative |
|-----------|----------------------|
| Guess a locator without inspecting the DOM/UI | Run `browser_snapshot()` or use Appium Inspector first |
| Use dynamic CSS classes (`css-1n2xyz`, `sc-xxx`) | Use role, aria, data-testid, or text |
| Use absolute XPath (`//html/body/div[1]...`) | Use relative XPath with stable attributes |
| Use auto-generated IDs (`ember123`, `:r1:`) | Use stable attributes or text content |
| Return a locator without verifying uniqueness | Always verify it matches exactly 1 element |
| Return only 1 locator with no fallback | Return Primary + Fallback + Reasoning |
| Read `.env` to retrieve login credentials | Ask the User how to log in or use an existing fixture |

---

## Final Checklist

- [ ] DOM/UI hierarchy was inspected in real browser (no guessing)
- [ ] Locator follows the correct priority: role > test-id > label/placeholder > text > css > xpath
- [ ] Primary locator matches exactly 1 element
- [ ] Fallback locator is provided
- [ ] Reasoning section explains the selection rationale
- [ ] No dynamic class, absolute xpath, or auto-generated ID used
- [ ] Locator is stable across page reloads and multiple page states
- [ ] (If added to Page class) Verified that the code runs without errors