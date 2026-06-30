---
name: qa-automation-engineer
description: Skill to support the agent in QA automation tasks including generating test cases, automation scripts, API tests, locators, analyzing flaky tests, and creating test data.
---

# QA Automation Engineer

## Description

This skill enables the agent to assist with software testing and automation tasks.

The agent can:

- Generate manual test cases from requirements
- Generate test automation scripts from test cases or UI flows
- Generate API tests from Swagger/OpenAPI specifications
- Explore applications and discover test scenarios
- Generate automation frameworks
- Generate test data
- Analyze flaky tests
- Generate stable locators
- Generate requirements from website analysis

This skill is designed for modern QA workflows and automation development.

---

# When to Use

Use this skill when the user asks about:

- Test automation (Playwright / Selenium / Appium)
- Automation frameworks design & scaffolding
- API testing from Swagger/OpenAPI
- UI flow automation
- Test data generation
- Flaky test analysis & fix
- Locator generation / update broken locators
- Requirements analysis from website
- Jira integration (fetch requirements, push test results to Xray)

## When NOT to Use

| Task | Use instead |
|---|---|
| Generate manual test cases | `rbt_manual_testing` skill |
| Inspect DOM / generate locators interactively | `ui_debug_agent` skill |
| Generate stable locators only | `smart_locator_agent` skill |
| Design automation framework from scratch | `framework_architect` skill |
| Only generate test data | `test_data_generator` skill |

---

# Workflow Routing

When the user request matches a specific task, select the appropriate workflow file from `.agent/workflows/`.

### Generate test cases from requirements

> **Delegate:** This task belongs to skill **`rbt_manual_testing`** — not `qa_automation_engineer`.

Use workflow: `generate_testcases_from_requirements` (QUICK mode) or `generate_manual_testcases_rbt` (FULL RBT mode).

Triggers when user asks:

- generate test cases → **delegate to `rbt_manual_testing` (QUICK mode)**
- write manual test cases → **delegate to `rbt_manual_testing` (QUICK mode)**
- test scenarios from requirement → **delegate to `rbt_manual_testing` (QUICK mode)**
- full test cases / 6-step RBT process → **delegate to `rbt_manual_testing` (FULL RBT mode)**

---

### Generate automation from manual test case

Use workflow: `generate_automation_from_testcases`

Triggers when user asks:

- convert test case to automation
- generate Selenium automation
- generate Playwright automation from test case

---

### Generate automation from UI steps

Use workflow: `generate_automation_from_ui_flow`

Triggers when user asks:

- automate this UI flow
- generate automation from steps
- run UI steps and generate Selenium script

---

### Generate API tests

Use workflow: `generate_api_tests_from_swagger`

Triggers when user provides:

- Swagger URL
- OpenAPI specification

---

### Generate test data

Use workflow: `generate_test_data`

Triggers when user asks:

- generate test data
- generate boundary test data

---

### Analyze cross-module feature & generate combinatorial matrix

Use workflow: `generate_cross_module_test_plan`

> Workflow for **complex features spanning multiple sequential modules**. Generates Data Flow Map + multi-dimensional combinatorial matrix (Pairwise / Business-critical / Full Cartesian).

Triggers when user asks:

- analyze cross-module feature
- test multiple linked modules
- generate combinatorial matrix
- test feature with many combined conditions
- analyze multi-module feature
- pairwise testing
- multi-dimensional decision table

---

### Generate combinatorial test data (multi-module pipeline)

Use workflow: `generate_combinatorial_test_data`

> Generates test data for combinatorial matrix. Supports 2 modes: **GENERATE** (offline generation) and **PIPELINE** (run real browser pipeline through N modules).

Triggers when user asks:

- generate data for combinatorial matrix
- create test data for combinatorial matrix
- run pipeline to create data across multiple modules
- generate combinatorial test data
- setup data for cross-module test

---

### Generate regression suite

> **No dedicated workflow.** Use `generate_application_test_plan` (PLAN mode) or `generate_manual_testcases_rbt` (FULL RBT) depending on input.

Triggers when user asks:

- create regression test suite
- generate regression scenarios

---

### Generate automation framework

> **Delegate:** This task uses skill **`framework_architect`** to design the framework.

Use workflow: `generate_automation_framework`

Triggers when user asks:

- create automation framework
- design Selenium framework
- design Playwright framework
- design Appium framework
- scaffold automation project

---

### Explore application and generate test plan

Use workflow: `generate_application_test_plan`

> This workflow has **2 modes**: PLAN (default — test plan only) and FULL (test plan + automation skeleton).
> When user requests "full automation suite" or "bootstrap automation" → automatically select FULL mode.

Triggers when user asks:

- explore application
- discover test scenarios
- generate test plan
- generate full automation suite
- bootstrap automation for project

---

### Analyze flaky tests

Use workflow: `analyze_flaky_tests`

Triggers when user asks:

- why is this test flaky
- analyze unstable automation

---

### Generate stable locators

Use workflow: `generate_locator`

Triggers when user asks:

- generate locator for this element
- find stable selector
- create automation locator

---

### Update broken / outdated locators

Use workflow: `update_locator`

Triggers when user asks:

- fix broken locator
- locator is outdated / no longer works
- update locator after UI change
- element not found — update the selector
- healing locators in Page class

---

### Generate requirements from website

Use workflow: `generate_requirements_from_website`

Triggers when user asks:

- generate requirements from website
- analyze website module and create requirements
- extract user stories from web page

---

