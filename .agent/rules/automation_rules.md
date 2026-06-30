# General QA Automation Rules

> Applies to all automation testing tasks, regardless of framework (Playwright, Selenium, Appium).
> Rule conflict priority: `GEMINI.md` > `automation_rules.md` > skill files

## 1. Architecture & Framework

- The Page Object Model (POM) is mandatory.
- Clear separation of concerns:
  - **Page classes:** Declare locators (getter pattern) + UI interaction methods.
  - **Test classes:** Contain test logic + assertions.
  - **Fixtures:** Authentication, shared setup state (Playwright TS).
  - **Test data:** Separated from functional code (JSON, DataProvider, Utils).
- Assertions must only be placed in Test classes, NEVER in Page classes.

## 2. Test Data Generation

- All fields requiring uniqueness (Email, Username, Customer ID, etc.) **must be dynamically generated**, not hardcoded.
- Use `@faker-js/faker` (TypeScript) or Timestamps.
- Data must be **traceable** — looking at the database or logs should instantly identify which test created it.

**Standard Format (synchronized with GEMINI.md):**
```
Email:    [testName]_[timestamp]@auto.test
Username: auto_[testName]_[timestamp]
Code:     TC_[MODULE]_[timestamp]

Example:
  createCustomer_1712049200@auto.test
  auto_createCustomer_1712049200
  TC_LOGIN_1712049200
```

- Supports parallel execution: each test method must have its own independent data, no conflicts.
- JSON fixture test data used for data-driven tests:
  ```typescript
  // test-data/transactions.json → import directly into the spec file
  import testData from '../../test-data/transactions.json';
  ```

## 3. Code Quality

- No duplicate logic — create helper methods for repetitive actions.
- Code must be simple, readable, and maintainable.
- Before delivering code:
  - Remove all `console.log`, `System.out.println`, `print()` generated during debugging.
  - Remove commented-out code (`//`, `/* */`).
  - Remove unused locators, variables, and imports (unused code).

## 4. File & Directory Management

- NEVER delete source files without user confirmation.
- Check the existing folder structure before creating new files — avoid duplicates.
- Place files in the correct directory according to the project architecture:
  ```
  pages/          → Page Object classes
  tests/          → Spec files (.spec.ts)
  fixtures/       → Auth & shared fixtures
  test-data/      → JSON test data files
  utils/          → Helper functions, data generators
  ```

## 5. Naming Conventions

### Java

| Component | Rule | Example |
|---|---|---|
| Page class | PascalCase + `Page` suffix | `LoginPage.java`, `CartPage.java` |
| Test class | PascalCase + `Test` suffix | `LoginTest.java`, `CartTest.java` |
| Test method | Starts with `test` + behavior description | `testLoginWithValidCredentials()` |
| Locator variable | lowerCamelCase + element description suffix | `loginButton`, `usernameInput` |
| Utils class | PascalCase + function description | `DataGenerator.java`, `WaitHelper.java` |

### TypeScript / Playwright

| Component | Rule | Example |
|---|---|---|
| Page class | PascalCase + `Page` suffix | `LoginPage.ts`, `TransactionSearchPage.ts` |
| Test file | kebab-case + `.spec.ts` | `login.spec.ts`, `transaction-search.spec.ts` |
| Test block | `test('behavior description')` | `test('login successfully')` |
| Locator variable | **getter property** (lazy evaluation) | `get submitButton() { return this.page.getByRole(...) }` |
| Fixture | lowerCamelCase + `Fixture` | `authFixture`, `transactionFixture` |
| Utils | PascalCase or kebab-case | `DataGenerator.ts`, `data-generator.ts` |

> ⚠️ **STRICTLY FORBIDDEN: Using field style for locators in Playwright TS**
> ```typescript
> // ❌ Wrong — locator initialized once, can become stale after navigate/reload
> readonly loginButton = this.page.getByRole('button', { name: 'Log in' });
>
> // ✅ Right — getter is lazy, always fresh on invocation
> get loginButton() { return this.page.getByRole('button', { name: 'Log in' }); }
> ```

**Tags convention for test filtering:**
```typescript
test('TC-001 login successfully', { tag: ['@smoke', '@login'] }, async ({ page }) => { ... });
// Standard tags: @smoke | @regression | @sanity | @[module-name]
```

## 6. Assertions

- Every test case **MUST** have at least one assertion at the end.
- Incorporating assertions at critical steps (using `test.step`) is recommended.
- Assertions must clearly state the expected behavior.

```typescript
// Playwright — Web-First Assertions (automatically retries until passing or timeout)
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toBeHidden();
await expect(locator).toHaveText('Success');          // exact match
await expect(locator).toContainText('TRX-001');          // partial match
await expect(locator).toHaveValue('active');             // input value
await expect(locator).toHaveCount(5);                   // number of elements
await expect(page).toHaveURL(/dashboard/);              // URL pattern
await expect(locator).toBeVisible({ timeout: 15_000 }); // custom timeout

// Soft assertions — verify multiple checks without stopping the test
await expect.soft(locator1).toBeVisible();
await expect.soft(locator2).toHaveText('OK');
// Aggregate soft assertion errors at the end of the test
expect(test.info().errors).toHaveLength(0);
```

```java
// Java/TestNG
Assert.assertTrue(dashboardPage.isDisplayed(), "Dashboard must be displayed after logging in");
Assert.assertEquals(actualText, expectedText, "Text must match the expected value");
```

## 7. Test Independence

- Every test case must be independent — never rely on the outcome of another test.
- Clear setup/teardown (`@BeforeMethod/@AfterMethod` or `beforeEach/afterEach`).
- Do not share state between test methods.
- Every test uses a fresh browser context — never reuse sessions between tests:
  ```typescript
  // Reset auth state for a specific test if needed
  test.use({ storageState: { cookies: [], origins: [] } });
  ```
- Only use `test.describe.serial()` when sequential business flows are strictly required — must clearly comment the reason.