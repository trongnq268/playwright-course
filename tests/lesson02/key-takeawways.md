# Lesson 2 - Key Takeaways

## 1\. Mục tiêu buổi học

- Làm quen JavaScript/TypeScript.
- Hiểu cách khai báo biến.
- Hiểu kiểu dữ liệu.
- Biết sử dụng toán tử.
- Áp dụng vào Playwright.

## 2\. Khai báo biến

- let: dùng khi giá trị có thể thay đổi.  
    Ví dụ:

let firstName = 'Tester';  
<br/>console.log(firstName);  
<br/>firstName = 'QA';  
<br/>console.log(firstName);

- const: dùng khi giá trị không thay đổi.  
    Ví dụ:

Trường hợp khai báo biến đúng, khi giá trị không thay đổi:

const country = 'Vietnam';  
<br/>console.log(country);

Trường hợp khai báo biến sai, gây ra lỗi:

country = 'Japan';

Ở đây sẽ trả lỗi: Assignment to constant variable.

- var: cú pháp cũ, không khuyến khích sử dụng.

Ví dụ:

var age = 18;

## 3\. Kiểu dữ liệu

- string

Ví dụ:

let name = 'Tester';

Tương đương với:

let name: string = 'Tester';

- number

Ví dụ:

let age = 18;

Tương đương với:

let age:number = 18;

- Boolean

Ví dụ:

let isLogin = true;

Tương đương với:

let isLogin:boolean = true;

- Array

Ví dụ:

let fruits = \['Apple', 'Banana', 'Orange'\];

Tương đương với:

let fruits: array=\['Apple', 'Banana', 'Orange'\];

- Object

Ví dụ:

const user = {  
name: 'Tester',  
age: 18  
};

## 4\. Template Literal

- Dùng dấu backtick (\`) và ${} để chèn biến.  
    Ví dụ:

import { test } from '@playwright/test';  
<br/>test('has title', async ({ page }) => {  
    let firstName: string = 'Tester';  
    let age: number = 18;  
<br/>    let info: string = Tôi là ${firstName}, ${age} tuổi;  
    console.log(info);  
});

## 5\. Toán tử

- Số học: + - \* / %
- So sánh: ==, ===, !=, !==, >, &lt;, &gt;=, <=
- Logic: &&, ||, !

Ví dụ:

- **Phép tính:**

import { test } from '@playwright/test';  
<br/>test('has title', async ({ page }) => {  
    let number1: number = 10;  
    let number2: number = 5;  
    let total: number;  
    //+, -  
    total = number1 - number2;  
    console.log(total);  
<br/>    //nhân \*  
    total = number1 \* number2;  
    console.log(total);  
<br/>    //chia /  
    total = number1 / number2;  
    console.log(total);

- **So sánh:**

import { test } from '@playwright/test';  
<br/>test('has title', async ({ page }) => {  
    let number1: number = 10;  
    let number2: string = '10';  
    console.log(number1 != number2);

- **So sánh lớn/nhỏ hơn:**

import { test } from '@playwright/test';  
<br/>test('has title', async ({ page }) => {  
    let number1: number = 10;  
    let number2: string = '5';  
    console.log(number1 >= number2);

## 6\. Các lệnh thường dùng

- console.log() để in giá trị.
- typeof để kiểm tra kiểu dữ liệu.
- Number(), String(), Boolean() để ép kiểu.
- count++, count--, +=, -=, \*=, /=.

## 7\. Bài học rút ra

- Ưu tiên dùng const, chỉ dùng let khi cần thay đổi giá trị.
- Hạn chế dùng var.
- JavaScript phân biệt chữ hoa/chữ thường.
- Ưu tiên === và !== thay vì == và !=.
- Dùng template literal giúp code dễ đọc.
- Đặt tên biến theo camelCase.
- console.log() rất hữu ích khi debug.

## 8\. TODO

- Ôn tập khai báo biến
- Thực hành vòng lặp for, while, for...of.
- Học Function và Arrow Function.
- Luyện Array và Object.
- Tìm hiểu Scope của let, const, var.