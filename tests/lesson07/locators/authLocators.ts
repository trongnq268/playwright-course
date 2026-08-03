import { Page } from "@playwright/test";


export const AuthLocators = (page: Page) => ({
    automationexerciseLink: "https://automationexercise.com/",
    signupLoginLink: page.getByRole('link', { name: 'Signup / Login' }),
    nameSignupInput: page.getByRole('textbox', { name: 'Name' }),
    emailSignupInput: page.locator('[data-qa="signup-email"]'),
    signupButton: page.getByRole('button', { name: 'Signup' }),
    emailLoginInput: page.getByRole('textbox', { name: 'Email Address' }),
    passwordLoginInput: page.getByRole('textbox', { name: 'Password' }),
    loginButton: page.getByRole('button', { name: 'Login' }),
    textLoginSuccess: page.getByText('Logged in as', { exact: true }),
    textLoginSuccessName: (name: string) => page.getByText(`Logged in as ${name}`),
    textNewUserSignup: page.getByRole('heading', { name: /New User Signup!|Đăng ký người dùng mới!/, level: 2 }),
    textUserSignupInformation: page.getByText(/ENTER ACCOUNT INFORMATION|Nhập thông tin tài khoản/),
    textUserSignupInformation1: page.getByRole('heading', {
        name: /enter account information|nhập thông tin tài khoản/i,
        level: 2
    }),

    //register
    register_chk_gender: page.getByLabel('Mr.'),
    register_input_name: page.locator('[data-qa="name"]'),
    register_input_email: page.locator('[data-qa="email"]'),
    register_input_password: page.locator('[data-qa="password"]'),
    register_input_day: page.locator('[data-qa="days"]'),
    register_input_month: page.locator('[data-qa="months"]'),
    register_input_year: page.locator('[data-qa="years"]'),
    register_chk_newsletter: page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }),
    register_chk_receive_special_offers: page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }),
    register_first_name: page.locator('[data-qa="first_name"]'),
    register_last_name: page.locator('[data-qa="last_name"]'),
    register_company: page.locator('[data-qa="company"]'),
    register_address: page.locator('[data-qa="address"]'),
    register_address2: page.locator('[data-qa="address2"]'),
    register_country: page.locator('[data-qa="country"]'),
    register_state: page.locator('[data-qa="state"]'),
    register_city: page.locator('[data-qa="city"]'),
    register_zipcode: page.locator('[data-qa="zipcode"]'),
    register_mobile: page.locator('[data-qa="mobile_number"]'),
    register_create_account_button: page.getByRole('button', { name: 'Create Account' }),
    register_textAccountCreated: page.getByText('Account Created!', { exact: true }),
    register_continue_button: page.locator('[data-qa="continue-button"]'),

    register_delete_account_button: page.getByRole('link', { name: 'Delete Account' }),
    register_textAccountDeleted: page.getByText('Account Deleted!', { exact: true }),
    textErrorEmailExist: page.getByText('Email Address already exist!', { exact: true }),

    //sign in
    login_textLoginToYourAccount: page.getByRole('heading', { name: 'Login to your account', level: 2 }),
    login_input_email: page.locator('[data-qa="login-email"]'),
    login_input_password: page.locator('[data-qa="login-password"]'),
    login_button: page.locator('[data-qa="login-button"]'),
    login_textErrorEmailOrPasswordIncorrect: page.getByText('Your email or password is incorrect!', { exact: true }),

    //cart
    cart_button: page.getByRole('link', { name: 'cart' }),
    cart_product: page.getByText('Add to cart', { exact: true }),
    cart_view_cart: page.locator(`u:has-text("View Cart")`),
    cart_process_to_checkout: page.locator('.btn.btn-default.check_out'),
    cart_register_login_button: page.locator(`u:has-text("Register / Login")`),
    cart_comment: page.locator('[name="message"]'),
    cart_place_order_button: page.getByRole('link', { name: 'Place Order' }),
    product_button: page.locator(`a[href="/products"]`),

    //payment
    payment_name_on_card: page.locator('[data-qa="name-on-card"]'),
    payment_card_number: page.locator('[data-qa="card-number"]'),
    payment_cvc: page.locator('[data-qa="cvc"]'),
    payment_expiry_month: page.locator('[data-qa="expiry-month"]'),
    payment_expiry_year: page.locator('[data-qa="expiry-year"]'),
    payment_pay_button: page.locator('[data-qa="pay-button"]'),
    payment_success_message: page.getByText('Congratulations! Your order has been confirmed!', { exact: true }),

    //delivery addres confirm
    delivery_address_company: page.locator('.address_address1.address_address2'),
    deliver_address_city: page.locator('.address_city.address_state_name.address_postcode'),
    devlivery_address_country: page.locator('.address_country_name'),
    delivery_address_mobile: page.locator('.address_phone'),
    delivery_addressContainer: page.locator('#address_delivery'),

});