# Repository Map — OnePay Playwright

## Usage Guide

This file provides the repository structure map for the OnePay Playwright project so the agent places code in the correct directories and follows the project-specific POM model.

---

## Project Structure (Playwright TypeScript)

```
OnePay_playwright/
├── package.json                        # Test scripts and dependencies
├── playwright.config.ts                # Global Playwright configuration
├── env.ts                              # Read environment config via ENV()
├── lib/                                # Support code and POM
│   ├── pages/                          # POM: locators (getters) + atomic page actions — NO assertions/business flow
│   │   ├── 00.paygate/                 # Locators for Paygate
│   │   └── 03.iportal/                 # Locators for iPortal (common, search, detail)
│   ├── helpers/                        # Helpers: Business logic for UI/API interactions
│   │   ├── 00.paygate/                 # Helpers for payment gateways
│   │   └── 03.iportal/                 # Helpers for iPortal
│   ├── fixture/                        # Shared fixture declarations
│   │   └── index.ts                    # Single composed fixture (import from @fixtures/index)
│   ├── strategies/                     # Strategy + Resolver pattern for payment flows
│   ├── dataFactory/                    # Random/traceable test data factories
│   ├── types/                          # TypeScript type definitions
│   └── utils/                          # Common utilities (API, db, excel, common.ts)
├── tests/                              # Test spec files (.spec.ts)
│   ├── 00.paygate/                     # Paygate UI & API tests
│   ├── 01.mp/                          # Merchant Portal tests
│   ├── 02.ma/                          # Merchant Approval tests
│   └── 03.iportal/                     # iPortal tests by module
└── storage/                            # Tokens / storageState for fast login
```

## Path Aliases (tsconfig.json)

When importing components, the agent MUST use configured aliases instead of relative paths:

| Alias | Maps to | Example |
|-------|---------|---------|
| `@pages/*` | `lib/pages/*` | `import { LoginPage } from '@pages/03.iportal/login.page'` |
| `@helper/*` | `lib/helpers/*` | `import { HelperCommonPaygate } from '@helper/00.paygate/common.helper'` |
| `@fixtures/*` | `lib/fixture/*` | `import { test, expect } from '@fixtures/index'` |
| `@type/*` | `lib/types/*` | `import { PaymentType } from '@type/payment'` |
| `@utils/*` | `lib/utils/*` | `import { navigateIPortalMenu } from '@lib/utils/common'` |

## File Design Rules

- **Pages (`lib/pages/`):** Contains only Getter properties returning `Locator`. Never write business logic (click, fill) in Page classes. Prefer semantic locators.
- **Helpers (`lib/helpers/`):** Contains business logic methods, calls locators from Page classes. Never use Helpers directly in test files — always wrap via **Custom Fixtures**.
- **Tests (`tests/`):** Only import the composed fixture from `@fixtures/index` and call helpers/strategies. Never write locators or complex business logic here.
