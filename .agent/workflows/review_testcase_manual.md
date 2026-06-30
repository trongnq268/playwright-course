---
description: Review a manually generated test case suite against its requirements — evaluate 9 dimensions: Coverage level, Requirement traceability, Missing scenarios, Business rule coverage, Edge/Negative case coverage, Security coverage, Data coverage, Flow completeness, Automation readiness. Outputs a deep-analysis report in Vietnamese.
version: 1.1.0
skills:
  - rbt_manual_testing
  - requirements_analyzer
  - qa_automation_engineer
roles:
  - Senior QA Test Architect
  - Requirement Coverage Reviewer
output_language: vi
---

> **MANDATORY SKILL:** Read `.agent/skills/rbt_manual_testing/SKILL.md` and `.agent/skills/requirements_analyzer/SKILL.md` before starting. The agent must act as a **Senior QA Test Architect + Requirement Coverage Reviewer** — NOT a test case generator.

# Workflow: /review_testcase_manual

> **Slash command:** `/review_testcase_manual`
> **Description:** Review a manually generated test case suite against its requirements — evaluating 9 dimensions: Coverage level, Requirement traceability, Missing scenarios, Business rule coverage, Edge/Negative case coverage, Security coverage, Validation coverage, Error handling coverage, Automation readiness.
> **Referenced skills:** `rbt_manual_testing`, `requirements_analyzer`, `qa_automation_engineer`
> **Referenced rules:** `automation_rules.md`

---

## Usage

```
/review_testcase_manual requirement=<path_or_content> testcases=<path_or_content>
```

**Examples:**

```
# Both are file paths
/review_testcase_manual requirement=docs/AR-01.md testcases=testcaseManual/AR/ar_testcases.md

# Inline content (paste directly)
/review_testcase_manual requirement="""<requirement content>""" testcases="""<test case content>"""

# Mixed: one file path, one pasted inline
/review_testcase_manual requirement=docs/feature-spec.md testcases="""<paste test cases here>"""
```

> ⚠️ **Both `requirement` and `testcases` are required.** If either is missing → ask immediately, do NOT guess.

---

## Input Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `requirement` | ✅ Yes | Requirements content or file path (PDF, MD, TXT) | `docs/AR-01.md` |
| `testcases` | ✅ Yes | Test case content or file path (MD, XLSX, TXT) | `testcaseManual/AR/tc.md` |
| `depth` | No | `quick` — Executive Summary + top gaps only \| `full` — all 9 dimensions | Default: `full` |
| `focus` | No | Specify priority dimensions | `business_rules,edge_cases` |

---

## Execution Path by Depth

> **[FIX I-09]** Clear execution paths per depth to prevent AI from running full analysis when `quick` is selected.

| Depth | Steps to Execute | Output |
|-------|-----------------|--------|
| `quick` | Step 0 → 1 → 3 → 10 | Executive Summary + Coverage Matrix only |
| `full` | Step 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 | Full report |

---

## Execution Principles (MANDATORY)

- **NO generic findings.** Every finding must cite a specific requirement section or test case ID.
- **NO flattery.** Prioritize finding gaps over praising coverage.
- **NO surface-level descriptions.** Identify the root cause of each problem.
- **Infer hidden business risks** from requirements when necessary.
- **Think at enterprise scale** — consider concurrency, state, permissions, retry, settlement.
- **All output must be in Vietnamese (Tiếng Việt).**

---

## Workflow Steps

---

### Step 0 — Pre-flight: Validate Input (MANDATORY)

> [!IMPORTANT]
> **This is a prerequisite gate.** DO NOT begin review if Pre-flight has not PASSED.

**0.1 — Input Validation:**

- [ ] Confirm `requirement` has been provided — if missing → ask immediately
- [ ] Confirm `testcases` has been provided — if missing → ask immediately
- [ ] If file path → read with `view_file`, verify file exists
- [ ] Confirm `depth` — default to `full`

