import { test, expect } from "@playwright/test";

test.describe("Suite A", () => {
    test.beforeAll(() => {
        console.log("Before all test cases");
    });

    test.beforeEach(() => {
        console.log("Before each test case");
    });

    test("lesson07-1", async ({ page }) => {
        console.log("Test case 1");
    });

    test("lesson07-2", async ({ page }) => {
        console.log("Test case 2");
    });

    test.afterEach(() => {
        console.log("After each test case");
    });

    test.afterAll(() => {
        console.log("After all test cases");
    });
});