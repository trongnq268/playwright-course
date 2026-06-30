import { test } from '@playwright/test';

test('Bài học về Biến', async () => {
    // 1. Khai báo
    const userName: string = "Nguyen Van A";
    let userAge: number = 25;

    // 2. Tính toán & So sánh
    userAge = userAge + 1;
    // userName = "Nguyen Van B";
    const isMatch = (userName === "Nguyen Van B");
    // console.log(150000 == "150000");              
    // 3. In kết quả
    console.log("Tuổi mới:", userAge);
    console.log("Tuổi user:", userName);
    console.log("Kết quả:", isMatch);
});