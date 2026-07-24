import { Page } from "@playwright/test";

export const getLoginLocators = (page: Page) => ({

  loginTitle: page.getByText("Login to your account"),

  emailInput: page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address"),

  passwordInput: page.getByPlaceholder("Password"),

  loginButton: page.getByRole("button", {
    name: "Login",
  }),

  loggedInText: page.locator('a:has-text("Logged in as")'),

});