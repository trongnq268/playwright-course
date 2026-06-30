---
description: Analyze requirement documents (Jira tickets, .doc, user stories) — produce detailed analysis artifacts. Does NOT generate test cases. V2 — QA/BA focused, RADAR ambiguity framework, gated checkpoints.
version: 2.0.0
skills:
  - requirements_analyzer
---

> **MANDATORY SKILL:** You MUST load and carefully read the **`requirements_analyzer`** skill (at `.agent/skills/requirements_analyzer/SKILL.md`) to understand the standard analysis approach before starting.

# Workflow: Analyze Requirement Document (V2)

This workflow analyzes requirement documents (Jira tickets, .doc files, user stories, design mockups) and produces a detailed analysis artifact. **Does NOT generate test cases** — focuses solely on understanding, decomposing, detecting risks/ambiguities, and assessing test readiness.

> [!IMPORTANT]
> **QA-First Mindset**: Every section in the output must answer the question: **"What does QA need from this section to test?"**. This workflow serves **QA** and **BA** — it does not serve Developers.

## When to Use

- User provides a Jira ticket (.doc) or requirement document and asks to "analyze"
- User wants to understand scope, acceptance criteria, and dependencies before writing tests
- User needs a list of ambiguities to clarify with PO/BA
- User says: "analyze requirement", "review this ticket", "phân tích requirement"

## Input

The agent must collect from the user:

| # | Input | Required | Description |
|---|---|---|---|
| 1 | **Requirement document** | ✅ | .doc, .md, Jira URL, or text description |
| 2 | **Mockup/Screenshot** | ⭕ Recommended | UI design images, wireframes, or current screenshots |
| 3 | **Related tickets** | ⭕ Optional | Dependent or related tickets (dependencies) |
| 4 | **Additional context** | ⭕ Optional | Information about the current system, business domain |

> [!NOTE]
> If the user only provides a .doc file without mockups, the agent must still perform a full analysis based on the document content. If mockups/screenshots are available, the agent performs more detailed UI analysis.

---

## Execution Principles

- **Gated execution**: Each phase has a quality gate — do NOT run all 7 phases continuously
- **2 mandatory Human Checkpoints** — agent MUST stop and wait for user confirmation
- **Context Anchoring**: Before each Phase (from Phase 2 onward), recap 2-3 key context bullets from previous phases to prevent context drift
- **Hallucination Guard**: Every finding must cite its source: `[Source: AC-03]`, `[Source: Mockup-2]`, `[Source: Inferred — needs confirmation]`
- **Token Budget**: If output > 800 lines → split into Part 1, Part 2 + ask user
- **QA-First Mindset**: Every section must answer "What does QA need from this to test?"

---

## Steps

---

### Phase 0: Pre-Flight — Input Validation & Sizing (MANDATORY — HARD BLOCK)

> [!IMPORTANT]
> This is a prerequisite. **Do NOT start Phase 1 if Pre-Flight has not PASSED.**

**0.1 — Skill Loading:**

Read `.agent/skills/requirements_analyzer/SKILL.md`. Internal confirmation:
- Skill loaded ✓
- Output structure understood ✓

**0.2 — Input Validation:**

Verify the user has provided minimum required information:

- [ ] Requirement document has content (not an empty file)
- [ ] File format is supported (.md, .doc, .docx, .xlsx, URL, text)
- [ ] At least 1 AC or meaningful description exists

**If missing** → Ask user immediately, do NOT continue:

> "To analyze the requirement, please provide:
>
> 1. Requirement document (file .doc, .md, Jira URL, or paste text)
> 2. (Optional) Mockup/screenshot if available
>
> I will begin once I have sufficient information."

**0.3 — Sizing Gate:**

Assess complexity to select the appropriate mode:

