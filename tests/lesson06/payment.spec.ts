//1. types/user.interface.ts
// Interface cho Địa chỉ & Thông tin cá nhân
export interface IAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

// Interface cho thông tin đăng ký
export interface IUserRegister extends IAddress {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  title: 'Mr' | 'Mrs';
  newsletter: boolean;
  specialOffers: boolean;
}

// Interface đăng nhập
export interface IUserLogin {
  email: string;
  password: string;
}

//2. data/userData.ts
import { IUserRegister, IUserLogin } from "../types/user.interface";

export const VALID_REGISTER_DATA: IUserRegister = {
  name: "Hoc Vien Auto",
  email: `user_${Date.now()}@gmail.com`,
  password: "MatKhau123!",

  day: "15",
  month: "8",
  year: "1998",

  title: "Mr",

  newsletter: true,
  specialOffers: true,

  firstName: "Hoc",
  lastName: "Vien",
  company: "OnePay",

  address: "123 Nguyen Trai",
  address2: "Tang 5",

  country: "India",

  state: "Ha Noi",

  city: "Thanh Xuan",

  zipcode: "100000",

  mobileNumber: "0988888888",
};

export const EXISTING_EMAIL_DATA = {
  name: "Hoc Vien Auto",
  email: "email_da_ton_tai@gmail.com",
};

export const VALID_LOGIN_DATA: IUserLogin = {
  email: "tai_khoan_hop_le@gmail.com",
  password: "MatKhauDung123",
};

export const INVALID_LOGIN_DATA: IUserLogin = {
  email: "email_sai@gmail.com",
  password: "MatKhauSai123",
};

//3. locators/authLocators.ts
export const AuthLocators = {

  // Home
  homePageLogo: 'img[alt="Website for automation practice"]',
  signupLoginBtn: 'a[href="/login"]',
  deleteAccountBtn: 'a[href="/delete_account"]',
  continueBtn: '[data-qa="continue-button"]',

  loggedInUserText: (username: string) =>
    `text=Logged in as ${username}`,

  // Signup

  signupHeader: 'h2:has-text("New User Signup!")',
  signupNameInput: '[data-qa="signup-name"]',
  signupEmailInput: '[data-qa="signup-email"]',
  signupBtn: '[data-qa="signup-button"]',

  // Account

  enterAccountInfo: 'text=Enter Account Information',

  titleMr: '#id_gender1',
  titleMrs: '#id_gender2',

  passwordInput: '#password',

  dayDropdown: '#days',
  monthDropdown: '#months',
  yearDropdown: '#years',

  newsletterCheckbox: '#newsletter',
  offerCheckbox: '#optin',

  firstNameInput: '#first_name',
  lastNameInput: '#last_name',
  companyInput: '#company',
  addressInput: '#address1',
  address2Input: '#address2',

  countryDropdown: '#country',

  stateInput: '#state',
  cityInput: '#city',
  zipcodeInput: '#zipcode',
  mobileInput: '#mobile_number',

  createAccountBtn: '[data-qa="create-account"]',

  accountCreated: 'text=ACCOUNT CREATED!',
  accountDeleted: 'text=ACCOUNT DELETED!',

  // Login

  loginHeader: 'text=Login to your account',

  loginEmailInput: '[data-qa="login-email"]',

  loginPasswordInput: '[data-qa="login-password"]',

  loginBtn: '[data-qa="login-button"]',

  existingEmailError: 'text=Email Address already exist!',

  loginError: 'text=Your email or password is incorrect!',
};

//4. tests/auth.spec.ts
import { test, expect } from "@playwright/test";

import { AuthLocators } from "../locators/authLocators";

import {
  VALID_REGISTER_DATA,
  EXISTING_EMAIL_DATA,
  VALID_LOGIN_DATA,
  INVALID_LOGIN_DATA,
} from "../data/userData";

