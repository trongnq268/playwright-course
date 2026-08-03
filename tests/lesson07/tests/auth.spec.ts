import { test, expect } from "@playwright/test";
import {
    userRegisterData,
    EXISTING_EMAIL_DATA,
    VALID_LOGIN_DATA,
    INVALID_LOGIN_DATA,
    userAddressData
} from "../data/userData";
import { AuthLocators } from "../locators/authLocators";



test.describe('Lesson 07', () => {

    test.beforeEach(async ({ page }) => {
        const locators = AuthLocators(page);
        // 1. Mở trình duyệt & 2. Truy cập URL
        await page.goto(locators.automationexerciseLink);
        await expect(locators.signupLoginLink).toBeVisible();
    })

    test.afterEach(async ({ page }) => {
        const locators = AuthLocators(page);
        // Click nút "Delete Account"
        await locators.register_delete_account_button.click();
        // Xác minh dòng chữ "ACCOUNT DELETED!" hiển thị.
        await expect(locators.register_textAccountDeleted).toBeVisible();
    })

    test('Test Case 4: Đặt hàng — Đăng ký trong lúc Thanh toán', async ({ page }) => {
        const locators = AuthLocators(page);
        // 2. add sản phẩm vào cart
        await locators.cart_product.nth(0).click();
        // 3. Click nút View Cart
        await locators.cart_view_cart.click();
        // 4. Kiểm tra đã chuyển sang trang Checkout chưa
        await expect(locators.cart_process_to_checkout).toBeVisible();
        // 5. Click nút Proceed to checkout
        await locators.cart_process_to_checkout.click();
        // 6. CLick nút register
        await locators.cart_register_login_button.click();
        // 7. Sign up
        //Điền thông tin vào form "New User Signup"
        await locators.nameSignupInput.fill(userRegisterData.name);
        await locators.emailSignupInput.fill(userRegisterData.email);

        //Click button "Signup"
        await locators.signupButton.click();

        //Xác minh dòng chữ 'ENTER ACCOUNT INFORMATION' hiển thị
        await expect(locators.textUserSignupInformation1).toBeVisible();

        //Điền các thông tin đăng ký
        await locators.register_chk_gender.check();
        await locators.register_input_name.fill(userRegisterData.name);
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

        // 8. Click cart button
        await locators.cart_button.click();
        await locators.cart_process_to_checkout.click();

        //verify delivery address
        await expect(locators.delivery_addressContainer).toContainText(userAddressData.address);
        await expect(locators.deliver_address_city.nth(0)).toContainText(userAddressData.city + " " + userAddressData.state + " " + userAddressData.zipcode);
        await expect(locators.devlivery_address_country.nth(0)).toContainText(userAddressData.country);
        await expect(locators.delivery_address_mobile.nth(0)).toContainText(userAddressData.mobileNumber);

        // 9. Điền comment
        await locators.cart_comment.fill('comment');
        // 10. Click nút Place Order
        await locators.cart_place_order_button.click();
        // 11. Điền thông tin thẻ
        await locators.payment_name_on_card.fill(userAddressData.firstName);
        await locators.payment_card_number.fill('1234567890123456');
        await locators.payment_cvc.fill('123');
        await locators.payment_expiry_month.fill('12');
        await locators.payment_expiry_year.fill('2025');
        // 12. Click nút Pay
        await locators.payment_pay_button.click();

        // 13. Xác minh dòng chữ "Congratulations! Your order has been confirmed!" hiển thị.
        await expect(locators.payment_success_message).toBeVisible();



    });

    test('Test case 5: Xác nhận Thông tin địa chỉ ở trang Thanh toán', async ({ page }) => {
        const locators = AuthLocators(page);
        //Click nút sign in
        await locators.signupLoginLink.click();
        //Xác minh dòng chữ 'ENTER ACCOUNT INFORMATION' hiển thị
        await expect(locators.textNewUserSignup).toBeVisible();
        //Điền thông tin vào form "New User Signup"
        await locators.nameSignupInput.fill(userRegisterData.name);
        await locators.emailSignupInput.fill(userRegisterData.email);
        await locators.signupButton.click();


        //Điền các thông tin đăng ký
        await locators.register_chk_gender.check();
        await locators.register_input_name.fill(userRegisterData.name);
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

        //add sản phẩm vào cart
        await locators.cart_product.nth(0).click();
        //Click nút cart
        await locators.cart_button.click();
        //Click nút proceed to checkout
        await locators.cart_process_to_checkout.click();

        //Xác nhận địa chỉ giao hàng
        await expect(locators.delivery_addressContainer).toContainText(userAddressData.address);
        await expect(locators.deliver_address_city.nth(0)).toContainText(userAddressData.city + " " + userAddressData.state + " " + userAddressData.zipcode);
        await expect(locators.devlivery_address_country.nth(0)).toContainText(userAddressData.country);
        await expect(locators.delivery_address_mobile.nth(0)).toContainText(userAddressData.mobileNumber);


    })





});


