---
description: Generate high-quality manual test cases following the 6-step AI-RBT (Risk-Based Testing) process from requirements.
version: 2.2.0
skills:
  - rbt_manual_testing
  - requirements_analyzer
schema_source: rbt_manual_testing/SKILL.md#step-6-template-mapping
output_schema: "CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type"
output_language: vi
mode: FULL_RBT
---
> **MANDATORY SKILL:** Read `.agent/skills/rbt_manual_testing/SKILL.md` — section **Mode 2: FULL RBT** — before executing any step. The standard output schema (8 columns) is defined there. **Do NOT redefine the schema in this workflow.**

# Workflow: Generate Manual Test Cases via AI-RBT Framework (FULL RBT Mode)

This workflow uses the **FULL RBT Mode** of the `rbt_manual_testing` skill — the **AI-RBT (AI-Driven Risk-Based Testing)** process consisting of 6 sequential steps to generate manual test cases from requirement documents.

> [!NOTE]
> **This flow is for Antigravity (slash command).** The agent follows the general instructions below. The agent does NOT need to read the prompt.txt file.
> If the QA team wants more detailed prompts (ChatGPT/Claude), copy-paste each step from `plans/manual/01-06/prompt.txt`.

---

## ⚠️ Execution Principles

- **Mode:** FULL RBT (6 sequential steps)
- **MUST execute sequentially** step by step — do NOT combine multiple steps
- **MUST stop and wait** for user response at Step 2 (Q&A) and Step 4 (Review Scenarios)
- All output in **English**
- **Override rule:** This workflow is the primary instruction source for the Antigravity agent. If SKILL.md has conflicting instructions (e.g., reading prompt.txt), the workflow takes precedence.
- **Context anchoring:** Before each step (from Step 3 onward), the agent MUST summarize 2-3 bullet points of key context accumulated from previous steps (scope, Q&A decisions, module list) to prevent context drift.
- **Single-row Test Cases (MANDATORY):** Mỗi test case chỉ được ghi trên đúng 1 dòng (1 row duy nhất trong bảng Markdown). Tuyệt đối không chia một test case thành nhiều hàng cho từng bước lẻ. Đối với cột Action hoặc Expected Result có nhiều bước/nội dung, hãy viết gộp lại trên một dòng và sử dụng thẻ `<br>` để phân tách các dòng trong cùng ô đó (ví dụ: `1. Nhập email...<br>2. Click nút gửi`).

---

## Steps

---

### Step 0: PRE-FLIGHT — Initialization & Validation (MANDATORY)

> [!IMPORTANT]
> This is a prerequisite. **Do NOT start Step 1 if Pre-Flight has not PASSED.**

**0.1 — Skill Loading:**

Read `.agent/skills/rbt_manual_testing/SKILL.md` — section **Mode 2: FULL RBT**.

Internal confirmation:

- Output schema consists of 8 columns: `CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type` (Trong đó CRUD để mặc định là New)
- The process consists of 6 sequential steps with 3 human checkpoints (Steps 1, 2, 4)

**0.2 — Input Validation:**

Verify the user has provided the minimum required information:

- [ ] Project name / feature to test
- [ ] At least 1 of: requirements document, user story, business rules description, UI description

**Supported input types:**

- File path: `.md`, `.txt`, `.xlsx`, `.docx` → read directly
- Paste text: copy-paste requirements into chat
- URL: link to Jira/Confluence → use `read_url_content` or ask user to paste content

**If missing** → Ask user immediately, do NOT continue:

> "To start the FULL RBT process, please provide:
>
> 1. Project / feature name
> 2. Requirements document (you can paste text, a link, or describe directly)
>    I will begin once I have sufficient information."

**If sufficient** → Output: `[PRE-FLIGHT PASSED — Starting Step 1]` then continue.

---

### Step 1: Context Initialization (Context & Role-play)

Follow the detailed instructions in the `rbt_manual_testing` skill → **Step 1**.

