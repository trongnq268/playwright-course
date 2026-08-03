import { test as base, expect } from "@playwright/test";
import { IUserRegister, IUserLogin, IAddress } from "../types/user.interface";
import { generateUser } from "../helpers/test-data.helper";
import { AuthLocators } from "../locators/authLocators";
import { userAddressData } from "../data/userData";


type AuthFixture = {
    registeredUser: IUserRegister;
}

export const test = base.extend<AuthFixture>({

    registeredUser: async ({ page }, use) => {
        const locators = AuthLocators(page);
        const newUser = generateUser();

        // 1. Go to website
        await page.goto(locators.automationexerciseLink);

        // 2. Signup process
        await locators.signupLoginLink.click();
        await expect(locators.textNewUserSignup).toBeVisible();

        await locators.nameSignupInput.fill(newUser.name);
        await locators.emailSignupInput.fill(newUser.email);
        await locators.signupButton.click();

        await expect(locators.textUserSignupInformation1).toBeVisible();

        await locators.register_chk_gender.check();
        await locators.register_input_password.fill(newUser.password);
        await locators.register_input_day.selectOption(newUser.day);
        await locators.register_input_month.selectOption(newUser.month);
        await locators.register_input_year.selectOption(newUser.year);
        await locators.register_chk_newsletter.check();
        await locators.register_chk_receive_special_offers.check();

        // Address data
        await locators.register_first_name.fill(userAddressData.firstName);
        await locators.register_last_name.fill(userAddressData.lastName);
        await locators.register_address.fill(userAddressData.address);
        await locators.register_country.selectOption(userAddressData.country);
        await locators.register_state.fill(userAddressData.state);
        await locators.register_city.fill(userAddressData.city);
        await locators.register_zipcode.fill(userAddressData.zipcode);
        await locators.register_mobile.fill(userAddressData.mobileNumber);

        await locators.register_create_account_button.click();
        await expect(locators.register_textAccountCreated).toBeVisible();

        await locators.register_continue_button.click();
        await expect(locators.textLoginSuccessName(newUser.name)).toBeVisible();
        await use(newUser);

        // 4. Delete Account (Post-condition)
        await locators.register_delete_account_button.click();
        await expect(locators.register_textAccountDeleted).toBeVisible();
    }
});
export { expect } from '@playwright/test';