**0.2 — Content Scan:**

> **[FIX I-05]** Large file fallback: if a file exceeds 500 lines, read only the first 100 and last 100 lines and note "Partial scan — file exceeds 500 lines." For XLSX files: request the user to provide a plain-text or Markdown version before proceeding.

Quickly read both inputs to identify:
- Requirement type: URD / User Story / BRD / UI Spec / API Spec
- Test case format: Markdown table / Excel-style / Prose / BDD
- Estimated number of requirements
- Total number of existing test cases

**Pre-flight Output:**
```
[PRE-FLIGHT PASSED]
- Requirement type: [type]
- Testcase format: [format]
- Estimated requirements: [N]
- Existing test cases: [M]
- Depth: [quick/full]
- File scan note: [Full scan / Partial scan — reason]
→ Proceeding to Step 1
```

---

### Step 1 — Requirement Analysis

> **Goal:** Fully understand all requirements BEFORE looking at test cases. This becomes the baseline for coverage evaluation.

Extract and analyze:

**1.1 — Functional Requirements:**
- List each main function with REQ ID (REQ-F-01, REQ-F-02...)
- Classify as: Create / Read / Update / Delete / Search / Filter / Export / Import / Validate

**1.2 — Business Rules:**
- List all business rules (BR-01, BR-02...)
- Include: calculation conditions, limits, business constraints, permission rules

**1.3 — User Flows:**
- Primary Happy Path
- Alternate Paths (logic branches)
- Exception Paths (where errors occur and how they are handled)

**1.4 — Validation Rules:**
- Input constraints (min/max length, format, required/optional)
- Field-level validation
- Cross-field validation (interdependent conditions)

**1.5 — State Transitions:**
- Entity states (if applicable)
- Transition conditions
- Valid actions at each state

**1.6 — Permission Logic:**
- Role-based access control
- Feature-level permissions
- Data-level permissions (who can see what)

**1.7 — Error Handling Expectations:**
- System-defined errors
- Expected error messages
- Recovery behavior

**1.8 — Non-functional Requirements (if any):**
- Performance thresholds
- Security requirements
- Concurrency constraints

**Step 1 Output:**
```markdown
## Requirement Breakdown

### Functional Requirements
| REQ ID | Description | Type | Risk Level |
|--------|-------------|------|------------|
| REQ-F-01 | ... | Create | High |

### Business Rules
| BR ID | Description | Related REQ |
|-------|-------------|-------------|
| BR-01 | ... | REQ-F-02 |

### User Flows
- Happy Path: [short description]
- Alternate Path 1: [description]
- Exception Path 1: [description]

### Validation Rules Summary
[Short list]

### State Transition Map
[If applicable]

### Permission Matrix
[If applicable]
```

---

### Step 2 — Testcase Inventory

> **Goal:** Understand the structure and scope of the existing test suite — BEFORE evaluating it.

**2.1 — Inventory Summary:**
- Total number of TCs
- Breakdown by type: Positive / Negative / Boundary / Edge
- Breakdown by module/feature
- Breakdown by priority: Critical / High / Medium / Low

> **[FIX I-10]** Security and Performance TCs are not reviewed in this workflow. If they are present in the test suite, note them in inventory but exclude from coverage scoring.

**2.2 — Test Suite Structure:**
- Existing suites/groups
- Is naming convention consistent?
- Current coverage pattern (skewed positive or negative?)

**2.3 — Test Data Assessment:**
- Specific data or placeholder?
- Unique/traceable or hardcoded repeated values?
- Are boundary values used?

**Step 2 Output:**
```markdown
## Testcase Inventory

| Metric | Count |
|--------|-------|
| Total TCs | [N] |
| Positive TCs | [X] ([X]%) |
| Negative TCs | [X] ([X]%) |
| Boundary TCs | [X] ([X]%) |
| Edge Case TCs | [X] ([X]%) |

### Distribution by Module
| Module | TC Count | Positive | Negative | Boundary |
|--------|----------|----------|----------|----------|
| [Module] | [N] | [X] | [X] | [X] |
```

