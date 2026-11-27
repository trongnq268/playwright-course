import { test as base, expect } from '@playwright/test';

import { IUserRegister } from '../types/user.interface';
import { CartCheckoutLocators } from '../locators/cartLocator';
import {
    generateUser,
    registerUser
} from '../helpers/generateUser';

type AuthFixture = {
    registeredUser: IUserRegister;
};

export const test = base.extend<AuthFixture>({

    registeredUser: async ({ page }, use) => {

        // Generate user
        const user = generateUser();

        // Register account
        await registerUser(page, user);

        // Truyền user cho testcase
        await use(user);

        // Cleanup
        const deleteButton = page.locator(
            CartCheckoutLocators.deleteAccountBtn
        );

        if (await deleteButton.isVisible()) {

            await deleteButton.click();

            await expect(
                page.locator(
                    CartCheckoutLocators.accountDeleted
                )
            ).toBeVisible();

            await page
                .locator(CartCheckoutLocators.continueBtn)
                .click();
        }

    }

});

export { expect };