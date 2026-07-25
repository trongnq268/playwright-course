import { test, expect } from "@playwright/test";
import { getLoginLocators } from "../locators/login.locators";
import { loginAccount } from "../data/account";

test("Login User", async ({ page }) => {

  await page.goto("https://automationexercise.com/login");

  const loginUI = getLoginLocators(page);

  // Verify Login to your account
  await expect(loginUI.loginTitle).toBeVisible();

  // Email
  await loginUI.emailInput.fill(loginAccount.email);

  // Password
  await loginUI.passwordInput.fill(loginAccount.password);

  // Login
  await loginUI.loginButton.click();

  // Verify Logged in as username
  await expect(loginUI.loggedInText).toBeVisible();

});