---

### Step 3 — Coverage Matrix

> **Goal:** Map each requirement → test cases that cover it. Identify gaps precisely.

**3.1 — Requirement Traceability Matrix:**
For each REQ ID from Step 1:
- List TCs covering that requirement
- Assess coverage level: Full / Partial / Missing / Weak

**3.2 — Coverage Scoring:**

> **[FIX I-01]** For all "Expected" denominators: derive from Step 1 analysis (count flows from 1.3, validation rules from 1.4, etc.). If requirements are not clear enough to count reliably → write "N/A (requirement insufficient)" instead of estimating.

Calculate:
- **Requirement Coverage %** = (REQs with ≥1 TC) / (Total REQs) × 100
- **Business Flow Coverage %** = (Flows tested) / (Total flows identified in Step 1.3) × 100
- **Positive Flow Coverage %** = Positive TCs / Expected Positive flows (Step 1.3) × 100 — or N/A
- **Negative Flow Coverage %** = Negative TCs / Expected Negative scenarios (Step 1.4 + 1.7) × 100 — or N/A
- **Edge Case Coverage %** = Edge TCs / Expected Edge scenarios (Step 1.3 exception paths) × 100 — or N/A
- **Validation Coverage %** = Validation rules tested / Total validation rules (Step 1.4) × 100
- **Error Handling Coverage %** = Error scenarios tested / Total error scenarios (Step 1.7) × 100
- **Boundary Coverage %** = Boundary TCs / Expected Boundary values × 100 — or N/A
- **Security Coverage %** = Security scenarios tested / Expected security scenarios (Step 1.6) × 100

**3.3 — Duplicate Detection:**
- Do any TCs have identical steps and expected results?
- Do any TCs have different names but test the same condition?

**Step 3 Output:**
```markdown
## Coverage Matrix

### Requirement Traceability Matrix
| REQ ID | Description | TCs Covering | Coverage Status | Notes |
|--------|-------------|--------------|-----------------|-------|
| REQ-F-01 | ... | TC-001, TC-002 | Full | |
| REQ-F-02 | ... | TC-003 | Partial | Missing negative case |
| REQ-F-03 | ... | — | Missing | No TC exists |

### Coverage Scores
| Dimension | Score | Notes |
|-----------|-------|-------|
| Requirement Coverage | [X]% | |
| Business Flow Coverage | [X]% | |
| Positive Flow Coverage | [X]% or N/A | |
| Negative Flow Coverage | [X]% or N/A | |
| Edge Case Coverage | [X]% or N/A | |
| Validation Coverage | [X]% | |
| Error Handling Coverage | [X]% | |
| Boundary Coverage | [X]% or N/A | |
| Security Coverage | [X]% or N/A | |

### Duplicate TCs Detected
[List duplicate TC pairs if any]
```

---

### Step 4 — Missing Scenario Detection

> **Goal:** Identify what has NOT been tested — this is the core value of this workflow.

Systematically check each category:

**4.1 — Missing Negative Cases:**
- Wrong format/type input
- Input exceeding max length/value
- Input below min length/value
- Null/empty input for required fields
- Special characters (SQL injection, XSS, script tags)
- Duplicate input where uniqueness is required

**4.2 — Missing Edge Cases:**
- Boundary values (min-1, min, min+1, max-1, max, max+1)
- Empty list / Zero results
- Single item list
- Very large dataset
- Concurrent operations (2 users operating simultaneously)
- Race conditions (submit twice in quick succession)

**4.3 — Missing Permission Cases:**
- Accessing a feature without the required role
- Accessing another user's data
- Lower role performing a higher-role action
- Expired token / session timeout

**4.4 — Missing State Transition Cases:**
- Performing an invalid action at the current state
- Skipping a step in an ordered process
- Going back to a previous step in a process

