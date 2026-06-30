# Project Context — OnePay Playwright

## Usage Guide

This file contains project context for the application under test. The agent should read this file before starting any automation task to correctly understand the domain and tech stack of OnePay.

---

## Application Overview

- **Application:** OnePay Paygate (Payment Gateway) & iPortal (Internal Portal)
- **Description:** Electronic payment gateway (Paygate) supporting multiple payment methods (international, domestic, BNPL, QR, Token, Installment) and internal administration portal iPortal.
- **Type:** Web Application & API
- **Test environments:** dev9, dev18, dev32, dev36, dev37, dev42, staging

## Tech Stack

- **UI Automation:** Playwright + TypeScript
- **Design Pattern:** Page Object Model (POM) + Helper + Strategies Pattern (Resolver)
- **Authentication:** Keycloak SSO for iPortal (realm: `iportal2`, client: `iportal2-client`)
- **Database:** Oracle Database (orc_tsp, orc_msp, orc_payment2, etc.) & PostgreSQL (pgr_msp)

## Key Features & Modules (iPortal Menu)

| Module | Description | Priority |
|--------|-------------|----------|
| Merchant Management | Manage Merchant info, MID config, Contract (default after login) | High |
| Payment & Reconciliation | Reconcile international/domestic transactions, fee config (2B, 3B), refund approval | Critical |
| Service Support | Transaction search V2, transaction reports, dispute | High |
| Risk Management | Manage disputes (International/Domestic) | Medium |
| Payout | Topup, withdraw, bank transfer | High |
| System | Manage iPortal/MA users, permissions, IPN Go config, Cyber/Mpgs management | Critical |
| Accountant Management P2 | Bank transfer management, accounting reconciliation V2, Misa invoice export | High |

## Environment Details

Get configuration details and credentials via the `ENV()` function in `lib/env.ts`. **Never read directly from `.env` files**.

| Environment | URL Pattern | Credentials |
|-------------|-------------|-------------|
| Dev (dev36, dev42,...) | `https://{env}-iportal.opdev.vn/iportal/` | Via `ENV().credentials` |
| Staging | Via `process.env.IPORTAL_STAGING_URL` | Via `ENV().credentials` |

## Notes & Rules

- **Authentication Fixture:** Use `await login("iportal")` to auto-navigate and log in via Keycloak SSO.
- **Navigation:** Use `navigateIPortalMenu(page, ...menuPath)` to navigate the multi-level iPortal menu.
- **Business Note:** All actions on sensitive data or reconciliation must verify accuracy against the database (Oracle/PostgreSQL).
