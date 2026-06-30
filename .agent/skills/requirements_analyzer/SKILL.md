---
name: requirements-analyzer
description: Skill for analyzing web pages/modules and producing standardized Requirements Documents / User Stories.
---

# Requirements Analyzer

This skill provides detailed instructions for AI (Antigravity) to convert a web page's UI or DOM/HTML structure into clear, detailed Requirements Documents — directly usable by QA, Testers, and Developers.

## 1. Core Objectives
- Build requirements documents that accurately reflect the running system.
- Ensure completeness and consistency for both Happy Path and Edge Cases (errors/exceptions).
- Produce professional output format (using Artifact structure).

## 2. Information Extraction Process
When asked to generate Requirements from a web page:
1. **Layout Analysis:** Identify Header, Footer, Sidebar, and Main Content areas.
2. **Collect Forms & Inputs:**
   - Find all input fields (`input`, `select`, `textarea`).
   - Record attributes: `type` (text, email, password, number), `required`, `maxlength`, `minlength`, `pattern`.
3. **Collect Interactive Elements (Buttons/Links/Actions):**
   - Identify the function of each button (Save, Submit, Cancel, Delete, Edit).
   - Record alerts, notifications (Alerts, Toasts, Validation Messages) triggered on invalid interaction.
4. **Extract Workflows:**
   - Dependencies between components (e.g. Submit button is only enabled when "I agree" checkbox is ticked).

## 3. Output Document Structure
The document should be formatted in professional Markdown or saved as an Artifact (`requirements_spec.md`).

**Required sections:**

### 3.1. Overview
A brief description of the feature and purpose of the web page/module.

### 3.2. Functional Requirements
Broken down into **User Stories** or **Use Cases**:
- **Feature name** (e.g. Login Feature)
- **Description:** "As a user, I want to... so that I can..."
- **Acceptance Criteria:** Clearly state the conditions that must be satisfied.

### 3.3. Field Specifications
Core section for Automation Testers:
* Use a Markdown Table to list:
  - Field Name (Label)
  - Type (UI type)
  - Validation Rules (Required / Default / Length limits)
  - Notes

### 3.4. Business Rules & Validations
List the expected Validation Messages when users enter incorrect data.

## 4. Strict Rules
- Do not infer complex business requirements without evidence from the UI. If logic is missing, list them under "Open Questions / Clarifications for PO-User".
- If Playwright MCP is available, prefer opening a real browser to screenshot/capture the interface when needed.
