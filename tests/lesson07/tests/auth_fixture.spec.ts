import { test, expect } from "../fixtures/auth.fixture";
import {
    userRegisterData,
    EXISTING_EMAIL_DATA,
    VALID_LOGIN_DATA,
    INVALID_LOGIN_DATA,
    userAddressData
} from "../data/userData";
import { AuthLocators } from "../locators/authLocators";



test.describe('Lesson 07', () => {

    test('Test Case 4: Đặt hàng — Đăng ký trong lúc Thanh toán', async ({ page, registeredUser }) => {
        const locators = AuthLocators(page);

        // 8. Click product button
        await locators.product_button.click();
        //add product
        await locators.cart_product.nth(0).click();
        // Click nút View Cart
        await locators.cart_view_cart.click();
        // Kiểm tra đã chuyển sang trang Checkout chưa
        await expect(locators.cart_process_to_checkout).toBeVisible();
        // Click nút Proceed to checkout
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

    test('Test case 5: Xác nhận Thông tin địa chỉ ở trang Thanh toán', async ({ page, registeredUser }) => {
        const locators = AuthLocators(page);

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