| Metric | LITE (≤3 AC) | STANDARD (4–10 AC) | DEEP (>10 AC) |
|---|---|---|---|
| AC count | ≤3 | 4–10 | >10 |
| Dependencies | 0 | 1–3 | >3 |
| Mockups | 0–1 | 1–3 | >3 |
| Modules affected | 1 | 2–4 | >4 |

**Mode behavior:**

| Mode | Phases executed | Output level |
|---|---|---|
| **LITE** | Phase 0 → 1 → 2 → (skip 3) → 4 (light) → 6 → 7 | Compact — ~200 lines |
| **STANDARD** | Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 | Full — ~400-600 lines |
| **DEEP** | Suggest escalation to `/generate_cross_module_test_plan` | Workflow handoff |

> [!WARNING]
> If sizing = DEEP → Notify user: "This requirement has >10 AC / >3 dependencies — I recommend using `/generate_cross_module_test_plan` for cross-module analysis. Would you like to continue in STANDARD mode or switch workflows?"

**Output**: `[PRE-FLIGHT PASSED — Mode: STANDARD]` → proceed to Phase 1.

---

### Phase 1: Information Gathering

1. **Read the requirement document** provided by the user (file .doc, .md, or URL)
   - If .doc format is HTML (exported from Jira): parse HTML to extract content
   - Identify: Ticket ID, Type, Priority, Status, Reporter, Assignee, Fix Version, Sprint, Labels
2. **Scan dependencies** — identify all referenced tickets/features
3. **Read dependency documents** if available in the same directory or provided by user
4. **Read mockup/screenshot** if available — analyze UI layout, components, fields
5. **Context Summary:**

```
## Context Summary
- Ticket: [ID] — [Title]
- Type: [Bug/Story/Task] | Priority: [P1-P4]
- Modules affected: [list]
- Dependencies found: [count] — [IDs]
- Mockups: [count]
- Mode: [LITE/STANDARD]
```

---

### Phase 2: Core Analysis

> **Context Anchoring**: Recap 2-3 key context bullets from Phase 1 before starting.

1. **Ticket Overview** — Metadata table (ID, Type, Priority, Status, Sprint, Assignee...)
2. **User Story** — Extract in "As a... I want... So that..." format
3. **Scope** — Clearly identify affected modules/pages/components
4. **Acceptance Criteria** — Decompose each AC into logical groups, including:
   - Detailed description of each AC
   - Input/Output specification
   - Business rules per AC
   - Comparison tables (if new columns, fields, or rules exist)
   - Clear distinction between **default vs optional** behavior (if applicable)
   - **Testability assessment** — Can this AC be verified by a test? `[Source: AC-XX]`

**→ ⏸ CHECKPOINT 1 (MANDATORY STOP)**

Present scope + AC summary → **Wait for user (QA/BA) confirmation** before deep diving:

> "I have completed the core analysis. Summary:
>
> - **Scope**: [modules affected]
> - **AC count**: [X] acceptance criteria, grouped into [Y] groups
> - **Key observations**: [2-3 bullets]
>
> Can you confirm this scope is correct? Anything to add/change before I proceed with the deep analysis?"

**❌ Do NOT continue to Phase 3 until user confirms.**

---

### Phase 3: Deep Analysis

> **Context Anchoring**: Recap scope + AC summary confirmed by user at Checkpoint 1.

> [!NOTE]
> This phase is SKIPPED when mode = LITE. Jump directly to Phase 4.

**3.1. Dependency Analysis**
- Read each dependency → extract relevant business rules
- Distinguish rules from main ticket vs dependency
- Summarize dependent ticket content
- If dependency has its own mockup → analyze UI in detail (fields, modals, interactions)
- Clearly tag rule origins `[Source: DEP-XXX]`

**3.2. Mockup Analysis** (if available)
- Describe layout — Breadcrumb, header, sidebar, main content, footer
- List components — Tables, forms, modals, buttons, dropdowns, tabs
- Detail fields — Field name, type (input/dropdown/date picker), label, placeholder
- Compare mockup with document — detect inconsistencies `[Source: Mockup-X vs AC-Y]`
- Embed screenshots in carousel within the artifact (if images are available)

