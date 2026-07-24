import { Page } from "@playwright/test";

export const getRegisterLocators = (page: Page) => ({

  // ===== Signup =====

  nameInput: page.getByPlaceholder("Name"),

  emailInput: page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address"),

  signupButton: page.getByRole("button", {
    name: "Signup",
  }),

  // ===== Account Information =====

  accountTitle: page.getByText("ENTER ACCOUNT INFORMATION"),

  mrRadio: page.locator("#id_gender1"),

  passwordInput: page.locator("#password"),

  daySelect: page.locator("#days"),

  monthSelect: page.locator("#months"),

  yearSelect: page.locator("#years"),

  newsletterCheckbox: page.locator("#newsletter"),

  offersCheckbox: page.locator("#optin"),

  // ===== Address Information =====

  firstName: page.locator('[data-qa="first_name"]'),

  lastName: page.locator('[data-qa="last_name"]'),

  company: page.locator('[data-qa="company"]'),

  address: page.locator('[data-qa="address"]'),

  address2: page.locator('[data-qa="address2"]'),

  country: page.locator("#country"),

  state: page.locator('[data-qa="state"]'),

  city: page.locator('[data-qa="city"]'),

  zipcode: page.locator('[data-qa="zipcode"]'),

  mobile: page.locator('[data-qa="mobile_number"]'),

  // ===== Create Account =====

  createAccountBtn: page.locator('[data-qa="create-account"]'),

  accountCreated: page.getByText("ACCOUNT CREATED!"),

  continueBtn: page.locator('[data-qa="continue-button"]'),

  // ===== Home =====

  loggedInText: page.locator('a:has-text("Logged in as")'),

  deleteAccountBtn: page.getByRole("link", {
    name: "Delete Account",
  }),

  // ===== Delete =====

  accountDeletedText: page.getByText("ACCOUNT DELETED!"),
});