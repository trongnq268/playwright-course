import { expect, Page } from '@playwright/test';

import { IUserRegister } from '../types/user.interface';
import { PAYMENT } from '../data/userData';
import { CartCheckoutLocators } from '../locators/cartLocator';

// =====================================================
// Generate User
// =====================================================

export function generateUser(): IUserRegister {

    const timestamp = Date.now();

    return {

        title: 'Mr',

        name: `User${timestamp}`,

        email: `user${timestamp}@gmail.com`,

        password: 'Password@123',

        day: '10',

        month: '5',

        year: '1998',

        newsletter: true,

        specialOffers: true,

        address: {

            firstName: 'Duong',

            lastName: 'Hoi',

            company: 'OpenAI',

            address1: '123 Nguyen Trai',

            address2: 'Thanh Xuan',

            country: 'Canada',

            state: 'Ha Noi',

            city: 'Ha Noi',

            zipcode: '100000',

            mobileNumber: '0987654321'

        }

    };

}

// =====================================================
// Register User
// =====================================================

export async function registerUser(
    page: Page,
    user: IUserRegister
) {

    await page.goto('https://automationexercise.com');

    await expect(
        page.locator(CartCheckoutLocators.homeLogo)
    ).toBeVisible();

    await page
        .locator(CartCheckoutLocators.signupLoginBtn)
        .click();

    await expect(
        page.locator(CartCheckoutLocators.signupHeader)
    ).toBeVisible();

    await page
        .locator(CartCheckoutLocators.signupName)
        .fill(user.name);

    await page
        .locator(CartCheckoutLocators.signupEmail)
        .fill(user.email);

    await page
        .locator(CartCheckoutLocators.signupBtn)
        .click();

    await expect(
        page.locator(CartCheckoutLocators.accountInfoHeader)
    ).toBeVisible();

    if (user.title === 'Mr') {

        await page
            .locator(CartCheckoutLocators.mrRadio)
            .check();

    } else {

        await page
            .locator(CartCheckoutLocators.mrsRadio)
            .check();

    }

    await page
        .locator(CartCheckoutLocators.password)
        .fill(user.password);

    await page
        .locator(CartCheckoutLocators.day)
        .selectOption(user.day);

    await page
        .locator(CartCheckoutLocators.month)
        .selectOption(user.month);

    await page
        .locator(CartCheckoutLocators.year)
        .selectOption(user.year);

    if (user.newsletter) {

        await page
            .locator(CartCheckoutLocators.newsletter)
            .check();

    }

    if (user.specialOffers) {

        await page
            .locator(CartCheckoutLocators.specialOffer)
            .check();

    }

    await page
        .locator(CartCheckoutLocators.firstName)
        .fill(user.address.firstName);

    await page
        .locator(CartCheckoutLocators.lastName)
        .fill(user.address.lastName);

    await page
        .locator(CartCheckoutLocators.company)
        .fill(user.address.company ?? '');

    await page
        .locator(CartCheckoutLocators.address1)
        .fill(user.address.address1);

    await page
        .locator(CartCheckoutLocators.address2)
        .fill(user.address.address2 ?? '');

    await page
        .locator(CartCheckoutLocators.country)
        .selectOption(user.address.country);

    await page
        .locator(CartCheckoutLocators.state)
        .fill(user.address.state);

    await page
        .locator(CartCheckoutLocators.city)
        .fill(user.address.city);

    await page
        .locator(CartCheckoutLocators.zipcode)
        .fill(user.address.zipcode);

    await page
        .locator(CartCheckoutLocators.mobileNumber)
        .fill(user.address.mobileNumber);

    await page
        .locator(CartCheckoutLocators.createAccountBtn)
        .click();

    await expect(
        page.locator(CartCheckoutLocators.accountCreated)
    ).toBeVisible();

    await page
        .locator(CartCheckoutLocators.continueBtn)
        .click();

    await expect(
        page.locator(
            CartCheckoutLocators.loggedInAs(user.name)
        )
    ).toBeVisible();

}

// =====================================================
// Add First Product To Cart
// =====================================================

export async function addFirstProductToCart(page: Page) {

    await page
        .locator(CartCheckoutLocators.productsBtn)
        .click();

    await expect(page).toHaveURL(/products/);

    const firstProduct = page
        .locator(CartCheckoutLocators.productList)
        .first();

    await firstProduct.scrollIntoViewIfNeeded();

    await firstProduct.hover();

    await firstProduct
        .locator('a.add-to-cart')
        .last()
        .click();

}

// =====================================================
// Fill Payment
// =====================================================

export async function fillPayment(page: Page) {

    await page
        .locator(CartCheckoutLocators.nameOnCard)
        .fill(PAYMENT.nameOnCard);

    await page
        .locator(CartCheckoutLocators.cardNumber)
        .fill(PAYMENT.cardNumber);

    await page
        .locator(CartCheckoutLocators.cvc)
        .fill(PAYMENT.cvc);

    await page
        .locator(CartCheckoutLocators.expiryMonth)
        .fill(PAYMENT.expiryMonth);

    await page
        .locator(CartCheckoutLocators.expiryYear)
        .fill(PAYMENT.expiryYear);

    await page
        .locator(CartCheckoutLocators.payNowBtn)
        .click();

}