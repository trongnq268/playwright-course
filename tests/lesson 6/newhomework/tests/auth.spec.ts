import { test, expect, Page } from "@playwright/test";
import { getAuthLocators } from "../locators/authLocators";

import {
  VALID_REGISTER_DATA,
  EXISTING_EMAIL_DATA,
  INVALID_LOGIN_DATA,
} from "../data/userData";

// =====================================================
// Hàm đăng ký tài khoản
// =====================================================
async function registerUser(page: Page) {
  const authUI = getAuthLocators(page);

  // Sinh email mới mỗi lần chạy
  const email = `huong_${Date.now()}@gmail.com`;

  // Mở website
  await page.goto("https://automationexercise.com");

  // Verify Home Page
  await expect(authUI.homePageLogo).toBeVisible();

  // Click Signup / Login
  await authUI.signupLoginBtn.click();

  // Verify Signup Page
  await expect(authUI.signupTitle).toBeVisible();

  // Nhập Name
  await authUI.signupNameInput.fill(
    VALID_REGISTER_DATA.name
  );

  // Nhập Email
  await authUI.signupEmailInput.fill(email);

  // Click Signup
  await authUI.signupButton.click();

  // Verify Enter Account Information
  await expect(authUI.accountTitle).toBeVisible();

  // Gender
  await authUI.mrRadio.check();

  // Password
  await authUI.passwordInput.fill(
    VALID_REGISTER_DATA.password
  );

  // Date Of Birth
  await authUI.daySelect.selectOption(
    VALID_REGISTER_DATA.day
  );

  await authUI.monthSelect.selectOption(
    VALID_REGISTER_DATA.month
  );

  await authUI.yearSelect.selectOption(
    VALID_REGISTER_DATA.year
  );

  // Newsletter
  await authUI.newsletterCheckbox.check();

  // Special Offers
  await authUI.offersCheckbox.check();

  // Address Information
  await authUI.firstName.fill(
    VALID_REGISTER_DATA.address.firstName
  );

  await authUI.lastName.fill(
    VALID_REGISTER_DATA.address.lastName
  );

  await authUI.company.fill(
    VALID_REGISTER_DATA.address.company ?? ""
  );

  await authUI.address.fill(
    VALID_REGISTER_DATA.address.address
  );

  await authUI.address2.fill(
    VALID_REGISTER_DATA.address.address2
  );

  await authUI.country.selectOption(
    VALID_REGISTER_DATA.address.country
  );

  await authUI.state.fill(
    VALID_REGISTER_DATA.address.state
  );

  await authUI.city.fill(
    VALID_REGISTER_DATA.address.city
  );

  await authUI.zipcode.fill(
    VALID_REGISTER_DATA.address.zipcode
  );

  await authUI.mobile.fill(
    VALID_REGISTER_DATA.address.mobile
  );

  // Create Account
  await authUI.createAccountBtn.click();

  // Verify Account Created
  await expect(authUI.accountCreatedText).toBeVisible();

  // Continue
  await authUI.continueBtn.click();

  // Verify Logged In
  await expect(authUI.loggedInText).toBeVisible();

  // Trả về tài khoản vừa tạo
  return {
    email,
    password: VALID_REGISTER_DATA.password,
  };
}

// =====================================================
// Test Suite
// =====================================================
test.describe("Authentication", () => {

  // ===================================================
  // TC01 - Register User
  // ===================================================
  test("TC01 - Register User", async ({ page }) => {

    await registerUser(page);

  });

  // ===================================================
  // TC02 - Register Existing Email
  // ===================================================
  test("TC02 - Register Existing Email", async ({ page }) => {

    const authUI = getAuthLocators(page);

    await page.goto("https://automationexercise.com");

    await expect(authUI.homePageLogo).toBeVisible();

    await authUI.signupLoginBtn.click();

    await expect(authUI.signupTitle).toBeVisible();

    await authUI.signupNameInput.fill(
      EXISTING_EMAIL_DATA.name
    );

    await authUI.signupEmailInput.fill(
      EXISTING_EMAIL_DATA.email
    );

    await authUI.signupButton.click();

    await expect(authUI.emailExistError).toBeVisible();

  });

  // ===================================================
  // TC03 - Login User with Correct Email and Password
  // ===================================================
  test("TC03 - Login User with correct email and password", async ({ page }) => {

    const authUI = getAuthLocators(page);

    // Đăng ký account mới
    const account = await registerUser(page);

    // Logout
    await expect(authUI.logoutBtn).toBeVisible();
    await authUI.logoutBtn.click();

    // Verify Login Page
    await expect(authUI.loginTitle).toBeVisible();

    // Login
    await authUI.loginEmailInput.fill(account.email);

    await authUI.loginPasswordInput.fill(account.password);

    await authUI.loginButton.click();

    // Verify Login Success
    await expect(authUI.loggedInText).toBeVisible();

  });

  // ===================================================
  // TC04 - Login User with Incorrect Email and Password
  // ===================================================
  test("TC04 - Login User with incorrect email and password", async ({ page }) => {

    const authUI = getAuthLocators(page);

    await page.goto("https://automationexercise.com");

    await expect(authUI.homePageLogo).toBeVisible();

    await authUI.signupLoginBtn.click();

    await expect(authUI.loginTitle).toBeVisible();

    await authUI.loginEmailInput.fill(
      INVALID_LOGIN_DATA.email
    );

    await authUI.loginPasswordInput.fill(
      INVALID_LOGIN_DATA.password
    );

    await authUI.loginButton.click();

    await expect(authUI.loginError).toBeVisible();

  });

});