**4.5 — Missing Error Handling Cases:**
- Network timeout
- Server error (5xx)
- Concurrent update conflict (optimistic locking)
- File upload exceeds size limit / wrong format
- Third-party service unavailable

**4.6 — Missing Validation Cases:**
- Cross-field validation not tested
- Conditional required fields
- Format validation (date, phone, email, code format)

**4.7 — Missing Data Coverage Cases:**
- Unicode / multi-byte characters
- Leading/trailing whitespace
- HTML/script tags in text input
- Negative numbers, decimals, zero
- Special dates (29 Feb, holidays, end of month)

**4.8 — Missing Recovery Cases:**
- Retry after failure
- Partial submission recovery
- Undo/rollback behavior

**4.9 — Missing Security Cases:**

> **[FIX I-03]** Security gaps beyond input injection — targeting business-logic-level vulnerabilities.

- **IDOR (Insecure Direct Object Reference):** Accessing another user's resource by manipulating IDs in URL or request body
- **Mass assignment:** Sending extra unauthorized fields via API payload
- **Privilege escalation:** A lower-role user calling a higher-role API endpoint
- **Sensitive data exposure:** Token, password, or PII appearing in URL, response body, or logs
- **Auth bypass:** Accessing protected resources without a valid session/token

**4.10 — Missing Integration Cases:**

> **[FIX I-11]** Integration gaps not covered by individual unit-level scenarios.

- API response schema validation (unexpected fields, missing fields)
- HTTP status code mapping (does the UI handle 4xx/5xx correctly?)
- Third-party service slow response (degraded mode behavior)
- Partial success response handling

**Step 4 Output:**
```markdown
## Missing Test Scenarios

### Negative Cases Missing
| # | Gap Description | Related Requirement | Risk Level |
|---|-----------------|---------------------|------------|
| MN-01 | ... | REQ-F-01 | High |

### Edge Cases Missing
| # | Gap Description | Related Requirement | Risk Level |
|---|-----------------|---------------------|------------|
| ME-01 | ... | REQ-F-02 | Medium |

### Security Cases Missing
| # | Gap Description | Related Requirement | Risk Level |
|---|-----------------|---------------------|------------|
| MS-01 | ... | REQ-F-05 | High |

### Integration Cases Missing
| # | Gap Description | Related Requirement | Risk Level |
|---|-----------------|---------------------|------------|
| MI-01 | ... | REQ-F-03 | Medium |

[Repeat table format for remaining categories: Permission, State Transition, Error Handling, Validation, Data Coverage, Recovery]
```

---

### Step 5 — Weak Testcase Analysis

> **Goal:** For existing TCs, evaluate quality — TCs may exist but be too weak to detect bugs.

**5.1 — Weak Assertion Detection:**
- Expected result is too vague ("Success", "Displayed correctly", "Works normally")
- Does not verify specific values
- Does not verify state after action
- Does not verify side effects (DB update, notification, audit log)

**5.2 — Missing Validation Checks:**
- TC only verifies UI response but not data persistence
- TC does not verify specific error message text
- TC does not verify disabled/enabled state of elements
- TC does not verify permission enforcement

**5.3 — Incomplete Step Coverage:**
- Steps skip important pre-conditions
- Steps do not clean up after execution (test pollution)
- Steps lack verification at intermediate states

**5.4 — Test Data Issues:**
- Placeholder data ("abc", "123", "test@test.com")
- Unrealistic data
- Insufficient boundary values
- Does not cover format variations

**Step 5 Output:**
```markdown
## Weak or Incomplete Testcases

| TC ID | Issue | Type | Severity | Suggested Improvement |
|-------|-------|------|----------|-----------------------|
| TC-001 | Expected result too vague: "Displays successfully" | Weak Assertion | High | Verify specific values: amount=[X], status=[Y] |
```

---

### Step 6 — Hidden Business Logic Analysis