### Analyze requirement document

> **Delegate:** This task uses skill **`requirements_analyzer`** to analyze requirement documents.

Use workflow: `analyze_requirement_document`

> Workflow only **analyzes** requirements — does NOT generate test cases. Output is a detailed analysis document including: AC breakdown, dependencies, ambiguities, risks.

Triggers when user asks:

- analyze requirement document
- review requirements / analyze this ticket
- analyze Jira ticket / requirement
- find ambiguities in requirement
- analyze requirement / review requirement document

---

### Fetch requirements from Jira

Use workflow: `fetch_jira_requirements`

Triggers when user asks:

- fetch jira requirements
- get requirements from jira
- get jira ticket
- import user stories from jira

---

### Import test results to Xray

Use workflow: `import_test_results_xray`

Triggers when user asks:

- push test results to xray
- import test results to xray
- import test execution to jira
- upload playwright results to xray

---

# Automation Framework

Default automation stack:

- **Language:** TypeScript
- **UI automation:** Playwright
- **Test runner:** Playwright Test (`npx playwright test`)
- **Design pattern:** Page Object Model (POM) + Strategy + Resolver

## Project-Specific Conventions (OnePay)

> [!IMPORTANT]
> These conventions are **mandatory** for all automation code in this project.

### Path Aliases — MUST use, never use relative paths

| Alias | Maps to | Usage |
|---|---|---|
| `@pages/*` | `lib/pages/*` | Page Object classes (locators + atomic page actions) |
| `@helper/*` | `lib/helpers/*` | Business logic helpers |
| `@fixtures/*` | `lib/fixture/*` | **Always import test from `@fixtures/index`** |
| `@type/*` | `lib/types/*` | TypeScript type definitions |
| `@utils/*` | `lib/utils/*` | Common utilities |
| `@strategies/*` | `lib/strategies/*` | Payment flow strategies |
| `@dataFactory/*` | `lib/dataFactory/*` | Test data factories |

### Key Rules

- **Never use Helpers directly in tests** — always wrap via Custom Fixtures (`lib/fixture/index.ts`)
- **Pages contain locators (getters) + atomic same-page actions** — e.g. `fillSearchForm()`, `clickSearch()` with their waits; NO assertions, NO cross-page business flow (those belong in `lib/helpers/`); locators use getter pattern (`get btnSubmit() { return ... }`)
- **Authentication:** Use `await login("iportal")` or `await login("mp")` fixture — never manually fill login form
- **Environment config:** Always use `ENV()` helper from `lib/env.ts` — NEVER read `.env` files directly
- **storageState:** Login token is stored in `storage/` — reused across tests to avoid redundant logins
- **Navigation (iPortal):** Use `navigateIPortalMenu(page, ...menuPath)` for multi-level menu navigation

---

# Locator Strategy

## Selenium Locator Priority

1. `id`
2. `data-testid`
3. `name`
4. `css selector`
5. `xpath` (last resort)

Avoid fragile locators such as auto-generated class names or positional xpaths.

## Playwright Locator Priority

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByAltText()`
6. `getByTitle()`
7. `getByTestId()`
8. `css selector`
9. `xpath` (last resort)

Avoid fragile selectors such as dynamic class names.

> **Note:** For detailed locator rules, refer to `.agent/rules/locator_strategy.md`.

---

# Rules References

The agent MUST also follow the detailed rules defined in `.agent/rules/`:

- [automation_rules.md](.agent/rules/automation_rules.md) — General automation best practices
- [locator_strategy.md](.agent/rules/locator_strategy.md) — Detailed locator selection rules
- [playwright_rules.md](.agent/rules/playwright_rules.md) — Playwright-specific rules
- [selenium_rules.md](.agent/rules/selenium_rules.md) — Selenium-specific rules
- [appium_rules.md](.agent/rules/appium_rules.md) — Appium mobile automation rules

---

# References

The agent may consult additional documentation in the `references/` folder:

- `PROJECT_CONTEXT.md` — Project domain, tech stack, key modules
- `TEST_STRATEGY.md` — Testing objectives, scope, execution plan
- `PROMPT_TEMPLATES.md` — Reusable prompt templates for common QA tasks

External references:

- `plans/automation/project_architecture/README.md` — Repository structure & project architecture (replaces REPOSITORY_MAP.md)
- `GEMINI.md` > "Cleanup & Delivery" — Quality checklist / Definition of Done (replaces SELF_CHECK.md)

---

# Definition of Done (Inline Summary)

Before considering any automation task complete, verify:

- [ ] **No debug logs** — no `console.log`, no commented-out code, no unused imports
- [ ] **No hardcoded data** — use `dataFactory` with random + traceable values; use `ENV()` for config
- [ ] **No `waitForTimeout`** — use web-first assertions or `waitForResponse` instead
- [ ] **Locators in POM only** — never inline in helpers or test files
- [ ] **Test passes ≥ 2 consecutive times** in headed mode before commit
- [ ] **Each test is independent** — no dependency on execution order or shared state

> Full checklist: `GEMINI.md` > "Definition of Done"

---

# Output

Depending on the request, the agent may return:

- Manual test cases (structured format)
- Automation scripts (Java/TypeScript)
- API tests (REST Assured)
- Locator recommendations
- Test data (structured, randomized, traceable)
- Automation framework design
- Requirements documents

Automation outputs should include:

- Page Object classes
- Test classes
- Assertions validating expected behavior
- Clean, readable, maintainable code (no debug logs, no commented code)