test.describe("Authentication", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await expect(page.locator(AuthLocators.homePageLogo)).toBeVisible();
  });

  test("TC01 - Register User", async ({ page }) => {

    await page.click(AuthLocators.signupLoginBtn);

    await expect(page.locator(AuthLocators.signupHeader)).toBeVisible();

    await page.fill(
      AuthLocators.signupNameInput,
      VALID_REGISTER_DATA.name
    );

    await page.fill(
      AuthLocators.signupEmailInput,
      VALID_REGISTER_DATA.email
    );

    await page.click(AuthLocators.signupBtn);

    await expect(page.locator(AuthLocators.enterAccountInfo)).toBeVisible();

    if (VALID_REGISTER_DATA.title === "Mr") {
      await page.check(AuthLocators.titleMr);
    }

    await page.fill(
      AuthLocators.passwordInput,
      VALID_REGISTER_DATA.password
    );

    await page.selectOption(
      AuthLocators.dayDropdown,
      VALID_REGISTER_DATA.day
    );

    await page.selectOption(
      AuthLocators.monthDropdown,
      VALID_REGISTER_DATA.month
    );

    await page.selectOption(
      AuthLocators.yearDropdown,
      VALID_REGISTER_DATA.year
    );

    if (VALID_REGISTER_DATA.newsletter)
      await page.check(AuthLocators.newsletterCheckbox);

    if (VALID_REGISTER_DATA.specialOffers)
      await page.check(AuthLocators.offerCheckbox);

    await page.fill(
      AuthLocators.firstNameInput,
      VALID_REGISTER_DATA.firstName
    );

    await page.fill(
      AuthLocators.lastNameInput,
      VALID_REGISTER_DATA.lastName
    );

    await page.fill(
      AuthLocators.companyInput,
      VALID_REGISTER_DATA.company!
    );

    await page.fill(
      AuthLocators.addressInput,
      VALID_REGISTER_DATA.address
    );

    await page.fill(
      AuthLocators.address2Input,
      VALID_REGISTER_DATA.address2!
    );

    await page.selectOption(
      AuthLocators.countryDropdown,
      VALID_REGISTER_DATA.country
    );

    await page.fill(
      AuthLocators.stateInput,
      VALID_REGISTER_DATA.state
    );

    await page.fill(
      AuthLocators.cityInput,
      VALID_REGISTER_DATA.city
    );

    await page.fill(
      AuthLocators.zipcodeInput,
      VALID_REGISTER_DATA.zipcode
    );

    await page.fill(
      AuthLocators.mobileInput,
      VALID_REGISTER_DATA.mobileNumber
    );

    await page.click(AuthLocators.createAccountBtn);

    await expect(page.locator(AuthLocators.accountCreated)).toBeVisible();

    await page.click(AuthLocators.continueBtn);

    await expect(
      page.locator(AuthLocators.loggedInUserText(VALID_REGISTER_DATA.name))
    ).toBeVisible();

    await page.click(AuthLocators.deleteAccountBtn);

    await expect(page.locator(AuthLocators.accountDeleted)).toBeVisible();
  });

  test("TC02 - Register existing email", async ({ page }) => {

    await page.click(AuthLocators.signupLoginBtn);

    await page.fill(
      AuthLocators.signupNameInput,
      EXISTING_EMAIL_DATA.name
    );

    await page.fill(
      AuthLocators.signupEmailInput,
      EXISTING_EMAIL_DATA.email
    );

    await page.click(AuthLocators.signupBtn);

    await expect(
      page.locator(AuthLocators.existingEmailError)
    ).toBeVisible();
  });

  test("TC03 - Login success", async ({ page }) => {

    await page.click(AuthLocators.signupLoginBtn);

    await page.fill(
      AuthLocators.loginEmailInput,
      VALID_LOGIN_DATA.email
    );

    await page.fill(
      AuthLocators.loginPasswordInput,
      VALID_LOGIN_DATA.password
    );

    await page.click(AuthLocators.loginBtn);

    await expect(
      page.locator(AuthLocators.loggedInUserText("Hoc Vien Auto"))
    ).toBeVisible();
  });

  test("TC04 - Login failed", async ({ page }) => {

    await page.click(AuthLocators.signupLoginBtn);

    await page.fill(
      AuthLocators.loginEmailInput,
      INVALID_LOGIN_DATA.email
    );

    await page.fill(
      AuthLocators.loginPasswordInput,
      INVALID_LOGIN_DATA.password
    );

    await page.click(AuthLocators.loginBtn);

    await expect(
      page.locator(AuthLocators.loginError)
    ).toBeVisible();
  });

});