> **Goal:** Find hidden business rules — what the requirement implies but does not state explicitly.

**6.1 — Implicit Business Rules:**
For each requirement, ask:
- "What happens when [boundary condition] occurs?"
- "What data integrity rule does this requirement imply?"
- "Does this rule conflict with another requirement?"
- "What is the behavior when data is missing?"

> **[FIX I-08]** Domain-specific hidden rule hints — apply the relevant checklist based on the system being tested:

**Payment Systems:**
- Double-charge prevention when submitting twice
- Partial refund behavior (is it allowed? how is it calculated?)
- Currency mismatch between request and account
- Settlement timing vs. real-time balance display
- Reversal/void window (time limit after which reversal is not possible)

**Authentication / Access Control Systems:**
- Concurrent session behavior (can the same account log in from 2 devices?)
- Token reuse after logout (should be invalid)
- Remember-me + 2FA interaction
- Password reset token expiry and single-use enforcement

**Data Management Systems:**
- Soft delete vs. hard delete behavior
- Audit log immutability
- Data archival rules when records reach a threshold

**6.2 — Contradicting Logic:**
- Requirements that contradict each other
- Business rules that may violate each other
- Undefined behavior when multiple conditions are true simultaneously

**6.3 — Missing Acceptance Criteria:**
- Cases where requirements do not define expected results
- Ambiguous terms ("fast", "valid", "eligible")
- Missing fallback behavior

**Step 6 Output:**
```markdown
## Hidden Business Rules Detected

| # | Hidden Rule | Inferred From | Risk If Untested | Suggested TC |
|---|-------------|---------------|-----------------|--------------|
| HBR-01 | ... | REQ-F-02 + REQ-F-05 | High | ... |

## Contradicting/Ambiguous Requirements

| # | Requirement A | Requirement B | Conflict | Suggested Clarification |
|---|---------------|---------------|----------|------------------------|
| C-01 | REQ-F-01: ... | REQ-F-04: ... | ... | ... |
```

---

### Step 7 — Automation Readiness Review

> **Goal:** Assess whether the test suite is ready to be automated, and identify flaky test risks.

**7.1 — Stability Analysis:**
- Is the TC deterministic? (produces the same result every run?)
- Does the TC depend on state from another TC?
- Does the TC have timing-sensitive steps?

**7.2 — Assertion Quality for Automation:**
- Is the expected result specific enough to assert programmatically?
- Does the TC require visual comparison (hard to automate)?
- Does the TC require human judgment?

**7.3 — Test Data Strategy:**
- Can test data be generated programmatically?
- Does the TC depend on static test data (conflict risk in parallel runs)?
- Does the TC require data setup/teardown?

**7.4 — Environment Dependency:**
- Does the TC depend on external services?
- Is stubbing/mocking feasible?
- Does the TC require specific permission setup?

**7.5 — Flaky Test Risk:**
- Which steps could cause flakiness? (timing, animation, async)
- Are locator hints present in the TC?
- Does the TC have clear wait conditions?

**7.6 — Parallel Execution Safety:**

> **[FIX I-04]** Parallel execution conflicts are the #1 source of flaky tests in CI/CD.

- Does the TC modify shared state (same record, same user account, same sequence number)?
- Is test data isolated per TC, or shared across multiple TCs?
- Does the TC leave side effects that could corrupt other TCs when run concurrently?
- Verdict: 🟢 Safe to parallelize / 🟡 Risk (needs isolated data) / 🔴 Must run sequentially

**7.7 — Automation Priority Matrix:**
Classify TCs:
- 🟢 **Auto-ready:** Can be automated immediately
- 🟡 **Auto-possible:** Needs additional detail before automating
- 🔴 **Manual-only:** Must remain manual (visual, UX, exploratory)

