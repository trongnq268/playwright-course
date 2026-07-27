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


});
