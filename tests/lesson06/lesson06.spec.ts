// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//    await expect(page).getByRole('button',{ nsme: 'Pay Now!'}).click();
//    await expect(page).getByText("Merchant ID")
//    page.locator('input[name="vpc_MerchTxnRef"]'); 
   

   
     
// // Hướng dẫn lấy locator trong auto test: vào testing trên vscode > click Pick locator > trỏ vào input cần lấy locator
// // page.locator(//input[@name='vpc_MerchTxnRef']
// // page.locator(//tr[.//strong[text()='Merchant Transaction Reference'] and .//em[text()='Merchant Transaction Reference']]//td[2]/input);

// // Actions: Hiểu cơ chế auto- wait, click, check, hover,...
// // Cơ chế auto-wait: khi trang web load chậm, sử dụng cơ chế auto-wait ngừng cứng trong 5 giây
// // click/dblclick:
// // check: dùng cho element checkbox/radio button
// // select option: dùng cho element là các dropdown
// // asertion = expect result trong manual
// // sang project thật thì sẽ tách file


// }); 





// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   ///getByRole: tìm kiếm phần tử theo Vai trò và Tên hiển thị: Button, Link, Heading,...
//   //Ví dụ:
//   //1, Tìm nút 'Pay Now!' và click vào
//   await expect(page).getByRole('button', { name: 'Pay Now!' }).click();
//   //2, Tìm text 'Merchant ID' và kiểm tra hiển thị
//   await expect(page).getByText("Merchant ID").toBeVisible();
//   //3, Tìm input có name là 'vpc_MerchTxnRef'
//   await page.locator('input[name="vpc_MerchTxnRef"]');

//  ///getByLable: tìm kiếm phần tử theo nhãn hiển thị
//   //Ví dụ:
//   //1, Tìm input có nhãn hiển thị là 'Merchant Transaction Reference' và kiểm tra hiển thị
//   await expect(page.getByLabel('Merchant Transaction Reference')).toBeVisible();
//   //2, Tìm input có nhãn hiển thị là 'Merchant Transaction Reference' và điền giá trị vào
//   await page.getByLabel('Merchant Transaction Reference').fill('123456789');

//  ///getByPlaceholder: tìm kiếm phần tử theo placeholder
//   //Ví dụ:
//   //1, Tìm input có placeholder là 'Enter your email' và điền giá trị vào
//   await page.getByPlaceholder('Enter your email').fill('example@example.com');
//  ///note: Dùng getByLable an toàn hơn vì nó gắn với trải nghiệm người dùng



//  ////Playwright cung cấp 8 locator dựng sẵn
//  /////1, getByRole: ưu tiên số 1, tìm kiếm phần tử theo Vai trò và Tên hiển thị: Button, Link, Heading,...
//  /////2, getByLabel: ô input gắn với label (form)
//  /////3, getByPlaceholder: tìm kiếm phần tử theo placeholder. input theo chữ mờ của placehoder(form)
//  /////4, getByText: tìm kiếm phần tử theo text hiển thị. input theo nội dung text hiển thị
//  /////5, getByAltText: tìm kiếm phần tử theo alt text. tìm kiếm theo ảnh
//  /////6, getByTitle: tìm kiếm phần tử theo thuộc tính title, tooltip 
//  /////7, getByTestId: tìm kiếm phần tử theo test id, có ID thì cùng luôn, Id là giá trị duy nhất. Yêu cầu dev gắn dtaa-testID cho mình
//  /////8, locator: tìm kiếm phần tử theo css selector/xpath (hạ sách cuối cùng)


// }); 



// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://dev27-mtf.opdev.vn/client/qt/');
//      {name: 'Pay Now!'}).click()

// }); 

import { test, expect } from '@playwright/test';

test.describe('Playwright Lessons - Locator, Actions & Assertions', () => {

  test('Locator Strategy', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Login' })
    ).toBeVisible();

    const buttons = page.getByRole('button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('Actions & Auto-wait', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);

    await page.getByText('Swag Labs').hover();
    await page.keyboard.press('Tab');
  });

  test('Assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.getByText('Swag Labs')).toContainText('Swag');

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await expect(
      page.getByText('Invalid credentials')
    ).not.toBeVisible();

    await expect.soft(
      page.getByText('Swag Labs')
    ).toHaveText('Swag Labs');
  });

  test('Tong Hop - Flow', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.cart_item')).toHaveCount(2);

    await page.getByRole('button', { name: 'Checkout' }).click();
  });
});

/*
KEY TAKEAWAYS

Locator Strategy
- Role > Label > Placeholder > TestId > CSS/XPath
- Test what users see.

Action and Auto-wait
- Auto-wait > Sleep
- fill() > type()
- Trust Playwright Auto-wait.

Asertions
- await expect(locator)
- toHaveText() = Text
- toHaveValue() = Input
- Hard = Business Flow
- Soft = UI Validation

Tổng hợp -Flow
- Login
- Add product
- Verify
- Checkout
*/

  