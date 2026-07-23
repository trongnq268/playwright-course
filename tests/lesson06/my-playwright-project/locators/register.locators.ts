import { Page } from '@playwright/test';
export function getLoginLocators(page: Page) {
  return {
        // Signup / Login
        signupLoginBtn: page.getByRole('link', { name: 'Signup / Login' });
        
        // New User Signup
        newUserSignupHeading: page.getByRole('heading', { name: 'New User Signup!' });

        
  };
}