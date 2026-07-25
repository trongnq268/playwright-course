import { test, expect } from "@playwright/test";
import { getRegisterLocators } from "../locators/register.locators";
import { registerAccount } from "../data/account";

test("Register User", async ({ page }) => {

  // ===========================
  //true  -> Đăng ký và xóa tài khoản
  // false -> Chỉ đăng ký, giữ lại tài khoản để chạy Login
  // ===========================
  const deleteAccount = true;

  await page.goto("https://automationexercise.com/login");

  const registerUI = getRegisterLocators(page);

  // Signup
  await registerUI.nameInput.fill(registerAccount.name);

  await registerUI.emailInput.fill(registerAccount.email);

  await registerUI.signupButton.click();

  // Verify Enter Account Information
  await expect(registerUI.accountTitle).toBeVisible();

  // Account Information
  await registerUI.mrRadio.check();

  await registerUI.passwordInput.fill(registerAccount.password);

  await registerUI.daySelect.selectOption("10");
  await registerUI.monthSelect.selectOption("5");
  await registerUI.yearSelect.selectOption("2000");

  await registerUI.newsletterCheckbox.check();
  await registerUI.offersCheckbox.check();

  // Address
  await registerUI.firstName.fill(registerAccount.firstName);
  await registerUI.lastName.fill(registerAccount.lastName);
  await registerUI.company.fill(registerAccount.company);

  await registerUI.address.fill(registerAccount.address);
  await registerUI.address2.fill(registerAccount.address2);

  await registerUI.country.selectOption(registerAccount.country);

  await registerUI.state.fill(registerAccount.state);
  await registerUI.city.fill(registerAccount.city);
  await registerUI.zipcode.fill(registerAccount.zipcode);
  await registerUI.mobile.fill(registerAccount.mobile);

  // Create Account
  await registerUI.createAccountBtn.click();

  // Verify ACCOUNT CREATED!
  await expect(registerUI.accountCreated).toBeVisible();

  // Continue
  await registerUI.continueBtn.click();

  // Verify Logged in as username
  await expect(registerUI.loggedInText).toBeVisible();

  await page.waitForTimeout(3000);

  // Delete Account (nếu bật)
  if (deleteAccount) {

    await registerUI.deleteAccountBtn.click();

    await expect(registerUI.accountDeletedText).toBeVisible();

    await page.waitForTimeout(3000);

    await registerUI.continueBtn.click();
  }

});