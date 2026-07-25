// Import Page của Playwright
import { Page } from "@playwright/test";

// Hàm trả về tất cả locator của màn hình Authentication
export const getAuthLocators = (page: Page) => ({

  // =====================================================
  // Trang chủ
  // =====================================================

  // Logo trang chủ
  homePageLogo: page.locator('img[alt="Website for automation practice"]'),

  // Nút Signup / Login
  signupLoginBtn: page.locator('a[href="/login"]'),

  // =====================================================
  // Form Signup
  // =====================================================

  // Tiêu đề New User Signup!
  signupTitle: page.getByText("New User Signup!"),

  // Ô nhập Name
  signupNameInput: page.locator('[data-qa="signup-name"]'),

  // Ô nhập Email (Form Signup)
  signupEmailInput: page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address"),

  // Nút Signup
  signupButton: page.locator('[data-qa="signup-button"]'),

  // =====================================================
  // Enter Account Information
  // =====================================================

  // Tiêu đề Enter Account Information
  accountTitle: page.getByText("Enter Account Information"),

  // Radio Mr.
  mrRadio: page.locator("#id_gender1"),

  // Radio Mrs.
  mrsRadio: page.locator("#id_gender2"),

  // Ô Password
  passwordInput: page.locator("#password"),

  // Dropdown Day
  daySelect: page.locator("#days"),

  // Dropdown Month
  monthSelect: page.locator("#months"),

  // Dropdown Year
  yearSelect: page.locator("#years"),

  // Checkbox Newsletter
  newsletterCheckbox: page.locator("#newsletter"),

  // Checkbox Receive Special Offers
  offersCheckbox: page.locator("#optin"),

  // =====================================================
  // Address Information
  // =====================================================

  // First Name
  firstName: page.locator("#first_name"),

  // Last Name
  lastName: page.locator("#last_name"),

  // Company
  company: page.locator("#company"),

  // Address
  address: page.locator("#address1"),

  // Address2
  address2: page.locator("#address2"),

  // Country
  country: page.locator("#country"),

  // State
  state: page.locator("#state"),

  // City
  city: page.locator("#city"),

  // Zipcode
  zipcode: page.locator("#zipcode"),

  // Mobile Number
  mobile: page.locator("#mobile_number"),

  // =====================================================
  // Button
  // =====================================================

  // Nút Create Account
  createAccountBtn: page.locator('[data-qa="create-account"]'),

  // Nút Continue
  continueBtn: page.locator('[data-qa="continue-button"]'),

  // =====================================================
  // Verify
  // =====================================================

  // ACCOUNT CREATED!
  accountCreatedText: page.getByText("ACCOUNT CREATED!"),

  // Logged in as username
  loggedInText: page.locator('a:has-text("Logged in as")'),

  // Delete Account
  deleteAccountBtn: page.getByRole("link", {
    name: "Delete Account",
  }),

  // ACCOUNT DELETED!
  accountDeletedText: page.getByText("ACCOUNT DELETED!"),

  // =====================================================
  // Login
  // =====================================================

  // Tiêu đề Login to your account
  loginTitle: page.getByText("Login to your account"),

  // Ô Email (Form Login)
  loginEmailInput: page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address"),

  // Ô Password
  loginPasswordInput: page.getByPlaceholder("Password"),

  // Nút Login
  loginButton: page.getByRole("button", {
    name: "Login",
  }),

  logoutBtn: page.getByRole("link", {
  name: "Logout",
}),

  // =====================================================
  // Error Message
  // =====================================================

  // Email đã tồn tại
  emailExistError: page.getByText("Email Address already exist!"),

  // Sai Email hoặc Password
  loginError: page.getByText("Your email or password is incorrect!"),

});