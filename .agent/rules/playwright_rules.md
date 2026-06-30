# Playwright TypeScript Rules

> Applies to all automation tasks using Playwright TypeScript in this project.
> Rule conflict priority: `GEMINI.md` > `playwright_rules.md` > skill files

## 1. Browser Setup & Config

### playwright.config.ts (Project Standard)

```typescript
export default defineConfig({
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 1,
  use: {
    viewport: null,                            // maximized window is the standard (chromium); edge project: 1920×1080 headless
    launchOptions: { args: ["--start-maximized", "--window-size=1920,1080"] },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },
  reporter: [['html', { open: 'never' }], ['list']],
});
```

### Headed/Headless Rules

- **Debug / Development:** Headed mode (`--headed`) is mandatory.
- **CI/CD:** Headless mode by default.
- **Switch to headless only when:** Tests have passed stably ≥ 2 consecutive times in headed mode.

### Playwright MCP — Mandatory Order

```
1. browser_navigate(url)
2. browser_resize(width=1920, height=1080)   ← MANDATORY, do not skip
3. browser_snapshot()                         ← Start inspecting DOM
```

## 2. Locator Strategy

> **Single Source of Truth:** `.agent/rules/locator_strategy.md`

**Quick reference — priority order:**

```
getByRole → getByLabel → getByPlaceholder → getByText
→ getByAltText → getByTitle → getByTestId → locator(css) → XPath
```

**STRICTLY FORBIDDEN:**

- Guessing locators — always inspect the real DOM before writing code.
- Copying locators from old code without re-verifying them on the real UI.
- Relying on documentation / URL without confirming the element exists.

## 3. Wait Strategy

### STRICTLY FORBIDDEN

```typescript
await page.waitForTimeout(3000);           // hard sleep — forbidden
await new Promise(r => setTimeout(r, N)); // manual delay — forbidden
```

### USE — In Priority Order

```typescript
// 1. Web-First Assertions — highest priority, automatically retries until passing or timeout
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Success');
await expect(locator).toHaveValue('TRX-001');
await expect(page).toHaveURL(/dashboard/);

// 2. waitForResponse — after actions triggering an API call (prevents race conditions)
await Promise.all([
  page.waitForResponse(r => r.url().includes('/api/transactions') && r.status() === 200),
  page.getByRole('button', { name: 'Search' }).click(),
]);

// 3. waitForURL — after navigation
await page.waitForURL('**/transaction/detail/**');

// 4. waitForLoadState — heavy pages or after SPA navigation
await page.waitForLoadState('networkidle');

// 5. Custom timeout — slow-responding pages
await expect(locator).toBeVisible({ timeout: 15_000 });

// ⚠️ The only allowed EXCEPTION for waitForTimeout:
// Animations / transitions when no other event hooks exist.
// MUST clearly comment the reason.
await page.waitForTimeout(500); // Wait for dropdown collapse animation — no hook available
```

## 4. Test Structure

### Standard Test File

```typescript
import { test, expect } from '../../fixtures/auth.fixture';
import { TransactionSearchPage } from '../../pages/TransactionSearchPage';

test.describe('Module: Transaction Search', () => {
  let searchPage: TransactionSearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new TransactionSearchPage(page);
    await page.goto('/transaction/search');
  });

  test('TC-001 successful transaction search by code',
    { tag: ['@smoke', '@transaction'] },
    async ({ page }) => {
      // Arrange
      const txCode = 'TRX-001';

      // Act
      await test.step('Fill search criteria and search', async () => {
        await searchPage.search(txCode);
      });

      // Assert
      await test.step('Verify result displays correctly', async () => {
        await expect(searchPage.getRow(txCode)).toBeVisible();
      });
    }
  );
});
```

### Fixtures — Authentication

```typescript
// fixtures/auth.fixture.ts
import { test as base, Page } from '@playwright/test';

type AuthFixtures = { authenticatedPage: Page };

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_USER!);
    await page.getByLabel('Password').fill(process.env.TEST_PASS!);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('**/dashboard');
    await use(page);
  },
});

export { expect } from '@playwright/test';
```

## 5. Page Object Model (POM)