**Step 7 Output:**
```markdown
## Automation Readiness Review

| TC ID | Stability | Assertion Quality | Data Strategy | Parallel Safety | Flaky Risk | Verdict |
|-------|-----------|-------------------|---------------|-----------------|------------|---------|
| TC-001 | ✅ Stable | ⚠️ Weak | ✅ OK | 🟡 Risk | 🟡 Medium | Auto-possible |

### Automation Readiness Summary
- 🟢 Auto-ready: [X] TCs ([X]%)
- 🟡 Auto-possible: [X] TCs ([X]%)
- 🔴 Manual-only: [X] TCs ([X]%)
- **Automation Readiness Score:** [X]%

### Top Flaky Risk Factors
1. [Risk 1] — [TCs affected]
2. [Risk 2] — [TCs affected]
```

---

### Step 8 — Clarification Questions

> **Goal:** List what needs to be clarified with BA/PO/Dev to complete coverage.

**8.1 — Undefined Behaviors:**
- Cases where the requirement does not define behavior

**8.2 — Dangerous Assumptions:**
- Assumptions the AI is making that could be wrong

**8.3 — Missing Expected Results:**
- Places where expected results are not clearly defined

**8.4 — Business Rules to Confirm:**
- Hidden rules discovered in Step 6 that need BA/PO confirmation

**Step 8 Output:**
```markdown
## Clarification Questions for BA/PO/Dev

| # | Question | Context | Ask Who | Priority |
|---|----------|---------|---------|----------|
| CQ-01 | ... | REQ-F-02 | BA | High |
| CQ-02 | ... | BR-03 | Dev | Medium |
```

---

### Step 9 — Recommended Additional Testcases

> **Goal:** Concretize TCs that need to be added — not just list gaps but propose actual TCs.

> **[FIX I-07] Scope rule:** Only generate full TC details (with steps + expected result) for gaps with risk = 🔴 Critical or 🟡 High. For Medium/Low gaps: only a single summary row in the table is needed. If the total number of gaps exceeds 20: group by category and generate a maximum of 5 representative sample TCs per category.

For each gap found in Steps 4, 5, 6, propose TCs using the format:

```markdown
## Recommended Additional Testcases

### [Category] (e.g.: Negative Cases)

| TC ID | Suite | Title | Summary | Priority | Automation |
|-------|-------|-------|---------|----------|------------|
| REC-N-01 | [Suite name] | [TC title] | [What to test] | High | 🟢 Auto-ready |

**Detail for REC-N-01:**
- **Pre-condition:** [condition]
- **Steps:**
  1. [Action 1]
  2. [Action 2]
- **Expected Result:** [Specific result]
- **Test Data:** [Specific data]
- **Maps to:** REQ-F-XX / BR-XX
```

---

### Step 10 — Final Report Assembly

> **Goal:** Consolidate all findings into a structured, actionable report.

**10.1 — Overall Coverage Score:**

> **[FIX I-02]** Corrected formula: `Overall Score = Σ(Score% × Weight) × 10`
> Example: (85%×0.20) + (70%×0.15) + (60%×0.15) + ... = 0.76 → × 10 = **7.6 / 10**

> **[FIX I-06]** Dimension count synchronized to 9 across the entire workflow.

Calculate weighted score:

| Dimension | Weight | Score |
|-----------|--------|-------|
| Requirement Coverage | 20% | |
| Business Rule Coverage | 15% | |
| Negative Coverage | 15% | |
| Edge Case Coverage | 10% | |
| Validation Coverage | 10% | |
| Error Handling Coverage | 10% | |
| Security Coverage | 10% | |
| Automation Readiness | 5% | |
| Test Data Quality | 5% | |

**Overall Score = Σ(Score% × Weight) × 10**

**10.2 — Risk Assessment:**

| Risk Level | Criteria |
|-----------|----------|
| 🔴 Critical | A primary requirement has no TC; A business rule is untested |
| 🟡 High | Negative cases missing >50%; Edge cases absent; Validation untested |
| 🟢 Medium | TC exists but is weak; Missing boundary values |
| ⚪ Low | Optional improvements, nice-to-have cases |