**3.3. Business Flow Analysis** ⭐
- End-to-end business flow — QA needs this for E2E test scenario design
- Entities involved and CRUD operations — QA needs this for test data setup/teardown
- Integration points between modules — QA needs this for module boundary testing

**3.4. Permission/Role Analysis** ⭐
- Role × Action matrix — QA needs this for role-based test scenarios
- Role-specific behavior differences
- Example: How do Admin vs User vs Guest see different behaviors?

**3.5. Non-Functional Requirements Analysis** ⭐
- Performance expectations — QA needs this for performance test design
- Security considerations — QA needs this for security test design
- Accessibility — any WCAG compliance requirements?
- Localization — especially important for OnePay (multi-language payment gateway)

---

### Phase 4: Ambiguity Detection — RADAR Framework (Core Value)

> **Context Anchoring**: Recap key findings from Phases 2-3 before starting.

> [!IMPORTANT]
> This is the **highest-value** part of the workflow — detecting what the requirement does NOT say clearly.

**RADAR Checklist — Apply to each AC:**

| Category | Full Name | Sample Questions |
|---|---|---|
| **R** | Role-based | Does behavior differ between roles? Which roles are allowed? |
| **A** | Action clarity | Is Trigger → Action → Result clear? Any timeout? Concurrent requests? |
| **D** | Data integrity | Is CRUD complete? Are validation rules sufficient? Default values? Nullable? |
| **A** | Alternatives | Are happy path + alternate paths + error paths all covered? |
| **R** | Rules conflict | Which rule overrides which? What is the priority order? |

**Extended Detection — Advanced Ambiguity Types:**

| Type | Description | Example |
|---|---|---|
| **Semantic** | Same word, different meanings for different stakeholders | "Transaction" = payment transaction or accounting transaction? |
| **Temporal** | Timing, sequence, concurrency | "After payment" = immediately or after bank confirmation? |
| **Scope** | Unclear feature boundary | "Support all card types" — includes virtual? prepaid? |
| **Implicit** | Unstated assumptions | "User is logged in" — what about session timeout? |
| **Numeric** | Rounding, precision, currency conversion | "Total = quantity × price" — round up or down? |
| **Behavioral** | Multi-rule conflicts | "No refund after 30 days" vs "Admin can refund at any time" |
| **Error state** | Behavior on failure | "Payment failed" — retry? rollback? notify? |
| **Permission** | Role-based behavior unclear | "Admin can edit" — all admins or only super-admin? |
| **Lexical** | Vague keywords | "where applicable", "as needed", "similar to", "etc." |
| **Threshold** | Undefined config/values | "approaching deadline" = how many days? |
| **Conflict** | Old vs new requirements | Does the new feature contradict existing behavior? |

**Output format — For each ambiguity:**

| ID | Type (RADAR) | Question | Risk if Unresolved | Severity | Source |
|---|---|---|---|---|---|
| AMB-01 | [R/A/D/A/R + type] | Clear description | Specific impact | 🔴/🟡/🟢 | `[AC-XX]` |

**Additional detection heuristics:**
- Vague keywords: "where applicable", "as needed", "similar to", "etc."
- Missing validation rules: min/max, format, required/optional
- Edge case behaviors: network errors, concurrent access, empty data
- Inconsistencies between document and mockup (column names, format, layout)

---

### Phase 5: Risk Assessment

> **Context Anchoring**: Recap ambiguities detected in Phase 4.

> [!NOTE]
> This phase is SKIPPED when mode = LITE. Jump directly to Phase 6.

**5.1. Testing Risks:**

| Risk ID | Area | Description | Probability | Impact | Score | Mitigation |
|---|---|---|---|---|---|---|
| RISK-01 | [area] | [desc] | H/M/L | H/M/L | [P×I] | [action] |

