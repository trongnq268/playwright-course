---
name: rbt-manual-testing
description: Skill for generating manual test cases with 2 modes — QUICK (fast generation from requirements) and FULL RBT (6-step AI-RBT process with risk assessment). Master skill for all manual test case tasks.
---

# RBT Manual Testing

## Description

This is the **Master Skill** for all manual test case generation tasks. The skill provides **2 operating modes** to suit any requirement scale:

| Mode         | When to Use                                                     | Duration                              |
| ------------ | --------------------------------------------------------------- | ------------------------------------- |
| **QUICK**    | Simple module, fast TCs needed, clear requirements              | 1 pass (no user wait)                 |
| **FULL RBT** | Complex module, risk analysis needed, large system              | 6 sequential steps (with checkpoints) |

**Core principles:**

- **Human Strategy:** Humans define strategy, risk level, and acceptance criteria
- **AI Execution:** AI performs analysis, writes TCs, and identifies gaps
- **Human Verification:** Humans review results before finalizing

---

## When to Use

Use this skill when:

- Generating manual test cases from requirements / user stories
- Analyzing requirements to detect ambiguities
- Decomposing systems into modules / features
- Building a traceability matrix
- Applying Risk-Based Testing (risk assessment for test cases)
- Standardizing test cases into Markdown tables (Jira/Excel format)
- Quickly generating test cases from simple requirements

**Do NOT** use this skill when:

- Automation code is needed → use `qa_automation_engineer`
- DOM inspection / locator generation is needed → use `ui_debug_agent` / `smart_locator_agent`
- Only test data is needed → use `test_data_generator`

---

## Mode Routing — How to select a mode

Agent automatically selects a mode based on **trigger keywords** and **context**:

### → Mode QUICK

Triggers when:

- User invokes workflow `/generate_testcases_from_requirements`
- User says: "generate test cases quickly", "create TCs from this requirement", "write test cases for form..."
- Requirements are clear, small scope (1 module / 1 feature)
- User does not request risk analysis or a formal process

### → Mode FULL RBT

Triggers when:

- User invokes workflow `/generate_manual_testcases_rbt`
- User says: "6-step process", "RBT analysis", "comprehensive test cases", "formal TC suite"
- Large scope (multiple modules, complex system)
- User requests a Traceability Matrix or Risk Level assessment
- Requirements are unclear, ambiguity analysis is needed

### → When mode is unclear

If the mode cannot be determined, agent **asks the user**:

```
Which mode do you want for test case generation?
1. QUICK — Fast generation from requirements (no analysis steps)
2. FULL RBT — Full 6-step process (analysis → decomposition → RBT → TC generation)
```

---

# Mode 1: QUICK — Fast Test Case Generation

## Purpose

Generate test cases **quickly, with sufficient quality** from clear requirements/user stories. Suitable for simple modules or when immediate results are needed.

## Process (single pass)

**Agent must:**

1. **Read and understand** the provided requirements
2. **Identify the main flows:**
   - Happy Path (main flow)
   - Negative Path (wrong/missing data)
   - Boundary Cases (boundary values)
3. **Apply test case design techniques** automatically:
   - **Equivalence Partitioning (EP):** Divide inputs into equivalent groups
   - **Boundary Value Analysis (BVA):** Test values at boundaries
   - **Decision Table:** List condition combinations (if multiple rules)
   - **State Transition:** Test state transitions (if workflow exists)
4. **Generate test cases** with all required fields:
   - TC ID (format: `[PROJECT]_[MODULE]_TC_[NUMBER]`)
   - Module
   - Test Case Title / Test Scenario
   - Pre-conditions
   - Test Steps (numbered)
   - Expected Results (numbered correspondingly)
   - Test Data (**must be specific**, no placeholders)
   - Priority (Critical / High / Medium / Low)
5. **Output a standard Markdown table**, ready to copy to Excel/Jira

## Minimum Coverage Rule (QUICK mode)

For each logical input group or business rule, the agent MUST generate **at minimum**:

| Coverage Type | Minimum Count | Example |
|---|---|---|
| Happy Path | 1 TC | Valid data → success |
| Negative Path | 1 TC | Missing required field / invalid format |
| Boundary Case | 1 TC | Max length, min value, empty string |

> **Rule:** If a form has 3 independent field groups → minimum 9 TCs (3 groups × 3 coverage types).
> If the agent produces fewer than this minimum, it MUST justify why (e.g. field group has no boundary constraint).

## Output Table Schema (applies to both modes)

| CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type |

## Test Data Rules (applies to both modes)

```
❌ Wrong: "Enter a valid code"
✅ Correct: "Enter code: KH-2026-0012"

❌ Wrong: "Enter a valid email"
✅ Correct: "Enter email: test_customer_01@domain.com"

❌ Wrong: "Enter a value exceeding the limit"
✅ Correct: "Enter 256 characters into the Name field (max: 255)"
```

