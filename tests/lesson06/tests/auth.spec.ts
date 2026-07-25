import { test, expect } from "@playwright/test";
import {
    userRegisterData,
    EXISTING_EMAIL_DATA,
    VALID_LOGIN_DATA,
    INVALID_LOGIN_DATA,
    userAddressData
} from "../data/userData";
import { AuthLocators } from "../locators/authLocators";



test.describe('Quản lý Đăng ký và Đăng nhập', () => {

    test('Test Case 1: Đăng ký người dùng', async ({ page }) => {
        const locators = AuthLocators(page);
        // 1. Mở trình duyệt & 2. Truy cập URL
        await page.goto(locators.automationexerciseLink);
        await expect(locators.signupLoginLink).toBeVisible();

        //3. Click vào tab "Signup / Login"
        await locators.signupLoginLink.click();

        //4. Kiểm tra đã chuyển sang trang Signup/Login chưa
        await expect(locators.textNewUserSignup).toBeVisible();

        //5. Điền thông tin vào form "New User Signup"
        await locators.nameSignupInput.fill(userRegisterData.name);
        await locators.emailSignupInput.fill(userRegisterData.email);

        //6. Click button "Signup"
        await locators.signupButton.click();

        //7. Xác minh dòng chữ 'ENTER ACCOUNT INFORMATION' hiển thị
        await expect(locators.textUserSignupInformation1).toBeVisible();

        //8 Điền các thông tin đăng ký
        await locators.register_chk_gender.check();
        await locators.register_input_name.fill(userRegisterData.name);
        // await locators.register_input_email.fill(userRegisterData.email);
        await locators.register_input_password.fill(userRegisterData.password);
        await locators.register_input_day.selectOption(userRegisterData.day);
        await locators.register_input_month.selectOption(userRegisterData.month);
        await locators.register_input_year.selectOption(userRegisterData.year);
        await locators.register_chk_newsletter.check();
        await locators.register_chk_receive_special_offers.check();
        await locators.register_first_name.fill(userAddressData.firstName);
        await locators.register_last_name.fill(userAddressData.lastName);
        await locators.register_address.fill(userAddressData.address);
        await locators.register_country.selectOption(userAddressData.country);
        await locators.register_state.fill(userAddressData.state);
        await locators.register_city.fill(userAddressData.city);
        await locators.register_zipcode.fill(userAddressData.zipcode);
        await locators.register_mobile.fill(userAddressData.mobileNumber);

        await locators.register_create_account_button.click();
        //Xác minh dòng chữ 'ACCOUNT CREATED!' hiển thị.
        await expect(locators.register_textAccountCreated).toBeVisible();
        //Click nút "Continue"
        await locators.register_continue_button.click();
        //Xác minh đã đăng nhập thành công
        await expect(locators.textLoginSuccessName(userRegisterData.name)).toBeVisible();

        //9. Click vào nút "Delete Account"
        await locators.register_delete_account_button.click();

        //Xác minh dòng chữ 'ACCOUNT DELETED!' hiển thị.
        await expect(locators.register_textAccountDeleted).toBeVisible();

    });

});