```typescript
// pages/TransactionSearchPage.ts
import { Page, Locator } from '@playwright/test';

export class TransactionSearchPage {
  constructor(private readonly page: Page) {}

  // Locators — getter pattern (lazy evaluation, do not initialize in constructor)
  get searchInput()  { return this.page.getByPlaceholder('Enter transaction code'); }
  get searchButton() { return this.page.getByRole('button', { name: 'Search' }); }
  get resultTable()  { return this.page.getByRole('table'); }
  get loadingSpinner() { return this.page.getByRole('progressbar'); }

  // Methods — contain actions, DO NOT contain assertions
  async search(transactionCode: string): Promise<void> {
    await this.searchInput.fill(transactionCode);
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/transactions')),
      this.searchButton.click(),
    ]);
    await this.loadingSpinner.waitFor({ state: 'hidden' }); // waitFor = action (OK in POM), expect = assertion (FORBIDDEN in POM)
  }

  getRow(transactionCode: string): Locator {
    return this.resultTable.getByRole('row').filter({ hasText: transactionCode });
  }
}
```

**POM Rules:**

- Assertions **MUST NOT** be placed inside Page classes.
- Locator getter must be a `get` property, not a field initialized in the constructor.
- Methods only perform actions — return `void` or data required for assertion.
- Place files in the correct structure: `pages/ModuleName/PageName.ts`.

## 6. Environment Config

```bash
# .env.dev38
BASE_URL=https://dev38-mp.opdev.vn
TEST_USER=auto_test@onepay.vn
TEST_PASS=<secret — do not hardcode in file>

# .env.dev68
BASE_URL=https://dev68-mp.opdev.vn
TEST_USER=auto_test@onepay.vn
TEST_PASS=<secret>
```

> ⚠️ **MANDATORY: Confirm environment with user before running.**
> DO NOT assume URL. Always ask: dev38, dev68, or prod?

## 7. Running Tests

```bash
# Debug — headed, 1 worker
npx playwright test --headed --workers=1

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep "@smoke and @transaction"

# Run a specific file
npx playwright test transaction-search.spec.ts

# Debug mode — Playwright Inspector
PWDEBUG=1 npx playwright test --headed

# Generate locator helper
npx playwright codegen https://dev38-mp.opdev.vn

# View HTML report
npx playwright show-report
```

## 8. Screenshots & Artifacts on Failure

Configure in `playwright.config.ts` (see Section 1):

- `screenshot: 'only-on-failure'` — capture screenshot when a test fails.
- `video: 'retain-on-failure'` — keep video when a test fails.
- `trace: 'on-first-retry'` — record trace on the first retry.

View trace to debug:

```bash
npx playwright show-trace test-results/trace.zip
```

## 9. Assertion Anti-patterns

### STRICTLY FORBIDDEN — Manual Assertion (no auto-retry)

```typescript
// ❌ WRONG — isVisible() returns immediately, does not wait for element
expect(await page.getByText('Success').isVisible()).toBe(true);

// ❌ WRONG — same issue, no retry mechanism
const isEnabled = await page.getByRole('button').isEnabled();
expect(isEnabled).toBe(true);
```

> **Why:** These assertions do **not retry** — if the element hasn't rendered yet, the test fails immediately, causing flaky tests.

### USE — Web-First Assertion (auto-retries until pass or timeout)

```typescript
// ✅ CORRECT — automatically waits and retries
await expect(page.getByText('Success')).toBeVisible();
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('textbox')).toHaveValue('expected');
await expect(page).toHaveURL(/dashboard/);
```

## 10. Soft Assertions

Use when verifying **multiple conditions** in one test without stopping on the first failure. The test continues and reports **all** failures at the end.

```typescript
// Check multiple result fields — does not stop when one assertion fails
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('amount')).toHaveText('100,000 VND');
await expect.soft(page.getByTestId('order-id')).toContainText('ORD-');

// Test continues after soft assertions above
await page.getByRole('link', { name: 'View Detail' }).click();
```

> **When to use:** Best for **result verification steps** (checking multiple fields at once). Do NOT use for navigation or critical actions — use regular assertions there to fail fast.