1. Carefully read the provided requirements document
2. Summarize the test scope in a concise bullet list:
   - Project / feature name
   - Main modules (if identifiable)
   - Testing objectives

**Output Contract:**

```
## Context Confirmation
- Project: [name]
- Scope: [brief description]
- Identified Modules: [list]
- Testing Objectives: [objectives]
```

**→ STOP. Wait for user to confirm scope before proceeding to Step 2.**

---

### Step 2: Requirements Analysis (Analysis & Q&A)

Follow the detailed instructions in the `rbt_manual_testing` skill → **Step 2**.

1. Identify the flows: Happy Path, Alternate Paths, Exception Paths
2. Detect Ambiguities (gaps, contradictions, unclear requirements)
3. Raise numbered Q&A questions (Q1, Q2...) with context + default assumption if left unanswered

**Output Contract:**

```
## Flow Analysis
- Happy Path: [...]
- Alternate Paths: [...]
- Exception Paths: [...]

## Detected Ambiguities
| # | Ambiguous Point | Default Assumption |
|---|---|---|
| A1 | [...] | [...] |

## Q&A Questions
Q1. [Question] (Context: [...] | Assumption if unanswered: [...])
Q2. ...
```

**→ STOP. Wait for user to answer the questions before continuing.**

**After receiving the user's answers:**

Summarize to prevent context drift:

> "Based on your answers, I am updating as follows:
>
> - Q1 → [old assumption] ✗ → [correct understanding] ✓
> - Q2 → Confirmed assumption: [...]
>   I will proceed to Step 3 with this information. Confirm?"

**If user says "use all defaults" or "skip":** Agent logs all selected assumptions, outputs a summary table of assumptions, and continues. Clearly note in the final Ambiguities Log that the user accepted all default assumptions.

> [!IMPORTANT]
> **This is the most critical bottleneck.** If the agent skips this step and guesses the logic, test cases will be seriously incorrect. The agent MUST stop and wait for user feedback.

---

### Step 3: System Decomposition (Decomposition)

Follow the detailed instructions in the `rbt_manual_testing` skill → **Step 3**.

1. Break the feature into Modules / Sub-modules (by UI or by flow)
2. Briefly describe the function of each Module
3. Identify Dependencies between Modules

**Output Contract (REQUIRED before proceeding to Step 4):**

```
## Module Decomposition
| Module | Function | Dependencies |
|---|---|---|
| [Module Name] | [Brief description] | [Dependent module / N/A] |
```

Minimum 2 modules. **Do NOT proceed to Step 4 without this table.**

---

### Step 4: Coverage Assurance (Traceability)

Follow the detailed instructions in the `rbt_manual_testing` skill → **Step 4**.

1. Map each Module → Requirement ID (REQ-01, REQ-02...)
   - **If input requirements have no pre-existing REQ IDs:** Agent generates them following the convention: `REQ-[MODULE_ABBREV]-[SEQUENCE_NUM]` (e.g., `REQ-LOGIN-01`, `REQ-PAY-02`)
2. Cross-check for gaps (Gap Analysis)
3. List High-Level Test Scenarios per Module (Security, UI Validation, Business Logic, Data Integrity, Error Handling)

**Output Contract:**

```
## Traceability Matrix
| Module | REQ ID | Gap? |
|---|---|---|
| [Module] | REQ-01 | N/A |

## High-Level Test Scenarios
### [Module 1]
- SC-01: [Scenario]
- SC-02: [Scenario]
```

**→ STOP. Wait for user to review the scenario list before proceeding to Step 5.**

> [!WARNING]
> **Human Checkpoint:** The user must review the scenario list to add edge cases that AI may have missed. This is a human-driven risk assessment step.

---

### Step 5: Detailed Test Case Generation (RBT & TC Generation)

Follow the detailed instructions in the `rbt_manual_testing` skill → **Step 5**.

**Token Budget (MUST comply):**