**5.2. Risk Heat Map:**

```
         │ Low Impact │ Med Impact │ High Impact │
─────────┼────────────┼────────────┼─────────────┤
High Prob│   🟡       │   🟠       │   🔴        │
Med Prob │   🟢       │   🟡       │   🟠        │
Low Prob │   🟢       │   🟢       │   🟡        │
```

Map each RISK-XX into the heat map so QA knows where to focus testing effort.

**→ ⏸ CHECKPOINT 2 (MANDATORY STOP)**

Present ambiguities + risks → **Wait for user review**:

> "I have detected [X] ambiguities and [Y] testing risks. Summary:
>
> - **Ambiguities 🔴 High**: [count] — [top 3 AMB IDs]
> - **Risks 🔴 High**: [count] — [top 3 RISK IDs]
>
> Please review the ambiguities and risks. Do you want to add, modify, or remove any items?"

**❌ Do NOT continue to Phase 6 until user confirms.**

---

### Phase 6: Synthesis & Maturity Score

> **Context Anchoring**: Recap user feedback from Checkpoint 2 (approved/modified ambiguities and risks).

**6.1. Requirement Maturity Assessment** ⭐

| Dimension | Score | Criteria |
|---|---|---|
| Completeness | ⭐⭐⭐☆☆ | Do all ACs have sufficient input/output/validation? |
| Clarity | ⭐⭐⭐⭐☆ | No 🔴 High severity ambiguities remaining? |
| Testability | ⭐⭐⭐☆☆ | Can every AC be verified by a test? |
| Consistency | ⭐⭐⭐⭐☆ | No conflicts between ACs? |
| Automatable | ⭐⭐⭐☆☆ | Can ACs be automated? What approach (UI/API)? |

**Verdict**: `Ready for QA` / `Needs Clarification` / `Not Ready for Testing`

**6.2. State Transition Matrix** (if applicable) — table mapping states → behaviors

**6.3. AC Checklist** — Summarize all ACs as checkboxes, grouped by function

**6.4. Test Recommendations** — Top 10 things to focus on when testing (NOT test cases)

**6.5. Automation Feasibility** ⭐ — Tag each AC:

| AC | Automatable? | Approach | Reason |
|---|---|---|---|
| AC-01 | ✅ Yes | UI (Playwright) | Form input + button click |
| AC-02 | ✅ Yes | API | Backend validation, no UI needed |
| AC-03 | ❌ No | — | Requires visual verification |
| AC-04 | 🟡 Partial | UI + Manual | Captcha portion requires manual |

**6.6. Glossary** ⭐ — Key terms + unified definitions

---

### Phase 7: Output Artifact

**Self-Validation Gate (MANDATORY — execute before outputting):**

Agent self-checks:

| Check | Criteria | Result |
|---|---|---|
| V1 | Every AC has been analyzed? | ✓ / ✗ |
| V2 | Every ambiguity has a severity rating (🔴/🟡/🟢)? | ✓ / ✗ |
| V3 | Every risk has a mitigation? | ✓ / ✗ |
| V4 | No placeholders ("TBD", "needs confirmation") exist outside the Ambiguity list? | ✓ / ✗ |
| V5 | Every AC has a testability assessment? | ✓ / ✗ |
| V6 | Every finding cites a source? | ✓ / ✗ |
| V7 | User has confirmed both Checkpoints? | ✓ / ✗ |

**If any check = ✗** → Fix before outputting. Clearly state which check failed and how it was fixed.

**Output**: Save artifact using the template structure below.

---

## Output Template (Artifact Structure)

The agent MUST output the artifact following this structure:

```markdown
# 📋 Requirement Analysis: [TICKET-ID]
## [Ticket Title]

## Executive Summary [👤 BA] [🧪 QA]
(3-5 sentences summarizing key findings: scope, AC count, ambiguity count, maturity verdict)

## 1. Ticket Overview [👤 BA] [🧪 QA]
(Metadata table)

## 2. User Story [👤 BA]
(As a... I want... So that...)

## 3. Scope [👤 BA] [🧪 QA]
(Table listing affected modules/pages)

## 4. Acceptance Criteria — Detailed Analysis [👤 BA] [🧪 QA]
### 4.1. [AC Group 1]
### 4.2. [AC Group 2]
### 4.N. [AC Group N]

## 5. Dependencies [👤 BA] [🧪 QA]
### 5.1. [Dependent ticket]
#### 5.1.1. [UI details if mockup exists]
#### 5.1.N. Consolidated Business Rules

## 6. Mockup/Screenshot Analysis [🧪 QA]
### 6.1. [Mockup 1]
### 6.N. [Mockup N]

## 7. Business Flow & Integration Points [🧪 QA]
(E2E business flow, entities, CRUD, integration points)

## 8. Permission Matrix [👤 BA] [🧪 QA]
(Role × Action mapping)

## 9. Non-Functional Requirements [🧪 QA]
(Performance, Security, Accessibility, Localization)

## 10. Ambiguities & Risks — RADAR [👤 BA] [🧪 QA]
### 10.1. Ambiguities
(Table: #, RADAR Type, Question, Risk if Unresolved, Severity, Source)
### 10.2. Testing Risks
(Table: #, Area, Description, Probability, Impact, Score, Mitigation)
### 10.3. Risk Heat Map

## 11. State Transition Matrix [🧪 QA] (if applicable)
(Table: state → behavior)

## 12. Requirement Maturity Score [👤 BA] [🧪 QA]
(5-dimension scoring + verdict)

## 13. Acceptance Criteria Checklist [🧪 QA]
(Checkboxes grouped by function)

## 14. Test Recommendations [🧪 QA]
(Top 10 suggestions, NOT test cases)

## 15. Automation Feasibility [🧪 QA]
(Table: AC → Automatable? → Approach → Reason)

## 16. Glossary [👤 BA] [🧪 QA]
(Terms + definitions)
```

> [!NOTE]
> **LITE Mode**: Only output sections 1-4, 10 (light), 12-14. Skip sections 5-9, 11, 15-16.

---

## Critical Rules

- ❌ **Do NOT generate test cases** — this workflow only analyzes, it does not create TCs
- ❌ **Do NOT guess** business logic if the document does not state it clearly → add to Ambiguities with `[Source: Inferred — needs confirmation]`
- ❌ **Do NOT skip comments** in Jira tickets — comments often contain important supplementary information
- ❌ **Do NOT skip Human Checkpoints** — agent MUST stop at Checkpoint 1 and Checkpoint 2
- ✅ **MUST read related tickets** if referenced in ACs
- ✅ **MUST analyze mockups** in detail if provided (fields, layout, interactions)
- ✅ **MUST clearly note inconsistencies** between document and mockup with `[Source: Mockup-X vs AC-Y]`
- ✅ **MUST write in Vietnamese**, use Markdown format, and export as Artifact
- ✅ **MUST copy images** to the artifacts directory if embedding in the artifact
- ✅ **MUST cite sources** for every finding — no finding should exist without a source reference
- ✅ **MUST context anchor** — recap key context before each Phase (from Phase 2 onward)

---

## Related Workflows

| After analysis is complete | Next workflow | Data passed forward |
|---|---|---|
| Need quick test cases | `/generate_testcases_from_requirements` | AC checklist, ambiguities |
| Need thorough test cases (RBT 6 steps) | `/generate_manual_testcases_rbt` | Ambiguities + Risk Matrix + Testability Score |
| Need automation scripts | `/generate_automation_from_testcases` | Automation Feasibility + Business Flow |
| Need cross-module analysis | `/generate_cross_module_test_plan` | Full analysis (escalated from DEEP mode) |