**Final Report Output:**

```markdown
# Test Coverage Review Report

**Feature:** [Feature name]
**Review Date:** [Date]
**Reviewer:** AI QA Architect
**Depth:** [quick/full]

---

# Executive Summary

| Metric | Value |
|--------|-------|
| **Overall Coverage Score** | [X]/10 |
| **Requirement Coverage** | [X]% |
| **Security Coverage** | [X]% |
| **Automation Readiness** | [X]% |

**Main Gaps:**
1. [Largest gap]
2. [Second largest gap]
3. [Third largest gap]

**Main Risks:**
1. [Highest risk]
2. [Second highest risk]

---

# Requirement Breakdown
[Output from Step 1]

---

# Coverage Matrix
[Output from Step 3 — see tables MN-XX, ME-XX, MS-XX]

---

# Missing Test Scenarios
[Output from Step 4]

---

# Weak or Incomplete Testcases
[Output from Step 5]

---

# Hidden Business Rules Detected
[Output from Step 6]

---

# Edge Cases Missing
[Subset from Step 4 — Edge Cases — table ME-XX]

---

# Negative Cases Missing
[Subset from Step 4 — Negative Cases — table MN-XX]

---

# Security Cases Missing
[Subset from Step 4 — Security Cases — table MS-XX]

---

# Validation Gaps
[Subset from Step 4 — Validation Cases + Step 5]

---

# Automation Readiness Review
[Output from Step 7]

---

# Clarification Questions for BA/PO/Dev
[Output from Step 8]

---

# Recommended Additional Testcases
[Output from Step 9]

---

# Final Verdict

**This test suite [PASSES / FAILS / NEEDS IMPROVEMENT] the coverage standard.**

**Strengths:**
- [Strength 1]
- [Strength 2]

**Most Critical Weaknesses:**
1. 🔴 [Critical issue 1] — [Root cause] — [Required action]
2. 🟡 [High issue 1] — [Root cause] — [Required action]

**Action Required:**
- [ ] Add [N] TCs for missing negative cases
- [ ] Clarify [N] questions with BA/PO before finalizing
- [ ] Strengthen [N] TCs with weak assertions
- [ ] Review [N] hidden business rules with Dev
- [ ] Add [N] security test cases for IDOR / privilege escalation
```

---

## Definition of Done

Workflow is complete when output contains all of the following:

- [ ] Pre-flight PASSED with inventory summary
- [ ] Requirement breakdown with REQ IDs
- [ ] Coverage Matrix with % scores for **9 dimensions**
- [ ] Missing Scenarios: negative / edge / validation / permission / security / integration
- [ ] Weak TC analysis with specific TC IDs
- [ ] Hidden Business Rules list
- [ ] Automation Readiness score + per-TC classification (including parallel safety)
- [ ] Clarification Questions with named recipient (BA/PO/Dev)
- [ ] Recommended TCs with steps for Critical/High gaps only
- [ ] Final Verdict with Overall Score /10
- [ ] All output in **Vietnamese (Tiếng Việt)**
- [ ] Every finding cites a specific REQ ID or TC ID

---

## Anti-Patterns (FORBIDDEN)

| ❌ Anti-Pattern | ✅ Instead |
|----------------|-----------|
| "Test cases are fairly complete" | State the exact % and what is missing |
| "Need more negative cases" | "Missing TC for [field X] when input >255 chars, mapping REQ-F-03" |
| Generic gaps ("missing edge cases") | Specific gap ("No TC for concurrent submit when 2 users create the same invoice number simultaneously") |
| Copy the entire requirement | Only quote the section relevant to the finding |
| Guess coverage % without basis | Calculate from countable REQs vs. TCs covering them |
| Praise TCs before finding gaps | Gaps first, strengths last |
| Invent an "Expected" denominator | Use "N/A (requirement insufficient)" when count is not derivable |
