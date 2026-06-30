# Test Strategy — OnePay Playwright

## Usage Guide

This file defines the testing strategy for the OnePay Playwright project. The agent references this file to understand scope, priorities, and approach when building test cases or automation scripts.

---

## Testing Objectives

- Ensure stability and correctness of the Paygate payment gateway (international cards, domestic cards, BNPL, QR) and iPortal administration system.
- Detect defects early in the software development cycle (Shift Left Testing).
- Build and maintain a stable automated regression suite running on CI/CD pipeline.

## Scope of Testing

| Test Type | Status | Technology |
|-----------|--------|------------|
| UI Functional Testing | ✅ Active | Playwright + TypeScript |
| API Testing | ✅ Active | Playwright API Request |
| Integration Testing | ✅ Active | Playwright UI & API combined with Database verification |
| Database Validation | ✅ Active | Oracle SQL / PostgreSQL client utilities |
| Mobile Testing | ⬜ N/A | Appium (out of main scope) |

---

## Test Automation Strategy

### 1. Framework Architecture
- **Language:** TypeScript
- **Automation Tool:** Playwright Test
- **Design Pattern:** Page Object Model (POM) combined with Strategy Pattern (Resolver) for dynamic payment method handling.
- **Reporting:** Allure Report & Playwright HTML Report.

### 2. Automation Scope & Priorities
- **Smoke Tests:** Cover successful payment flows (Happy Path) for card types (International, Domestic, VietQR, NAPAS QR).
- **Regression Tests:** Full iPortal business flows (reconciliation, refund approval, fee configuration, merchant management).
- **Security & DB Integrity:** Verify Keycloak SSO access permissions, reconcile transaction status in DB after UI operations.

---

## Execution Configuration

| Parameter | Value |
|-----------|-------|
| Test timeout | 7,200,000 ms (2h) |
| Action timeout | 15,000 ms |
| Navigation timeout | 120,000 ms |
| Retries | 2 on CI, 0 locally |
| Workers | 1 on CI |
| Screenshot | On failure |
| Video | On first retry |
| Trace | Always on |

### Browsers
- **chromium** (default)
- **edge** (viewport 2560×1440, recommended for headed mode)
- **firefox**, **webkit**

---

## Test Data Management

- **Avoid duplication:** Data for unique fields (Email, Username, Transaction ID) must be randomly generated and traceable.
- **Random data naming rule:** `test_name + timestamp + prefix`.
  - *Example:* `test_login_1712049200@auto.test`
- **No hardcoding:** Never store sensitive credentials directly in test code — use the `ENV()` helper to retrieve dynamic config data.