- Maximum **25 TCs per generation batch**
- Before generating, estimate the total expected TC count
- If estimate > 25 TCs → notify and ask user:
  > "I estimate ~[X] test cases for the full scope. Would you like to:
  >
  > 1. Generate the top 25 TCs prioritizing Critical + High first
  > 2. Generate module by module (Module 1 → confirm → Module 2...)
  >    Which option do you prefer?"
  >
- **Do NOT decide unilaterally** without asking the user

**TC Generation Process:**

1. Assess Risk Level (High/Medium/Low) for each Module
2. Generate test cases with complete fields: Title, Pre-condition, Steps, Expected, Test Data, Priority
3. Apply techniques: EP, BVA, Decision Table, State Transition
4. Test Data must be specific — no placeholders (see Anti-Patterns below)

**Output Contract:**

```
## Test Cases — [Module Name] (Risk: High/Medium/Low)
Each TC must include at minimum:
- **TC Title:** [name]
- **Pre-condition:** [condition]
- **Steps:** (numbered)
- **Expected:** (numbered, corresponding to steps)
- **Priority:** Critical/High/Medium/Low

→ Total: [X] TCs for this module | Remaining estimate: [Y] TCs
```

---

### Step 6: Format Standardization (Template Mapping)

**Schema:** Use the 8-column schema defined in the `rbt_manual_testing` skill → **Step 6**:
`| CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type |`
→ Canonical source: `.agent/skills/rbt_manual_testing/SKILL.md` — **Do NOT add, remove, or rename columns.**

> [!IMPORTANT]
> **Single-row Test Cases:** Đảm bảo mỗi testcase chỉ chiếm đúng 1 dòng duy nhất trong bảng Markdown. Không được chia tách thành nhiều dòng khác nhau cho cùng một testcase. Sử dụng thẻ `<br>` để định dạng xuống dòng bên trong các ô Action và Expected Result nếu cần hiển thị danh sách các bước.

**Self-Validation Gate (MANDATORY — execute before outputting):**

Agent self-checks and records results:

| Check | Criteria                                                                                                                                             | Result  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| V1    | TC count in table == total TCs generated in Step 5                                                                                                   | ✓ / ✗ |
| V2    | No cell in Action/Expected Result columns is a placeholder ("enter data", "valid result"...)                                                         | ✓ / ✗ |
| V3    | Each Test Suite has at least 1 Happy Path TC + 1 Negative TC                                                                                         | ✓ / ✗ |
| V4    | Schema has exactly 8 columns:`CRUD \| Test Suite \| Test Case Name \| Preconditions \| Tag Name \| Action \| Expected Result \| Execution Type` | ✓ / ✗ |
| V5    | Test Case Names are unique within the same Test Suite                                                                                                | ✓ / ✗ |
| V6    | All columns have values — no unreasonably empty cells (CRUD luôn điền mặc định là "New")                                                              | ✓ / ✗ |
| V7    | Mỗi test case chỉ ghi trên đúng 1 dòng (1 row duy nhất trong bảng Markdown), tuyệt đối không chia thành nhiều hàng.                                   | ✓ / ✗ |

**If any check = ✗** → Fix before outputting. Clearly state which check failed and how it was fixed.

**Retry Limit:** Maximum 2 self-correction attempts. If checks still fail after 2 retries → output with warning: `[VALIDATION GATE PARTIAL — V[x] FAILED AFTER 2 RETRIES]` and notify the user.

**Output format:**

```
[VALIDATION GATE PASSED: V1✓ V2✓ V3✓ V4✓ V5✓ V6✓]
→ Export artifact: test_cases_<feature>_<YYYYMMDD>.md
```

If the table is too long → split into Part 1, Part 2... and ask user to continue.

---

## Output

The final artifact consists of 3 sections, exported as `test_cases_<feature>_<YYYYMMDD>.md`:

1. **Test Cases Markdown Table** — 8 standard columns (per SKILL.md schema), ready to copy to Excel/Jira/TestRail
2. **Traceability Matrix** — Maps REQ IDs → TC IDs
3. **Ambiguities Log** — List of ambiguities detected and how they were resolved (from Step 2)
