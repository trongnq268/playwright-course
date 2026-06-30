---
description: >
  Analyze requirements, UI flows, and API specs to build a simple Automation Plan.
  PLANNING ONLY — do not generate automation code.
  Supports inputs: BRD/SRS, UI Flow/URL, Swagger/OpenAPI, Manual TCs (all are optional).
version: 3.1.0
skills:
  - qa_automation_engineer
  - requirements_analyzer
  - ui_debug_agent
---

# Workflow: /analyze_and_plan_automation — Analyze & Plan Automation

> **Role:** QA Automation Architect
> **Scope:** Analyze inputs and construct an automation implementation plan (POM, Scenarios, Setup)
> **Output:** Plan file `automation_plan_<feature>.md`. **The file save path is specified by the user when running the workflow** — if not specified, ask before creating the file.

> [!CAUTION]
> ## CRITICAL PRINCIPLE (HIGHEST PRIORITY)
> **This workflow ONLY creates a plan file (`.md`). ABSOLUTELY DO NOT generate Playwright/TypeScript code or Page Objects/Tests.**
> Any code blocks in the artifact should only be used for illustrating pseudocode or directory structure, up to 5 lines maximum.

---

## 📥 Input (All are Optional)

To build the plan, at least **one** of the following information sources must be provided:
1. **Requirement document**: BRD, SRS, User Stories, Acceptance Criteria (AC).
2. **Application URL**: Test app link (e.g., `https://dev36-iportal.opdev.vn`).
3. **API Specification**: Swagger file/link, OpenAPI.
4. **Manual Test Cases**: Existing testcase files (`.xlsx`, `.md`).
5. **Target module**: Name of the module to write tests for (e.g., `iPortal > Payment & Reconciliation`).

---

## ⚙️ Execution Steps

### Step 1: Analyze Input & Define Scope
1. Read the input information provided by the user.
2. **Verify completeness & consistency of inputs (MANDATORY before analysis):**
   - If **no input source is provided** → STOP, ask the user to provide at least one source.
   - If the sources **contradict each other** (e.g., Manual TCs differ from AC in BRD, or actual UI differs from document description) → STOP, list the conflicts, and ask the user to confirm which source has priority. DO NOT choose on your own.
   - If inputs **lack key information** (missing AC, missing business rules) → document them in the Assumptions section and state clearly in the report.
3. Extract:
   - Key business rules (Business Rules) — assign `BR-xx` codes for traceability.
   - Screen Inventory or related APIs.
   - Assumptions if any points remain unclear.

### Step 2: Design Test Scenarios
List the test scenarios with brief text descriptions (no code), divided into groups:
- **Happy Path Scenarios**: Standard successful flows.
- **Negative Scenarios**: Error handling, incorrect data input cases.
- **Boundary Scenarios**: Boundary tests. For the Payment & Reconciliation domain, consider the following boundary types (select those appropriate for the feature):
  - Amount: minimum / maximum / 0 / negative / limit exceeded.
  - Characters: maximum length of text fields, special characters.
  - Date/Time: empty date range, reversed range (From > To), past/future boundaries.
  - Pagination: first page / last page / no data / large record sets.
  - Transaction status & roles/permissions (if the business logic has role authorization).

> **Traceability (MANDATORY):** Each scenario must be traced back to its origin (Business Rule / AC), e.g., `SC-02 ← BR-03 / AC-2`. This ensures test coverage validation.

### Step 3: Plan Automation Design
Define the code structure to be built according to the project standard (POM):
1. **Page Objects (POM)**: List the new Page classes that need to be created (e.g., `ar-search.page.ts`) and the main elements to locate.
   > ⚠️ **During the planning phase, ONLY describe elements semantically** (e.g., "Search button", "Invoice code input form", "Results table"). **ABSOLUTELY DO NOT commit to specific selectors/locators** before inspecting the actual DOM — verification of selectors is deferred to the code generation phase (adhering to the DO NOT GUESS principle).
2. **Helpers / Fixtures**: Action helpers or custom fixtures to reuse or create.
3. **Test Data Strategy**: How to prepare test data (e.g., random email, API setup before running UI, etc.).
4. **Execution Strategy**: Recommended test execution command (e.g., headed/headless run, config file).

---

## 📤 Output Artifact: `automation_plan_<feature>.md`

> Save the file at the path **specified by the user**. Values enclosed in `[...]` in the template below are **placeholders — must be replaced with the actual module values**, do not copy them verbatim.

The generated plan file must follow this simple template:

```markdown
# 📋 Automation Plan: [Feature Name]

## 1. Scope Analysis
- **Core Business Logic**: [Brief description]
- **Related Screens / APIs**:
  - Screen A (URL: /...)
  - API B (POST /api/v1/...)

## 2. Test Scenarios List
> Each scenario traces back to its source (`← BR-xx / AC-x`).
- [ ] **SC-01 (Happy)** ← [BR-xx]: [Description of standard successful flow]
- [ ] **SC-02 (Negative)** ← [BR-xx]: [Description of error input / validation message display]
- [ ] **SC-03 (Boundary)** ← [BR-xx]: [Description of data limit tests]

## 3. Automation Implementation Plan (POM)
- **Page Objects**:
  - Create/Update file `[lib/pages/.../custom.page.ts]`
  - Main elements to locate (semantic description, no specific selectors committed yet): [Search Button, Input Form, Results Table]
- **Helpers & Fixtures**:
  - Use `login("iportal")` fixture for authentication.
  - Write helpers to create invoices via API or use simulator to setup data.
- **Test Data**:
  - Email: `auto_test_<timestamp>@op.vn`
  - Amount: Boundary tests [0, min, max based on business rules].
- **Recommended Test Command** (replace env/path based on actual module):
  - `$env:ENV="[dev36]"; npm run test:headless -- [tests/03.iportal/...]`

---
IMPLEMENTATION STATUS: BLOCKED
Please use `/generate_automation_from_testcases` or `/generate_automation_from_ui_flow` to generate automation code after this plan is approved.
```

---

## ⏸ PLAN APPROVAL CHECKPOINT
Once the plan file `automation_plan_<feature>.md` is created, pause, report back, and wait for **the user** to approve:
> "I have finished creating the test plan for [Feature Name] at [File Path]. Please review the scenarios and POM implementation plan to see if they are correct so I can start writing the code!"