## Anti-Patterns (Mode QUICK)

- ❌ Generic / placeholder test data
- ❌ Happy Path only, missing Negative/Boundary cases
- ❌ Skipping validation rules in requirements
- ❌ Vague Test Steps ("enter data" → must specify what to enter, where)

---

# Mode 2: FULL RBT — AI-RBT 6-Step Process

## Purpose

A formal, sequential process for complex modules. Includes Ambiguity analysis, system decomposition, Traceability Matrix, Risk Level assessment, and detailed test case generation.

> ⚠️ **IMPORTANT:** This process **MUST run sequentially** step by step. NEVER combine multiple steps into one pass. Each step must be completed and confirmed by the user before proceeding to the next.

> [!NOTE]
> **2 separate usage flows:**
>
> - **Antigravity flow (slash command):** Agent follows the general instructions below. Agent does NOT need to read prompt.txt files.
> - **Copy-Paste flow (ChatGPT/Claude):** QA team copies detailed prompt content from `plans/manual/01-06/prompt.txt` into the AI chat, one step at a time.

### Step 1: Context & Role-play (Context initialization)

**Purpose:** Establish the Senior QA Engineer role and load project context.

**Agent must:**

1. Ask the user to provide:
   - Project / feature name
   - Description of the current system
   - MVP testing objectives
   - Requirement documents (Requirements, User Stories, Figma link, PDF...)
2. Read documents carefully and confirm understanding of the context
3. Summarize the testing scope
4. **Wait for user confirmation** before proceeding to Step 2

**Output:** Context confirmation + testing scope summary.

> [!CAUTION]
> **Fallback rule — when input is insufficient:**
> If the user does NOT provide a requirement document and only gives a vague description:
> 1. **DO NOT proceed** to Step 2 immediately.
> 2. List specifically what is missing: _(e.g. "Missing: field validation rules, error messages, permission matrix")_
> 3. Ask the user to supply the missing items OR explicitly confirm: _"Proceed with assumptions — I will flag all assumptions in Step 2"_
> 4. Only proceed after user confirms.
> 
> **Never silently assume** missing business logic — flag all assumptions explicitly.

---

### Step 2: Analysis & QnA (Requirements analysis)

**Purpose:** Analyze documents to detect gaps, missing information, and contradictions.

**Agent must:**

1. Identify the flows:
   - Happy Path (main flow)
   - Alternate Paths (branch flows)
   - Exception Paths (error/exception flows)
2. Detect Ambiguities:
   - Missing requirements (no textbox length, timeout, lost-connection behavior defined...)
   - Contradictory requirements
   - Unclear requirements
3. Raise numbered Q&A questions (Q1, Q2...) for the user/PO/BA to answer, each with context and an assumption if left unanswered
4. **STOP — Wait for user responses** before continuing

**Output:** Flow list + Ambiguities + Q&A questions.

> [!IMPORTANT]
> **This is the most critical checkpoint.** If the agent skips this step and guesses business logic, test cases will be seriously wrong. Agent MUST stop and wait for user feedback.

---

### Step 3: Decomposition (System decomposition)

**Purpose:** Break a complex feature into small, manageable Modules / Sub-modules.

**Agent must:**

1. Decompose using one of 2 approaches:
   - **By UI:** Header, Data Table, Form popup, Sidebar...
   - **By flow:** Create flow, Edit flow, Delete flow...
2. Briefly describe the function of each Module
3. Identify Dependencies between Modules

**Output:** Module/Sub-module list + Dependencies.

---

### Step 4: Traceability (Coverage assurance)

**Purpose:** Build a traceability matrix to ensure 100% of requirements are covered by test scenarios.

**Agent must:**

1. Map each Module/Rule to a Requirement ID (REQ-01, REQ-02...)
2. Cross-check for any requirements missing from the decomposition list (Gap Analysis)
3. List High-Level Test Scenarios for each Module, focusing on:
   - Security / authorization
   - UI Validation
   - Business Logic
   - Data Integrity
   - Error Handling
4. **Wait for user review** of the scenario list before generating detailed test cases

**Output:** Traceability Matrix + High-Level Test Scenarios.

> [!WARNING]
> **Human Checkpoint:** User must review the scenario list to add edge cases that AI may have missed. This is the human-driven risk assessment step.

---

### Step 5: RBT & TC Generation (Detailed test case generation)

**Purpose:** Generate detailed test cases following the Risk-Based Testing strategy.

**Agent must:**

