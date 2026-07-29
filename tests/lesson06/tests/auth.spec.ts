import { test, expect } from '@playwright/test';

import { AuthLocators } from '../locators/authLocators';

import {
    REGISTER_DATA,
    EXISTING_USER_DATA
} from '../data/userData';

test.describe('Automation Exercise - Authentication', () => {

    test.describe.configure({ mode: 'serial' });

    // Bước 1 -> 3 của tất cả testcase
    test.beforeEach(async ({ page }) => {

        await page.goto('https://automationexercise.com');

        await expect(page.locator(AuthLocators.homeLogo)).toBeVisible();

    });

    //=====================================
    // REGISTER
    //=====================================

    test.describe('Register', () => {

        test('TC01 - Register User', async ({ page }) => {
            // Click button Signup/Login
            await page.locator(AuthLocators.signupLoginBtn).click();
            await expect(page.locator(AuthLocators.signupHeader)).toBeVisible();
            await page.locator(AuthLocators.signupName).fill(REGISTER_DATA.name);
            await page.locator(AuthLocators.signupEmail).fill(REGISTER_DATA.email);
            await page.locator(AuthLocators.signupBtn).click();
            await expect(page.locator(AuthLocators.accountInfoHeader)).toBeVisible();
            if (REGISTER_DATA.title === 'Mr') {
                await page.locator(AuthLocators.mrRadio).check();
            } else {
                await page.locator(AuthLocators.mrsRadio).check();
            }
            await page.locator(AuthLocators.password).fill(REGISTER_DATA.password);
            await page.locator(AuthLocators.day).selectOption(REGISTER_DATA.day);
            await page.locator(AuthLocators.month).selectOption(REGISTER_DATA.month);
            await page.locator(AuthLocators.year).selectOption(REGISTER_DATA.year);

            if (REGISTER_DATA.newsletter) {
                await page.locator(AuthLocators.newsletter).check();
            }

            if (REGISTER_DATA.specialOffers) {
                await page.locator(AuthLocators.specialOffer).check();
            }

            await page.locator(AuthLocators.firstName).fill(REGISTER_DATA.address.firstName);
            await page.locator(AuthLocators.lastName).fill(REGISTER_DATA.address.lastName);
            await page.locator(AuthLocators.company).fill(REGISTER_DATA.address.company ?? '');
            await page.locator(AuthLocators.address1).fill(REGISTER_DATA.address.address1);
            await page.locator(AuthLocators.address2).fill(REGISTER_DATA.address.address2 ?? '');
            await page.locator(AuthLocators.country).selectOption(REGISTER_DATA.address.country);
            await page.locator(AuthLocators.state).fill(REGISTER_DATA.address.state);
            await page.locator(AuthLocators.city).fill(REGISTER_DATA.address.city);
            await page.locator(AuthLocators.zipcode).fill(REGISTER_DATA.address.zipcode);
            await page.locator(AuthLocators.mobile).fill(REGISTER_DATA.address.mobileNumber);
            await page.locator(AuthLocators.createAccount).click();
            await expect(page.locator(AuthLocators.accountCreated)).toBeVisible();

            await page.locator(AuthLocators.continueBtn).click();
            await expect(page.locator(AuthLocators.loggedInAs(REGISTER_DATA.name))).toBeVisible();
        });

        test('TC02 - Register Existing Email', async ({ page }) => {

            await page.locator(AuthLocators.signupLoginBtn).click();
            await expect(page.locator(AuthLocators.signupHeader)).toBeVisible();
            await page.locator(AuthLocators.signupName).fill(EXISTING_USER_DATA.name);

            await page.locator(AuthLocators.signupEmail).fill(EXISTING_USER_DATA.email);

            await page.locator(AuthLocators.signupBtn).click();
            await expect(page.locator(AuthLocators.existingEmailError)).toBeVisible();

        });

    });

    //=====================================
    // LOGIN
    //=====================================

    test.describe('Login', () => {

        test('TC03 - Login Success', async ({ page }) => {

            await page.locator(AuthLocators.signupLoginBtn).click();
            await expect(page.locator(AuthLocators.loginHeader)).toBeVisible();
            await page.locator(AuthLocators.loginEmail).fill(EXISTING_USER_DATA.email);
            await page.locator(AuthLocators.loginPassword).fill(EXISTING_USER_DATA.password);
            await page.locator(AuthLocators.loginBtn).click();

            await expect(page.locator(AuthLocators.loggedInAs(EXISTING_USER_DATA.name))).toBeVisible();
            await page.locator(AuthLocators.deleteAccountBtn).click();
            await expect(page.locator(AuthLocators.accountDeleted)).toBeVisible();

        });

        test('TC04 - Login Failed', async ({ page }) => {

            await page.locator(AuthLocators.signupLoginBtn).click();

            await expect(page.locator(AuthLocators.loginHeader)).toBeVisible();

            await page.locator(AuthLocators.loginEmail).fill(EXISTING_USER_DATA.email);

            await page.locator(AuthLocators.loginPassword).fill(EXISTING_USER_DATA.password);

            await page.locator(AuthLocators.loginBtn).click();

            await expect(
                page.locator(AuthLocators.loginError)
            ).toBeVisible();

        });

    });

});