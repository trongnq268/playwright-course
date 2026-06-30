---
description: Generate manual test cases quickly from requirements (QUICK mode — bypasses the full 6-step RBT process).
skills:
  - rbt_manual_testing
version: 1.3.0
---

> **MANDATORY SKILL:** You MUST load and carefully read the **`rbt_manual_testing`** skill (at `.agent/skills/rbt_manual_testing/SKILL.md`) before starting this task. Use the **QUICK Mode** of the skill.

# Workflow: Generate Manual Test Cases Quickly from Requirements

This workflow uses the **QUICK Mode** of the `rbt_manual_testing` skill to rapidly generate test cases from existing requirements while ensuring:

- Sufficient coverage
- Minimal duplication
- Ready for immediate execution / automation

---

## Step 1 — Input Contract (MANDATORY)

Before doing anything, confirm the user has provided sufficient information:

- [ ] Description of the feature / module to be tested
- [ ] At least 1 of: business rules, validation rules, UI description, user story

**If missing** → ask the user before continuing:
> "To generate accurate test cases, please provide: [list missing items]"

**If sufficient** → proceed to Step 2.

---

## Step 2 — Escalation Gate (MANDATORY — check before generating TCs)

Evaluate the entire checklist below. **Switch to FULL RBT** if **≥ 1 condition** is TRUE:

| # | Condition | How to Determine |
|---|---|---|
| E1 | More than 10 business rules or validation rules | Count the clearly stated rules in the requirements |
| E2 | ≥ 3 different modules / entities involved | Count the primary nouns in the requirements |
| E3 | Requirements use ambiguous language: "depends on the case", "see also", "TBD", "may" | Scan the text |
| E4 | User requests a Traceability Matrix or Risk Assessment | Read the user's request |
| E5 | The Expected Result of ≥ 1 rule cannot be clearly derived from the current requirements | **If any doubt exists, however small → automatically treat as TRUE. Do NOT self-assess.** |

**If switching to FULL RBT:** Notify the user which condition(s) triggered the escalation (E1/E2/E3/E4/E5), then stop and wait for the user to confirm.

**If all FALSE:** Log `[Escalation Gate PASSED — continuing QUICK mode]` and proceed to Step 3.

---

## Step 3 — Pre-Generation Analysis & Coverage Planning

### 3.1 Analyze Requirements

Read and identify:

- **Input fields:** [list field names, data types, constraints if any]
- **Business rules:** [list each rule]
- **Validation rules:** [list each rule]
- **Flows to cover:** Happy Path / Negative / Edge / Boundary / Security (mark applicable ones)

### 3.2 Coverage Matrix (complete before generating TCs)

Build a coverage table for each input field / business rule:

| Input / Rule | EP Valid | EP Invalid | BVA Min | BVA Max | Null/Empty | Special Chars |
|---|---|---|---|---|---|---|
| [Field/Rule 1] | ✓ | ✓ | ✓/N/A | ✓/N/A | ✓ | ✓/N/A |
| ... | | | | | | |

---

## ⏸ HUMAN CHECKPOINT — After Step 3 (MANDATORY STOP)

Before generating TCs, the agent **MUST** report to the user:

1. **Coverage Matrix Summary:** Number of fields and rules identified
2. **Estimated TC Count:** Approximate total number of TCs to be generated
3. **Techniques to be applied:** EP / BVA / Decision Table / State Transition (with reasoning for each choice)
4. **Confirmation:** Ask the user: `"Do you want to adjust the scope before I generate the test cases?"`

> ❌ **DO NOT proceed to Step 4 until the user confirms.**

---

## Step 4 — Generate Test Cases

Apply the test design techniques based on the Coverage Matrix from Step 3:

| Technique | When to Use |
|---|---|
| **Equivalence Partitioning (EP)** | Default — divide inputs into equivalent groups and test one representative per group |
| **Boundary Value Analysis (BVA)** | When a field has numeric or character-length constraints (min, min+1, max-1, max) |
| **Decision Table** | When ≥ 2 conditions combine to affect the same output |
| **State Transition** | When there is a clear workflow with state changes (e.g., Draft → Submitted → Approved) |

