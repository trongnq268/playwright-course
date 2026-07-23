import { Page } from '@playwright/test';
export function getLoginLocators(page: Page) {
  return {
    // 1. Đường link 'Signup / Login' trên thanh menu top
    signupLoginLink: page.getByRole('link', { name: 'Signup / Login' }),
    
    // 2. Tiêu đề 'Login to your account'
    loginHeading: page.getByRole('heading', { name: 'Login to your account' }), 
    // Hoặc có thể dùng: page.getByText('Login to your account')

    // 3. Ô nhập Email đăng nhập
    emailInput: page.getByPlaceholder('Email Address'), 

    // 4. Ô nhập Password
    passwordInput: page.getByPlaceholder('Password'),

    // 5. Nút 'Login'
    loginButton: page.getByRole('button', { name: 'Login' }),

    // 6. Thẻ hiển thị thông tin người dùng sau khi đăng nhập thành công
    loggedInAsText: page.getByText('Logged in as')
  };
}