1. Assess Risk Level for each Module using the criteria below:

   **Risk Level Criteria (OnePay domain):**

   | Risk Level | Criteria | OnePay Examples | TC Depth |
   |---|---|---|---|
   | 🔴 **High** | Involves money movement, security, compliance, or irreversible actions | Payment transaction, Refund approval, Fee config (2B/3B), User permission, IPN config, DB reconciliation | Thorough: Happy + all Negative + all Boundary + Edge cases |
   | 🟡 **Medium** | Core business flow but reversible; affects reporting or configuration | Merchant search/filter, Transaction search, Report export, Merchant config view | Moderate: Happy + main Negative + key Boundary |
   | 🟢 **Low** | Read-only, UI display, non-critical config, cosmetic | Pagination, Date picker display, Tooltip text, Static info display | Basic: Happy Path + 1 Negative |
2. Generate test cases with all required fields:
   - Module / Sub-module
   - Test Case Title
   - Pre-conditions
   - Test Steps (numbered)
   - Expected Results (numbered correspondingly)
   - Test Data (**must be specific**, no generic placeholders)
   - Priority
3. Ensure coverage diversity:
   - Happy Path
   - Negative Path (boundary values, character overflow)
   - Edge Cases (timeout, lost connection...)
4. Apply appropriate **test case design techniques**:
   - **Equivalence Partitioning:** Divide inputs into equivalent groups, test one representative per group
   - **Boundary Value Analysis (BVA):** Test at boundaries (min, min+1, max-1, max)
   - **Decision Table:** List condition combinations → results (for multi-condition logic)
   - **State Transition:** Test valid + invalid state transitions (for workflows)
5. If too many scenarios → generate one Module at a time, ask user to continue

**Output:** Detailed Test Cases list with Risk Levels.

---

### Step 6: Template Mapping (Format standardization)

**Purpose:** Package test cases into a standard Markdown table, ready to copy to Excel/Jira.

**Agent must:**

1. Standardize all test cases into a Markdown table:

```
| CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type |
```

2. Table rules:
   - **CRUD:** CRUD action for testcase (default: `New`)
   - **Test Suite:** Group/module name (e.g. `Login`, `Payment`, `User Management`)
   - **Test Case Name:** Short, clearly describes the TC purpose (e.g. `TC_LOGIN_001 - Successful login with valid account`)
   - **Preconditions:** Prerequisites before executing the TC (e.g. `User has a registered account; system is running`)
   - **Tag Name:** Tags for testcase (e.g. `@dev36`, `@regression`)
   - **Action:** Specific action at that step (must clearly state what data is entered, which element is interacted with)
   - **Expected Result:** Expected result at that step
   - **Execution Type:** `Manual` or `Automated`
   - Each step is a separate row — multiple rows with the same Test Case Name = multiple steps of the same TC
   - Use `<br>` for line breaks within the same cell if needed
   - **NEVER omit** any test case generated in Step 5
   - If too long → split into Part 1, Part 2... and ask user to continue
3. Export output as an Artifact (`test_cases_<module>.md`)

**Output:** Complete Markdown Test Cases table.

---

## Anti-Patterns (STRICTLY FORBIDDEN — applies to both modes)

- ❌ Merging multiple steps into one pass in FULL RBT (MUST be sequential)
- ❌ Guessing business logic without asking user (Step 2 - FULL RBT)
- ❌ Skipping Ambiguity analysis (FULL RBT)
- ❌ Generic / placeholder test data
- ❌ Truncating or omitting test cases when mapping to the table
- ❌ Generating all test cases at once for a large system (must split by module)
- ❌ Happy Path only, missing Negative/Boundary cases (QUICK)
- ❌ Vague Test Steps, not specifying what data to enter

---

## Prompt Templates

Prompt templates for the FULL RBT process are located at:

```
plans/manual/
├── 01_context_and_roleplay/prompt.txt
├── 02_analysis_and_qna/prompt.txt
├── 03_decomposition/prompt.txt
├── 04_traceability/prompt.txt
├── 05_rbt_and_tc_generation/prompt.txt
└── 06_template_mapping/prompt.txt
```

Agent should read the corresponding prompt template **before** executing each step (FULL RBT mode).

QUICK mode does not require reading prompt templates — agent applies EP/BVA/Decision Table techniques directly.

---

## Output Format

### Mode QUICK

| Output              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| Markdown TC Table   | Complete test cases, ready to copy to Excel/Jira        |

### Mode FULL RBT

| Step | Output                                                                         |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Context confirmation (scope summary)                                           |
| 2    | Flows + Ambiguities + Q&A questions                                            |
| 3    | Module Decomposition + Dependencies                                            |
| 4    | Traceability Matrix + High-Level Scenarios                                     |
| 5    | Detailed Test Cases (with Risk Level)                                          |
| 6    | Standard 8-column Markdown table (Excel/Jira/TestRail ready) + Traceability   |