**Output limit:**

- Maximum **30 TCs** per generation run
- If the estimate exceeds 30 TCs → notify the user and ask for a preferred approach:
  1. Generate the top 30 highest-priority TCs (Critical + High) first
  2. Or split by module and generate in batches

---

## Step 5 — Self-Validation Gate (MANDATORY before output)

The agent must self-check the entire checklist below before producing the output table:

- [ ] At least 1 Happy Path TC exists
- [ ] At least 1 Negative TC exists for every input field with a validation rule
- [ ] At least 1 Boundary TC exists if any numeric or length constraint is present
- [ ] No TC uses placeholders in the Action or Expected Result columns (e.g., "valid email", "valid amount")
- [ ] No 2 TCs share the same logic — merge if equivalent
- [ ] All schema columns have values (no unexplained empty cells)
- [ ] Step Numbers are sequential and in the correct order of actions
- [ ] Mỗi test case chỉ ghi trên đúng 1 dòng (1 row duy nhất trong bảng Markdown), tuyệt đối không chia tách thành nhiều hàng.

**If any check fails** → fix before producing output. Do not return results until all checks pass.

---

## Step 6 — Output

Export the Markdown table using the schema below (mandatory: all 8 columns, in order, in Vietnamese):

```
| CRUD | Test Suite | Test Case Name | Preconditions | Tag Name | Action | Expected Result | Execution Type |
```

| Column | Description | Example |
|---|---|---|
| **CRUD** | Action CRUD cho testcase (mặc định là `New`) | `New` |
| **Test Suite** | Tên nhóm / module | `User Management` |
| **Test Case Name** | Tên test case mô tả rõ mục đích kiểm thử | `TC_LOGIN_001 - Successful login with valid email` |
| **Preconditions** | Điều kiện tiên quyết trước khi thực hiện | `User has a registered account; system is running` |
| **Tag Name** | Thẻ tag cho testcase (ví dụ: environment, priority, automation tag...) | `@dev36, @regression` |
| **Action** | Hành động thực thi cụ thể | `Enter email: test_auto_1712049200@onepay.vn into the Email field` |
| **Expected Result** | Kết quả mong đợi tương ứng | `System displays "Login successful" and redirects to Dashboard` |
| **Execution Type** | `Manual` hoặc `Automated` | `Manual` |

> [!IMPORTANT]
> **Single-row Test Cases (MANDATORY):** Mỗi test case chỉ được ghi trên đúng 1 dòng (1 row duy nhất trong bảng Markdown). Tuyệt đối không chia một test case thành nhiều hàng cho từng bước lẻ. Đối với cột Action hoặc Expected Result có nhiều bước/nội dung, hãy viết gộp lại trên một dòng và sử dụng thẻ `<br>` để phân tách các dòng trong cùng ô đó (ví dụ: `1. Nhập email...<br>2. Click nút gửi`).

---

## Step 7 — Save File Output (MANDATORY)

After outputting the TC table, save the file to:

```
tests/manual/[module_name]_testcases_[yyyymmdd].md
```

Example: `tests/manual/user_management_testcases_20260518.md`

Notify the user of the full file path after saving.

---

## Test Data Rules

Test data must be **specific and executable**, not descriptive:

| ❌ Not Acceptable | ✅ Acceptable |
|---|---|
| "valid email" | `test_auto_1712049200@onepay.vn` |
| "valid amount" | `100000` (VND) |
| "value exceeding the limit" | `10000001` (if max is 10,000,000) |
| "account with permission" | `merchant_test_01` (STG env) |
| "special characters" | `<script>alert(1)</script>` |

**If the specific value is unknown:** Write `[NEEDS CONFIRMATION: describe the required data]` — do not use generic placeholders.

---

## General Rules

- Test Case Names must be self-explanatory — the reader should understand the purpose immediately
- Do not create TCs with duplicate logic — merge if they are equivalent
- Prioritize tests in this order: Core business flow → High-risk logic → Boundary & edge cases
- All TC output (Action, Expected Result) must be written in **Vietnamese**
- Do not mix English into the Action or Expected Result columns
